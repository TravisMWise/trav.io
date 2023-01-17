import { Sprite } from "../parent_classes/directory_export.js";
import { Attacker } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/mesh_collision.js";
import { GrabAttack } from "../attack_boxes/grab_attack.js";
import { rectCollide } from "../math_functions/rect_collision.js";
import { LoadSet } from "../parent_classes/loadset.js";

// shadow floater
export class Spider extends Attacker {

    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset, r) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadset);
        this.originX = x;
        this.originY = y;
        this.x = x - w / 4;
        this.y = y - w / 2;
        this.w = w;
        this.h = h;
        this.f = 0;
        this.r = r;
        this.set = loadset.spider;
        // this.sound = chapart.sounds;
        this.spiderWeb = loadset.spiderWeb;
        this.crawl = loadset.spidercrawl;
        this.hiss = loadset.spiderhiss;
        // this.sprite = new Sprite(chapart.images.spider, 126, 74, { "idle": { "id": 0, "frames": 1 }, "walking": { "id": 0, "frames": 8, "sound": this.sound.spider } })
        // this.spriteDead = new Sprite(chapart.images.spider, 93, 76, { "idle": { "id": 5, "frames": 1, "sound": this.sound.spiderhiss } })
    }

    getAction(p, action, x = this.x, y = this.y) {
        switch (action) {
            case "idle":
                return {
                    complex: false,
                    attack: [new GrabAttack(p, x, y, this.w, this.h, this, 8)],
                    body: [new MeshBox(p, x + 0, y + 0, 116, 108, this),],
                    sprite: new LoadSet(this.set, "idle", 501, 489, x + -16, y + -23, 0.3, 0.3, 1, 6),
                };
            case "move":
                return {
                    complex: false,
                    sound: this.crawl,
                    attack: [new GrabAttack(p, x, y, this.w, this.h, this, 8)],
                    body: [new MeshBox(p, x + 0, y + 0, 116, 108, this),],
                    sprite: new LoadSet(this.set, "move", 501, 489, x + -16, y + -23, 0.3, 0.3, 1, 6),
                };
            case "die":
                return {
                    complex: false,
                    sound: this.hiss,
                    attack: [],
                    body: [new MeshBox(p, x + 0, y + 0, 116, 108, this),],
                    sprite: new LoadSet(this.set, "die", 501, 489, x + -16, y + -23, 0.3, 0.3, 1, 6),
                };
        }
    }

    updateStateMesh(p, player) { return {} }

    updateStateActions(p, player) {

        switch (this.currentAIState) {
            case "idle":
                if (this.health <= 0) this.currentAIState = "dead";
                this.airFollow(p, { x: this.originX, y: this.originY, w: 0, h: 0 }, 3);
                if (this.dist(p, { x: this.originX, y: this.originY, w: 0, h: 0 }, player) < this.r) this.currentAIState = "follow";
                break;

            case "grab":
                if (this.health <= 0) this.currentAIState = "dead";
                this.airFollow(p, { x: this.originX, y: this.originY, w: 0, h: 0 }, 3);
                break;

            case "follow":
                if (this.health <= 0) this.currentAIState = "dead";
                this.airFollow(p, player, 3);
                //this.sprite.framejson.walking.sound.play();
                if (this.dist(p, { x: this.originX, y: this.originY, w: 0, h: 0 }, player) >= this.r) this.currentAIState = "idle";
                break;

            case "dead":
                this.velocityX = 0;
                this.velocityY = 0;
                break;
        }
    }

    updateStateSprite(p, player) {
        var override = ["idle", "move", "die"];

        if (this.health >= 0) {
            if ((this.velocityX < 0.5 && this.velocityX > -0.5 && this.velocityY < 0.5 && this.velocityY > -0.5) && !rectCollide(player, this)) {
                this.addAction(p, "idle", [], override);
                if (this.currentAIState === "grab") {
                    this.currentAIState = "idle";
                }
            } else {
                this.addAction(p, "move", [], override);
            }

            if (rectCollide(player, this)) {
                this.currentAIState = "grab";
            }
        } else {
            this.currentAIState = "dead";
            if (!this.deadState) {
                this.addAction(p, "die", [], override);
                //this.spriteDead.framejson.idle.sound.play();
                player.restoreHealth += 20;
                this.deadState = true;
            }
        }
    }

    draw(p) {
        p.push();
        p.angleMode(p.DEGREES);
        p.image(this.spiderWeb, this.originX - this.r, this.originY - this.r, this.r * 2, this.r * 2);
        p.push();
        p.translate(this.x, this.y);
        p.translate(this.w * -1.74, this.w * -0.99);
        p.scale(this.w / 100);
        p.pop();
        p.angleMode(p.RADIANS)
        p.pop();
    }

    apply(p, passIn) {
        this.draw(p);
        this.detectDamage(p, passIn.hit, passIn.player);
        this.applyBasicPhysics();
        this.applyAllStates(p, passIn.player);
        this.updateMovement(p);
    }
}