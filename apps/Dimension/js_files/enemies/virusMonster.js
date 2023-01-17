import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";
import { VirusProjectile } from "../projectiles/virusProjectile.js";

export class VirusMonster extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset.monster;
    this.setProjectile = loadset.projectile;
    this.speed = 5;
    // this.bruh = "bruh";
    this.lastAction;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.switch = false;
    this.angle = 0;
  }

  updateStateActions(p, player) {
    switch (this.currentAIState) {
      case "idle":
        if (!this.isAction(p, ["throw_right", "throw_left"])) this.paceIdle(this.leftBound, this.rightBound, 2, 100);
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) < this.w * 8 && this.distY(p, this, player) < this.h * 2) {
          this.currentAIState = "throwing";
          this.lookAt(player);
        }
        break;
      case "throwing":
        this.lookAt(player);
        var throwingDir = "left";

        if (this.isAction(p, ["throw_right"])) {
          throwingDir = "right";
        } else {
          throwingDir = "left";
        }

        if (this.getActionStage("throw_" + throwingDir) >= 26 && this.getActionStage("throw_" + throwingDir) <= 30) {
          // this.angle = this.targetAngle(player, this);
          this.shoot(p, "virus_" + throwingDir, ["virus_left", "virus_right"]);
          if (this.switch) {
            this.currentAIState = "idle";
            this.switch = false;
            break;
          }
        }

        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) > this.w * 10) this.switch = true;
        break;
    }
  }

  getProjectile(p, projectiles, passIn = {}) {
    switch (projectiles) {
      case "virus_left":
        return {
          projectile: new VirusProjectile(p, this.x - 55, this.y + 7, 40, 35, 0, this.setProjectile, "left"),
          delay: 25,
        };
      case "virus_right":
        return {
          projectile: new VirusProjectile(p, this.x + this.w + 55, this.y + 7, 40, 35, 0, this.setProjectile, "right"),
          delay: 25,
        };
      default:
        return {};
    }
  }

  //Enemy Width: 89
  //Enemy Height: 90
  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
      case "idle_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 7, y + -1, 78, 91, this)],
          sprite: new LoadSet(this.set, "idle", 898, 718, x + -117, y + -71, 0.27, 0.27, 1, 6),
        };
      case "die_left":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 898, 718, x + -117, y + -71, 0.27, 0.27, 1, 6),
        };
      case "walk_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 8, y + 1, 70, 89, this)],
          sprite: new LoadSet(this.set, "move", 898, 718, x + -117, y + -71, 0.27, 0.27, 1, 6),
        };
      case "throw_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 8, y + 1, 70, 89, this)],
          sprite: new LoadSet(this.set, "throw_virus_bomb", 898, 718, x + -117, y + -71, 0.27, 0.27, 1, 6),
        };
      case "whacked_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 8, y + 1, 70, 89, this)],
          sprite: new LoadSet(this.set, "whacked", 898, 718, x + -117, y + -71, 0.27, 0.27, 1, 6),
        };
      case "idle_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 8, y + 1, 70, 89, this)],
          sprite: new LoadSet(this.set, "idle", 898, 718, x + -36, y + -71, 0.27, 0.27, -1, 6),
        };
      case "die_right":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 898, 718, x + -36, y + -71, 0.27, 0.27, -1, 6),
        };
      case "walk_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 9, y + 1, 71, 89, this)],
          sprite: new LoadSet(this.set, "move", 898, 718, x + -36, y + -71, 0.27, 0.27, -1, 6),
        };
      case "throw_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 9, y + 1, 71, 89, this)],
          sprite: new LoadSet(this.set, "throw_virus_bomb", 898, 718, x + -36, y + -71, 0.27, 0.27, -1, 6),
        };
      case "whacked_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 9, y + 1, 71, 89, this)],
          sprite: new LoadSet(this.set, "whacked", 898, 718, x + -36, y + -71, 0.27, 0.27, -1, 6),
        };
    }
  }

  updateStateMesh(p, player) {
    return {};
  }

  updateStateSprite(p, player) {
    var movementActions = ["walk_left", "walk_right", "idle_left", "idle_right"];
    var attackActions = ["throw_left", "throw_right"];

    if (this.currentAIState === "throwing") {
      this.addAction(p, "throw_" + this.currentDir, attackActions, movementActions);
    } else if (Math.abs(this.velocityX) > 0.1) {
      this.addAction(p, "walk_" + this.currentDir, attackActions, movementActions);
    } else if (this.currentAIState !== "dead") {
      this.addAction(p, "idle_" + this.currentDir, attackActions, movementActions);
    } else if (!this.bool["dead"] && !this.isAction(p, ["throw_right", "throw_left"])) {
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
