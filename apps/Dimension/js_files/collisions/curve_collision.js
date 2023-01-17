import { Collision } from "../parent_classes/directory_export.js";

export class CurveCollision extends Collision {

    constructor(p, x1, y1, x2, y2, c) {
        super(p, 0, 0, 0, 0);
        this.x1 = x1; this.y1 = y1;
        this.x2 = x2; this.y2 = y2;
        this.c = c;

        if (this.c <= 0) {
            if (this.y1 <= this.y2) {
                this.x = this.x1 + 12;
                this.y = this.y1 - p.abs(this.c);
                this.w = this.x2 - this.x1 - 24;
                this.h = (this.y2 - this.y1) + p.abs(this.c);
            } else {
                this.x = this.x1 + 12;
                this.y = this.y2 - p.abs(this.c);
                this.w = this.x2 - this.x1 - 24;
                this.h = (this.y1 - this.y2) + p.abs(this.c);
            }
        } else {
            if (this.y1 <= this.y2) {
                this.x = this.x1 + 12;
                this.y = this.y1;
                this.w = this.x2 - this.x1 - 24;
                this.h = (this.y2 - this.y1) + p.abs(this.c);
            } else {
                this.x = this.x1 + 12;
                this.y = this.y2;
                this.w = this.x2 - this.x1 - 24;
                this.h = (this.y1 - this.y2) + p.abs(this.c);
            }
        }

        // create x, y, w, and h around curve
        // this.initialize(p);
    }

    draw(p) {
        if (this.c <= 0) {
            if (this.y1 <= this.y2) {
                this.x = this.x1 + 12;
                this.y = this.y1 - p.abs(this.c);
                this.w = this.x2 - this.x1 - 24;
                this.h = (this.y2 - this.y1) + p.abs(this.c);
            } else {
                this.x = this.x1 + 12;
                this.y = this.y2 - p.abs(this.c);
                this.w = this.x2 - this.x1 - 24;
                this.h = (this.y1 - this.y2) + p.abs(this.c);
            }
        } else {
            if (this.y1 <= this.y2) {
                this.x = this.x1 + 12;
                this.y = this.y1;
                this.w = this.x2 - this.x1 - 24;
                this.h = (this.y2 - this.y1) + p.abs(this.c);
            } else {
                this.x = this.x1 + 12;
                this.y = this.y2;
                this.w = this.x2 - this.x1 - 24;
                this.h = (this.y1 - this.y2) + p.abs(this.c);
            }
        }
    }

}