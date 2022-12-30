import { LoadSet } from "../parent_classes/loadset.js";
import { GeneralAttack } from "../attack_boxes/general_attack.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";
import { KnockbackAttack } from "../attack_boxes/knockback_attack.js";
import { SmashAttack } from "../attack_boxes/smash_attack.js";


export class ForestDemon extends Attacker {
    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, leftBound, rightBound, s) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10);
        this.set = loadset.set;
        this.greenBurst = loadset.splash;
        this.roar = loadset.treeroar
        this.punch = loadset.treepunch
        this.walk = loadset.treewalk
        this.smash = loadset.treesmash
        this.hurt = loadset.treehurt
        this.obj = loadset.obj

        this.s = s;
        this.origy = y;
        this.origx = x;


        this.leftBound = leftBound;
        this.rightBound = rightBound;
        this.health = health;
        this.hit = false;
        this.hitTimer = 0;
        this.runSpeed = 10;
        this.currentDir = "left";
        this.bool["stomp"] = false;
        this.bool["hit"] = false;
        this.bool["roar"] = false;
        this.bool["dead"] = false;
        this.lastAction;
    }

    //Enemy Width: 115 
    //Enemy Height: 340
    getAction(p, action, x = this.x, y = this.y) {
        switch (action) {
            case "idle_left":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, x + 40, y + 0, 340 - 80, 373, this),],
                    sprite: new LoadSet(this.set, "idle", 968, 690, x + -276, y + -218, 1, 1, 1, 6),
                };
            case "die_left":
                return {
                    complex: false,
                    attack: [],
                    body: [],
                    sprite: new LoadSet(this.set, "die", 968, 690, x + -276, y + -218, 1, 1, 1, 6),
                };
            case "walk_left":
                return {
                    complex: false,
                    sound: this.walk,
                    attack: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100),],
                    body: [new MeshBox(p, x + 40, y + 0, 340 - 80, 373, this),],
                    sprite: new LoadSet(this.set, "walk", 968, 690, x + -276, y + -218, 1, 1, 1, 6),
                };
            case "idle_right":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, x + 40, y + 0, 340 - 80, 373, this),],
                    sprite: new LoadSet(this.set, "idle", 968, 690, x + -348, y + -216, 1, 1, -1, 6),
                };
            case "die_right":
                return {
                    complex: false,
                    attack: [],
                    body: [],
                    sprite: new LoadSet(this.set, "die", 968, 690, x + -348, y + -216, 1, 1, -1, 6),
                };
            case "walk_right":
                return {
                    complex: false,
                    sound: this.walk,
                    attack: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100),],
                    body: [new MeshBox(p, x + 40, y + 0, 340 - 80, 373, this),],
                    sprite: new LoadSet(this.set, "walk", 968, 690, x + -348, y + -216, 1, 1, -1, 6),
                };
            case "stomp_left":
                return {
                    complex: true,
                    sound: this.smash,
                    attack: {
                        1: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100)],
                        5: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100)],
                        10: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100)],
                        15: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100)],
                        20: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100)],
                        25: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100)],
                        29: [new SmashAttack(p, x + -142, y + 263, 353, 109, this, 20, 300, -1, 50),
                            new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100)],
                    },
                    body: [new MeshBox(p, x + 0, y + 0, 303, 372, this),],
                    sprite: new LoadSet(this.set, "jump_stomp", 968, 690, x + -276, y + -219, 1, 1, 1, 4),
                };
            case "stomp_right":
                return {
                    complex: true,
                    sound: this.smash,
                    attack: {
                        1: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100)],
                        5: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100)],
                        10: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100)],
                        15: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100)],
                        20: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100)],
                        25: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100)],
                        29: [new SmashAttack(p, x + 120, y + 263, 353, 109, this, 20, 300, 1, 50),
                            new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100)],
                    },
                    body: [new MeshBox(p, x + 38, y + 0, 303, 372, this),],
                    sprite: new LoadSet(this.set, "jump_stomp", 968, 690, x + -363, y + -221, 1, 1, -1, 4),
                };
            case "hit_left":
                return {
                    complex: true,
                    sound: this.punch,
                    attack: {
                        1: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100)],
                        2: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100)],
                        4: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100)],
                        6: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100)],
                        8: [new KnockbackAttack(p, x + -272, y + 104, 273, 121, this, 20, 300, -1, 50),
                            new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100)],
                    },
                    body: [new MeshBox(p, x + 40, y + 0, 308 - 80, 373, this),],
                    sprite: new LoadSet(this.set, "attack_2", 968, 690, x + -274, y + -218, 1, 1, 1, 3),
                };
            case "hit_right":
                return {
                    complex: true,
                    sound: this.punch,
                    attack: {
                        1: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100)],
                        2: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100)],
                        4: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100)],
                        6: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100)],
                        8: [new KnockbackAttack(p, x + 339, y + 102, 273, 121, this, 20, 300, 1, 50),
                            new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100)],
                    },
                    body: [new MeshBox(p, x + 32 + 40, y + 1, 308 - 80, 373, this),],
                    sprite: new LoadSet(this.set, "attack_2", 968, 690, x + -354, y + -218, 1, 1, -1, 3),
                };
            case "roar_left":
                return {
                    complex: false,
                    sound: this.roar,
                    attack: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, -1, 100),],
                    body: [new MeshBox(p, x + 40, y + 0, 340 - 80, 373, this),],
                    sprite: new LoadSet(this.set, "roar", 968, 690, x + -283, y + -216, 1, 1, 1, 3),
                };
            case "roar_right":
                return {
                    complex: false,
                    sound: this.roar,
                    attack: [new KnockbackAttack(p, x + 60, y + 0, 340 - 120, 373, this, 10, 300, 1, 100),],
                    body: [new MeshBox(p, x + 40, y + 0, 340 - 80, 373, this),],
                    sprite: new LoadSet(this.set, "roar", 968, 690, x + -343, y + -218, 1, 1, -1, 3),
                };
            case "splash":
                return {
                    complex: false,
                    attack: [],
                    sound: this.hurt,
                    body: [],
                    sprite: new LoadSet(this.greenBurst, "", 498, 475, x + -99, y + -65, 1, 1, 1, 2),
                };
        }
    }

    updateStateMesh(p, player) { return {} }

    updateStateActions(p, player) {
        var attacks = ["stomp_right", "roar_right", "hit_right", "stomp_left", "roar_left", "hit_left"];
        switch (this.currentAIState) {
            case "idle":
                this.currentAIState = "follow";
                break;
            case "follow":
                this.basicFollow(player, this.s);
                if (this.health <= 0) this.currentAIState = "dead";
                else if (this.lastAction === "stomp") this.currentAIState = "roar";
                else if (this.dist(p, this, player) <= this.w * 0.8 && (player.velocityY < -1 || player.y + player.h < this.y + this.h / 1.5)) this.currentAIState = "hit";
                else if (this.dist(p, this, player) <= this.w * 0.8 && player.y > this.y + this.h / 2) this.currentAIState = "stomp";
                break;
            case "stomp":
                if (!this.isAction(p, ["stomp_left", "stomp_right"]) && !this.bool["stomp"]) {
                    this.bool["stomp"] = true;
                    this.lastAction = "stomp";
                    this.currentAIState = "acting";
                }
                break;
            case "roar":
                if (!this.isAction(p, ["roar_left", "roar_right"]) && !this.bool["roar"]) {
                    this.bool["roar"] = true;
                    this.lastAction = "roar";
                    this.currentAIState = "acting";
                }
                break;
            case "hit":
                if (!this.isAction(p, ["hit_left", "hit_right"]) && !this.bool["hit"]) {
                    this.bool["hit"] = true;
                    this.lastAction = "hit";
                    this.currentAIState = "acting";
                }
                break;
            case "acting":
                if (!this.isAction(p, attacks) && !(this.bool["hit"] && this.bool["roar"] && this.bool["stomp"])) {
                    this.currentAIState = "follow";
                } else {
                    this.bool["hit"] = false;
                    this.bool["roar"] = false;
                    this.bool["stomp"] = false;
                }
                break;
            case "dead":
                break;
        }
    }

    updateStateSprite(p, player) {
        var movementActions = ["walk_left", "walk_right", "idle_left", "idle_right", "run_left", "run_right"];
        var attackActions = ["stomp_right", "roar_right", "hit_right", "stomp_left", "roar_left", "hit_left"];

        if(this.obj.treeIsDead)
            this.currentAIState = "dead"
        
        if(this.takenDamage) { this.addAction(p, "splash", [], []); this.takenDamage = false; }

        if (this.bool["roar"]) {
            this.addAction(p, "roar_" + this.currentDir, [], movementActions);
            this.walk.volume = 0;
        } else if (this.bool["hit"]) {
            this.addAction(p, "hit_" + this.currentDir, [], movementActions);
            this.walk.volume = 0;
        } else if (this.bool["stomp"]) {
            this.addAction(p, "stomp_" + this.currentDir, [], movementActions);
            this.walk.volume = 0;
        }

        if (Math.abs(this.velocityX) >= 6) {
            this.addAction(p, "run_" + this.currentDir, attackActions, movementActions);
        } else if (Math.abs(this.velocityX) > 0.1) {
            this.addAction(p, "walk_" + this.currentDir, attackActions, movementActions);
            this.walk.volume = 0.3;
        } else if (this.currentAIState !== "dead") {
            this.addAction(p, "idle_" + this.currentDir, attackActions, movementActions);
        } else if (!this.bool["dead"]) {
            this.addAction(p, "die_" + this.currentDir, [], movementActions);
            this.bool["dead"] = true;
            this.obj.treeIsDead = true;
        }
    }



    apply(p, passIn) {
        this.detectDamage(p, passIn.hit, passIn.player);
        this.applyPhysics(p, passIn.collision);
        this.applyAllStates(p, passIn.player);
        this.updateMovement(p);
    }
}