import { MeshBox } from "../collisions/mesh_collision.js";

export class GrabAttack extends MeshBox {
    constructor(p, x, y, w, h, obj, damage) {
        super(p, x, y, w, h, obj);
        this.damage = damage;
    }

    effect(p, obj) {
        obj.attack(obj, this.damage);
        obj.x = this.x + this.w / 2 - obj.w / 2;
        obj.y = this.y + this.h / 2 - obj.h / 2;
        obj.hurtSound.play();
    }

    draw(p, obj) {
        if (obj.spectMode) {
            p.noFill();
            p.stroke(255, 0, 0);
            p.rect(this.x, this.y, this.w, this.h);
        }
    }
}