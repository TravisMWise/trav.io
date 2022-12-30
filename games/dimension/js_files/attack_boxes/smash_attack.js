import { MeshBox } from "../collisions/mesh_collision.js";
import { rectCollide } from "../math_functions/rect_collision.js";

export class SmashAttack extends MeshBox {
    constructor(p, x, y, w, h, obj, damage, knockbackMult, direction, shakePower = 10) {
        super(p, x, y, w, h, obj);
        this.damage = damage;
        this.knockbackMult = knockbackMult;
        this.direction = direction;
        this.shakePower = shakePower;
    }

    effect(p, obj) {
        obj.attack(obj, this.damage);
        obj.velocityY = -2;
        obj.velocityX = (this.direction) * this.knockbackMult;

        if (rectCollide(obj, this)) {
            obj.takenDamage = true;
            this.obj.startScreenShake(this.shakePower);
        }
    }


    draw(p, obj) {

        obj.startScreenShake(this.shakePower);

        this.obj = obj

        if (obj.spectMode) {
            p.noFill();
            p.stroke(255, 0, 0);
            p.rect(this.x, this.y, this.w, this.h);
        }
    }
}