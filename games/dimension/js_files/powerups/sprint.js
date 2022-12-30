import { Collectable } from "../parent_classes/directory_export.js";

export class Sprint extends Collectable {
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

    /** Keys
     * [49] - 1
     * [50] - 2
     * [51] - 3
     * [52] - 4
     * [16] - Shift
     * [81] - q
     * [69] - e
     * [82] - r
     * [70] - f
     * 
     */
    effect(obj) {
        if (obj.keys[16]) {
            obj.speed = 30;
        } else {
            obj.speed = 5;
        }
    }

    apply(p, passIn) {
        this.draw(p);
    }
}