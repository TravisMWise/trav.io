import { Attacker } from "./attacker.js";

export class Aggressive extends Attacker {
    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, sounds) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, sounds);
    }
}