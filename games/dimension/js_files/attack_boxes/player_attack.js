import { MeshBox } from "../collisions/mesh_collision.js";

export class PlayerAttack extends MeshBox {
    constructor(p, x, y, w, h, obj, damage, knockbackMult, direction) {
        super(p, x, y, w, h, obj);
        this.damage = damage;
        this.knockbackMult = knockbackMult;
        this.direction = direction;
    }

    effect(p, obj) {
        obj.attack(obj, this.damage);
        
        // switch (obj.constructor.name) {
        //     case "Beetle":
        //         obj.spriteDead.framejson.idle.sound.play();
        //         obj.stunned = true;
        //         obj.stunnedDelay = 0;
        //         obj.velocityX = (this.direction) * this.knockbackMult;
        //         break;
        //     case "Wolfs":
        //         obj.velocityY = -5;
        //         obj.velocityX = (this.direction) * this.knockbackMult;
        //         break;
        //     case "Spider":
        //         break;
        // }
    }

    draw(p, obj) {
        if (obj.spectMode) {
            p.noFill();
            p.stroke(255, 0, 0);
            p.rect(this.x, this.y, this.w, this.h);
        }
    }
}