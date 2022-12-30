import { Collectable } from "../parent_classes/directory_export.js";

export class Fly extends Collectable {
    constructor(p, x, y, w, h) {
        super(p, x, y, w, h);
        this.timer = 0;
    }

    draw(p) {
        p.stroke(255, 255, 255);
        p.textSize(25);
        p.ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
        p.text(this.constructor.name, this.x, this.y - 10);
    }

    effect(obj) {
        if (obj.keys[20]) {
            obj.velocityY = -5;
        }
    }

    apply(p, passIn) {
        this.draw(p);
    }
}