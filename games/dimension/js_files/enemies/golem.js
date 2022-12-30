import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";


export class Golem extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset;
    this.speed = 5;
    // this.bruh = "bruh";
    this.lastAction;
    this.leftBound = leftBound;
    this.rightBound = rightBound;

  }

  updateStateActions(p, player) {
    var attackActions = ["open_up_left", "open_up_right", "go_to_ball_left", "go_to_ball_right", "whacked_left", "whacked_right"];
    switch (this.currentAIState) {
      case "idle":
        this.paceIdle(this.leftBound, this.rightBound, 2, 100);
        break;
    }
  }

  //Enemy Width: 205
  //Enemy Height: 337
  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
        case "idle_left":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 205, 337, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "idle", 923, 860, x + -186, y + -149, 0.62, 0.62, 1, 6),
        };
        case "idle_right":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 205, 337, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "idle", 923, 860, x + -186, y + -149, 0.62, 0.62, -1, 6),
        };
        case "defend_right":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 205, 337, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "defend", 923, 860, x + -186, y + -149, 0.62, 0.62, -1, 6),
        };
        case "defend_left":
        return {
        complex: false,
        attack: [new GeneralAttack(p, x + 0, y + 0, 205, 337, this, 20),],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "defend", 923, 860, x + -186, y + -149, 0.62, 0.62, 1, 6),
        };
        case "hurt_left":
        return {
        complex: false,
        attack: [],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "hurt", 923, 860, x + -186, y + -149, 0.62, 0.62, 1, 6),
        };
        case "hurt_right":
        return {
        complex: false,
        attack: [],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "hurt", 923, 860, x + -186, y + -149, 0.62, 0.62, -1, 6),
        };
        case "jump_right":
        return {
        complex: false,
        attack: [],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "jump", 923, 860, x + -186, y + -149, 0.62, 0.62, -1, 6),
        };
        case "jump_left":
        return {
        complex: false,
        attack: [],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "jump", 923, 860, x + -186, y + -149, 0.62, 0.62, 1, 6),
        };
        case "punch_left":
        return {
        complex: true,
        attack: {
        37: [new GeneralAttack(p, x + -199, y + 104, 299, 235, this, 20), ],
        },
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "punch", 923, 860, x + -186, y + -149, 0.62, 0.62, 1, 6),
        };
        case "punch_right":
        return {
        complex: true,
        attack: {
        37: [new GeneralAttack(p, x + 97, y + 104, 299, 235, this, 20), ],
        },
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "punch", 923, 860, x + -186, y + -149, 0.62, 0.62, -1, 6),
        };
        case "run_left":
        return {
        complex: false,
        attack: [],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "run", 923, 860, x + -186, y + -149, 0.62, 0.62, 1, 6),
        };
        case "run_right":
        return {
        complex: false,
        attack: [],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "run", 923, 860, x + -186, y + -149, 0.62, 0.62, -1, 6),
        };
        case "slam_right":
        return {
        complex: true,
        attack: {
        36: [new GeneralAttack(p, x + 114, y + -1, 235, 339, this, 20), ],
        },
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "slam", 923, 860, x + -186, y + -149, 0.62, 0.62, -1, 6),
        };
        case "slam_left":
        return {
        complex: true,
        attack: {
        36: [new GeneralAttack(p, x + -143, y + -2, 235, 339, this, 20), ],
        },
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "slam", 923, 860, x + -186, y + -149, 0.62, 0.62, 1, 6),
        };
        case "throw_left":
        return {
        complex: false,
        attack: [],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "throw", 923, 860, x + -186, y + -149, 0.62, 0.62, 1, 6),
        };
        case "throw_right":
        return {
        complex: false,
        attack: [],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "throw", 923, 860, x + -186, y + -149, 0.62, 0.62, -1, 6),
        };
        case "walk_right":
        return {
        complex: false,
        attack: [],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "walk", 923, 860, x + -186, y + -149, 0.62, 0.62, -1, 6),
        };
        case "walk_left":
        return {
        complex: false,
        attack: [],
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "walk", 923, 860, x + -186, y + -149, 0.62, 0.62, 1, 6),
        };
        case "whack_left":
        return {
        complex: true,
        attack: {
        30: [new GeneralAttack(p, x + -91, y + 2, 205, 337, this, 20), ],
        },
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "whack", 923, 860, x + -186, y + -149, 0.62, 0.62, 1, 6),
        };
        case "whack_right":
        return {
        complex: true,
        attack: {
        30: [new GeneralAttack(p, x + 89, y + 1, 205, 337, this, 20), ],
        },
        body: [new MeshBox(p, x + 0, y + 0, 205, 337, this),],
        sprite: new LoadSet(this.set, "whack", 923, 860, x + -186, y + -149, 0.62, 0.62, -1, 6),
        };
        case "die_right":
        return {
        complex: false,
        attack: [],
        body: [],
        sprite: new LoadSet(this.set, "die", 923, 860, x + -186, y + -149, 0.62, 0.62, -1, 6),
        };
        case "die_left":
        return {
        complex: false,
        attack: [],
        body: [],
        sprite: new LoadSet(this.set, "die", 923, 860, x + -186, y + -149, 0.62, 0.62, 1, 6),
        };
        }
  }

  updateStateMesh(p, player) {
    return {};
  }

  updateStateSprite(p, player) {
    var movementActions = ["walk_left", "walk_right", "idle_left", "idle_right", "run_left", "run_right"];
    var attackActions = ["go_to_ball_right", "go_to_ball_left", "open_up_right", "open_up_left", "whacked_right", "whacked_left", "rolling_left", "rolling_right"];

    // if (this.bool["whacked"]) {
    //   this.addAction(p, "whacked_" + this.currentDir, [], movementActions);
    // } else if (this.bool["ball_up"]) {
    //   this.addAction(p, "go_to_ball_" + this.currentDir, [], movementActions);
    // } else if (this.bool["open_up"]) {
    //   this.addAction(p, "open_up_" + this.currentDir, [], movementActions);
    // }

    if (Math.abs(this.velocityX) > 5) {
      this.addAction(p, "run_" + this.currentDir, attackActions, movementActions);
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

    this.detectDamage(p, passIn.hit, passIn.player);
    this.applyPhysics(p, passIn.collision);
    this.applyAllStates(p, passIn.player);
    this.updateMovement(p);
  }
}
