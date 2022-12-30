import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";
import { KnockbackAttack } from "../attack_boxes/knockback_attack.js";

export class Knights extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset;
    this.health = 600;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.health = health;
    this.hit = false;
    this.hitTimer = 0;
    this.runSpeed = 10;
    this.bool["attack_one"] = false;
    this.bool["attack_two"] = false;
    this.bool["attack_three"] = false;
    this.bool["attack_four"] = false;
  }

  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
      case "idle_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "idle", 982, 733, this.x + -169, this.y + -71, 0.35, 0.35, 1, 6),
        };
      case "idle_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "idle", 982, 733, this.x + -117, this.y + -69, 0.35, 0.35, -1, 6),
        };
      case "run_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "run", 982, 733, this.x + -168, this.y + -71, 0.35, 0.35, 1, 6),
        };
      case "run_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "run", 982, 733, this.x + -118, this.y + -69, 0.35, 0.35, -1, 6),
        };
      case "defend_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "defend", 982, 733, this.x + -168, this.y + -71, 0.35, 0.35, 1, 6),
        };
      case "shieldup_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "defend", 982, 733, this.x + -168, this.y + -71, 0.35, 0.35, 1, 6),
        };
      case "shield_down_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "defend", 982, 733, this.x + -168, this.y + -71, 0.35, 0.35, 1, 6),
        };
      case "defend_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "defend", 982, 733, this.x + -117, this.y + -68, 0.35, 0.35, -1, 6),
        };
      case "shieldup_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "defend", 982, 733, this.x + -117, this.y + -68, 0.35, 0.35, -1, 6),
        };
      case "shield_down_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "defend", 982, 733, this.x + -117, this.y + -68, 0.35, 0.35, -1, 6),
        };
      case "walk_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "walk", 982, 733, this.x + -166, this.y + -71, 0.35, 0.35, 1, 6),
        };
      case "walk_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "walk", 982, 733, this.x + -118, this.y + -71, 0.35, 0.35, -1, 6),
        };
      case "hurt_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "hurt", 982, 733, this.x + -169, this.y + -71, 0.35, 0.35, 1, 8),
        };
      case "hurt_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "hurt", 982, 733, this.x + -118, this.y + -71, 0.35, 0.35, -1, 8),
        };
      case "die_left":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 982, 733, this.x + -168, this.y + -69, 0.35, 0.35, 1, 8),
        };
      case "die_right":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 982, 733, this.x + -115, this.y + -69, 0.35, 0.35, -1, 8),
        };
      case "attack_two_left":
        return {
          complex: true,
          attack: {
            24: [new GeneralAttack(p, this.x + -137, this.y + 20, 89, 158, this, 20)],
          },
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "attack_two", 982, 733, this.x + -169, this.y + -69, 0.35, 0.35, 1, 4),
        };
      case "attack_two_right":
        return {
          complex: true,
          attack: {
            24: [new GeneralAttack(p, this.x + 105, this.y + 17, 89, 158, this, 20)],
          },
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "attack_two", 982, 733, this.x + -117, this.y + -71, 0.35, 0.35, -1, 4),
        };
      case "attack_one_left":
        return {
          complex: true,
          attack: {
            30: [new GeneralAttack(p, this.x + -114, this.y + 3, 87, 172, this, 90)],
          },
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "attack_one", 982, 733, this.x + -171, this.y + -68, 0.35, 0.35, 1, 6),
        };
      case "attack_one_right":
        return {
          complex: true,
          attack: {
            30: [new GeneralAttack(p, this.x + 84, this.y + 2, 87, 172, this, 90)],
          },
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "attack_one", 982, 733, this.x + -118, this.y + -71, 0.35, 0.35, -1, 6),
        };
      case "attack_four_left":
        return {
          complex: true,
          attack: {
            29: [new GeneralAttack(p, this.x + -169, this.y + 87, 168, 42, this, 20)],
          },
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "attack_four", 982, 733, this.x + -168, this.y + -71, 0.35, 0.35, 1, 4),
        };
      case "attack_four_right":
        return {
          complex: true,
          attack: {
            29: [new GeneralAttack(p, this.x + 59, this.y + 86, 168, 42, this, 20)],
          },
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "attack_four", 982, 733, this.x + -117, this.y + -71, 0.35, 0.35, -1, 4),
        };
      case "attack_three_left":
        return {
          complex: true,
          attack: {
            30: [new GeneralAttack(p, this.x + -114, this.y + 3, 87, 172, this, 90)],
          },
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "attack_one", 982, 733, this.x + -171, this.y + -68, 0.35, 0.35, 1, 6),
        };
      case "attack_three_right":
        return {
          complex: true,
          attack: {
            30: [new GeneralAttack(p, this.x + 84, this.y + 2, 87, 172, this, 90)],
          },
          body: [new MeshBox(p, this.x + 0, this.y + 0, 58, 172, this)],
          sprite: new LoadSet(this.set, "attack_one", 982, 733, this.x + -118, this.y + -71, 0.35, 0.35, -1, 6),
        };
    }
  }

  updateStateActions(p, player) {
    // console.log(this.lastAction);
    var uninteruptActions = ["attack_one_left", "attack_one_right", "attack_two_left", "attack_two_right", "attack_three_left", "attack_three_right", "attack_four_left", "attack_four_right"];
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
        else if (this.distX(p, this, player) < this.w * 2) {
          this.lookAt(player);
          if (this.randomCheck(30)) this.currentAIState = "combo";
          else this.currentAIState = "attack_one";
          break;
        }
        this.basicFollow(player, 4);
        break;

      case "attack_one":
        if (!this.isAction(p, ["attack_one_left", "attack_one_right"]) && !this.bool["attack_one"]) {
          this.bool["attack_one"] = true;
          this.currentAIState = "acting";
        }
        break;

      case "attack_three":
        if (!this.isAction(p, uninteruptActions) && !this.bool["attack_three"]) {
          this.lookAt(player);
          this.updateCurrentDir();
          this.bool["attack_three"] = true;
          this.lastAction = "attack_three";
          if (this.currentDir === "right") {
            this.moveRight(200);
            this.doJump(100);
          } else {
            this.moveLeft(200);
            this.doJump(100);
          }
          this.currentAIState = "acting";
        }
        break;

      case "attack_four":
        if (!this.isAction(p, uninteruptActions) && !this.bool["attack_four"]) {
          this.bool["attack_four"] = true;
          this.lastAction = "attack_four";
          this.lookAt(player);
          this.updateCurrentDir();
          if (this.currentDir === "right") this.moveRight(100);
          else this.moveLeft(100);
          this.currentAIState = "acting";
        }
        break;

      case "combo":
        // attack 2-4-3
        if (!this.isAction(p, uninteruptActions) && !this.bool["attack_two"]) {
          this.bool["attack_two"] = true;
          this.lastAction = "attack_two";
          this.currentAIState = "acting";
        }
        break;

      case "acting":
        if (!this.isAction(p, uninteruptActions) && !this.bool["attack_one"] && !this.bool["attack_two"] && !this.bool["attack_three"] && !this.bool["attack_four"]) {
          if (this.lastAction === "attack_two") this.currentAIState = "attack_four";
          else if (this.lastAction === "attack_four") this.currentAIState = "attack_three";
          else this.currentAIState = "follow";
        } else {
          this.bool["attack_one"] = false;
          this.bool["attack_three"] = false;
          this.bool["attack_two"] = false;
          this.bool["attack_four"] = false;
        }
        break;
    }
  }

  updateStateSprite(p, player) {
    var movementActions = ["walk_left", "walk_right", "idle_left", "idle_right", "run_left", "run_right"];
    var uninteruptActions = ["attack_one_left", "attack_one_right", "attack_two_left", "attack_two_right", "attack_three_left", "attack_three_right", "attack_four_left", "attack_four_right"];

    if (this.bool["attack_one"]) {
      this.addAction(p, "attack_one_" + this.currentDir, [], movementActions);
    } else if (this.bool["attack_two"]) {
      this.addAction(p, "attack_two_" + this.currentDir, [], movementActions);
    } else if (this.bool["attack_three"]) {
      this.addAction(p, "attack_three_" + this.currentDir, [], movementActions);
    } else if (this.bool["attack_four"]) {
      this.addAction(p, "attack_four_" + this.currentDir, [], movementActions);
    }

    if (Math.abs(this.velocityX) > 0.1) {
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
