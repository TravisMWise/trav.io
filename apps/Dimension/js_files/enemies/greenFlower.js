import { Passive, Sprite } from "../parent_classes/directory_export.js";
import { Pawn } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/mesh_collision.js";
import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";


export class GreenFlower extends Passive {
    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadSet, type, dir) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10);
        this.set = loadSet;
        this.hit = false;
        this.hitTimer = 0;
        this.type = type;
        this.currentDir = dir;
    }

    // ["plant_1", "plant_2", "plant_3", "plant_4", "plant_5", "plant_6", "plant_7", "plant_poison", "plant_wind"];
    getAction(p, action, x = this.x, y = this.y) {
        switch (action) {
            case "plant_1_left":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + 0, this.y + 0, 37, 94),],
                    sprite: new LoadSet(this.set, "plant_1", 512, 512, this.x + -72, this.y + -45, 0.35, 0.35, 1, 6),
                };
            case "plant_2_left":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + -39, this.y + -1, 94, 94),],
                    sprite: new LoadSet(this.set, "plant_2", 512, 512, this.x + -72, this.y + -45, 0.35, 0.35, 1, 6),
                };
            case "plant_3_left":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + -36, this.y + 0, 95, 100),],
                    sprite: new LoadSet(this.set, "plant_3", 512, 512, this.x + -72, this.y + -45, 0.35, 0.35, 1, 6),
                };
            case "plant_4_left":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + 0, this.y + -25, 34, 128),],
                    sprite: new LoadSet(this.set, "plant_4", 512, 512, this.x + -63, this.y + -54, 0.35, 0.35, 1, 6),
                };
            case "plant_5_left":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + -4, this.y + -41, 50, 145),],
                    sprite: new LoadSet(this.set, "plant_5", 512, 512, this.x + -66, this.y + -54, 0.35, 0.35, 1, 6),
                };
            case "plant_6_left":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + -1, this.y + -41, 39, 141),],
                    sprite: new LoadSet(this.set, "plant_6", 512, 512, this.x + -66, this.y + -54, 0.35, 0.35, 1, 6),
                };
            case "plant_7_left":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + 3, this.y + -28, 38, 118),],
                    sprite: new LoadSet(this.set, "plant_7", 512, 512, this.x + -67, this.y + -56, 0.35, 0.35, 1, 6),
                };
            case "plant_poison_left":
                return {
                    complex: false,
                    // attack: [new GeneralAttack(p, this.x + -20, this.y + -10, 85, 103, 20),],
                    // body: [new MeshBox(p, this.x + -21, this.y + -10, 85, 103),],
                    sprite: new LoadSet(this.set, "plant_poison", 512, 512, this.x + -63, this.y + -35, 0.35, 0.35, 1, 6),
                };
            case "plant_wind_left":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + -17, this.y + -4, 75, 96),],
                    sprite: new LoadSet(this.set, "plant_wind", 512, 512, this.x + -90, this.y + -56, 0.35, 0.35, 1, 6),
                };
            case "plant_wind_right":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + -8, this.y + 0, 72, 88),],
                    sprite: new LoadSet(this.set, "plant_wind", 512, 512, this.x + -34, this.y + -54, 0.35, 0.35, -1, 6),
                };
            case "plant_poison_right":
                return {
                    complex: false,
                    // attack: [new GeneralAttack(p, this.x + -7, this.y + -4, 73, 93, 20),],
                    // body: [new MeshBox(p, this.x + -4, this.y + -3, 70, 91),],
                    sprite: new LoadSet(this.set, "plant_poison", 512, 512, this.x + -66, this.y + -38, 0.35, 0.35, -1, 6),
                };
            case "plant_7_right":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + 1, this.y + -3, 55, 110),],
                    sprite: new LoadSet(this.set, "plant_7", 512, 512, this.x + -54, this.y + -36, 0.35, 0.35, -1, 6),
                };
            case "plant_6_right":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + -1, this.y + -17, 56, 126),],
                    sprite: new LoadSet(this.set, "plant_6", 512, 512, this.x + -67, this.y + -32, 0.35, 0.35, -1, 6),
                };
            case "plant_4_right":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + 10, this.y + 0, 40, 107),],
                    sprite: new LoadSet(this.set, "plant_4", 512, 512, this.x + -67, this.y + -32, 0.35, 0.35, -1, 6),
                };
            case "plant_5_right":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + -1, this.y + -17, 68, 126),],
                    sprite: new LoadSet(this.set, "plant_5", 512, 512, this.x + -48, this.y + -29, 0.35, 0.35, -1, 6),
                };
            case "plant_3_right":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + -7, this.y + 9, 110, 104),],
                    sprite: new LoadSet(this.set, "plant_3", 512, 512, this.x + -48, this.y + -29, 0.35, 0.35, -1, 6),
                };
            case "plant_2_right":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + -7, this.y + 9, 110, 104),],
                    sprite: new LoadSet(this.set, "plant_2", 512, 512, this.x + -48, this.y + -29, 0.35, 0.35, -1, 6),
                };
            case "plant_1_right":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + 5, this.y + 4, 47, 101),],
                    sprite: new LoadSet(this.set, "plant_1", 512, 512, this.x + -58, this.y + -38, 0.35, 0.35, -1, 6),
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