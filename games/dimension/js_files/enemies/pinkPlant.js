import { Passive, Sprite } from "../parent_classes/directory_export.js";
import { Pawn } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/mesh_collision.js";
import { LoadSet } from "../parent_classes/loadset.js";


export class PinkPlant extends Passive {
    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadSet, type) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10);
        this.set = loadSet;
        this.type = type;
    }

    getAction(p, action, x = this.x, y = this.y) {
        switch (action) {
            case "jump_plant":
                return {
                    complex: false,
                    attack: [],
                    body: [],
                    sprite: new LoadSet(this.set, "jump_plant", 512, 512, this.x + -51, this.y + -48, 0.32, 0.32, 1, 6),
                };
            case "jump_plant_2":
                return {
                    complex: false,
                    attack: [],
                    body: [],
                    sprite: new LoadSet(this.set, "jump_plant_2", 512, 512, this.x + -51, this.y + -48, 0.32, 0.32, 1, 6),
                };
        }
    }

    updateStateMesh(p, player) { return {} }

    updateStateActions(p, player) { }

    updateStateSprite(p, player) {
        this.addAction(p, this.type);
    }

    apply(p, passIn) {
        this.detectDamage(p, passIn.hit, passIn.player);
        this.applyPhysics(p, passIn.collision);
        this.applyAllStates(p, passIn.player);
        this.updateMovement(p);
    }
}