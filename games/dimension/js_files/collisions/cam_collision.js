import { Collision } from "../parent_classes/directory_export.js";

export class CamBox extends Collision {

    constructor(spanX, spanY, spanSize, p, x, y, w, h, obj) {
        super(p, x, y, w, h);
        this.spanX = spanX; this.spanY = spanY;
        this.spanSize = spanSize;
    }

    draw() {

    }
}