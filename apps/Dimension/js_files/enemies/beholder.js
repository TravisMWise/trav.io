import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";
import { KnockbackAttack } from "../attack_boxes/knockback_attack.js";
import { ElecProjectile } from "../projectiles/elecProjectile.js";

export class Beholder extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset.monster;
    this.setProjectile = loadset.projectile;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.bool["eye_attack"] = false;
    this.bool["projectile"] = false;
    this.bool["bite"] = false;
    this.speed = 5;
  }

  getProjectile(p, projectiles, passIn = {}) {
    switch (projectiles) {
      case "ball_left":
        return {
          projectile: new ElecProjectile(p, this.x - 55, this.y + 7, 43, 44, 0, this.setProjectile, "left"),
          delay: 25,
        };
      case "ball_right":
        return {
          projectile: new ElecProjectile(p, this.x + this.w + 55, this.y + 7, 43, 44, 0, this.setProjectile, "right"),
          delay: 25,
        };
      default:
        return {};
    }
  }
  s;

  //Enemy Width: 43
  //Enemy Height: 48

  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
      case "idle_left":
        return {
          complex: false,
          attack: [new KnockbackAttack(p, x + 0, y + 0, 43, 48, this, 20, 10, 1, 0)],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "idle", 985, 743, x + -30, y + -20, 0.1, 0.1, 1, 6),
        };
      case "idle_right":
        return {
          complex: false,
          attack: [new KnockbackAttack(p, x + 0, y + 0, 43, 48, this, 20, 10, -1, 0)],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "idle", 985, 743, x + -21, y + -20, 0.1, 0.1, -1, 6),
        };
      case "eyes_forward_transition_from_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 0, y + 0, 43, 48, this, 20)],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "eyes_forward_transition_from", 985, 743, x + -21, y + -20, 0.1, 0.1, -1, 6),
        };
      case "eyes_forward_transition_from_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 0, y + 0, 43, 48, this, 20)],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "eyes_forward_transition_from", 985, 743, x + -24, y + -23, 0.1, 0.1, 1, 6),
        };
      case "eyes_forward_transition_to_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 0, y + 0, 43, 48, this, 20)],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "eyes_forward_transition_to", 985, 743, x + -24, y + -23, 0.1, 0.1, 1, 6),
        };
      case "eyes_forward_transition_to_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 0, y + 0, 43, 48, this, 20)],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "eyes_forward_transition_to", 985, 743, x + -22, y + -20, 0.1, 0.1, -1, 6),
        };
      case "eyes_attack_right":
        return {
          complex: true,
          attack: {
            40: [new KnockbackAttack(p, x + 43, y + 0, 43, 48, this, 20, 10, -1, 0), new GeneralAttack(p, x + 0, y + 0, 43, 48, this, 20, 10, -1, 0)],
          },
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "eye_attack", 985, 743, x + -22, y + -20, 0.1, 0.1, -1, 6),
        };
      case "eyes_attack_left":
        return {
          complex: true,
          attack: {
            40: [new GeneralAttack(p, x + 0, y + 0, 43, 48, this, 20, 10, 1, 0), new GeneralAttack(p, x + -43, y + -2, 43, 48, this, 20, 10, 1, 0)],
          },
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "eye_attack", 985, 743, x + -31, y + -29, 0.1, 0.1, 1, 6),
        };
      case "idle_eyes_forward_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "idle_eyes_forward", 985, 743, x + -22, y + -20, 0.1, 0.1, 1, 6),
        };
      case "idle_eyes_forward_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "idle_eyes_forward", 985, 743, x + -22, y + -20, 0.1, 0.1, -1, 6),
        };
      case "look_down_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "look_down", 985, 743, x + -22, y + -20, 0.1, 0.1, -1, 6),
        };
      case "look_down_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "look_down", 985, 743, x + -31, y + -21, 0.1, 0.1, 1, 6),
        };
      case "look_up_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "look_up", 985, 743, x + -31, y + -21, 0.1, 0.1, 1, 6),
        };
      case "look_up_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "look_up", 985, 743, x + -19, y + -23, 0.1, 0.1, -1, 6),
        };
      case "look_up_idle_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "look_up_idle", 985, 743, x + -19, y + -23, 0.1, 0.1, -1, 6),
        };
      case "look_up_idle_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "look_up_idle", 985, 743, x + -33, y + -26, 0.1, 0.1, 1, 6),
        };
      case "whacked_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "whacked", 985, 743, x + -33, y + -26, 0.1, 0.1, 1, 6),
        };
      case "whacked_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "whacked", 985, 743, x + -19, y + -26, 0.1, 0.1, -1, 6),
        };
      case "bite_right":
        return {
          complex: true,
          attack: {
            32: [new GeneralAttack(p, x + 0, y + 0, 70, 35, this, 20, 20, -1, 1)],
          },
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "bite", 985, 743, x + -19, y + -26, 0.1, 0.1, -1, 6),
        };
      case "bite_left":
        return {
          complex: true,
          attack: {
            32: [new KnockbackAttack(p, x + -19, y + -2, 62, 51, this, 20, 20, 1, 1)],
          },
          body: [new MeshBox(p, x + 0, y + 0, 43, 48, this)],
          sprite: new LoadSet(this.set, "bite", 985, 743, x + -27, y + -18, 0.1, 0.1, 1, 6),
        };
      case "dead_pose_left":
        return {
          complex: true,
          attack: {},
          body: [],
          sprite: new LoadSet(this.set, "dead_pose", 985, 743, x + -27, y + -18, 0.1, 0.1, 1, 6),
        };
      case "dead_pose_right":
        return {
          complex: true,
          attack: {},
          body: [],
          sprite: new LoadSet(this.set, "dead_pose", 985, 743, x + -27, y + -18, 0.1, 0.1, -1, 6),
        };
    }
  }

  updateStateMesh(p, player) {
    return {};
  }

  updateStateActions(p, player) {
    var attackActions = ["bite_right", "bite_left", "eyes_attack_right", "eyes_attack_left", "eyes_forward_transition_to_left", "eyes_forward_transition_to_right"];
    switch (this.currentAIState) {
      case "idle":
        this.paceIdle(this.leftBound, this.rightBound, 2, 100);
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) < this.w * 7 && this.distY(p, this, player) < this.h * 2) {
          this.currentAIState = "follow";
        }
        break;

      case "follow":
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) > 15 && this.distX(p, this, player) < 100) {
          this.currentAIState = "projectile";
          break;
        } else if (this.distX(p, this, player) < this.w && player.y + player.h / 2 < this.y + this.h / 2) {
          this.currentAIState = "eye_attack";
          break;
        } else if (this.distX(p, this, player) < this.w * 0.8) {
          this.currentAIState = "bite";
          break;
        }
        if (this.currentDir === "right") this.airFollow(p, { x: player.x + 20, y: player.y, w: 0, h: 0 }, this.speed);
        else this.airFollow(p, { x: player.x - 20, y: player.y, w: 0, h: 0 }, this.speed);
        break;

      case "eye_attack":
        if (!this.isAction(p, ["eyes_attack_left", "eyes_attack_right"]) && !this.bool["eye_attack"]) {
          this.lastAction = "eye_attack";
          this.bool["eye_attack"] = true;
          this.currentAIState = "acting";
        }
        break;

      case "bite":
        if (!this.isAction(p, ["bite_left", "bite_right"]) && !this.bool["bite"]) {
          this.lastAction = "bite";
          this.bool["bite"] = true;
          this.currentAIState = "acting";
        }
        break;

      case "projectile":
        if (!this.bool["projectile"]) {
          this.lastAction = "projectile";
          this.bool["projectile"] = true;

          this.lookAt(player);
          if (this.movingLeft === true) var currentDir = "left";
          else var currentDir = "right";

          if (this.getActionStage("eyes_forward_transition_to_" + currentDir) >= 26 && this.getActionStage("eyes_forward_transition_to_" + currentDir) <= 30) {
            this.angle = this.targetAngle(player, this);
            this.shoot(p, "ball_" + currentDir, ["ball_left", "ball_right"]);
            this.angle = this.angle + 10;
            this.shoot(p, "ball_" + currentDir, ["ball_left", "ball_right"]);
          }
        }

        if (this.health <= 0) this.currentAIState = "dead";
        else this.currentAIState = "acting";
        break;

      case "acting":
        if (!this.isAction(p, attackActions) && !(this.bool["eye_attack"] && !this.bool["projectile"] && !this.bool["bite"])) {
          if (this.lastAction === "eye_attack") {
            if (this.randomCheck(10)) {
              this.currentAIState = "follow";
            } else {
              this.currentAIState = "follow";
            }
          } else if (this.lastAction === "bite" || this.lastAction === "projectile") {
            this.currentAIState = "follow";
          }
        }
        break;
    }
  }

  updateStateSprite(p, player) {
    //var movementActions = ["idle_left", "idle_right"];
    var attackActions = ["bite_right", "bite_left", "eye_attack_right", "eye_attack_left", "eyes_forward_transition_to_left", "eyes_forward_transition_to_right", "idle_right", "idle_left"];

    if (this.bool["bite"]) {
      this.addAction(p, "bite_" + this.currentDir, [], []);
    }

    if (this.currentAIState === "projectile") {
      this.addAction(p, "eyes_forward_transition_to_" + this.currentDir, attackActions);
    } else if (Math.abs(this.velocityX) > 0.1) {
      this.addAction(p, "idle_" + this.currentDir, attackActions);
    } else if (this.currentAIState !== "dead") {
      this.addAction(p, "idle_" + this.currentDir, attackActions);
    } else if (!this.bool["dead"]) {
      this.addAction(p, "die_pose_" + this.currentDir, [], attackActions);
      this.bool["dead"] = true;
    }

    this.addAction(p, "idle_" + this.currentDir, [], []);
  }

  apply(p, passIn) {
    console.log(this.currentAIState);
    this.detectDamage(p, passIn.hit, passIn.player);
    this.applyBasicPhysics(p, passIn.collision);
    this.applyAllStates(p, passIn.player);
    this.updateMovement(p);
  }
}
