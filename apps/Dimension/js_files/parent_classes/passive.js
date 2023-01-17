import { Pawn } from "./pawn.js";
import { Sprite } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/mesh_collision.js";
import { LoadSet } from "../parent_classes/loadset.js";

export class Passive extends Pawn {
    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadSet, leftBound, rightBound) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10);
        this.set = loadSet;
        this.leftBound = leftBound;
        this.rightBound = rightBound;
        this.spriteW = 0;
        this.spriteH = 0;
        this.x_offset = 0;
        this.y_offset = -50;
        this.scale = 0.25;
        this.health = health;
        this.hit = false;
        this.hitTimer = 0;
        this.currentDir = "right";
        this.runSpeed = 10;
        this.randomResult = 0;
    }

    getAction(p, action) { }
    updateStateMesh(p, player) { return {} }
    updateStateActions(p, player) { }
    updateStateSprite(p, player) { }

    attack(obj, damage) {
        if (obj.damageBoolean === true) {
            obj.health -= damage;
        }
        this.hit = true;
        this.hitTimer = 0;
        if (Math.random() < 0.5) {
            this.randomResult = 0;
        } else {
            this.randomResult = 1;
        }
    }

    apply(p, passIn) { }
}
