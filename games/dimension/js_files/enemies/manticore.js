import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";
import { KnockbackAttack } from "../attack_boxes/knockback_attack.js";

export class Manticore extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.health = health;
    this.bool["claw_attack"] = false;
    this.bool["roar"] = false;
    this.currentDir = "left";
    this.speed = 10;
  }

  //Enemy Width: 221
  //Enemy Height: 170
  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
      case "idle_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -83, y + -50, 237, 131, this, 20)],
          body: [new MeshBox(p, x + -100, y + -45, 339, 163, this)],
          sprite: new LoadSet(this.set, "idle", 1220, 996, x + -285, y + -359, 0.58, 0.58, 1, 6),
        };
      case "idle_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 73, y + -35, 237, 131, this, 20)],
          body: [new MeshBox(p, x + -8, y + -44, 339, 163, this)],
          sprite: new LoadSet(this.set, "idle", 1220, 996, x + -190, y + -360, 0.58, 0.58, -1, 6),
        };
      case "walk_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 73, y + -35, 237, 131, this, 20)],
          body: [new MeshBox(p, x + -8, y + -44, 339, 163, this)],
          sprite: new LoadSet(this.set, "walk", 1220, 996, x + -190, y + -360, 0.58, 0.58, -1, 6),
        };
      case "walk_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -92, y + -30, 237, 131, this, 20)],
          body: [new MeshBox(p, x + -109, y + -49, 339, 163, this)],
          sprite: new LoadSet(this.set, "walk", 1220, 996, x + -288, y + -360, 0.58, 0.58, 1, 6),
        };
      case "roar_left":
        return {
          complex: false,
          attack: [new KnockbackAttack(p, x + -637, y + -262, 1589, 466, this, 0, 200, -1, 50)],
          body: [new MeshBox(p, x + -119, y + -74, 304, 158, this)],
          sprite: new LoadSet(this.set, "roar", 1220, 996, x + -286, y + -363, 0.58, 0.58, 1, 6),
        };
      case "roar_right":
        return {
          complex: false,
          attack: [new KnockbackAttack(p, x + -637, y + -262, 1589, 466, this, 0, 200, 1, 50)],
          body: [new MeshBox(p, x + 25, y + -72, 304, 158, this)],
          sprite: new LoadSet(this.set, "roar", 1220, 996, x + -196, y + -362, 0.58, 0.58, -1, 6),
        };
      case "claw_attack_right":
        return {
          complex: true,
          attack: {
            41: [new KnockbackAttack(p, x + 162, y + -203, 276, 367, this, 90, 50, 1, 3)],
          },
          body: [new MeshBox(p, x + -4, y + -49, 339, 163, this)],
          sprite: new LoadSet(this.set, "claw_attack", 1220, 996, x + -189, y + -365, 0.58, 0.58, -1, 6),
        };
      case "claw_attack_left":
        return {
          complex: true,
          attack: {
            41: [new KnockbackAttack(p, x + -205, y + -223, 276, 367, this, 90, 50, -1, 3)],
          },
          body: [new MeshBox(p, x + -109, y + -22, 339, 163, this)],
          sprite: new LoadSet(this.set, "claw_attack", 1220, 996, x + -286, y + -357, 0.58, 0.58, 1, 6),
        };
      case "fly_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -19, y + -59, 221, 170, this, 20)],
          body: [new MeshBox(p, x + -46, y + -96, 328, 261, this)],
          sprite: new LoadSet(this.set, "fly", 1220, 996, x + -202, y + -264, 0.58, 0.58, 1, 6),
        };
      case "fly_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 21, y + -18, 221, 170, this, 20)],
          body: [new MeshBox(p, x + -24, y + -96, 328, 261, this)],
          sprite: new LoadSet(this.set, "fly", 1220, 996, x + -255, y + -270, 0.58, 0.58, -1, 6),
        };
      case "run_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 73, y + -35, 237, 131, this, 20)],
          body: [new MeshBox(p, x + -8, y + -44, 339, 163, this)],
          sprite: new LoadSet(this.set, "run", 1220, 996, x + -190, y + -360, 0.58, 0.58, -1, 4),
        };
      case "run_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -92, y + -30, 237, 131, this, 20)],
          body: [new MeshBox(p, x + -109, y + -49, 339, 163, this)],
          sprite: new LoadSet(this.set, "run", 1220, 996, x + -288, y + -360, 0.58, 0.58, 1, 4),
        };
    }
  }

  updateStateActions(p, player) {
    var uninteruptActions = ["claw_attack_right", "claw_attack_left", "roar_left", "roar_right"];
    switch (this.currentAIState) {
      case "idle":
        this.paceIdle(this.leftBound, this.rightBound, 7, 100);
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) < this.w * 12 && this.distY(p, this, player) < this.h * 2) {
          this.currentAIState = "follow";
        }
        break;
      case "follow":
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) < this.w * 0.8) {
          this.lookAt(player);
          if(this.randomCheck(30)){
             this.currentAIState = "roar";
        }
          else
          this.currentAIState = "claw_attack";
          break;
        }
        this.basicFollow(player, this.speed);
        break;

      case "claw_attack":
        if (!this.isAction(p, ["claw_attack_left", "claw_attack_right"]) && !this.bool["claw_attack"]) {
          this.bool["claw_attack"] = true;
          if (this.currentDir === "right") {
            this.moveRight(50);
          } else {
            this.moveLeft(50);
          }
          this.currentAIState = "acting";
        }
        break;

        case "roar":
        if (!this.isAction(p, ["roar_left", "roar_right"]) && !this.bool["roar"]) {
          this.bool["roar"] = true;
          this.currentAIState = "acting";
        }
        break;

      case "acting":
        if (!this.isAction(p, uninteruptActions) && !this.bool["claw_attack"] && !this.bool["roar"]) {
          this.currentAIState = "follow";
        } else {
          this.bool["claw_attack"] = false;
          this.bool["roar"] = false;
        }
        break;
    }
  }

  updateStateSprite(p, player) {
    console.log(this.currentDir);
    var movementActions = ["idle_right", "idle_left", "walk_left", "walk_right", "run_left", "run_right"];
    var uninteruptActions = ["roar_right", "roar_left", "claw_attack_right", "claw_attack_left"];

    if (this.bool["claw_attack"]) {
      this.addAction(p, "claw_attack_" + this.currentDir, [], movementActions);
    } else if( this.bool["roar"]){
      this.addAction(p, "roar_" + this.currentDir, [], movementActions);
    }

    if( Math.abs(this.velocityX) > 2){
      this.addAction(p,"run_" + this.currentDir, uninteruptActions, movementActions);
    } else if (Math.abs(this.velocityX) > 0.1) {
      this.addAction(p, "walk_" + this.currentDir, uninteruptActions, movementActions);
    } else if (this.currentAIState !== "dead") {
      this.addAction(p, "idle_" + this.currentDir, uninteruptActions, movementActions);
    } else if (!this.bool["dead"]) {
      this.addAction(p, "die_" + this.currentDir, [], movementActions);
      this.bool["dead"] = true;
    }
  }

  apply(p, passIn) {
    this.detectDamage(p, passIn.hit, passIn.player);
    this.applyPhysics(p, passIn.collision);
    this.applyAllStates(p, passIn.player);
    this.updateMovement(p);
  }
}
