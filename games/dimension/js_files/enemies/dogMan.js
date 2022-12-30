import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";

export class DogMan extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset;
    this.health = 300;
    this.speed = 18;
    this.bool["roar"] = false;
    this.bool["slash"] = false;
    this.bool["smash"] = false;
    this.lastAction;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
  }

  updateStateActions(p, player) {
    var attackActions = ["roar_left", "roar_right", "slash_left", "slash_right", "smash_left", "smash_right"];
    switch (this.currentAIState) {
      case "idle":
        this.paceIdle(this.leftBound, this.rightBound, 5, 100);
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) < this.w * 7 && this.distY(p, this, player) < this.h * 2) {
          this.currentAIState = "roar";
        }
        break;
      case "follow":
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) < this.w && player.y + player.h / 2 < this.y + this.h / 2) {
          this.currentAIState = "slash";
          break;
        } else if (this.distX(p, this, player) < this.w * 0.8) {
          this.currentAIState = "smash";
          break;
        }
        this.basicFollow(player, this.speed);
        break;
      case "roar":
        if (!this.isAction(p, ["roar_left", "roar_right"]) && !this.bool["roar"]) {
          this.lastAction = "roar";
          this.bool["roar"] = true;
          this.currentAIState = "acting";
        }
        break;
      case "slash":
        if (!this.isAction(p, ["slash_left", "slash_right"]) && !this.bool["slash"]) {
          this.lastAction = "slash";
          this.bool["slash"] = true;
          this.currentAIState = "acting";
        }
        break;
      case "smash":
        if (!this.isAction(p, ["smash_left", "smash_right"]) && !this.bool["smash"]) {
          this.lastAction = "smash";
          this.bool["smash"] = true;
          this.currentAIState = "acting";
        }
        break;
      case "acting":
        if (!this.isAction(p, attackActions) && !(this.bool["roar"] && !this.bool["slash"] && !this.bool["smash"])) {
          if (this.lastAction === "smash") {
            if (this.randomCheck(10)) {
              this.currentAIState = "roar";
            } else {
              this.currentAIState = "follow";
            }
          } else if (this.lastAction === "roar" || this.lastAction === "slash") {
            this.currentAIState = "follow";
          }
        } else {
          this.bool["roar"] = false;
          this.bool["slash"] = false;
          this.bool["smash"] = false;
        }
        break;
    }
  }

  //Enemy Width: 118
  //Enemy Height: 230
  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
      case "idle_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -39, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "idle", 1016, 1064, x + -156, y + -165, 0.41, 0.41, 1, 4),
        };
      case "bite_left":
        return {
          complex: true,
          attack: {
            21: [new GeneralAttack(p, x + -164, y + 74, 124, 108, this, 20)],
          },
          body: [new MeshBox(p, x + -39, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "bite", 1016, 1064, x + -156, y + -165, 0.41, 0.41, 1, 4),
        };
      case "charge_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -38, y + -7, 157, 234, this, 20)],
          body: [new MeshBox(p, x + -39, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "charge", 1016, 1064, x + -156, y + -165, 0.41, 0.41, 1, 5),
        };
      case "punch_left":
        return {
          complex: true,
          attack: {
            29: [new GeneralAttack(p, x + -137, y + 36, 156, 189, this, 20)],
          },
          body: [new MeshBox(p, x + -39, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "punch", 1016, 1064, x + -156, y + -165, 0.41, 0.41, 1, 5),
        };
      case "howl_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -39, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "roar", 1016, 1064, x + -156, y + -165, 0.41, 0.41, 1, 5),
        };
      case "roar_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -39, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "roar", 1016, 1064, x + -156, y + -165, 0.41, 0.41, 1, 5),
        };
      case "run_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -39, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "run", 1016, 1064, x + -156, y + -165, 0.41, 0.41, 1, 5),
        };
      case "run_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -39, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "run", 1016, 1064, x + -156, y + -165, 0.41, 0.41, -1, 5),
        };
      case "run_claws_out_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -39, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "run_claws_out", 1016, 1064, x + -156, y + -165, 0.41, 0.41, -1, 5),
        };
      case "run_claws_out_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -39, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "run_claws_out", 1016, 1064, x + -156, y + -165, 0.41, 0.41, 1, 5),
        };
      case "slash_left":
        return {
          complex: true,
          attack: {
            24: [new GeneralAttack(p, x + -94, y + -102, 132, 332, this, 20)],
          },
          body: [new MeshBox(p, x + -39, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "slash", 1016, 1064, x + -156, y + -165, 0.41, 0.41, 1, 4),
        };
      case "slash_right":
        return {
          complex: true,
          attack: {
            24: [new GeneralAttack(p, x + 32, y + -106, 132, 332, this, 20)],
          },
          body: [new MeshBox(p, x + -30, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "slash", 1016, 1064, x + -181, y + -167, 0.41, 0.41, -1, 4),
        };
      case "smash_right":
        return {
          complex: true,
          attack: {
            33: [new GeneralAttack(p, x + 55, y + -9, 156, 237, this, 20)],
          },
          body: [new MeshBox(p, x + -30, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "smash", 1016, 1064, x + -181, y + -167, 0.41, 0.41, -1, 4),
        };
      case "smash_left":
        return {
          complex: true,
          attack: {
            33: [new GeneralAttack(p, x + -120, y + -8, 156, 237, this, 20)],
          },
          body: [new MeshBox(p, x + -30, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "smash", 1016, 1064, x + -147, y + -167, 0.41, 0.41, 1, 4),
        };
      case "walk_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -30, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "walk", 1016, 1064, x + -147, y + -167, 0.41, 0.41, 1, 6),
        };
      case "walk_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -30, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "walk", 1016, 1064, x + -168, y + -168, 0.41, 0.41, -1, 6),
        };
      case "whacked_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -30, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "whacked", 1016, 1064, x + -168, y + -168, 0.41, 0.41, -1, 6),
        };
      case "whacked_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -30, y + -6, 156, 233, this)],
          sprite: new LoadSet(this.set, "whacked", 1016, 1064, x + -153, y + -165, 0.41, 0.41, 1, 6),
        };
      case "idle_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 5, y + -4, 156, 233, this)],
          sprite: new LoadSet(this.set, "idle", 1016, 1064, x + -136, y + -165, 0.41, 0.41, -1, 6),
        };
      case "charge_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 0, y + 0, 161, 231, this, 20)],
          body: [new MeshBox(p, x + 5, y + -4, 156, 233, this)],
          sprite: new LoadSet(this.set, "charge", 1016, 1064, x + -136, y + -165, 0.41, 0.41, -1, 6),
        };
      case "punch_right":
        return {
          complex: true,
          attack: {
            34: [new GeneralAttack(p, x + 106, y + 44, 156, 182, this, 20)],
          },
          body: [new MeshBox(p, x + 5, y + -4, 156, 233, this)],
          sprite: new LoadSet(this.set, "punch", 1016, 1064, x + -136, y + -165, 0.41, 0.41, -1, 6),
        };
      case "roar_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -235, y + -121, 746, 432, this, 20)],
          body: [new MeshBox(p, x + 5, y + -4, 156, 233, this)],
          sprite: new LoadSet(this.set, "roar", 1016, 1064, x + -136, y + -165, 0.41, 0.41, -1, 6),
        };
      case "bite_right":
        return {
          complex: true,
          attack: {
            24: [new GeneralAttack(p, x + 160, y + 71, 164, 128, this, 20)],
          },
          body: [new MeshBox(p, x + 5, y + -4, 156, 233, this)],
          sprite: new LoadSet(this.set, "bite", 1016, 1064, x + -136, y + -165, 0.41, 0.41, -1, 4),
        };
      case "jump_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 5, y + -4, 156, 233, this)],
          sprite: new LoadSet(this.set, "jump", 1016, 1064, x + -136, y + -165, 0.41, 0.41, -1, 6),
        };
      case "jump_smash_right":
        return {
          complex: true,
          attack: {
            48: [new GeneralAttack(p, x + 81, y + -4, 161, 233, this, 20)],
          },
          body: [new MeshBox(p, x + 5, y + -4, 156, 233, this)],
          sprite: new LoadSet(this.set, "jump_smash", 1016, 1064, x + -136, y + -165, 0.41, 0.41, -1, 6),
        };
      case "jump_smash_left":
        return {
          complex: true,
          attack: {
            48: [new GeneralAttack(p, x + -109, y + 3, 161, 233, this, 20)],
          },
          body: [new MeshBox(p, x + -38, y + -3, 156, 233, this)],
          sprite: new LoadSet(this.set, "jump_smash", 1016, 1064, x + -148, y + -162, 0.41, 0.41, 1, 6),
        };
      case "jump_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -38, y + -3, 156, 233, this)],
          sprite: new LoadSet(this.set, "jump", 1016, 1064, x + -148, y + -162, 0.41, 0.41, 1, 6),
        };
      case "die_left":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 1016, 1064, x + -148, y + -162, 0.41, 0.41, 1, 6),
        };
      case "die_right":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 1016, 1064, x + -148, y + -162, 0.41, 0.41, -1, 6),
        };
    }
  }

  updateStateMesh(p, player) {
    return {};
  }

  updateStateSprite(p, player) {
    var movementActions = ["walk_left", "walk_right", "idle_left", "idle_right", "run_claws_out_left", "run_claws_out_right", "charge_left", "charge_right"];
    var attackActions = ["roar_left", "roar_right", "slash_left", "slash_right", "smash_left", "smash_right"];

    if (this.bool["roar"]) {
      this.addAction(p, "roar_" + this.currentDir, [], movementActions);
    } else if (this.bool["slash"]) {
      this.addAction(p, "slash_" + this.currentDir, [], movementActions);
    } else if (this.bool["smash"]) {
      this.addAction(p, "smash_" + this.currentDir, [], movementActions);
    } else if (this.bool["jump_smash"]) {
      this.addAction(p, "jump_smash_" + this.currentDir, [], movementActions);
    } else if (this.bool["bite"]) {
      this.addAction(p, "bite_" + this.currentDir, [], movementActions);
    }

    if (this.currentAIState === "follow") {
      this.addAction(p, "run_claws_out_" + this.currentDir, attackActions, movementActions);
    } else if (Math.abs(this.velocityX) > 0.1) {
      this.addAction(p, "walk_" + this.currentDir, attackActions, movementActions);
    } else if (this.currentAIState !== "dead") {
      this.addAction(p, "idle_" + this.currentDir, attackActions, movementActions);
    } else if (!this.bool["dead"]) {
      this.addAction(p, "die_" + this.currentDir, [], movementActions);
      this.bool["dead"] = true;
    }
  }

  apply(p, passIn) {
    console.log(this.wallhit);
    this.detectDamage(p, passIn.hit, passIn.player);
    this.applyPhysics(p, passIn.collision);
    this.applyAllStates(p, passIn.player);
    this.updateMovement(p);
  }
}
