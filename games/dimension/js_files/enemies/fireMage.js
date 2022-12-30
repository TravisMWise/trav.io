import { Passive, Sprite } from "../parent_classes/directory_export.js";
import { Pawn } from "../parent_classes/directory_export.js";
import { MeshBox } from "../collisions/mesh_collision.js";
import { LoadSet } from "../parent_classes/loadset.js";

export class FireMage extends Passive {
    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, loadSet) {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10);
        this.set = loadSet.mage;
        this.currentDir = "left";

        this.talkable = true;
        this.talkSound = loadSet.talksound;
        this.talkBoxOffset = {
            w: 300,
            h: 300,
        }
        this.talkMessages = [
            "Hello little one.",
            "Welcome to the grass land of Askoroth! You have a lot to learn little one.",
            "You are new to this world, but... what really is a world?",
            "For us wizards, we don't live in one particular place... Rather, we live amongst the dimensions.",
            "We keep the dimensions safe from unwanted guests... Such enemies bring threat to a dimension's life!",
            "Behind me is a doorway to such an enemy...",
            "I doubt you are ready to triumph over such a threat... but, you are the great master's son... if anyone can do it, you can! You are our only hope little one!",
            "Good luck!"
        ]
    }

    getAction(p, action, x = this.x, y = this.y) {
        switch (action) {
            case "idle_left":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + 0, this.y + 0, 43, 126),],
                    sprite: new LoadSet(this.set, "idle", 884, 671, this.x + -121, this.y + -47, 0.3, 0.3, 1, 5),
                };
            case "idle_right":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + 0, this.y + 0, 43, 126),],
                    sprite: new LoadSet(this.set, "idle", 884, 671, this.x + -99, this.y + -48, 0.3, 0.3, -1, 5),
                };
        }
    }

    updateStateMesh(p, player) { return {} }

    updateStateActions(p, player) {
        switch (this.currentAIState) {
            case "idle":
                break;
        }
    }

    updateStateSprite(p, player) {
        let override = ["idle_left", "idle_right"];
        this.addAction(p, "idle_" + this.currentDir, [], override);
    }

    apply(p, passIn) {
        this.detectDamage(p, passIn.hit, passIn.player);
        this.applyPhysics(p, passIn.collision);
        this.applyAllStates(p, passIn.player);
        this.updateMovement(p);
    }
}