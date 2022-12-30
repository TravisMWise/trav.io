import { Actor } from "./actor.js";

export class Collectable extends Actor {
    constructor(p, x, y, w, h) {
        super(p, x, y, w, h);
        this.collected = false;
        this.isBuff = false;
        this.buffTimer = 0;
        this.buffDuration = 100;
        this.resetInfo;
    }

    effect(obj) {

    }

    setup(obj) {
        
    }

    reset(passIn) {

    }

    apply(p, passIn) {

    }

    select(obj)
    {
        return obj.keys[67]  && ((obj.powerupBinding[1] === this.powerInfo.name && obj.currentPower === 1) ||  (obj.powerupBinding[2] === this.powerInfo.name && obj.currentPower === 2))
    }
}