import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";

export class Rhino extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset;
    this.speed = 8;
    this.lastAction;
    this.bool["head_smash"] = false;
    this.bool["stomp"] = false;
    this.bool["whacked"] = false;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
  }

  updateStateActions(p, player) {
    var uninteruptActions = ["head_smash_left", "head_smash_right", "stomp_left", "stomp_right", "whacked_right", "whacked_left"];
    switch (this.currentAIState) {
      case "idle":
        this.paceIdle(this.rightBound, this.leftBound, this.speed / 3);
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.bool["whacked"] === true) {
          this.bool[whacked] = false;
          this.currentAIState = "acting";
          break;
        } else if (this.distX(p, this, player) < this.w * 3 && this.distY(p, this, player) < this.h * 2) {
          this.lookAt(player);
          this.currentAIState = "stomp";
        }
        break;
      case "follow":
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) < this.w / 2 && this.distY(p, this, player) < this.h / 3) {
          this.currentAIState = "head_smash";
          break;
        } else if (this.distX(p, this, player) > this.w * 3) this.currentAIState = "idle";
        this.basicFollow(player, this.speed);

        break;
      case "stomp":
        if (!this.isAction(p, ["stomp_left", "stomp_right"]) && !this.bool["stomp"]) {
          this.lastAction = "stomp";
          this.bool["stomp"] = true;
          this.currentAIState = "acting";
        }
        break;

      case "charge":
        // this.currentDir can equal "right" or "left"
        //this.currentDir;
        //this.moveLeft(this.speed);
        //this.moveRight(this.speed);

        if (this.currentDir === "left") {
          this.moveLeft(this.speed * 4);
          if (this.wallhit === true) {
            this.moveRight(5);
            this.currentAIState = "whacked";
          }
        } else if (this.currentDir === "right") {
          this.moveRight(this.speed * 4);
          if (this.wallhit === true) {
            this.moveLeft(5);
            this.currentAIState = "whacked";
          }
        }
        break;

      case "head_smash":
        if (!this.isAction(p, ["head_smash_left", "head_smash_right"]) && !this.bool["head_smash"]) {
          this.bool["head_smash"] = true;
          this.currentAIState = "acting";
        }
        break;

      case "whacked":
        if (!this.isAction(p, ["whacked_left", "whacked_right"]) && !this.bool["whacked"]) {
          this.bool["whacked"] = true;
          this.lastAction = "whacked";
        } else this.currentAIState = "acting";
        break;

      case "acting":
        if (!this.isAction(p, uninteruptActions) && !(this.bool["head_smash"] && this.bool["stomp"] && this.bool["whacked"])) {
          if (this.lastAction === "stomp") this.currentAIState = "charge";
          else if (this.lastAction === "whacked") {
            this.bool["whacked"] = false;
            this.currentAIState = "follow";
            this.lastAction = "acting";
            break;
          } else this.currentAIState = "follow";
        } else {
          this.bool["head_smash"] = false;
          this.bool["stomp"] = false;
          this.bool["whacked"] = false;
        }

        break;
    }
  }

  //Enemy Width: 247
  //Enemy Height: 171
  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
      case "idle_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "idle", 805, 617, x + -91, y + -122, 0.54, 0.54, 1, 6),
        };
      case "idle_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "idle", 805, 617, x + -91, y + -122, 0.54, 0.54, -1, 6),
        };
      case "charge_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 0, y + 0, 247, 171, this, 20)],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "charge", 805, 617, x + -91, y + -122, 0.54, 0.54, -1, 3),
        };
      case "charge_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 0, y + 0, 247, 171, this, 20)],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "charge", 805, 617, x + -91, y + -122, 0.54, 0.54, 1, 3),
        };
      case "head_smash_left":
        return {
          complex: true,
          attack: {
            21: [new GeneralAttack(p, x + -64, y + -15, 163, 144, this, 20)],
            25: [new GeneralAttack(p, x + -31, y + -139, 148, 160, this, 20)],
          },
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "head_smash", 805, 617, x + -91, y + -122, 0.54, 0.54, 1, 4),
        };
      case "head_smash_right":
        return {
          complex: true,
          attack: {
            22: [new GeneralAttack(p, x + 153, y + -23, 149, 140, this, 20)],
            33: [new GeneralAttack(p, x + 115, y + -132, 162, 155, this, 20)],
          },
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "head_smash", 805, 617, x + -91, y + -122, 0.54, 0.54, -1, 4),
        };
      case "kick_back_left":
        return {
          complex: true,
          attack: {
            17: [new GeneralAttack(p, x + 207, y + -29, 174, 157, this, 20)],
          },
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "kick_back", 805, 617, x + -91, y + -122, 0.54, 0.54, 1, 4),
        };
      case "kick_back_right":
        return {
          complex: true,
          attack: {
            17: [new GeneralAttack(p, x + -131, y + -19, 174, 157, this, 20)],
          },
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "kick_back", 805, 617, x + -91, y + -122, 0.54, 0.54, -1, 4),
        };
      case "run_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "run", 805, 617, x + -91, y + -122, 0.54, 0.54, -1, 4),
        };
      case "run_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "run", 805, 617, x + -91, y + -122, 0.54, 0.54, 1, 4),
        };
      case "stomp_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "stomp", 805, 617, x + -91, y + -122, 0.54, 0.54, 1, 4),
        };
      case "stomp_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "stomp", 805, 617, x + -91, y + -122, 0.54, 0.54, -1, 4),
        };
      case "stop_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "stop", 805, 617, x + -91, y + -122, 0.54, 0.54, -1, 4),
        };
      case "stop_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "stop", 805, 617, x + -91, y + -122, 0.54, 0.54, 1, 4),
        };
      case "walk_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "walk", 805, 617, x + -91, y + -122, 0.54, 0.54, -1, 4),
        };
      case "walk_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "walk", 805, 617, x + -91, y + -122, 0.54, 0.54, 1, 4),
        };
      case "whacked_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "whacked", 805, 617, x + -91, y + -122, 0.54, 0.54, 1, 4),
        };
      case "whacked_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 247, 171, this)],
          sprite: new LoadSet(this.set, "whacked", 805, 617, x + -91, y + -122, 0.54, 0.54, -1, 4),
        };
      case "jump_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -1, y + -9, 259, 137, this)],
          sprite: new LoadSet(this.set, "jump", 805, 617, x + -91, y + -122, 0.54, 0.54, -1, 4),
        };
      case "jump_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + -1, y + -9, 259, 137, this)],
          sprite: new LoadSet(this.set, "jump", 805, 617, x + -91, y + -122, 0.54, 0.54, 1, 4),
        };
      case "die_left":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 805, 617, x + -91, y + -122, 0.54, 0.54, 1, 5),
        };
      case "die_right":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 805, 617, x + -91, y + -122, 0.54, 0.54, -1, 5),
        };
    }
  }

  updateStateSprite(p, player) {
    console.log(this.currentAIState);
    var movementActions = ["walk_left", "walk_right", "idle_left", "idle_right", "run_left", "run_right", "charge_left", "charge_right"];
    var uninteruptActions = ["head_smash_left", "head_smash_right", "stomp_left", "stomp_right", "whacked_right", "whacked_left"];

    if (this.bool["head_smash"]) {
      this.addAction(p, "head_smash_" + this.currentDir, [], movementActions);
    } else if (this.bool["stomp"]) {
      this.addAction(p, "stomp_" + this.currentDir, [], movementActions);
    } else if (this.bool["whacked"]) {
      this.addAction(p, "whacked_" + this.currentDir, [], movementActions);
    }

    if (this.currentAIState === "charge") {
      this.addAction(p, "charge_" + this.currentDir, uninteruptActions, movementActions);
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
