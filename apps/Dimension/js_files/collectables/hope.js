import { Collectable } from "../parent_classes/directory_export.js";
import { Sprite } from "../parent_classes/directory_export.js";

// class for dove
export class Hope extends Collectable {

    constructor(p, x, y, w, h, chapart) {

        super(p, x, y, w, h);
        this.originy = y;
        this.s = 40;
        this.anim = this.s;
        this.fadeIn = 0;
        this.spriteImage = chapart.images.hope;
        this.sound = chapart.sounds;
        this.sprite = new Sprite(this.spriteImage, 207, 220, { "idle": { "id": 0, "frames": 7, "sound": this.sound.doveS } })
        this.soundEffect = false;
    }
    effect(obj) {
        // give player something cool
    }
    draw(p) {

        // if collect start effect
        if (this.collected === true) {
            p.noStroke();
            p.fill(255, 255, 255, 50 - this.fadeIn);
            p.ellipse(this.x + this.s / 2, this.originy + this.fadeIn / 2, this.fadeIn * 1.5, this.fadeIn * 1.5);
            p.ellipse(this.x + this.s / 2, this.originy + this.fadeIn / 2, this.fadeIn, this.fadeIn);
            p.ellipse(this.x, this.originy, this.fadeIn, this.fadeIn);
            p.ellipse(this.x + this.fadeIn, this.originy, this.fadeIn, this.fadeIn);
            this.y -= 3;
            this.fadeIn += 2;

            if (!this.soundEffect) this.sprite.framejson.idle.sound.play();

            this.soundEffect = true;
        }

        this.sprite.draw(this.x - 32, this.y - 40, 0.5, 0.5, p);
    }
    apply(p, passIn) {
        this.draw(p);
    }
}
