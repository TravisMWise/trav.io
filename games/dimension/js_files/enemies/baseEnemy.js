import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";


export class BaseEnemy extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset;
    this.speed = 5;
    this.lastAction;
    this.leftBound = leftBound;
    this.rightBound = rightBound;

  }

  updateStateActions(p, player) {
    var uninteruptActions = [];
    switch (this.currentAIState) {
      case "idle":
        break;
      case "acting":
        if (!this.isAction(p, uninteruptActions)) {
          this.currentAIState = "follow";
        } else {
          
        }
        break;
    }
  }

  //Enemy Width: 
  //Enemy Height: 
  getAction(p, action, x = this.x, y = this.y) {
    
  }

  updateStateMesh(p, player) {
    return {};
  }

  updateStateSprite(p, player) {
    var movementActions = ["walk_left", "walk_right", "idle_left", "idle_right", "run_left", "run_right"];
    var uninteruptActions = [];

    if (Math.abs(this.velocityX) > 5) {
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
