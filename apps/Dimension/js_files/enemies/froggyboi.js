import { Sprite } from "../parent_classes/directory_export.js";
import { Pawn } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/mesh_collision.js";

export class FroggyBoi extends Pawn {

    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, chapart) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, chapart);
        this.sprite = new Sprite(chapart.images.froggyBoi, 139, 122, { "idle": { "id": 0, "frames": 1 }, "walk": { "id": 1, "frames": 6 }, "hit": { "id": 5, "frames": 1 } }) // Only separate if the dim are off
        this.spriteStunned = new Sprite(chapart.images.froggyBoi, 155, 117.5, { "idle": { "id": 4, "frames": 1 } })
        this.stunned = false;
        this.stunnedDelay = 0;
    }


    updateStateMesh(p, player) {
        return {
            idle: {
                body: [new MeshBox(p, this.x, this.y, this.w, this.h, this)]
            },
            follow: {
                body: [new MeshBox(p, this.x, this.y, this.w, this.h, this)]
            },
            stunned: {
                body: [new MeshBox(p, this.x, this.y, this.w, this.h, this)]
            }
        };
    }

    updateStateActions(p, player) {
        switch (this.currentAIState) {
            case "idle":
                this.currentState = "idle";
                if (this.stunned) {
                    this.currentAIState = "stunned";
                } else if (this.dist(p, this, player) < this.w * 2 && this.dist(p, this, player) >= this.w / 1.75) {
                    this.currentAIState = "follow";
                }
                break;
            case "follow":
                this.currentState = "follow";
                this.basicFollow(player, 2);
                if (this.stunned) {
                    this.currentAIState = "stunned";
                } else if (this.dist(p, this, player) >= this.w * 2 || this.dist(p, this, player) <= this.w / 1.75) {
                    this.currentAIState = "idle";
                }
                break;
            case "stunned":
                this.currentState = "stunned";
                this.stunnedDelay++;
                if (this.stunnedDelay >= 40) {
                    this.stunned = false;
                    this.stunnedDelay = 0;
                    this.currentAIState = "idle";
                }
                break;
        }
    }

    updateStateSprite(p, player) {
        if (this.velocityX > 0) {
            this.sprite.changeScale(-1);
            this.spriteStunned.changeScale(-1);
        } else {
            this.sprite.changeScale(1);
            this.spriteStunned.changeScale(1);
        }
        if (this.currentState === "idle") {
            this.sprite.draw(this.x, this.y, 1, 1, p);
            this.sprite.changeStage("idle");
        } else if (this.currentState === "follow") {
            this.sprite.draw(this.x, this.y, 1, 1, p);
            this.sprite.changeStage("walk");
        } else if (this.currentState === "stunned") {
            this.spriteStunned.draw(this.x, this.y, 1, 1, p);
        }
    }

    getAction(p, action, x = this.x, y = this.y) { }

    apply(p, passIn) {
        this.detectDamage(p, passIn.hit, passIn.player);
        this.applyPhysics(p, passIn.collision); // Need gravity so applyPhysics not applyBasicPhysics
        this.applyAllStates(p, passIn.player);
        this.updateMovement(p);
    }
}