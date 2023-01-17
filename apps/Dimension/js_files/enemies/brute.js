import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";
import { KnockbackAttack } from "../attack_boxes/knockback_attack.js";

export class Brute extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.health = health;
    this.hit = false;
    this.health = 1000;
    this.hitTimer = 0;
    this.runSpeed = 10;
    this.currentDir = "left";
    this.bool["sword_smash"] = false;
    this.bool["jump_smash"] = false;
  }

  getAction(p, action, x = this.x, y = this.y) {
    // 130 327
    switch (action) {
      case "idle_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -25, y + 2, 202, 316, this, 20)],
          body: [new MeshBox(p, x + -58, y + -6, 284, 344, this)],
          sprite: new LoadSet(this.set, "idle", 891, 660, x + -453, y + -291, 1, 1, 1, 6),
        };
      case "run_sword_on_shoulder_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -25, y + 2, 202, 316, this, 20)],
          body: [new MeshBox(p, x + -58, y + -6, 284, 344, this)],
          sprite: new LoadSet(this.set, "run_sword_on_shoulder", 891, 660, x + -453, y + -291, 1, 1, 1, 6),
        };
      case "sword_smash_left":
        return {
          complex: true,
          attack: {
            35: [new KnockbackAttack(p, x + -353, y + 19, 463, 316, this, 20, 100, -1, 100), new KnockbackAttack(p, x + -25, y + 2, 202, 316, this, 20, 100, -1, 100)],
            10: [ new KnockbackAttack(p, x + -25, y + 2, 202, 316, this, 20, 100, -1, 100)],
            20: [ new KnockbackAttack(p, x + -25, y + 2, 202, 316, this, 20, 100, -1, 100)],
            40: [ new KnockbackAttack(p, x + -25, y + 2, 202, 316, this, 20, 100, -1, 100)]
          },
          body: [new MeshBox(p, x + -58, y + -6, 284, 344, this)],
          sprite: new LoadSet(this.set, "sword_smash", 891, 660, x + -453, y + -291, 1, 1, 1, 4),
        };
      case "walk_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -39, y + 11, 238, 320, this, 20)],
          body: [new MeshBox(p, x + -58, y + -6, 287, 334, this)],
          sprite: new LoadSet(this.set, "walk", 891, 660, x + -453, y + -291, 1, 1, 1, 6),
        };
      case "hurt_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -39, y + 11, 238, 320, this, 20)],
          body: [new MeshBox(p, x + -58, y + -6, 287, 334, this)],
          sprite: new LoadSet(this.set, "hurt", 891, 660, x + -453, y + -291, 1, 1, 1, 6),
        };
      case "jump_smash_left":
        return {
          complex: true,
          attack: {
            43: [new KnockbackAttack(p, x + -331, y + -9, 441, 334, this, 20, 100, -1, 100)],
            10: [ new KnockbackAttack(p, x + -25, y + 2, 202, 316, this, 20, 100, -1, 100)],
            20: [ new KnockbackAttack(p, x + -25, y + 2, 202, 316, this, 20, 100, -1, 100)],
            40: [ new KnockbackAttack(p, x + -25, y + 2, 202, 316, this, 20, 100, -1, 100)]
          },
          body: [new MeshBox(p, x + -58, y + -6, 287, 334, this)],
          sprite: new LoadSet(this.set, "jump_smash", 891, 660, x + -453, y + -291, 1, 1, 1, 4),
        };
      case "throw_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -43, y + 3, 232, 318, this, 20)],
          body: [new MeshBox(p, x + -58, y + -6, 287, 334, this)],
          sprite: new LoadSet(this.set, "throw", 891, 660, x + -453, y + -291, 1, 1, 1, 6),
        };
      case "idle_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -50, y + 2, 220, 324, this, 20)],
          body: [new MeshBox(p, x + -69, y + -9, 274, 335, this)],
          sprite: new LoadSet(this.set, "idle", 891, 660, x + -295, y + -288, 1, 1, -1, 6),
        };
      case "walk_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -50, y + 2, 220, 324, this, 20)],
          body: [new MeshBox(p, x + -69, y + -9, 274, 335, this)],
          sprite: new LoadSet(this.set, "walk", 891, 660, x + -295, y + -288, 1, 1, -1, 6),
        };
      case "hurt_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -50, y + 2, 220, 324, this, 20)],
          body: [new MeshBox(p, x + -69, y + -9, 274, 335, this)],
          sprite: new LoadSet(this.set, "hurt", 891, 660, x + -295, y + -288, 1, 1, -1, 6),
        };
      case "throw_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -50, y + 2, 220, 324, this, 20)],
          body: [new MeshBox(p, x + -69, y + -9, 274, 335, this)],
          sprite: new LoadSet(this.set, "throw", 891, 660, x + -295, y + -288, 1, 1, -1, 6),
        };
      case "run_sword_on_shoulder_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -50, y + 2, 220, 324, this, 20)],
          body: [new MeshBox(p, x + -69, y + -9, 274, 335, this)],
          sprite: new LoadSet(this.set, "run_sword_on_shoulder", 891, 660, x + -295, y + -288, 1, 1, -1, 6),
        };
      case "sword_smash_right":
        return {
          complex: true,
          attack: {
            31: [new KnockbackAttack(p, x + 0, y + 0, 515, 329, this, 20, 100, 1, 10), new KnockbackAttack(p, x + -50, y + 2, 220, 324, this, 20, 100, -1, 100)],
            10: [ new KnockbackAttack(p, x + -25, y + 2, 202, 316, this, 20, 100, 1, 100)],
            20: [ new KnockbackAttack(p, x + -25, y + 2, 202, 316, this, 20, 100, 1, 100)],
            40: [ new KnockbackAttack(p, x + -25, y + 2, 202, 316, this, 20, 100, 1, 100)]
          },
          body: [new MeshBox(p, x + -69, y + -9, 274, 335, this)],
          sprite: new LoadSet(this.set, "sword_smash", 891, 660, x + -295, y + -288, 1, 1, -1, 4),
        };
      case "jump_smash_right":
        return {
          complex: true,
          attack: {
            42: [new KnockbackAttack(p, x + 0, y + 0, 508, 326, this, 20, 100, 1, 10)],
            10: [ new KnockbackAttack(p, x + -25, y + 2, 202, 316, this, 20, 100, 1, 100)],
            20: [ new KnockbackAttack(p, x + -25, y + 2, 202, 316, this, 20, 100, 1, 100)],
            30: [ new KnockbackAttack(p, x + -25, y + 2, 202, 316, this, 20, 100, 1, 100)]
          },
          body: [new MeshBox(p, x + -69, y + -9, 274, 335, this)],
          sprite: new LoadSet(this.set, "jump_smash", 891, 660, x + -295, y + -288, 1, 1, -1, 4),
        };
      case "die_right":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 891, 660, x + -295, y + -288, 1, 1, -1, 6),
        };
      case "die_left":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 891, 660, x + -457, y + -293, 1, 1, 1, 6),
        };
    }
  }

  updateStateActions(p, player) {
    console.log(this.lastAction);
    var uninteruptActions = ["sword_smash_left", "sword_smash_right", "jump_smash_left", "jump_smash_right"];
    switch (this.currentAIState) {
      case "idle":
        this.paceIdle(this.leftBound, this.rightBound, 2, 100);
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) < this.w * 12 && this.distY(p, this, player) < this.h * 2) {
          this.currentAIState = "follow";
        }
        break;
      case "follow":
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) < this.w * 3) {
          this.lookAt(player);
          this.currentAIState = "sword_smash";
          break;
        } else if (this.distX(p, this, player) < this.w * 5 && this.distX(p, this, player) > this.w * 4) {
          this.lookAt(player);
          if (this.randomCheck(10))this.currentAIState = "jump_smash";
          break;
        } else this.basicFollow(player, this.runSpeed * 1.5);
        break;

      case "sword_smash":
        if (!this.isAction(p, uninteruptActions) && !this.bool["sword_smash"]) {
          this.bool["sword_smash"] = true;
          this.lastAction = "sword_smash";
          this.currentAIState = "acting";
        }
        break;

      case "jump_smash":
        if (!this.isAction(p, uninteruptActions) && !this.bool["jump_smash"]) {
          if (this.lastAction === "jump_smash") {
            this.currentAIState = "follow";
          }
          this.lookAt(player);
          this.updateCurrentDir();
          this.bool["jump_smash"] = true;
          this.lastAction = "jump_smash";
          /*if (this.currentDir === "right") {
            this.moveRight(400);
            this.doJump(100);
          } else {
            this.moveLeft(400);
            this.doJump(100);
          }*/
          this.currentAIState = "acting";
        }
        break;

      case "acting":
        if (!this.isAction(p, uninteruptActions) && !this.bool["sword_smash"] && !this.bool["jump_smash"]) {
          this.currentAIState = "follow";
        } else {
          this.bool["sword_smash"] = false;
          this.bool["jump_smash"] = false;
        }
        break;
    }
  }

  updateStateSprite(p, player) {
    var movementActions = ["walk_left", "walk_right", "idle_left", "idle_right", "run_sword_on_shoulder_left", "run_sword_on_shoulder_right"];
    var uninteruptActions = ["sword_smash_left", "jump_smash_left", "jump_smash_right", "sword_smash_right"];

    if (this.bool["sword_smash"]) {
      this.addAction(p, "sword_smash_" + this.currentDir, [], movementActions);
    } else if (this.bool["jump_smash"]) {
      this.addAction(p, "jump_smash_" + this.currentDir, [], movementActions);
      if (this.currentDir === "right") {
        this.moveRight(300);
        this.doJump(100);
      } else {
        this.moveLeft(300);
        this.doJump(100);
      }
    }

    if (Math.abs(this.velocityX) >= this.runSpeed) {
      this.addAction(p, "run_sword_on_shoulder_" + this.currentDir, uninteruptActions, movementActions);
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
