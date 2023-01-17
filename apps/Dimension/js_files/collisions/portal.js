import { Pawn } from "../parent_classes/directory_export.js";
import { Sprite } from "../parent_classes/directory_export.js";

export class Portal extends Pawn {

    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, chapart, portX, portY) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, chapart);
        this.particles = { x: [], y: [], s: [], r: [], upAmount: [] };
        this.portalAccess = false;
        this.sprite = new Sprite(chapart.images.portal, 135, 130, { "idle": { "id": 0, "frames": 5 } })
        this.portX = portX;
        this.portY = portY;
    }

    draw(p) {
        this.sprite.draw(this.x - this.w / 5, this.y - this.h / 5, this.w / 100, this.h / 100, p);
    }
};