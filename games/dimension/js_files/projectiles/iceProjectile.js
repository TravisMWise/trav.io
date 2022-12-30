import { Projectile } from "../parent_classes/projectile.js";
import { LoadSet } from "../parent_classes/loadset.js";
import { PlayerAttack } from "../attack_boxes/player_attack.js";
import { MeshBox } from "../collisions/mesh_collision.js";

export class IceProjectile extends Projectile {
    constructor(p, x, y, w, h, set, curDir, type) {
        super(p, x, y, w, h, set, curDir);
        this.type = type;
    }

    getAction(p, action, x = this.x, y = this.y) {
        switch (action) {
            case "shard_left":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x + 0, this.y + 0, 40, 22, this, 20),],
                    sprite: new LoadSet(this.set, "shard", 323, 123, this.x + -3, this.y + 1, 0.21, 0.21, 1, 2),
                };
            case "arrow_left":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x + 0, this.y + 0, 40, 22, this, 20),],
                    sprite: new LoadSet(this.set, "arrow", 323, 123, this.x + -3, this.y + -2, 0.21, 0.21, 1, 2),
                };
            case "shard_right":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x + 0, this.y + 0, 40, 22, this, 20),],
                    sprite: new LoadSet(this.set, "shard", 323, 123, this.x + -34, this.y + 2, 0.21, 0.21, -1, 2),
                };
            case "arrow_right":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x + 0, this.y + 0, 40, 22, this, 20),],
                    sprite: new LoadSet(this.set, "arrow", 323, 123, this.x + -37, this.y + -2, 0.21, 0.21, -1, 2),
                };
        }
    }


    draw(p, currentAnimation) {
        this.addAction(p, currentAnimation);
    }

    play(p) {
        if (this.curDir === "right")
            this.moveRight(30);
        else if (this.curDir === "left")
            this.moveLeft(30);
        this.draw(p, this.type + "_" + this.curDir);
    }

    apply(p, passIn) {
        if (this.state === "active")
            this.play(p);
        this.applyAllStates(p);
        this.applyCollision(p, passIn.collision);
    }
}