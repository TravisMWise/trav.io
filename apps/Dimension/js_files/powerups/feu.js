import { Collectable } from "../parent_classes/directory_export.js";

export class Feu extends Collectable {
    constructor(p, x, y, w, h) {
        super(p, x, y, w, h);
        this.powerInfo = 
        {
            name: "feu",
            description: "Wide flame. Useful against large crowds of enemies.",
            cooldown: 50,
        }
    }

    draw(p) {
        p.stroke(255, 68, 71, 100);
        p.strokeWeight(5);
        p.ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(15);
        p.text(this.constructor.name, this.x + this.w / 2, this.y + this.h / 2);
        p.strokeWeight(1);
        p.stroke(255, 68, 71);
        p.ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
        p.text(this.constructor.name, this.x + this.w / 2, this.y + this.h / 2);
    }

    effect(p, obj) {
        obj.powerupInformation.push(this.powerInfo);
        if (this.select(obj))
        {
            if (obj.currentDirection === "left")
                obj.addAction(p, "flame_effects_red_left", ["flame_effects_red_left", "flame_effects_red_right"]);
            else if (obj.currentDirection === "right")
                obj.addAction(p, "flame_effects_red_right", ["flame_effects_red_right", "flame_effects_red_left"]);
        }
        
    }

    apply(p, passIn) {
        this.draw(p);
    }
}