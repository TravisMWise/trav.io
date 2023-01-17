import { MeshBox } from "../collisions/mesh_collision.js";

export class LightningHitbox extends MeshBox {
    constructor(p, x, y, w, h, obj, damage) {
        super(p, x, y, w, h, obj);
        this.damage = damage;
    }

    effect(p, obj) {
        obj.attack(obj, this.damage);
        obj.currentState = "idle";
        obj.velocityY *= 0.1 * (Math.random() - 1);
        obj.velocityX = 0.4 * (Math.random() - 1);
    }

    draw(p, obj) {
        if (obj.spectMode) {
            p.noFill();
            p.stroke(255, 0, 0);
            p.rect(this.x, this.y, this.w, this.h);
        }
    }
}