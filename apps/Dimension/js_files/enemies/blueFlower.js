import { Passive, Sprite } from "../parent_classes/directory_export.js";
import { Pawn } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/mesh_collision.js";
import { LoadSet } from "../parent_classes/loadset.js";


export class BlueFlower extends Passive {
    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadSet, type, dir) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10);
        this.set = loadSet;
        this.hit = false;
        this.hitTimer = 0;
        this.type = type;
        this.currentDir = dir;
    }

    getAction(p, action, x = this.x, y = this.y) {
        switch (action) {
            case "flower_left":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + 0, this.y + 0, 89, 77),],
                    sprite: new LoadSet(this.set, "flower", 768, 768, this.x + -58, this.y + -71, 0.24, 0.24, 1, 4),
                };
            case "flower_closed_left":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + 0, this.y + 0, 89, 77),],
                    sprite: new LoadSet(this.set, "flower_closed", 768, 768, this.x + -58, this.y + -71, 0.24, 0.24, 1, 4),
                };
            case "flower_closed_right":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + 0, this.y + 0, 89, 77),],
                    sprite: new LoadSet(this.set, "flower_closed", 768, 768, this.x + -28, this.y + -74, 0.24, 0.24, -1, 4),
                };
            case "flower_right":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + 0, this.y + 0, 89, 77),],
                    sprite: new LoadSet(this.set, "flower", 768, 768, this.x + -28, this.y + -74, 0.24, 0.24, -1, 4),
                };
        }
    }

    updateStateMesh(p, player) { return {} }

    updateStateActions(p, player) { }

    updateStateSprite(p, player) {
        this.addAction(p, this.type + "_" + this.currentDir);
    }

    apply(p, passIn) {
        this.detectDamage(p, passIn.hit, passIn.player);
        this.applyPhysics(p, passIn.collision);
        this.applyAllStates(p, passIn.player);
        this.updateMovement(p);
    }
}