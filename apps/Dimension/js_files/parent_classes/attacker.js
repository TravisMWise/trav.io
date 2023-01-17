import { Pawn } from "./pawn.js";

export class Attacker extends Pawn {
    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, sounds) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, sounds);
        this.deadState = false;
    }
}