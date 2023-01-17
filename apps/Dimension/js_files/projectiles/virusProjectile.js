import { Projectile } from "../parent_classes/projectile.js";
import { LoadSet } from "../parent_classes/loadset.js";
import { PlayerAttack } from "../attack_boxes/player_attack.js";
import { MeshBox } from "../collisions/mesh_collision.js";
import { PosionAttack } from "../attack_boxes/posion_attack.js";

export class VirusProjectile extends Projectile {
  constructor(p, x, y, w, h, angle, set, curDir) {
    super(p, x, y, w, h, angle, set, curDir);
    this.deathAction = "explode";
    this.curDir = curDir;
  }

  // Enemy Width: 40
  // Enemy Height: 35
  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
      case "idle":
        return {
          complex: false,
          attack: [new PosionAttack(p, x + 0, y + 0, 40, 35, this, 20)],
          sprite: new LoadSet(this.set, "idle", 523, 512, x + -102, y + -113, 0.48, 0.48, 1, 6),
        };
      case "explode":
        return {
          complex: false,
          attack: [],
          sprite: new LoadSet(this.set, "explode", 523, 512, x + -102, y + -113, 0.48, 0.48, 1, 3),
        };
    }
  }

  draw(p, currentAnimation) {
    this.addAction(p, currentAnimation);
  }

  play(p) {
    if (this.curDir === "right") this.moveRight(30);
    else if (this.curDir === "left") this.moveLeft(30);
    this.draw(p, "idle");
  }

  apply(p, passIn) {
    if (this.state === "active") this.play(p);
    this.applyAllStates(p);
    this.applyCollision(p, passIn.collision);
  }
}
