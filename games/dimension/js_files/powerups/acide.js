import { Collectable } from "../parent_classes/directory_export.js";

export class Acide extends Collectable {
    constructor(p, x, y, w, h) {
        super(p, x, y, w, h);
        this.powerInfo = 
        {
            name: "acide",
            description: "Acid. Be careful!",
            cooldown: 30,
        }
    }

    draw(p) {
        p.stroke(255, 255, 255, 100);
        p.strokeWeight(5);
        p.ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(15);
        p.text(this.constructor.name, this.x + this.w / 2, this.y + this.h / 2);
        p.strokeWeight(1);
        p.stroke(255, 255, 255);
        p.ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
        p.text(this.constructor.name, this.x + this.w / 2, this.y + this.h / 2);
    }

    effect(p, obj) {
        obj.powerupInformation.push(this.powerInfo);
    }

    apply(p, passIn) {
        this.draw(p);
    }
}