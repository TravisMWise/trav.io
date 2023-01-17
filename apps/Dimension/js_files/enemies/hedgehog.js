import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";


export class Hedgehog extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset;
    this.speed = 13;
    this.bruh = "bru";
    this.bool["ball_up"] = false;
    this.bool["open_up"] = false;
    this.bool["whacked"] = false;
    this.lastAction;
    this.leftBound = leftBound;
    this.rightBound = rightBound;

  }

  updateStateActions(p, player) {
    var uninteruptActions = ["open_up_left", "open_up_right", "go_to_ball_left", "go_to_ball_right", "whacked_left", "whacked_right"];
    switch (this.currentAIState) {
      case "idle":
        this.paceIdle(this.leftBound, this.rightBound, 2, 100);
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) < this.w * 2 && (this.distY(p, this, player) < this.h * 2)) {
          this.currentAIState = "ball_up";
          this.setTimer("rolling", 400);
        }
        break;
      case "follow":
        this.basicFollow(player, this.speed);
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.timerFinish("rolling") || this.hit) this.currentAIState = "open_up";
        break;
      case "ball_up":
          if (!this.isAction(p, ["go_to_ball_left", "go_to_ball_right"]) && !this.bool["ball_up"]) {
            this.lastAction = "ball_up";
            this.bool["ball_up"] = true;
            this.currentAIState = "acting";
          }
          break;
      case "open_up":
          if (!this.isAction(p, ["open_up_left", "open_up_right"]) && !this.bool["open_up"]) {
            this.lastAction = "open_up";
            this.bool["open_up"] = true;
            this.currentAIState = "acting";
          }
          break;
      case "whacked":
        if (!this.isAction(p, ["whacked_left", "whacked_right"]) && !this.bool["whacked"]) {
          this.lastAction = "whacked";
          this.bool["whacked"] = true;
          this.currentAIState = "acting";
        }
          break;
      case "acting":
        if ((!this.isAction(p, uninteruptActions))  && !(this.bool["ball_up"]) && !(this.bool["open_up"]) && !(this.bool["whacked"])) {
          if (this.lastAction === "ball_up") {
            this.currentAIState = "follow";
          } else if (this.lastAction === "open_up") {
            this.currentAIState = "whacked";
          } else if (this.lastAction === "whacked") {
            this.currentAIState = "idle";
          }
        } else {
          this.bool["ball_up"] = false;
          this.bool["open_up"] = false;
          this.bool["whacked"] = false;
        }
        break;
    }
  }

  //Enemy Width: 76
  //Enemy Height: 77
  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
        case "idle_left":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 76, 77, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "idle", 580, 535, x + -36, y + -41, 0.25, 0.25, 1, 6),
        };
        case "go_to_ball_left":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 76, 77, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "go_to_ball", 580, 535, x + -36, y + -41, 0.25, 0.25, 1, 3),
        };
        case "rolling_left":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 76, 77, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "rolling", 580, 535, x + -36, y + -41, 0.25, 0.25, 1, 6),
        };
        case "walk_left":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 76, 77, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "walk", 580, 535, x + -36, y + -41, 0.25, 0.25, 1, 6),
        };
        case "open_up_left":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 76, 77, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "open_up", 580, 535, x + -36, y + -41, 0.25, 0.25, 1, 3),
        };
        case "jump_left":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 76, 77, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "jump", 580, 535, x + -36, y + -41, 0.25, 0.25, 1, 6),
        };
        case "whacked_left":
        return {
        complex: false,
        attack: [],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "whacked", 580, 535, x + -36, y + -41, 0.25, 0.25, 1, 6),
        };
        case "die_left":
        return {
        complex: false,
        attack: [],
        body: [],
        sprite: new LoadSet(this.set, "die", 580, 535, x + -36, y + -41, 0.25, 0.25, 1, 6),
        };
        case "idle_right":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 76, 77, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "idle", 580, 535, x + -36, y + -41, 0.25, 0.25, -1, 6),
        };
        case "go_to_ball_right":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 76, 77, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "go_to_ball", 580, 535, x + -36, y + -41, 0.25, 0.25, -1, 3),
        };
        case "rolling_right":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 76, 77, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "rolling", 580, 535, x + -36, y + -41, 0.25, 0.25, -1, 6),
        };
        case "walk_right":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 76, 77, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "walk", 580, 535, x + -36, y + -41, 0.25, 0.25, -1, 6),
        };
        case "open_up_right":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 76, 77, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "open_up", 580, 535, x + -36, y + -41, 0.25, 0.25, -1, 3),
        };
        case "jump_right":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 76, 77, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "jump", 580, 535, x + -36, y + -41, 0.25, 0.25, -1, 6),
        };
        case "whacked_right":
        return {
        complex: false,
        attack: [],
        body: [new MeshBox(p, x + 0, y + 0, 76, 77, this),],
        sprite: new LoadSet(this.set, "whacked", 580, 535, x + -36, y + -41, 0.25, 0.25, -1, 6),
        };
        case "die_right":
        return {
        complex: false,
        attack: [],
        body: [],
        sprite: new LoadSet(this.set, "die", 580, 535, x + -36, y + -41, 0.25, 0.25, -1, 6),
        };
        }
  }

  updateStateSprite(p, player) {
    var movementActions = ["walk_left", "walk_right", "idle_left", "idle_right", "rolling_left", "rolling_right"];
    var uninteruptActions = ["go_to_ball_right", "go_to_ball_left", "open_up_right", "open_up_left", "whacked_right", "whacked_left", "rolling_left", "rolling_right"];

    if (this.bool["whacked"]) {
      this.addAction(p, "whacked_" + this.currentDir, [], movementActions);
    } else if (this.bool["ball_up"]) {
      this.addAction(p, "go_to_ball_" + this.currentDir, [], movementActions);
    } else if (this.bool["open_up"]) {
      this.addAction(p, "open_up_" + this.currentDir, [], movementActions);
    }

    if (this.currentAIState === "follow") {
      this.addAction(p, "rolling_" + this.currentDir, uninteruptActions, movementActions);
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
