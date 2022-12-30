import { Pawn } from "../parent_classes/directory_export.js";
import { Sprite } from "../parent_classes/directory_export.js";

export class Transition extends Pawn {

    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, chapart, levelSwitch, playerX, playerY) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, chapart);
        this.particles = { x: [], y: [], s: [], r: [], upAmount: [] };
        // this.sprite = new Sprite(chapart.images.portal, 135, 130, { "idle": { "id": 0, "frames": 5 } })
        this.levelSwitch = levelSwitch;
        this.state - false;
        this.playerX = playerX;
        this.playerY = playerY;
    }

    draw(p) {
        p.noStroke();
        p.fill(255, 255, 255, 5);
        for (var i = 0; i < 50; i += 5) {
            p.rect(this.x - i, this.y, this.w + i * 2, this.h)
        }
    }
};