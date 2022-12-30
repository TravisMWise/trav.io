import { Actor } from "./actor.js";
import { rectCollide, bezierCollisionPoint, derivResistance } from "../math_functions/directory_export.js";
import { playAudio } from "../math_functions/play_audio.js";

// import { Projectile } from "./projectile.js";
// import { iceProjectile } from "../projectiles/Ice_projectile.js";
import { Projectile } from "./directory_export.js";
import { Player } from "../player_classes/player.js";

export class Pawn extends Actor {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 50, capY = 50, chapart) {
    super(p, x, y, w, h);
    this.hit = false;
    this.wallhit = false;
    this.status = {};
    this.inventory = [];
    this.projectiles = [];
    this.actionAttackBoxes = [];
    this.actionBodyBoxes = [];
    this.meshAttack = [];
    this.meshBody = [];
    this.actions = {};
    this.statesMesh;
    this.currentState = "idle";
    this.currentAIState = "idle";
    this.currentDirection = "";
    this.level = level;
    this.health = health;
    this.weight = weight;
    this.velocityX = 0;
    this.velocityY = 0;
    this.damageBoolean = damageBoolean;
    this.capX = capX;
    this.capY = capY;
    this.jump = true;
    this.canJump = true;
    this.speed = 6;
    this.temp;
    this.target = 0;
    this.targetSet = false;
    this.moving = false;
    this.movingLeft = false;
    this.movingRight = false;
    this.movingUp = false;
    this.movingDown = false;
    this.timer = 0;
    this.gravity = 1;
    this.chapart = chapart;
    this.sprite;
    this.deadState = false;
    this.projectileTimers = {};
    this.currentDir = "left";
    this.takenDamage = false;
    this.health = 100;
    this.talkable = false;
    this.talk = false;
    this.talkMessages = [];
    this.timers = {};
    this.bool = {};
    this.isPlayer = false;
    this.angle = 0;
  }
  updateStateMesh(p, player) {
    return {};
  }
  updateStateActions(p, player) {}
  updateStateSprite(p, player) {}
  getAction(p, action, x, y) {}
  draw(p) {}
  getProjectile(p, projectile, passIn = {}) {}

  applyStatus(p, player) {
    var isPlayer = false;
    if (this.health <= 0) {
      this.status = {};
      return;
    }
    if (this instanceof Player) {
      isPlayer = true;
      this.speedOffset(1);
      this.healthBarColor = p.color(255, 255, 255, 200);
      this.damageBoolean = true;
    }

    for (var [k, v] of Object.entries(this.status)) {
      switch (k) {
        case "fire":
          // DO something to object 'this' based on a given POWER when fire effect is present
          break;
        case "frozen":
          // DO something to object 'this' based on a given POWER when frozen effect is present
          break;
        case "posioned":
          if (v.timer % 60 === 0) {
            this.health -= 4 * v.power;
          }

          if (isPlayer) {
            this.speedOffset(2);
            this.healthBarColor = p.color(24, 252, 0, 200);
          }
          break;

        case "unstaggerable":
          if (isPlayer) {
            this.healthBarColor = p.color(0, 0, 0, 200);
            this.damageBoolean = false;
          }
          break;
      }

      this.status[k].timer--;
      if (this.status[k].timer <= 0) {
        if (this instanceof Player && k === "unstaggerable") {
          this.healthBarColor = p.color(255, 255, 255, 200);
          this.damageBoolean = true;
        }
        delete this.status[k];
      }
    }
  }

  addStatus(name, timer, power = 1) {
    if (!(name === "unstaggerable" && this.status[name])) this.status[name] = { timer: timer, power: power };
  }

  shoot(p, projectile, timers = [], passIn = {}) {
    if (this.projectileTimers[projectile]) return;
    if (timers.length === 0) {
      timers.push(projectile);
    }

    var pro = this.getProjectile(p, projectile, passIn);

    if (pro.delay) {
      for (var i = 0; i < timers.length; i++) {
        if (!this.projectileTimers[timers[i]]) {
          this.projectileTimers[timers[i]] = pro.delay;
        }
      }
    }

    if (pro.projectile) this.projectiles.push(pro.projectile);
  }

  //return angle between targets in degrees
  targetAngle(object1, object2) {
    let deltaX = object1.x - object2.x;
    let deltaY = object1.y - object2.y;
    let radians = Math.atan2(Math.abs(deltaY), Math.abs(deltaX));
    let degrees = (radians * 180) / Math.PI - 5;

    return degrees;
  }

  updateDialogue(p, img) {
    p.push();
    p.angleMode(p.DEGREES);
    p.translate(this.x - this.w / 2 - 60, this.y - this.h - 50 + p.sin(p.frameCount * 2) * 5);
    p.scale(0.4);
    p.image(img, 0, 0);
    p.angleMode(p.RADIANS);
    p.pop();
  }

  updateProjectileTimers() {
    for (var [k, v] of Object.entries(this.projectileTimers)) {
      if (v <= 0) {
        delete this.projectileTimers[k];
      } else {
        this.projectileTimers[k]--;
      }
    }
  }

  isAction(p, actions) {
    var all = false;
    for (var i = 0; i < actions.length; i++) {
      var act = this.getAction(p, actions[i]);
      var max = act.sprite.getMaxStageProgress();
      if (this.actions[actions[i]] && ((act.delay && this.actions[actions[i]].stage !== max + act.delay) || this.actions[actions[i]].stage !== max)) all = true;
    }
    return all;
  }

  getActionStage(action) {
    if (!this.actions[action]) {
      return -1;
    } else {
      return this.actions[action].stage;
    }
  }

  addAction(p, action, exclusion = [], override = [], obj = null) {
    var actioninfo = this.getAction(p, action);

    if (!actioninfo) return;

    var max = actioninfo.sprite.getMaxStageProgress();
    if (this.oof === "oof") console.log(action + " has a max stage of " + max);
    // if (exclusion.length === 0) { exclusion.push(action); }
    exclusion.push(action);
    for (var i = 0; i < exclusion.length; i++)
      if (this.actions[exclusion[i]] && ((actioninfo.delay && this.actions[exclusion[i]].stage !== max + actioninfo.delay) || this.actions[exclusion[i]].stage !== max)) return;
      else if (exclusion[i] !== "die_left" && exclusion[i] !== "die_right") delete this.actions[exclusion[i]];
    // if (this.actions[exclusion[i]] &&  this.actions[exclusion[i]].stage !== max) return;

    for (var i = 0; i < override.length; i++) {
      if (this.actions[override[i]]) {
        // console.log(action + " overriding " + override[i]);
        delete this.actions[override[i]];
      }
    }

    if (this.oof === "oof") console.log(this.actions);

    if (obj === null) {
      this.actions[action] = { stage: 0 };
    } else {
      this.actions[action] = { stage: 0, x: obj.x, y: obj.y };
    }
  }

  randomCheck(percentage) {
    return Math.random() * 100 < percentage;
  }

  setTimer(name, time) {
    this.timers[name] = time;
  }
  timerFinish(name) {
    if (!this.timers[name]) {
      return true;
    } else if (this.timers[name] <= 0) {
      return true;
    }
    return false;
  }
  updateTimers() {
    for (var [k, v] of Object.entries(this.timers)) {
      if (this.timers[k] >= 0) {
        this.timers[k]--;
      }
    }
  }

  applyActions(p) {
    this.actionAttackBoxes = [];
    this.actionBodyBoxes = [];

    for (var [k, v] of Object.entries(this.actions)) {
      var action;
      if (this.bruh === "bruh") console.log(k);

      if (this.actions[k].x) {
        action = this.getAction(p, k, this.actions[k].x, this.actions[k].y);
      } else {
        action = this.getAction(p, k);
      }
      if (!action.delay && !this.actions["die_left"] && !this.actions["die_right"] && !this.actions["die"]) {
        action.sprite.play(p, this.actions[k].stage);
      }

      if (action.sound && this.actions[k].stage === 0) playAudio(action.sound);

      if (this.actions[k].stage >= action.sprite.getMaxStageProgress()) {
        if (!action.delay || (action.delay && this.actions[k].stage >= action.sprite.getMaxStageProgress() + action.delay)) {
          if (action.sprite.id !== "die") {
            // console.log("deleting " + k)
            delete this.actions[k];
          } else {
            action.sprite.play(p, action.sprite.getMaxStageProgress() - 1);
          }
        } else this.actions[k].stage++;
        continue;
      }

      // Draw the action
      if (action.delay || this.actions["die_left"] || this.actions["die_right"] || this.actions["die"]) action.sprite.play(p, this.actions[k].stage);

      if (action.complex === false) {
        if (action.attack) for (var j = 0; j < action.attack.length; j++) this.actionAttackBoxes.push(action.attack[j]);

        if (action.body) for (var j = 0; j < action.body.length; j++) this.actionBodyBoxes.push(action.body[j]);
      } else {
        if (action.attack && action.attack[this.actions[k].stage]) {
          var attack = action.attack[this.actions[k].stage];
          for (var j = 0; j < attack.length; j++) this.actionAttackBoxes.push(attack[j]);
        }

        // if (action.body && action.body[this.actions[k]]) {
        //   var body = action.body[this.actions[k]];
        //   for (var j = 0; j < body.length; j++)
        //     this.actionBodyBoxes.push(body[j]);
        // }

        if (action.body) for (var j = 0; j < action.body.length; j++) this.actionBodyBoxes.push(action.body[j]);
      }

      this.actions[k].stage++;
    }
  }

  updateMesh(p, player) {
    this.statesMesh = this.updateStateMesh(p, player);

    this.meshBody = [];
    this.meshAttack = [];

    if (this.statesMesh[this.currentState] && this.statesMesh[this.currentState].attack) this.meshAttack = this.statesMesh[this.currentState].attack;

    for (var j = 0; j < this.actionAttackBoxes.length; j++) this.meshAttack.push(this.actionAttackBoxes[j]);

    if (this.statesMesh[this.currentState] && this.statesMesh[this.currentState].body) this.meshBody = this.statesMesh[this.currentState].body;

    for (var j = 0; j < this.actionBodyBoxes.length; j++) this.meshBody.push(this.actionBodyBoxes[j]);
  }

  stateMachine(p, player) {
    // this.updateStateActions(p, this)
    this.updateStateActions(p, player);
  }

  updateSprite(p, player) {
    this.updateStateSprite(p, player);
  }

  updateMovement(p) {
    if (p.abs(this.velocityX) > 0.2 || p.abs(this.velocityY) > 0.2) this.moving = true;
    else this.moving = false;

    // if (this.velocityX > 0.2) this.movingRight = true;
    // else this.movingRight = false;

    // if (this.velocityX < -0.2) this.movingLeft = true;
    // else this.movingLeft = false;

    if (this.velocityY > 0.2) this.movingDown = true;
    else this.movingDown = false;

    if (this.velocityY < -0.2) this.movingUp = true;
    else this.movingUp = false;
  }

  applyAllStates(p, player) {
    this.updateMovement(p);
    this.updateCurrentDir();
    this.updateProjectileTimers();
    this.updateSprite(p, player);
    this.stateMachine(p, player);
    this.applyActions(p);
    this.applyStatus(p, player);
    this.updateMesh(p, player);
    this.updateTimers();
  }

  applyPhysics(p, collision) {
    if (!this.levelEditorSelected) {
      this.y += this.velocityY;
      if (this.constructor.name === "Player") {
        if (this.keys[90]) {
          if (this.velocityY <= 0) {
            this.velocityY += this.gravity / 5;
          } else {
            this.velocityY += this.gravity / 4.5;
          }
        } else {
          this.velocityY += this.gravity;
        }
      } else {
        this.velocityY += this.gravity;
      }
      this.applyCollision(p, collision, 0, this.velocityY);
      this.x += this.velocityX;
      this.velocityX *= 0.7;
      this.applyCollision(p, collision, this.velocityX, 0);

      if (this.velocityY > this.capY) this.velocityY = this.capY;

      if (this.velocityY < -this.capY) this.velocityY = -this.capY;

      if (this.velocityX > this.capX) this.velocityX = this.capX;

      if (this.velocityX < -this.capX) this.velocityX = -this.capX;
    }
    this.levelEditorSelected = false;
  }

  applyInventoryEffects(p) {
    for (var i = 0; i < this.inventory.length; i++) {
      var currentCol = this.inventory[i];

      if (currentCol.isBuff) {
        if (currentCol.buffTimer === 0) {
          currentCol.setup(this);
        }

        currentCol.buffTimer++;

        if (currentCol.buffTimer > currentCol.buffDuration) {
          currentCol.reset(this);
          this.inventory.splice(i, 1);
          continue;
        }
      }

      currentCol.effect(p, this);
    }
  }

  applyCollectables(p, collectables) {
    for (var i = 0; i < collectables.length; i++) {
      var collectable = collectables[i];
      if (!rectCollide(this, collectable)) {
        continue;
      }
      collectable.collected = true;
      this.inventory.push(collectable);
    }
  }

  applyBasicPhysics() {
    this.y += this.velocityY;
    this.x += this.velocityX;

    if (this.velocityY > this.capY) {
      this.velocityY = this.capY;
    }
    if (this.velocityY < -this.capY) {
      this.velocityY = -this.capY;
    }
    if (this.velocityX > this.capX) {
      this.velocityX = this.capX;
    }
    if (this.velocityX < -this.capX) {
      this.velocityX = -this.capX;
    }
  }

  moveLeft(speed) {
    this.velocityX = -speed;
    this.movingLeft = true;
    this.movingRight = false;
  }

  moveRight(speed) {
    this.velocityX = speed;
    this.movingRight = true;
    this.movingLeft = false;
  }

  updateCurrentDir() {
    if (this.movingLeft) {
      this.currentDir = "left";
    }
    if (this.movingRight) {
      this.currentDir = "right";
    }
  }

  doJump(height) {
    if (this.jump) {
      this.velocityY = -height;
      this.canJump = false;
      this.jump = false;
    }
  }

  attack(obj, damage) {
    if (obj.damageBoolean === true) obj.health -= damage;
    if (obj instanceof Player) {
      obj.addStatus("unstaggerable", 40);
    }
  }

  detectDamage(p, attacks, player) {
    this.hit = false;
    for (var i = 0; i < this.meshBody.length; i++) {
      for (var j = 0; j < attacks.length; j++) {
        if (rectCollide(this.meshBody[i], attacks[j])) {
          attacks[j].effect(p, this);
          this.hit = true;
          if(player !== null) player.restoreHealth ++;
          if (attacks[j].obj instanceof Projectile) {
            attacks[j].obj.die(p, attacks[j].obj.deathAction);
          }
        }
      }
    }
  }

  airFollow(p, target, speed) {
    var seekX = target.x + target.w / 2;
    var seekY = target.y + target.h / 2;
    var d;

    var e = new p.createVector(this.x + this.w / 4, this.y + this.h / 2);
    var py = new p.createVector(seekX, seekY);

    py.sub(e);

    d = p.dist(seekX, seekY, this.x, this.y);

    this.velocityX = (speed * py.x) / 200;
    this.velocityY = (speed * py.y) / 200;
  }

  switchDirection() {
    if (this.currentDir === "right") this.currentDir = "left";
    else this.currentDir = "right";
  }

  lookAt(target) {
    this.targetSet = true;
    this.timer = Math.random() * (40 - (40 - 10)) + (40 - 10);
    if (typeof target === "number") {
      if (this.x + this.w / 2 > target && this.x + this.w / 2 > target) {
        this.target = target - speed - this.w;
        this.lookLeft();
      } else if (this.x + this.w / 2 < target && this.x + this.w / 2 < target) {
        this.target = target - speed + this.w;
        this.lookRight();
      } else this.targetSet = false;
    }

    if (typeof target === "object") {
      if (this.x + this.w / 2 > target.x + target.w / 2 && this.x + this.w / 2 > target.x + target.w / 2) {
        this.target = this.x + this.w / 2 - this.w;
        this.lookLeft();
      } else if (this.x + this.w / 2 < target.x + target.w / 2 && this.x + this.w / 2 < target.x + target.w / 2) {
        this.target = this.x + this.w / 2 + this.w;
        this.lookRight();
      } else this.targetSet = false;
    }
  }

  lookLeft() {
    this.movingLeft = true;
    this.movingRight = false;
  }

  lookRight() {
    this.movingLeft = false;
    this.movingRight = true;
  }

  basicFollow(target, speed) {
    this.targetSet = true;
    this.timer = Math.random() * (40 - (40 - 10)) + (40 - 10);

    if (typeof target === "number") {
      if (this.x + this.w / 2 > target - speed && this.x + this.w / 2 > target + speed) {
        this.target = target - speed - this.w;
        this.moveLeft(speed);
      } else if (this.x + this.w / 2 < target - speed && this.x + this.w / 2 < target + speed) {
        this.target = target - speed + this.w;
        this.moveRight(speed);
      } else this.targetSet = false;
    }

    if (typeof target === "object") {
      this.target = target.x + target.w / 2;
      if (this.x + this.w / 2 > target.x + target.w / 2 - speed && this.x + this.w / 2 > target.x + target.w / 2 + speed) {
        this.target = this.x + this.w / 2 - this.w;
        this.moveLeft(speed);
      } else if (this.x + this.w / 2 < target.x + target.w / 2 - speed && this.x + this.w / 2 < target.x + target.w / 2 + speed) {
        this.target = this.x + this.w / 2 + this.w;
        this.moveRight(speed);
      } else this.targetSet = false;
    }
  }

  paceIdle(x, x1, speed, delay = 40) {
    if (!this.targetSet && this.timer <= 0) {
      this.target = Math.random() * (x1 - x) + x;
      this.targetSet = true;
    } else if (this.x > this.target - 10 - speed / 2 && this.x > this.target + 10 + speed / 2) this.moveLeft(speed);
    else if (this.x < this.target - 10 - speed / 2 && this.x < this.target + 10 + speed / 2) this.moveRight(speed);
    else if (this.timer > 0) {
      this.timer -= 0.5;
    } else {
      this.targetSet = false;
      this.timer = Math.random() * (delay - (delay - 10)) + (delay - 10);
    }
  }

  dist(p, obj1, obj2) {
    return p.dist(obj1.x + obj1.w / 2, obj1.y + obj1.h / 2, obj2.x + obj2.w / 2, obj2.y + obj2.h / 2);
  }

  distY(p, obj1, obj2) {
    return this.dist(p, { x: 0, y: obj1.y, w: 0, h: obj1.h }, { x: 0, y: obj2.y, w: 0, h: obj2.h });
  }

  distX(p, obj1, obj2) {
    return this.dist(p, { x: obj1.x, y: 0, w: obj1.w, h: 0 }, { x: obj2.x, y: 0, w: obj2.w, h: 0 });
  }

  applyCollision(p, collision, xvel, yvel) {
    this.wallhit = false;
    for (var i = 0; i < collision.length; i++) {
      var collider = collision[i];
      switch (collider.constructor.name) {
        case "CurveCollision":
          var middlepoint = this.x + this.w / 2;
          if (!rectCollide(this, collider)) continue;
          if (!bezierCollisionPoint(p, middlepoint, this, collider)) continue;

          if (yvel > 0) {
            this.y = collider.y1 + collider.c * p.sin((Math.PI * (middlepoint - collider.x1)) / (collider.x2 - collider.x1)) + ((collider.y2 - collider.y1) * (middlepoint - collider.x1)) / (collider.x2 - collider.x1) - this.h;
            this.velocityY = 0;
            this.jump = true;
            this.velocityX = derivResistance(p, middlepoint, collider) * this.velocityX;
          }
          break;

        case "BoxCollision":
          if (!rectCollide(this, collider)) continue;

          if (xvel < 0) {
            this.x = collider.x + collider.w;
            this.velocityX = 0;
            this.wallhit = true;
          }
          if (xvel > 0) {
            this.x = collider.x - this.w;
            this.velocityX = 0;
            this.wallhit = true;
          }
          if (yvel < 0) {
            this.y = collider.y + collider.h;
            this.velocityY = 2;
          }
          if (yvel > 0) {
            this.y = collider.y - this.h;
            this.jump = true;
            this.canJump = true;
            this.velocityY = 0;
          }
          break;

        case "DeathBox":
          if (rectCollide(this, collider) && !this.isPlayer) {
            if (xvel < 0) {
              this.x = collider.x + collider.w;
              this.velocityX = 0;
            }
            if (xvel > 0) {
              this.x = collider.x - this.w;
              this.velocityX = 0;
            }
            if (yvel < 0) {
              this.y = collider.y + collider.h;
              this.velocityY = 0;
            }
            if (yvel > 0) {
              this.y = collider.y - this.h;
              this.jump = true;
              this.canJump = true;
              this.velocityY = 0;
            }
          }
          break;
      }
    }
  }
}
