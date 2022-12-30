import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";

export class Scorpion extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset;
    this.speed = 4;
    this.bool["tail_strike"] = false;
    this.bool["pincer_whack"] = false;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
  }

  //Enemy Width: 51
  //Enemy Height: 70
  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
      case "idle_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 51, 70, this)],
          sprite: new LoadSet(this.set, "idle", 701, 509, x + -45, y + -23, 0.2, 0.2, 1, 4),
        };
      case "high_attack_left":
        return {
          complex: true,
          attack: {
            21: [new GeneralAttack(p, x + -44, y + 1, 45, 67, this, 20)],
          },
          body: [new MeshBox(p, x + 0, y + 0, 51, 70, this)],
          sprite: new LoadSet(this.set, "high_attack", 701, 509, x + -45, y + -23, 0.2, 0.2, 1, 4),
        };
      case "pincer_whack_left":
        return {
          complex: true,
          attack: {
            24: [new GeneralAttack(p, x + -56, y + 26, 56, 44, this, 20)],
          },
          body: [new MeshBox(p, x + 0, y + 0, 51, 70, this)],
          sprite: new LoadSet(this.set, "pincer_whack", 701, 509, x + -45, y + -23, 0.2, 0.2, 1, 4),
        };
      case "walk_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 51, 70, this)],
          sprite: new LoadSet(this.set, "walk", 701, 509, x + -45, y + -23, 0.2, 0.2, 1, 4),
        };
      case "walk_pinching_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -55, y + 14, 51, 56, this, 20)],
          body: [new MeshBox(p, x + 0, y + 0, 51, 70, this)],
          sprite: new LoadSet(this.set, "walk_pinching", 701, 509, x + -45, y + -23, 0.2, 0.2, 1, 4),
        };
      case "die_left":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 701, 509, x + -45, y + -23, 0.2, 0.2, 1, 4),
        };
      case "idle_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 51, 70, this)],
          sprite: new LoadSet(this.set, "idle", 701, 509, x + -42, y + -24, 0.2, 0.2, -1, 4),
        };
      case "high_attack_right":
        return {
          complex: true,
          attack: {
            20: [new GeneralAttack(p, x + 52, y + 8, 35, 60, this, 20)],
          },
          body: [new MeshBox(p, x + 0, y + 0, 51, 70, this)],
          sprite: new LoadSet(this.set, "high_attack", 701, 509, x + -42, y + -24, 0.2, 0.2, -1, 4),
        };
      case "pincer_whack_right":
        return {
          complex: true,
          attack: {
            26: [new GeneralAttack(p, x + 52, y + 30, 59, 37, this, 20)],
          },
          body: [new MeshBox(p, x + 0, y + 0, 51, 70, this)],
          sprite: new LoadSet(this.set, "pincer_whack", 701, 509, x + -42, y + -24, 0.2, 0.2, -1, 4),
        };
      case "walk_pinching_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 52, y + 13, 57, 57, this, 20)],
          body: [new MeshBox(p, x + 0, y + 0, 51, 70, this)],
          sprite: new LoadSet(this.set, "walk_pinching", 701, 509, x + -42, y + -24, 0.2, 0.2, -1, 4),
        };
      case "walk_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 51, 70, this)],
          sprite: new LoadSet(this.set, "walk", 701, 509, x + -42, y + -24, 0.2, 0.2, -1, 4),
        };
      case "die_right":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 701, 509, x + -42, y + -24, 0.2, 0.2, -1, 4),
        };
    }
  }

  updateStateMesh(p, player) {
    return {};
  }

  updateStateActions(p, player) {
    var attackActions = ["high_attack_right", "high_attack_left", "pincer_whack_left", "pincer_whack_right"];
    switch (this.currentAIState) {
      case "idle":
        this.paceIdle(this.leftBound, this.rightBound, 2, 100);
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) < this.w * 6 && (this.distY(p, this, player) < this.h * 2)) this.currentAIState = "follow_pinching";
        break;
      case "follow_pinching":
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) > this.w * 10) this.currentAIState = "idle";
        else if (this.distX(p, this, player) < this.w * 1.5 && this.distX(p, this, player) > this.w && (this.distY(p, this, player) < this.h / 3)) {
          if(this.randomCheck(90)) {
            this.currentAIState = "pincer_whack";
          } else {
            this.currentAIState = "tail_strike";
          }
          break;
        }
        else if (this.distX(p, this, player) < this.w) this.currentAIState = "focus_pinching";
        this.basicFollow(player, this.speed);
        break;
      case "focus_pinching":
        if (this.currentDir === "right") this.moveRight(this.speed);
        else this.moveLeft(this.speed);
        if (this.health <= 0) this.currentAIState = "dead";
        else if (this.distX(p, this, player) > this.w * 10) this.currentAIState = "idle";
        else if (this.distX(p, this, player) < this.w * 6 && this.distX(p, this, player) > this.w * 1.3) this.currentAIState = "follow_pinching";
        break;
      case "pincer_whack":
        if (!this.isAction(p, ["pincer_whack_left", "pincer_whack_right"]) && !this.bool["pincer_whack"]) {
          this.lastAction = "pincer_whack";
          this.bool["pincer_whack"] = true;
          this.currentAIState = "acting";
        }
        break;
      case "tail_strike":
          if (!this.isAction(p, ["high_attack_right", "high_attack_left"]) && !this.bool["tail_strike"]) {
            this.lastAction = "tail_strike";
            this.bool["tail_strike"] = true;
            this.currentAIState = "acting";
          }
          break;
      case "acting":
        if (!this.isAction(p, attackActions) && !(this.bool["tail_strike"] && his.bool["pincer_whack"])) {
          this.currentAIState = "follow_pinching";
        } else {
          this.bool["tail_strike"] = false;
          this.bool["pincer_whack"] = false;
        }
        break;
    }
  }

  updateStateSprite(p, player) {
    var movementActions = ["walk_left", "walk_right", "idle_left", "idle_right", "walk_pinching_left", "walk_pinching_right"];
    var attackActions = ["high_attack_right", "high_attack_left", "pincer_whack_left", "pincer_whack_right"];

    if (this.bool["tail_strike"]) {
      this.addAction(p, "high_attack_" + this.currentDir, [], movementActions);
    } else if (this.bool["pincer_whack"]) {
      this.addAction(p, "pincer_whack_" + this.currentDir, [], movementActions);
    }

    if (this.currentAIState.includes("pinching")) {
      this.addAction(p, "walk_pinching_" + this.currentDir, attackActions, movementActions);
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
