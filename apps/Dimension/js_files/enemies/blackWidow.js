import { LoadSet } from "../parent_classes/loadset.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";

export class BlackWidow extends Attacker {
  constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound) {
    super(p, x, y, w, h, level, health, weight, (damageBoolean = true), (capX = 20), (capY = 10));
    this.set = loadset;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.health = 100;
    this.hit = false;
    this.hitTimer = 0;
    this.speed = 17;
    this.runSpeed = 10;
    this.bool["attack"] = false;
    this.sit = false;
    this.strike = false;
  }

  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
      case "idle_right":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 0, y + 0, 215, 297, this), new MeshBox(p, x + 204, y + 111, 179, 111, this),],
          sprite: new LoadSet(this.set, "idle", 820, 500, x + -114, y + -92, 0.81, 0.81, 1, 4),
        };
      case "idle_left":
        return {
          complex: false,
          attack: [],
          body: [new MeshBox(p, x + 212, y + 0, 245, 296, this), new MeshBox(p, x + 45, y + 107, 199, 123, this),],
          sprite: new LoadSet(this.set, "idle", 820, 500, x + -114, y + -92, 0.81, 0.81, -1, 4),
        };
      case "move_left":
        return {
          complex: false,
          // attack: [new GeneralAttack(p, x + 212, y + 0, 245, 296, this, 5), new GeneralAttack(p, x + 45, y + 107, 199, 123, this, 5),],
          body: [new MeshBox(p, x + 212, y + 0, 245, 296, this), new MeshBox(p, x + 45, y + 107, 199, 123, this),],
          sprite: new LoadSet(this.set, "move", 820, 500, x + -114, y + -92, 0.81, 0.81, -1, 6),
        };
      case "move_right":
        return {
          complex: false,
          // attack: [new GeneralAttack(p, x + 0, y + 0, 245, 297, this, 5), new GeneralAttack(p, x + 196, y + 110, 202, 124, this, 5),],
          body: [new MeshBox(p, x + 1, y + 0, 245, 296, this), new MeshBox(p, x + 198, y + 111, 199, 123, this),],
          sprite: new LoadSet(this.set, "move", 820, 500, x + -114, y + -92, 0.81, 0.81, 1, 6),
        };
      case "attack_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 17, y + 25, 299, 173, this, 5), new GeneralAttack(p, x + 280, y + 97, 209, 179, this, 5),],
          body: [new MeshBox(p, x + 2, y + -4, 388, 300, this),],
          sprite: new LoadSet(this.set, "attack", 820, 500, x + -114, y + -92, 0.81, 0.81, 1, 4),
        };
      case "attack_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + 98, y + 35, 299, 173, this, 5), new GeneralAttack(p, x + -8, y + 117, 209, 179, this, 5),],
          body: [new MeshBox(p, x + 68, y + -3, 388, 300, this),],
          sprite: new LoadSet(this.set, "attack", 820, 500, x + -114, y + -92, 0.81, 0.81, -1, 4),
        };
      case "die_left":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 820, 500, x + -96, y + -96, 0.77, 0.77, -1, 4),
        };
      case "die_right":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "die", 820, 500, x + -87, y + -99, 0.77, 0.77, 1, 4),
        };
    }
  }

  updateStateMesh(p, player) {
    return {};
  }

  updateStateActions(p, player) {
    switch (this.currentAIState) {
      case "idle":
        this.paceIdle(this.leftBound, this.rightBound, 2, 100);
        break;
    }
  }

  updateStateSprite(p, player) {
    // this.addAction(p, "idle_left", [], []);
    // this.addAction(p, "idle_right", [], []);
    // this.addAction(p, "attack_left", [], []);
    // this.addAction(p, "attack_right", [], []);
    // this.addAction(p, "move_left", [], []);
    // this.addAction(p, "move_right", [], []);

    if (Math.abs(this.velocityX) > 1) {
      this.addAction(p, "move_" + this.currentDir, [], ["idle_left", "idle_right", "move_left", "move_right"]);
    } else {
      this.addAction(p, "idle_" + this.currentDir, [], ["idle_left", "idle_right", "move_left", "move_right"]);
    }

  }


  apply(p, passIn) {
    this.updateCurrentDir();
    this.detectDamage(p, passIn.hit, passIn.player);
    this.applyPhysics(p, passIn.collision);
    this.applyAllStates(p, passIn.player);
    this.updateMovement(p);
  }
}
