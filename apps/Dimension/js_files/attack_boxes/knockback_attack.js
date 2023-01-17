import { MeshBox } from "../collisions/mesh_collision.js";
import { rectCollide } from "../math_functions/rect_collision.js";

export class KnockbackAttack extends MeshBox {
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

        if (obj.constructor.name === "Player") {
            // obj.hurtSound.volume = 1;
            // obj.hurtSound.play();
            // obj.currentTime = 0;
        }
    }

    // effect(p, obj) {
    //     obj.attack(obj, this.damage);
    //     //obj.hurtSound.play();

    //     var seekX = obj.x + obj.w / 2;
    //     var seekY = obj.y + obj.h / 2;
    //     var d;

    //     var e = new p.createVector(this.x + this.w / 2, this.y + this.h / 2);
    //     var py = new p.createVector(seekX, seekY);

    //     py.sub(e);

    //     d = p.dist(seekX, seekY, this.x, this.y);

    //     var dir = { x: py.x / d, y: py.y / d };

    //     // console.log(dir);

    //     obj.velocityX = dir.x * this.knockbackMult;
    //     obj.velocityY = - Math.abs(dir.x) * this.knockbackMult / 5;
    // }

    draw(p, obj) {

        this.obj = obj

        if (obj.spectMode) {
            p.noFill();
            p.stroke(255, 0, 0);
            p.rect(this.x, this.y, this.w, this.h);
        }
    }
}