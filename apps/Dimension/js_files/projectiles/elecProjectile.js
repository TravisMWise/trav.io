import { Projectile } from "../parent_classes/projectile.js";
import { LoadSet } from "../parent_classes/loadset.js";
import { PlayerAttack } from "../attack_boxes/player_attack.js";
import { MeshBox } from "../collisions/mesh_collision.js";

export class ElecProjectile extends Projectile {
  constructor(p, x, y, w, h, angle, set, curDir) {
    super(p, x, y, w, h, angle, set, curDir);
    this.type = type;
    this.deathAction = "pop";
    this.curDir = curDir;
  }

  //Enemy Width: 43
  //Enemy Height: 44
  getAction(p, action, x = this.x, y = this.y) {
    switch (action) {
      case "ball_left":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -1, y + -3, 40, 36, this, 20)],
          body: [],
          sprite: new LoadSet(this.set, "ball", 460, 282, x + -1, y + -2, 0.13, 0.13, -1, 6),
        };
      case "ball_right":
        return {
          complex: false,
          attack: [new GeneralAttack(p, x + -1, y + -3, 40, 36, this, 20)],
          body: [],
          sprite: new LoadSet(this.set, "ball", 460, 282, x + -15, y + 0, 0.13, 0.13, 1, 6),
        };
      case "pop":
        return {
          complex: false,
          attack: [],
          body: [],
          sprite: new LoadSet(this.set, "pop", 460, 282, x + -9, y + -12, 0.13, 0.13, 1, 6),
        };
    }
  }

  draw(p, currentAnimation) {
    this.addAction(p, currentAnimation);
  }

  play(p) {
    if (this.curDir === "right") this.moveRight(30);
    else if (this.curDir === "left") this.moveLeft(30);
    this.draw(p, "ball" + "_" + this.curDir);
  }

  apply(p, passIn) {
    if (this.state === "active") this.play(p);
    this.applyAllStates(p);
    this.applyCollision(p, passIn.collision);
  }
}
