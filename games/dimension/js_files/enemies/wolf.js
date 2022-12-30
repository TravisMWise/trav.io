import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";
import { KnockbackAttack } from "../attack_boxes/knockback_attack.js";

export class Wolf extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset.wolf;
    this.biteSound = loadset.wolfBite;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.health = 100;
    this.hit = false;
    this.hitTimer = 0;
    this.speed = 16;
    this.runSpeed = 10;
    this.bool["bite"] = false;
    this.sit = false;
    this.strike = false;
  }

  //Enemy Width: 62
  //Enemy Height: 106
  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
      case "idle_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + -50, this.y + -11, 45, 62, this), new MeshBox(p, this.x + -5, this.y + -8, 67, 114, this),],
          sprite: new LoadSet(this.set, "idle", 836, 703, this.x + -78, this.y + -36, 0.23, 0.23, 1, 6),
        };
      case "run_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + -50, this.y + -11, 45, 62, this), new MeshBox(p, this.x + -5, this.y + -8, 67, 114, this),],
          sprite: new LoadSet(this.set, "run", 836, 703, this.x + -78, this.y + -36, 0.23, 0.23, 1, 2),
        };
      case "walk_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + -50, this.y + -11, 45, 62, this), new MeshBox(p, this.x + -5, this.y + -8, 67, 114, this),],
          sprite: new LoadSet(this.set, "walk", 836, 703, this.x + -78, this.y + -36, 0.23, 0.23, 1, 6),
        };
      case "stand_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + -50, this.y + -11, 45, 62, this), new MeshBox(p, this.x + -5, this.y + -8, 67, 114, this),],
          sprite: new LoadSet(this.set, "stand", 836, 703, this.x + -78, this.y + -36, 0.23, 0.23, 1, 6),
        };
      case "sitting_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + -19, this.y + -3, 87, 109, this),],
          sprite: new LoadSet(this.set, "sitting", 836, 703, this.x + -78, this.y + -36, 0.23, 0.23, 1, 6),
        };
      case "sit_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + -19, this.y + -3, 87, 109, this),],
          sprite: new LoadSet(this.set, "sit", 836, 703, this.x + -78, this.y + -36, 0.23, 0.23, 1, 6),
        };
      case "jump_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + -28, this.y + -3, 94, 109, this),],
          sprite: new LoadSet(this.set, "jump", 836, 703, this.x + -78, this.y + -36, 0.23, 0.23, 1, 6),
        };
      case "bite_left":
        return {
          complex: true,
          sound: this.biteSound,
          attack: {
            10: [new KnockbackAttack(p, this.x + -82, this.y + 0, 65, 49, this, 20, 50, -1, 50),],
          },
          body: [new MeshBox(p, this.x + 1, this.y + 6, 67, 97, this),],
          sprite: new LoadSet(this.set, "bite", 836, 703, this.x + -78, this.y + -36, 0.23, 0.23, 1, 2),
        };
      case "howl_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + -24, this.y + -12, 92, 117, this),],
          sprite: new LoadSet(this.set, "howl", 836, 703, this.x + -78, this.y + -36, 0.23, 0.23, 1, 6),
        };
      case "die_left":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 836, 703, this.x + -78, this.y + -36, 0.23, 0.23, 1, 6),
        };
      case "die_right":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 836, 703, this.x + -52, this.y + -36, 0.23, 0.23, -1, 6),
        };
      case "idle_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 65, this.y + -6, 47, 61, this), new MeshBox(p, this.x + 0, this.y + 0, 62, 106, this),],
          sprite: new LoadSet(this.set, "idle", 836, 703, this.x + -52, this.y + -36, 0.23, 0.23, -1, 6),
        };
      case "run_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 65, this.y + -6, 47, 61, this), new MeshBox(p, this.x + 0, this.y + 0, 62, 106, this),],
          sprite: new LoadSet(this.set, "run", 836, 703, this.x + -52, this.y + -36, 0.23, 0.23, -1, 2),
        };
      case "walk_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 65, this.y + -6, 47, 61, this), new MeshBox(p, this.x + 0, this.y + 0, 62, 106, this),],
          sprite: new LoadSet(this.set, "walk", 836, 703, this.x + -52, this.y + -36, 0.23, 0.23, -1, 6),
        };
      case "stand_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 65, this.y + -6, 47, 61, this), new MeshBox(p, this.x + 0, this.y + 0, 62, 106, this),],
          sprite: new LoadSet(this.set, "stand", 836, 703, this.x + -52, this.y + -36, 0.23, 0.23, -1, 6),
        };
      case "sitting_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + -6, this.y + 0, 88, 106, this),],
          sprite: new LoadSet(this.set, "sitting", 836, 703, this.x + -52, this.y + -36, 0.23, 0.23, -1, 6),
        };
      case "sit_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + -6, this.y + 0, 88, 106, this),],
          sprite: new LoadSet(this.set, "sit", 836, 703, this.x + -52, this.y + -36, 0.23, 0.23, -1, 6),
        };
      case "jump_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + -6, this.y + 0, 88, 106, this),],
          sprite: new LoadSet(this.set, "jump", 836, 703, this.x + -52, this.y + -36, 0.23, 0.23, -1, 6),
        };
      case "bite_right":
        return {
          complex: true,
          sound: this.biteSound,
          attack: {
            10: [new KnockbackAttack(p, this.x + 72, this.y + 5, 65, 45, this, 20, 50, 1, 50),],
          },
          body: [new MeshBox(p, this.x + 0, this.y + 1, 65, 110, this),],
          sprite: new LoadSet(this.set, "bite", 836, 703, this.x + -52, this.y + -36, 0.23, 0.23, -1, 2),
        };
      case "howl_right":
        return {
          complex: true,
          attack: {
          },
          body: [new MeshBox(p, this.x + -4, this.y + -26, 69, 133, this),],
          sprite: new LoadSet(this.set, "howl", 836, 703, this.x + -52, this.y + -36, 0.23, 0.23, -1, 6),
        };
    }

  }

  updateStateMesh(p, player) {
    return {};
  }

  updateStateActions(p, player) {
    var uninteruptActions = ["bite_right", "bite_left"];
    switch (this.currentAIState) {

      case "idle":
        this.paceIdle(this.leftBound, this.rightBound, 2, 100);
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) < this.w * 17 && (this.distY(p, this, player) < this.h * 2)) this.currentAIState = "follow";
        break;

      case "follow":
        this.basicFollow(player, this.speed);
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) > this.w * 20) this.currentAIState = "idle";
        else if (this.distX(p, this, player) < this.w * 2.5 - Math.abs(player.velocityX) * 6 && this.distX(p, this, player) > this.w - Math.abs(player.velocityX) * 6 && (this.distY(p, this, player) < this.h / 3)) this.currentAIState = "bite";
        else if (this.distX(p, this, player) <= this.w) this.currentAIState = "focus";
        break;
      case "focus":
        if (this.currentDir === "right") this.moveRight(player.speed);
        else this.moveLeft(player.speed);
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) > this.w * 20) this.currentAIState = "idle";
        else if (this.distX(p, this, player) < this.w * 17 && this.distX(p, this, player) > this.w * 1.3) this.currentAIState = "follow";
        break;
      case "bite":
        if (!this.isAction(p, ["bite_left", "bite_right"]) && !this.bool["bite"]) {
          this.bool["bite"] = true;
          this.currentAIState = "acting";
        }
        break;

      case "acting":
        if (!this.isAction(p, uninteruptActions) && !(this.bool["bite"])) {
          this.currentAIState = "follow";
        } else {
          this.bool["bite"] = false;
        }
        break;
    }
  }

  updateStateSprite(p, player) {
    var movementActions = ["walk_left", "walk_right", "idle_left", "idle_right", "run_left", "run_right"];
    var uninteruptActions = ["bite_right", "bite_left"];

    if (this.bool["bite"]) {
      this.addAction(p, "bite_" + this.currentDir, [], movementActions);
    }

    if (Math.abs(this.velocityX) > 2) {
      this.addAction(p, "run_" + this.currentDir, uninteruptActions, movementActions);
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
