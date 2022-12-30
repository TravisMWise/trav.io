import { Attacker } from "../parent_classes/directory_export.js";
import { Sprite } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/directory_export.js";
import { KnockbackAttack } from "../attack_boxes/knockback_attack.js";
import { rectCollide } from "../math_functions/rect_collision.js";

export class Beetle extends Attacker {

    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, chapart, leftBound, rightBound, speed) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, chapart);
        this.s = speed;
        this.leftBound = leftBound; this.rightBound = rightBound;
        this.currentAIState = "left";
        this.sound = chapart.sounds;
        this.sprite = new Sprite(chapart.images.beetle, 38, 37, { "idle": { "id": 2, "frames": 5, "sound": this.sound.beetle } })
        this.spriteDead = new Sprite(chapart.images.beetle, 38, 37, { "idle": { "id": 2, "frames": 1, "sound": this.sound.beetledies } })
        this.spriteDead.offset = 5;
        this.stunned = false;
        this.stunnedDelay = 0;
    }

    updateStateMesh(p, player) {
        return {
            idle:
            {
                attack: [new KnockbackAttack(p, this.x + this.w / 2, this.y, this.w / 2, this.h, this, 10, 30, 1),
                new KnockbackAttack(p, this.x, this.y, this.w / 2, this.h, 10, this, 30, -1),
                new KnockbackAttack(p, this.x + 10, this.y - 10, this.w - 20, this.h - 10, this, 10, 0, -1)],
                body: [new MeshBox(p, this.x, this.y, this.w, this.h)]
            },
            dead:
            {
                attack: [],
                body: []
            }
        };
    }

    updateStateActions(p, player) {
        switch (this.currentAIState) {
            case "left":
                if (!this.deadState && rectCollide(player, { x: this.leftBound, y: this.y, w: this.rightBound, h: this.h }))
                    this.sprite.framejson.idle.sound.play();

                this.moveLeft(this.s);
                if (this.x <= this.leftBound) {
                    this.currentAIState = "right";
                    this.currentDirection = "right";
                }
                if (this.stunned) this.currentAIState = "stunned";
                break;

            case "right":
                if (!this.deadState && rectCollide(player, { x: this.leftBound, y: this.y, w: this.rightBound, h: this.h }))
                    this.sprite.framejson.idle.sound.play();

                this.moveRight(this.s);
                if (this.x >= this.rightBound) {
                    this.currentAIState = "left";
                    this.currentDirection = "left";
                }
                if (this.stunned) this.currentAIState = "stunned";
                break;

            case "stunned":
                this.sprite.stageProgress = 0;
                this.stunnedDelay++;
                if (this.stunnedDelay >= 80) {
                    this.stunned = false;
                    this.stunnedDelay = 0;

                    if (this.currentDirection === "left") this.currentAIState = "left";
                    else if (this.currentDirection === "right") this.currentAIState = "right";
                }
                break;

            case "dead":
                this.currentState = "dead";
                break;
        }
    }

    updateStateSprite(p, player) {
        if (this.health > 0) {
            this.sprite.draw(this.x - 12, this.y - 24, 2.2, 2.2, p);
            if (this.currentAIState === "left") {
                this.sprite.changeScale(-1);
                this.spriteDead.changeScale(-1);
            }
            else if (this.currentAIState === "right") {
                this.sprite.changeScale(1);
                this.spriteDead.changeScale(1);
            }
        } else {
            this.spriteDead.draw(this.x - 12, this.y - 12, 2.2, 2.2, p);

            this.currentAIState = "dead";

            if (!this.deadState) {
                this.spriteDead.framejson.idle.sound.play();
                player.restoreHealth += 20;
                this.deadState = true;
            }
        }
    }

    getAction(p, action, x = this.x, y = this.y) { }

    apply(p, passIn) {
        this.detectDamage(p, passIn.hit, passIn.player);
        this.applyPhysics(p, passIn.collision);
        this.applyAllStates(p, passIn.player);
        this.updateMovement(p);
    }


}