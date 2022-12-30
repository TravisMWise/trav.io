import { MeshBox } from "../collisions/mesh_collision.js";
import { rectCollide } from "../math_functions/rect_collision.js";

export class PosionAttack extends MeshBox {
    constructor(p, x, y, w, h, obj, damage) {
        super(p, x, y, w, h, obj);
        this.damage = damage;
    }

    effect(p, obj) {
        obj.attack(obj, this.damage);
        obj.addStatus("posioned", 100);
    }

    draw(p, obj, player) {

        if(rectCollide(player, this))
        {
            obj.startScreenShake(50);
        }

        if (obj.spectMode) {
            p.noFill();
            p.stroke(255, 0, 0);
            p.rect(this.x, this.y, this.w, this.h);
        }
    }
}