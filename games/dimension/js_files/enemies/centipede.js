import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";


export class Centipede extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset;
    this.bruh = "bruh";
    this.oof = "of";
    this.lastAction;
    this.bool["come_out"] = false;
    this.bool["go_in"] = false;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
  }

  //Enemy Width: 76
  //Enemy Height: 77
  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
      case "idle_in":
      return {
        complex: false,
        attack: [],
        body: [],
        sprite: new LoadSet(this.set, "idle_in", 670, 419, x + -252, y + -305, 1, 1, 1, 6),
      };
      case "come_out":
      return {
      complex: true,
      attack: {
      20: [new GeneralAttack(p, x + 28, y + -134, 147, 171, this, 20), ],
      28: [new GeneralAttack(p, x + 19, y + -203, 157, 246, this, 20), ],
      30: [new GeneralAttack(p, x + 20, y + -258, 157, 296, this, 20), ],
      33: [new GeneralAttack(p, x + 17, y + -268, 165, 313, this, 20), ],
      44: [new GeneralAttack(p, x + 19, y + -300, 156, 345, this, 20), ],
      57: [new GeneralAttack(p, x + 10, y + -315, 174, 357, this, 20), ],
      },
      body: [],
      sprite: new LoadSet(this.set, "come_out", 670, 419, x + -252, y + -305, 1, 1, 1, 6),
      };

      case "idle_out":
      return {
      complex: false,
      attack: [new GeneralAttack(p, x + 10, y + -315, 174, 357, this, 20), ],
      body: [],
      sprite: new LoadSet(this.set, "ilde_out", 670, 419, x + -252, y + -305, 1, 1, 1, 6),
      };
      case "go_in":
      return {
      complex: true,
      attack: {
      1: [new GeneralAttack(p, x + 10, y + -305, 173, 357, this, 20), ],
      10: [new GeneralAttack(p, x + 13, y + -270, 172, 332, this, 20), ],
      15: [new GeneralAttack(p, x + 2, y + -230, 187, 297, this, 20), ],
      22: [new GeneralAttack(p, x + 15, y + -200, 156, 248, this, 20), ],
      28: [new GeneralAttack(p, x + 11, y + -173, 169, 222, this, 20), new GeneralAttack(p, x + 0, y + 0, 182, 90, this, 20), ],
      34: [new GeneralAttack(p, x + 8, y + -152, 179, 217, this, 20), ],
      44: [new GeneralAttack(p, x + -1, y + -75, 174, 163, this, 20), ],
      45: [new GeneralAttack(p, x + 0, y + -75, 181, 165, this, 20), ],
      },
      body: [],
      sprite: new LoadSet(this.set, "go_in", 670, 419, x + -252, y + -305, 1, 1, 1, 6),
      };
      }
  }

  updateStateMesh(p, player) {
    return {};
  }

  updateStateActions(p, player) {
    var attackActions = ["come_out", "go_in"];
    switch (this.currentAIState) {
      case "idle":
        if(this.timerFinish("idling")) this.currentAIState = "come_out";
        break;
      case "idle_out":
        if(this.timerFinish("idling_out")) this.currentAIState = "go_in";
        break;
      case "come_out":
        if (!this.isAction(p, ["come_out"]) && !this.bool["come_out"]) {
          this.lastAction = "come_out";
          this.bool["come_out"] = true;
          this.currentAIState = "acting";
        }
        break;
      case "go_in":
        if (!this.isAction(p, ["go_in"]) && !this.bool["go_in"]) {
          this.lastAction = "go_in";
          this.bool["go_in"] = true;
          this.currentAIState = "acting";
        }
        break;
      case "acting":
        if (!this.isAction(p, attackActions) && !(this.bool["come_out"] && this.bool["go_in"])) {
          if (this.lastAction === "come_out") {
            this.setTimer("idling_out", 500);
            this.currentAIState = "idle_out";
          } else {
            this.setTimer("idling", 500);
            this.currentAIState = "idle";
          } 
        } else {
          this.bool["come_out"] = false;
          this.bool["go_in"] = false;
        }
        break;
    }
  }

  updateStateSprite(p, player) {
    var movementActions = ["idle_out", "idle_in"];
    var attackActions = ["go_in", "come_out"];

    if (this.bool["come_out"]) {
      this.addAction(p, "come_out", [], movementActions);
    } else if (this.bool["go_in"]) {
      this.addAction(p, "go_in", [], movementActions);
    }
  
    if (this.currentAIState === "idle") {
      this.addAction(p, "idle_in", attackActions, movementActions);
    } else if (this.currentAIState === "idle_out") {
      this.addAction(p, "idle_out", attackActions, movementActions);
    }
  }


  apply(p, passIn) {
    this.detectDamage(p, passIn.hit);
    this.applyPhysics(p, passIn.collision);
    this.applyAllStates(p, passIn.player);
    this.updateMovement(p);
  }
}
