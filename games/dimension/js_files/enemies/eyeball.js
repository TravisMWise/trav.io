import { Attacker, Passive, Sprite } from "../parent_classes/directory_export.js";
import { Pawn } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/mesh_collision.js";
import { LoadSet } from "../parent_classes/loadset.js";
import { KnockbackAttack } from "../attack_boxes/knockback_attack.js"
import { playAudio } from "../math_functions/play_audio.js";
import { rectCollide } from "../math_functions/rect_collision.js";

export class EyeBall extends Attacker {
    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadSet, leftBound, rightBound) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10);
        this.set = loadSet.eyeball;
        this.eyeballdie = loadSet.eyeballdie;
        this.eyeballmove = loadSet.eyeballmove;
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
        this.runSpeed = 2;
        this.currentDir = "left"
        this.health = 500;
    }

    getAction(p, action, x = this.x, y = this.y) {
        switch (action) {
            case "idle_left":
                return {
                    complex: false,
                    attack: [new KnockbackAttack(p, x, y, this.w, this.h, this, 10, 35, -1, 10)],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h, this),
                    ],
                    sprite: new LoadSet(this.set, "idle", this.spriteW, this.spriteH, this.x - 60, this.y + -30, this.scale, this.scale, 1, 6, null)
                };
            case "idle_right":
                return {
                    complex: false,
                    attack: [new KnockbackAttack(p, x, y, this.w, this.h, this, 10, 35, 1, 10)],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h, this),
                    ],
                    sprite: new LoadSet(this.set, "idle", this.spriteW, this.spriteH, this.x + this.w + 60, this.y + -30, this.scale, this.scale, -1, 6, null)
                };
            case "walk_left":
                return {
                    complex: false,
                    attack: [new KnockbackAttack(p, x, y, this.w, this.h, this, 10, 35, -1, 10)],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h, this),
                    ],
                    sprite: new LoadSet(this.set, "move", this.spriteW, this.spriteH, this.x - 60, this.y + -30, this.scale, this.scale, 1, 8 , null, 0.5)
                };
            case "walk_right":
                return {
                    complex: false,
                    attack: [new KnockbackAttack(p, x, y, this.w, this.h, this, 10, 35, 1, 10)],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h, this),
                    ],
                    sprite: new LoadSet(this.set, "move", this.spriteW, this.spriteH, this.x + this.w + 60, this.y + -30, this.scale, this.scale, -1, 8, null, 0.5)
                };
            case "run_left":
                return {
                    complex: false,
                    attack: [new KnockbackAttack(p, x, y, this.w, this.h, this, 10, 35, -1, 10)],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h, this),
                    ],
                    sprite: new LoadSet(this.set, "move", this.spriteW, this.spriteH, this.x - 60, this.y + -30, this.scale, this.scale, 1, 8 , null, 0.5)
                };
            case "run_right":
                return {
                    complex: false,
                    attack: [new KnockbackAttack(p, x, y, this.w, this.h, this, 10, 35, 1, 10)],
                    body: [
                        new MeshBox(p, this.x, this.y, this.w, this.h, this),
                    ],
                    sprite: new LoadSet(this.set, "move", this.spriteW, this.spriteH, this.x + this.w + 60, this.y + -30, this.scale, this.scale, -1, 8 , null, 0.5)
                };
            case "die_left":
                return {
                    complex: false,
                    sound: this.eyeballdie,
                    attack: [],
                    body: [],
                    sprite: new LoadSet(this.set, "die", this.spriteW, this.spriteH, this.x - 60, this.y + -30, this.scale, this.scale, 1, 3, null, 0.5)
                };
            case "die_right":
                return {
                    complex: false,
                    sound: this.eyeballdie,
                    body: [],
                    sprite: new LoadSet(this.set, "die", this.spriteW, this.spriteH, this.x + this.w + 60, this.y + -30, this.scale, this.scale, -1, 3, null, 0.5)
                };
        }
    }

    updateStateMesh(p, player) { return {} }

    updateStateActions(p, player) {
        switch (this.currentAIState) {
            case "idle":
                if (this.health <= 0) this.currentAIState = "dead";
                 else if (this.distX(p, this, player) < this.w * 7 && this.distY(p, this, player) < this.h * 2) {
                   this.currentAIState = "follow";
                }else this.paceIdle(this.leftBound, this.rightBound, 1);
                break;
            case "follow":
                this.basicFollow(player, 1);
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
                    if (this.currentDir == "left") {
                        this.moveLeft(this.runSpeed);
                    } else {
                        this.moveRight(this.runSpeed);
                    }
                }
                break;
            case "dead":
                // Animation stopped in pawn class in applyActions
                break;
        }
    }

    updateStateSprite(p, player) {

        var override = ["idle_right", "idle_left", "walk_left", "walk_right", "run_left", "run_right"];

        if (this.health >= 0) {
            if (this.hit) {
                if (this.x + this.w / 2 > player.x + player.w / 2) {
                    this.currentDir = "right";
                    this.addAction(p, "run_right", [], override);
                    this.eyeballmove.play();
                } else {
                    this.currentDir = "left";
                    this.addAction(p, "run_left", [], override);
                    this.eyeballmove.play();
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
                player.restoreHealth += 50;
                this.deadState = true;
            }
        }
    }

    attack(obj, damage) {
        if (obj.damageBoolean === true) {
            obj.health -= damage;
        }
        this.hit = true;
        this.hitTimer = 0;
    }


    apply(p, passIn) {
        this.detectDamage(p, passIn.hit, passIn.player);
        this.applyPhysics(p, passIn.collision);
        this.applyAllStates(p, passIn.player);
        this.updateMovement(p);
    }
}