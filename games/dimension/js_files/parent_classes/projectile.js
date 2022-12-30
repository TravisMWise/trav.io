import { Actor } from "./actor.js";
import { rectCollide } from "../math_functions/rect_collision.js";
import { Passive } from "./passive.js";

export class Projectile extends Actor {
  constructor(p, x, y, w, h, angle, set, curDir = "right") {
    super(p, x, y, w, h);
    this.state = "active";
    this.meshAttack = [];
    this.actionAttackBoxes = [];
    this.actions = {};
    this.set = set;
    this.deathAction = null;
    this.curDir = curDir;
    this.loadset;
    this.currentAnimation = "";
    this.velocityX = 0;
    this.velocityY = 0;
    this.angle = angle;
    this.rads = (this.angle * Math.PI) / 180;
  }

  moveLeft(speed) {
    this.velocityX = -speed * Math.cos(this.rads);

    this.velocityY = -speed * Math.sin(this.rads);
  }

  moveRight(speed) {
    this.velocityX = this.velocityX = speed * Math.cos(this.rads);

    this.velocityY = -speed * Math.sin(this.rads);
  }

  updateMesh(p) {
    this.meshAttack = [];

    for (var j = 0; j < this.actionAttackBoxes.length; j++) this.meshAttack.push(this.actionAttackBoxes[j]);
  }

  addAction(p, action, exclusion = []) {
    var actioninfo = this.getAction(p, action);
    if (!actioninfo) return;

    var max = actioninfo.sprite.getMaxStageProgress();

    if (exclusion.length === 0) {
      exclusion.push(action);
    }
    for (var i = 0; i < exclusion.length; i++) if (this.actions[exclusion[i]] && this.actions[exclusion[i]] !== max) return;

    this.actions[action] = 0;
  }

  applyActions(p) {
    this.actionAttackBoxes = [];
    this.actionBodyBoxes = [];

    for (var [k, v] of Object.entries(this.actions)) {
      var action = this.getAction(p, k);

      if (action.sound && this.actions[k] === 0) action.sound.play();

      if (this.actions[k] >= action.sprite.getMaxStageProgress()) {
        delete this.actions[k];
        return;
      }

      // Draw the action
      action.sprite.play(p, this.actions[k]);

      if (action.attack) for (var j = 0; j < action.attack.length; j++) this.actionAttackBoxes.push(action.attack[j]);
      this.actions[k]++;
    }
  }

  getAction(p, action) {}

  applyVelocity() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  applyCollision(p, collision) {
    if (this.state !== "active") return;

    for (var i = 0; i < collision.length; i++) {
      for (var j = 0; j < this.meshAttack.length; j++) {
        if (rectCollide(this.meshAttack[j], collision[i])) {
          this.die(p, this.deathAction);
        }
      }
    }
  }

  die(p, action) {
    this.actions = {};
    if (action === null) {
      this.state = "inactive";
      return;
    }

    this.state = "dying";
    this.velocityX = 0;
    this.velocityY = 0;

    this.addAction(p, action);
  }

  kill() {
    if (this.actions === {}) this.state = "inactive";
    return this.state === "inactive";
  }

  applyAllStates(p) {
    this.updateMesh(p);
    this.applyVelocity();
    this.applyActions(p);
  }

  draw(p, currentAnimation) {}

  apply(p, passIn) {}
}
