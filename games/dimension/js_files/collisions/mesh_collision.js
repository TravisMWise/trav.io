import { Collision } from "../parent_classes/collision.js";

export class MeshBox extends Collision {
    constructor(p, x, y, w, h, obj) {
        super(p, x, y, w, h);
        this.obj = obj;
    }

    effect(p, obj) {

    }

    draw(p, obj, player) {
        if (obj.spectMode) {
            p.noFill();
            p.stroke(0, 255, 0);
            p.rect(this.x, this.y, this.w, this.h);
        }
    }
}