import { Collectable } from "../parent_classes/directory_export.js";

export class Sword extends Collectable {
    constructor(p, x, y, w, h) {
        super(p, x, y, w, h);
        this.powerInfo = 
        {
            name: "sword",
            description: "Slashing melee attack. Use to hit enemies with a close ranged attack!",
            cooldown: 10,
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
        if (obj.keys[88])
        {
            if (obj.currentDirection === "left")
                obj.addAction(p, "leftSword", ["leftSword", "rightSword"]);
            else if (obj.currentDirection === "right")
                obj.addAction(p, "rightSword", ["rightSword", "leftSword"]);
        }

    }

    apply(p, passIn) {
        this.draw(p);
    }
}