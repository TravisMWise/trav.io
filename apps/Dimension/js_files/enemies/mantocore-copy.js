import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";

export class ManticoreCopy extends Attacker {
  constructor(
    p,
    x,
    y,
    w,
    h,
    level,
    health,
    weight,
    damageBoolean = true,
    capX = 20,
    capY = 10,
    loadset,
    leftBound,
    rightBound
  ) {
    super(
      p,
      x,
      y,
      w,
      h,
      level,
      health,
      weight,
      (damageBoolean = true),
      (capX = 20),
      (capY = 10)
    );
    this.set = loadset;
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.health = health;
    this.hit = false;
    this.hitTimer = 0;
    this.runSpeed = 10;
    this.currentDir = "left";
  }

  //Enemy Width: 319
  //Enemy Height: 372
  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
      case "idle_left":
        return {
          complex: false,
          attack: [],
          body: [
            new MeshBox(p, this.x + -144, this.y + 63, 180, 194),
            new MeshBox(p, this.x + 39, this.y + 43, 276, 246),
            new MeshBox(p, this.x + 257, this.y + -111, 182, 334),
          ],
          sprite: new LoadSet(
            this.set,
            "idle",
            1220,
            996,
            this.x + -372,
            this.y + -344,
            0.78,
            0.78,
            1,
            6
          ),
        };
      case "run_left":
        return {
          complex: false,
          attack: [],
          body: [
            new MeshBox(p, this.x + -144, this.y + 63, 180, 194),
            new MeshBox(p, this.x + 39, this.y + 43, 276, 246),
            new MeshBox(p, this.x + 257, this.y + -111, 182, 334),
          ],
          sprite: new LoadSet(
            this.set,
            "run",
            1220,
            996,
            this.x + -372,
            this.y + -344,
            0.78,
            0.78,
            1,
            6
          ),
        };
      case "walk_left":
        return {
          complex: false,
          attack: [],
          body: [
            new MeshBox(p, this.x + -144, this.y + 63, 180, 194),
            new MeshBox(p, this.x + 39, this.y + 43, 276, 246),
            new MeshBox(p, this.x + 257, this.y + -111, 182, 334),
          ],
          sprite: new LoadSet(
            this.set,
            "walk",
            1220,
            996,
            this.x + -372,
            this.y + -344,
            0.78,
            0.78,
            1,
            6
          ),
        };
      case "hurt_left":
        return {
          complex: false,
          attack: [],
          body: [
            new MeshBox(p, this.x + -144, this.y + 63, 180, 194),
            new MeshBox(p, this.x + 39, this.y + 43, 276, 246),
            new MeshBox(p, this.x + 237, this.y + -100, 159, 269),
          ],
          sprite: new LoadSet(
            this.set,
            "hurt",
            1220,
            996,
            this.x + -372,
            this.y + -344,
            0.78,
            0.78,
            1,
            6
          ),
        };
      case "idle_right":
        return {
          complex: false,
          attack: [],
          body: [
            new MeshBox(p, this.x + 287, this.y + 51, 180, 194),
            new MeshBox(p, this.x + 11, this.y + 32, 276, 246),
            new MeshBox(p, this.x + -112, this.y + -78, 179, 290),
          ],
          sprite: new LoadSet(
            this.set,
            "idle",
            1220,
            996,
            this.x + -256,
            this.y + -344,
            0.78,
            0.78,
            -1,
            6
          ),
        };
      case "run_right":
        return {
          complex: false,
          attack: [],
          body: [
            new MeshBox(p, this.x + 287, this.y + 51, 180, 194),
            new MeshBox(p, this.x + 11, this.y + 32, 276, 246),
            new MeshBox(p, this.x + -112, this.y + -78, 179, 290),
          ],
          sprite: new LoadSet(
            this.set,
            "run",
            1220,
            996,
            this.x + -256,
            this.y + -344,
            0.78,
            0.78,
            -1,
            6
          ),
        };
      case "walk_right":
        return {
          complex: false,
          attack: [],
          body: [
            new MeshBox(p, this.x + 287, this.y + 51, 180, 194),
            new MeshBox(p, this.x + 11, this.y + 32, 276, 246),
            new MeshBox(p, this.x + -112, this.y + -78, 179, 290),
          ],
          sprite: new LoadSet(
            this.set,
            "walk",
            1220,
            996,
            this.x + -256,
            this.y + -344,
            0.78,
            0.78,
            -1,
            6
          ),
        };
      case "hurt_right":
        return {
          complex: false,
          attack: [],
          body: [
            new MeshBox(p, this.x + 287, this.y + 51, 180, 194),
            new MeshBox(p, this.x + 11, this.y + 32, 276, 246),
            new MeshBox(p, this.x + -38, this.y + -96, 122, 290),
            new MeshBox(p, this.x + 202, this.y + 162, 41, 39),
            new MeshBox(p, this.x + 194, this.y + 159, 58, 45),
          ],
          sprite: new LoadSet(
            this.set,
            "hurt",
            1220,
            996,
            this.x + -256,
            this.y + -344,
            0.78,
            0.78,
            -1,
            6
          ),
        };
      case "die_right":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(
            this.set,
            "die",
            1220,
            996,
            this.x + -256,
            this.y + -344,
            0.78,
            0.78,
            -1,
            6
          ),
        };
      case "die_left":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(
            this.set,
            "die",
            1220,
            996,
            this.x + -378,
            this.y + -344,
            0.78,
            0.78,
            1,
            6
          ),
        };
    }
  }

  updateStateMesh(p, player) {
    return {};
  }

  updateStateActions(p, player) {
    switch (this.currentAIState) {
      case "idle":
        this.currentAIState = "paceIdle";
        this.paceIdle(this.leftBound, this.rightBound, 3);
        break;
      case "paceIdle":
        this.paceIdle(this.leftBound, this.rightBound, 3);
        if (this.hit === true) {
          this.currentAIState = "hit";
        }
        break;
      case "hit":
        this.hitTimer++;
        if (this.hitTimer >= 200) {
          this.hit = false;
          this.hitTimer = 0;

          this.currentAIState = "idle";
        } else {
          if (this.currentDir == "left") {
            this.moveLeft(this.runSpeed);
          } else {
            this.moveRight(this.runSpeed);
          }
        }
        break;
      case "dead":
        // Animation stopped in pawn class in applyActions
        break;
    }
  }

  updateStateSprite(p, player) {
    var override = [
      "idle_right",
      "idle_left",
      "walk_left",
      "walk_right",
      "run_left",
      "run_right",
    ];
    if (this.velocityX > 0) {
      this.currentDir = "right";
    } else {
      this.currentDir = "left";
    }

    if (this.health >= 0) {
      if (this.hit) {
        if (this.x > player.x) {
          this.currentDir = "right";
          this.addAction(p, "run_right", [], override);
        } else {
          this.currentDir = "left";
          this.addAction(p, "run_left", [], override);
        }
      } else {
        if (Math.abs(this.velocityX) > 0.1) {
          this.addAction(p, "walk_" + this.currentDir, [], override);
        } else {
          this.addAction(p, "idle_" + this.currentDir, [], override);
        }
      }
    } else {
      this.currentAIState = "dead";
      if (!this.deadState) {
        this.addAction(p, "die_" + this.currentDir, [], override);
        player.restoreHealth += 20;
        this.deadState = true;
      }
    }
  }

  attack(obj, damage) {
    if (obj.damageBoolean === true) {
      obj.health -= damage;
    }
    this.hit = true;
    this.hitTimer = 0;
    if (Math.random() < 0.5) {
      this.randomResult = 0;
    } else {
      this.randomResult = 1;
    }
  }

  apply(p, passIn) {
    this.detectDamage(p, passIn.hit, passIn.player);
    this.applyPhysics(p, passIn.collision);
    this.applyAllStates(p, passIn.player);
    this.updateMovement(p);
  }
}
