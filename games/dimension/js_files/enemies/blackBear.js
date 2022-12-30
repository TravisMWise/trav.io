import { Attacker } from "../parent_classes/directory_export.js";
import { Sprite } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";
import { LoadSet } from "../parent_classes/loadset.js";


export class BlackBear extends Attacker {
    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadSet, leftBound, rightBound) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadSet);
        this.set = loadSet;
        this.leftBound = leftBound;
        this.rightBound = rightBound;
        this.deadState = false;
    }

    getAction(p, action, x = this.x, y = this.y) {
        switch (action) {
            case "idle_right":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x, this.y, this.w / 1.5, this.h / 1.5, this),
                    new MeshBox(p, this.x + this.w / 1.5, this.y + this.h / 8, this.w / 3, this.h / 2, this)],
                    sprite: new LoadSet(this.set, "idle", 858, 787, this.x - 160, this.y - 380, 1, 1, -1)
                };
            case "idle_left":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x + this.w / 3.11, this.y, this.w / 1.5, this.h / 1.5, this),
                    new MeshBox(p, this.x - this.w * 0.012, this.y + this.h / 8, this.w / 3, this.h / 2, this)],
                    sprite: new LoadSet(this.set, "idle", 858, 787, this.x - 160, this.y - 380, 1, 1, 1)
                };
            case "walk_left":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x + this.w / 3.11, this.y, this.w / 1.5, this.h / 1.5, this),
                    new MeshBox(p, this.x - this.w * 0.012, this.y + this.h / 8, this.w / 3, this.h / 2, this)],
                    sprite: new LoadSet(this.set, "walk", 858, 787, this.x - 160, this.y - 380, 1, 1, 1)
                };
            case "walk_right":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x, this.y, this.w / 1.5, this.h / 1.5, this),
                    new MeshBox(p, this.x + this.w / 1.5, this.y + this.h / 8, this.w / 3, this.h / 2, this)],
                    sprite: new LoadSet(this.set, "walk", 858, 787, this.x - 160, this.y - 380, 1, 1, -1)
                };
            case "run_left":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x + this.w / 3.11, this.y, this.w / 1.5, this.h / 1.5, this),
                    new MeshBox(p, this.x - this.w * 0.012, this.y + this.h / 8, this.w / 3, this.h / 2, this)],
                    sprite: new LoadSet(this.set, "run", 858, 787, this.x - 160, this.y - 380, 1, 1, 1, 3)
                };
            case "run_right":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x, this.y, this.w / 1.5, this.h / 1.5, this),
                    new MeshBox(p, this.x + this.w / 1.5, this.y + this.h / 8, this.w / 3, this.h / 2, this)],
                    sprite: new LoadSet(this.set, "run", 858, 787, this.x - 160, this.y - 380, 1, 1, -1, 3)
                };
            case "die_left":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x + this.w / 3.11, this.y, this.w / 1.5, this.h / 1.5, this),
                    new MeshBox(p, this.x - this.w * 0.012, this.y + this.h / 8, this.w / 3, this.h / 2, this)],
                    sprite: new LoadSet(this.set, "die", 858, 787, this.x - 160, this.y - 380, 1, 1, 1, 3)
                };
            case "die_right":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x, this.y, this.w / 1.5, this.h / 1.5, this),
                    new MeshBox(p, this.x + this.w / 1.5, this.y + this.h / 8, this.w / 3, this.h / 2, this)],
                    sprite: new LoadSet(this.set, "die", 858, 787, this.x - 160, this.y - 380, 1, 1, -1, 3)
                };
        }
    }

    updateStateMesh(p, player) {
        return {
        }
    }

    updateStateActions(p, player) {
        switch (this.currentAIState) {
            case "idle":
                this.currentState = "idle";
                this.paceIdle(this.leftBound, this.rightBound, 3);
                if (this.dist(p, this, player) < this.w * 2) this.currentAIState = "follow";
                break;
            case "follow":
                this.currentState = "follow";
                this.basicFollow(player, 6);
                if (this.dist(p, this, player) >= this.w * 2) this.currentAIState = "idle";
                if (this.dist(p, this, player) <= this.w / 2.5) this.currentAIState = "attack";
                break;
            case "dead":
                break;
        }
    }

    updateStateSprite(p, player) {
        var currentDir = "right"
        var override = ["idle_right", "idle_left", "run_right", "run_left", "walk_left", "walk_right", "die_left", "die_right"]

        if (this.velocityX > 0) { currentDir = "right" }
        else { currentDir = "left" }

        if (this.health >= 0) {
            if (this.currentAIState === "follow") {
                this.addAction(p, "run_" + currentDir, [], override)
            } else if (this.velocityX < 0.1 && this.velocityX > -0.1) {
                this.addAction(p, "idle_" + currentDir, [], override)
            } else {
                this.addAction(p, "walk_" + currentDir, [], override)
            }
        } else {
            this.currentAIState = "dead";
            if (!this.deadState) {
                this.addAction(p, "die_" + currentDir, [], override);
                player.restoreHealth += 20;
                this.deadState = true;
            }
        }
    }

    apply(p, passIn) {
        this.detectDamage(p, passIn.hit, passIn.player);
        this.applyPhysics(p, passIn.collision);
        this.applyAllStates(p, passIn.player);
        this.updateMovement(p);
    }
}