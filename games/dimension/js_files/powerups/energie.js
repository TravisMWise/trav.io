import { Collectable } from "../parent_classes/directory_export.js";

export class Energie extends Collectable {
    constructor(p, x, y, w, h) {
        super(p, x, y, w, h);
        this.powerInfo = 
        {
            name: "énergie",
            description: "Bursts out a large blast around of energy. Hits back enemies. Useful against big enemies.",
            cooldown: 50,
        }
    }

    draw(p) {
        p.stroke(96, 157, 255, 100);
        p.strokeWeight(5);
        p.ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(15);
        p.text(this.constructor.name, this.x + this.w / 2, this.y + this.h / 2);
        p.strokeWeight(1);
        p.stroke(96, 157, 255);
        p.ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
        p.text(this.constructor.name, this.x + this.w / 2, this.y + this.h / 2);
    }

    effect(p, obj) {
        obj.powerupInformation.push(this.powerInfo);
        if (this.select(obj))
        {
            obj.addAction(p, "ice_shield_right");
            obj.addAction(p, "ice_shield_left");
        }
    }

    apply(p, passIn) {
        this.draw(p);
    }
}