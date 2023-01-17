import { Passive, Sprite } from "../parent_classes/directory_export.js";
import { Pawn } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/mesh_collision.js";
import { LoadSet } from "../parent_classes/loadset.js";


export class Snail extends Passive {
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
        this.runSpeed = 10;
        this.currentDir = "left";
        this.randomResult = 0;
    }

    getAction(p, action, x = this.x, y = this.y) {
        switch (action) {
            case "idle_left":
                return {
                    complex: false,
                    attack: [],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h, this),
                    ],
                    sprite: new LoadSet(this.set, "idle", this.spriteW, this.spriteH, this.x - 30, this.y + -30, this.scale, this.scale, 1, 9, null)
                };
            case "idle_right":
                return {
                    complex: false,
                    attack: [],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h, this),
                    ],
                    sprite: new LoadSet(this.set, "idle", this.spriteW, this.spriteH, this.x + this.w + 30, this.y + -30, this.scale, this.scale, -1, 9, null)
                };
            case "walk_left":
                return {
                    complex: false,
                    attack: [],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h, this),
                    ],
                    sprite: new LoadSet(this.set, "move", this.spriteW, this.spriteH, this.x - 30, this.y + -30, this.scale, this.scale, 1, 6, null, 0.5)
                };
            case "walk_right":
                return {
                    complex: false,
                    attack: [],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h, this),
                    ],
                    sprite: new LoadSet(this.set, "move", this.spriteW, this.spriteH, this.x + this.w + 30, this.y + -30, this.scale, this.scale, -1, 6, null, 0.5)
                };
            case "in_shell_left":
                return {
                    complex: false,
                    attack: [],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h, this),
                    ],
                    sprite: new LoadSet(this.set, "in_shell", this.spriteW, this.spriteH, this.x - 30, this.y + -30, this.scale, this.scale, 1, 3, null, 0.5)
                };
            case "in_shell_right":
                return {
                    complex: false,
                    attack: [],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h, this),
                    ],
                    sprite: new LoadSet(this.set, "in_shell", this.spriteW, this.spriteH, this.x + this.w + 30, this.y + -30, this.scale, this.scale, -1, 3, null, 0.5)
                };
            case "die_left":
                return {
                    complex: false,
                    attack: [],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h, this),
                    ],
                    sprite: new LoadSet(this.set, "die", this.spriteW, this.spriteH, this.x - 30, this.y + -30, this.scale, this.scale, 1, 3, null, 0.5)
                };
            case "die_right":
                return {
                    complex: false,
                    attack: [],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h),
                    ],
                    sprite: new LoadSet(this.set, "die", this.spriteW, this.spriteH, this.x + this.w + 30, this.y + -30, this.scale, this.scale, -1, 3, null, 0.5)
                };
        }
    }

    updateStateMesh(p, player) { return {} }

    updateStateActions(p, player) {
        switch (this.currentAIState) {
            case "idle":
                this.currentAIState = "paceIdle";
                this.paceIdle(this.leftBound, this.rightBound, 3);
                break;
            case "paceIdle":
                this.paceIdle(this.leftBound, this.rightBound, 3);
                if (this.hit === true) {
                    this.currentAIState = "hit";
                }
                break;
            case "hit":
                this.hitTimer++;
                if (this.hitTimer >= 200) {
                    this.hit = false;
                    this.hitTimer = 0;

                    this.currentAIState = "idle";
                } else {
                    // In shell
                    // So do nothing
                    // Increase defense when implemented
                }
                break;
            case "dead":
                // Animation stopped in pawn class in applyActions
                break;
        }
    }

    updateStateSprite(p, player) {
        var override = ["idle_right", "idle_left", "walk_left", "walk_right", "in_shell_left", "in_shell_right"];

        if (this.velocityX > 0) { this.currentDir = "right" }
        else { this.currentDir = "left" }

        if (this.health >= 0) {
            if (this.hit) {
                if (this.x > player.x) {
                    this.currentDir = "right";
                    this.addAction(p, "in_shell_left", [], override);
                } else {
                    this.currentDir = "left";
                    this.addAction(p, "in_shell_right", [], override);
                }
            } else {
                if (Math.abs(this.velocityX) > 0.1) {
                    this.addAction(p, "walk_" + this.currentDir, [], override);
                } else {
                    this.addAction(p, "idle_" + this.currentDir, [], override);
                }
            }
        } else {
            this.currentAIState = "dead";
            if (!this.deadState) {
                this.addAction(p, "die_" + this.currentDir, [], override);
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