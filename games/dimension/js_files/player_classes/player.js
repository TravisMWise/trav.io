import { Attacker, Projectile } from "../parent_classes/directory_export.js";
import { bezierCollisionPoint, rectCollide } from "../math_functions/directory_export.js";
import { Sprite } from "../parent_classes/sprite.js";
import { MeshBox } from "../collisions/mesh_collision.js";
import { PlayerAttack } from "../attack_boxes/player_attack.js";
import { LightningHitbox } from "../attack_boxes/lightning_hitbox.js";
import { KnockbackAttack } from "../attack_boxes/knockback_attack.js";
import { LoadSet } from "../parent_classes/loadset.js";
import { IceProjectile } from "../projectiles/iceProjectile.js";
import { playAudio } from "../math_functions/play_audio.js";
import { Sword } from "../powerups/sword.js";

export class Player extends Attacker {
    constructor(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 6, capY = 10, chapart, loadsets, currentDirection = "right") {
        super(p, x, y, w, h, level, health, weight, damageBoolean = true, capX = 20, capY = 10, chapart);
        this.origy = y;
        this.origx = x;
        this.speedOff = 1;
        this.healthBarColor = p.color(255, 255, 255, 200);
        this.attackSwing = false;
        this.attackSwingDelay = 0;
        this.numJumped = 0;
        this.restoreHealth = 80;
        this.sound = chapart.sounds;
        this.swordImage = chapart.images.sword;
        this.focus = chapart.images.focus;
        this.healImage = chapart.images.heal;
        this.keys = [];
        this.currentDirection = currentDirection;
        this.toggleHeal = false;
        this.hurtSound = this.sound.playerhurt;
        this.slashSound = this.sound.playerslash;
        this.electroPalmAttack = chapart.images.electroPalmAttack;
        this.currentPower = 1;
        this.currentClass = 1;
        this.heal = new Sprite(this.healImage, 192, 190, { "idle": { "id": 0, "frames": 5, "sound": this.sound.playerheal } });
        this.transitionable = true;
        this.transitionTimer = 0;
        this.player = loadsets.player;
        this.iceEffects = loadsets.iceEffects;
        this.iceProjectiles = loadsets.iceProjectiles;
        this.flameEffects = loadsets.flameEffects;
        this.electricAttacks = loadsets.electricAttacks;
        this.jumpAnimation = loadsets.jumpAnimation;
        this.orbs = loadsets.orbs;
        this.currentSound = "grass";
        this.currentMorph = "player";
        this.morphedRecently = false;
        this.manticore = loadsets.manticore;
        this.forestDemon = loadsets.forestDemon;
        this.morphSwapOverride = [];
        this.isPlayer = true;

        this.inventory = [new Sword(p, 400, 600, 60, 60)]
        this.powerupBinding = ["sword", "", ""];

        this.powerupInformation = [];


        this.morphs = {
            player: {
                idle_left: "idle_left",
                idle_right: "idle_right",
                walk_left: "walk_left",
                walk_right: "walk_right",
                dash_right: "dash_right",
                dash_left: "dash_left",
                jump_left: "jump_left",
                jump_right: "jump_right",
                all: ["jump_left", "jump_right", "dash_right", "dash_left", "idle_left", "idle_right", "walk_left", "walk_right"]
            },
            manticore: {
                idle_left: "manticore_idle_left",
                idle_right: "manticore_idle_right",
                walk_left: "manticore_walk_left",
                walk_right: "manticore_walk_right",
                dash_right: "manticore_run_right",
                dash_left: "manticore_run_left",
                jump_left: "manticore_fly_left",
                jump_right: "manticore_fly_right",
                all: ["manticore_idle_left", "manticore_idle_right", "manticore_walk_left", "manticore_walk_right", "manticore_run_left", "manticore_run_right", "manticore_fly_left", "manticore_fly_right"],
            },
            forest_demon: {
                idle_left: "forest_demon_idle_left",
                idle_right: "forest_demon_idle_right",
                walk_left: "forest_demon_walk_left",
                walk_right: "forest_demon_walk_right",
                dash_right: "forest_demon_run_right",
                dash_left: "forest_demon_run_left",
                jump_left: "forest_demon_jump_left",
                jump_right: "forest_demon_jump_right",
                all: ["forest_demon_idle_left", "forest_demon_idle_right", "forest_demon_walk_left", "forest_demon_walk_right", "forest_demon_run_left", "forest_demon_run_right", "forest_demon_jump_left", "forest_demon_jump_right"],
            }
        }
        this.dashing = false;
        this.dashingTimer = 0;
        this.dashingDelay = 0;
        this.dashSpeed = 50;
        this.walkSpeed = 15;
        this.canMorph = true;
        this.morphTimer = 0;
        this.orbX = 0
        this.orbY = 0
        this.transitionOrb = 0;
        this.particles = { x: [], y: [], s: [], r: [], upAmount: [] };
        this.stamina = 100;
    }

    speedOffset(offset) {
        this.speedOff = offset;
    }

    updateStateMesh(p, player) { return {}; }

    updateStateActions(p, player) {

        if (this.keys[16] && !this.dashing && this.dashingDelay <= 0 && this.stamina >= 25) {
            this.dashing = true
            this.stamina -= 25;
        }

        this.stamina += 0.3;

        this.stamina = p.constrain(this.stamina, 0, 100)

        this.dashingDelay--;

        if (this.dashingDelay <= 0) {
            this.dashingDelay = 0;
        }

        if (this.dashing) {
            this.dashingTimer++;
            this.velocityY = 0;
        }

        if (this.dashingTimer >= 10) {
            this.dashing = false;
            this.dashingTimer = 0;
            this.dashingDelay = 20;
        }

        if ((this.keys[37]) && !((this.keys[39]))) { // If we are moving left 
            this.currentDirection = "left";
            if (!this.dashing) this.moveLeft(this.walkSpeed / this.speedOff);
        } else if ((this.keys[39]) && !((this.keys[37]))) { // If we are moving right
            this.currentDirection = "right";
            if (!this.dashing) this.moveRight(this.walkSpeed / this.speedOff);
        }

        if (!this.canMorph) {
            this.morphTimer++;
            if (this.morphTimer > 200) {
                this.morphTimer = 0;
                this.canMorph = true;
            }
        }

        // Orbs
        switch (this.currentClass) {
            case 1: this.addAction(p, "white_orb", [], ["white_orb", "purple_orb", "yellow_orb"]); break;
            case 2: this.addAction(p, "purple_orb", [], ["white_orb", "purple_orb", "yellow_orb"]); break;
            case 3: this.addAction(p, "yellow_orb", [], ["white_orb", "purple_orb", "yellow_orb"]); break;
        }


        if (this.canJump) { // If we are jumping
            if ((this.keys[90])) {
                if (this.currentDirection === "left") { // If we are moving left while jumping
                    this.doJump(75);
                    this.addAction(p, "jump_effect", [], [], this);
                    this.addAction(p, this.morphs[this.currentMorph].jump_left, [], this.canMorph ? this.morphs[this.currentMorph].all : this.morphs[this.currentMorph].all.concat(this.morphSwapOverride));
                } else if (this.currentDirection === "right") { // If we are moving right while jumping
                    this.doJump(75);
                    this.addAction(p, "jump_effect", [], [], this);
                    this.addAction(p, this.morphs[this.currentMorph].jump_right, [], this.canMorph ? this.morphs[this.currentMorph].all : this.morphs[this.currentMorph].all.concat(this.morphSwapOverride));
                }
            } else if (this.dashing && this.canJump) {
                if ((this.keys[37] || this.currentDirection === "left") && !(this.keys[39])) { // If we are not jumping and moving left
                    this.moveLeft(this.dashSpeed / this.speedOff);
                    this.addAction(p, "jump_effect_right", [], [], this);
                    this.addAction(p, this.morphs[this.currentMorph].dash_left, [], this.canMorph ? this.morphs[this.currentMorph].all : this.morphs[this.currentMorph].all.concat(this.morphSwapOverride));
                } else if ((this.keys[39] || this.currentDirection === "right") && !(this.keys[37])) { // If we are not jumping and moving right
                    this.moveRight(this.dashSpeed / this.speedOff);
                    this.addAction(p, "jump_effect_left", [], [], this);
                    this.addAction(p, this.morphs[this.currentMorph].dash_right, [], this.canMorph ? this.morphs[this.currentMorph].all : this.morphs[this.currentMorph].all.concat(this.morphSwapOverride));
                } else {
                    if (this.currentDirection === "left") {
                        this.addAction(p, this.morphs[this.currentMorph].idle_left, [], this.morphs[this.currentMorph].all);
                    } else if (this.currentDirection === "right") {
                        this.addAction(p, this.morphs[this.currentMorph].idle_right, [], this.morphs[this.currentMorph].all);
                    }
                }
            } else if ((this.keys[37]) && !(this.keys[39] || this.dashing)) { // If we are not jumping and moving left
                this.addAction(p, this.morphs[this.currentMorph].walk_left, [], this.canMorph ? this.morphs[this.currentMorph].all : this.morphs[this.currentMorph].all.concat(this.morphSwapOverride));
                if (this.jump) {
                    this.addAction(p, "jump_effect_right", [], [], this);
                }
            } else if ((this.keys[39]) && !(this.keys[37] || this.dashing)) { // If we are not jumping and moving right
                this.addAction(p, this.morphs[this.currentMorph].walk_right, [], this.canMorph ? this.morphs[this.currentMorph].all : this.morphs[this.currentMorph].all.concat(this.morphSwapOverride));
                if (this.jump) {
                    this.addAction(p, "jump_effect_left", [], [], this);
                }
            } else if (this.canJump && Math.abs(this.velocityX) <= 2) {
                if (this.currentDirection === "left") {
                    this.addAction(p, this.morphs[this.currentMorph].idle_left, [], this.canMorph ? this.morphs[this.currentMorph].all : this.morphs[this.currentMorph].all.concat(this.morphSwapOverride));
                } else if (this.currentDirection === "right") {
                    this.addAction(p, this.morphs[this.currentMorph].idle_right, [], this.canMorph ? this.morphs[this.currentMorph].all : this.morphs[this.currentMorph].all.concat(this.morphSwapOverride));
                }
            }
        } else { // this.jump is false so we are still in the air after a jump
            if (this.dashing) {
                if ((this.keys[37] || this.currentDirection === "left") && !(this.keys[39])) { // If we are not jumping and moving left
                    this.moveLeft(this.dashSpeed / this.speedOff);
                    this.addAction(p, this.morphs[this.currentMorph].dash_left, [], this.canMorph ? this.morphs[this.currentMorph].all : this.morphs[this.currentMorph].all.concat(this.morphSwapOverride));
                } else if ((this.keys[39] || this.currentDirection === "right") && !(this.keys[37])) { // If we are not jumping and moving right
                    this.moveRight(this.dashSpeed / this.speedOff);
                    this.addAction(p, this.morphs[this.currentMorph].dash_right, [], this.canMorph ? this.morphs[this.currentMorph].all : this.morphs[this.currentMorph].all.concat(this.morphSwapOverride));
                }
            } else if (!this.dashing && this.currentDirection === "left") { // If we are moving left while jumping
                this.addAction(p, this.morphs[this.currentMorph].jump_left, [], this.canMorph ? [this.morphs[this.currentMorph].jump_right, this.morphs[this.currentMorph].dash_right, this.morphs[this.currentMorph].dash_left] : [this.morphs[this.currentMorph].all, ... this.morphSwapOverride]);
            } else if (this.currentDirection === "right") { // If we are moving right while jumping
                this.addAction(p, this.morphs[this.currentMorph].jump_right, [], this.canMorph ? [this.morphs[this.currentMorph].jump_left, this.morphs[this.currentMorph].dash_right, this.morphs[this.currentMorph].dash_left] : [this.morphs[this.currentMorph].all, ... this.morphSwapOverride]);
            }
        }

        // Can we heal
        if (this.keys[81] && this.restoreHealth > 0 && this.health < 100) {
            this.toggleHeal = true;
        }

        // Heal
        if (this.toggleHeal) {
            this.addAction("heal", ["blank"]);
            this.restoreHealth -= 1;
            this.health += 0.5;

            if (this.restoreHealth <= 0 || this.health >= 100) {
                this.toggleHeal = false;
            }
        }

        // SoundBoxes
        switch (this.currentSound) {
            case "grass":
                if ((this.keys[37] || this.keys[39]) && this.jump) {
                    this.sound.walk.play();
                    this.sound.walk.volume = 0.1;
                }
                break;

            case "stone":
                if ((this.keys[37] || this.keys[39]) && this.jump) {
                    this.sound.stone.play();
                    this.sound.stone.volume = 0.02;
                }
                break;
        }

        // Select spell keybindings
        // Normal numbers 0-9
        for (let i = 49; i < 51; i++) {
            if (this.keys[i]) {
                this.currentPower = i - 48;
            }
        }

        // Ability key bindings
        // if (this.keys[88] && this.currentMorph === "player") {
        //     switch (this.currentClass) {
        //         case 1: // Elemental
        //             switch (this.currentPower) {
        //                 case 1:
        //                     if (this.currentDirection === "left")
        //                         this.addAction(p, "leftSword", ["leftSword", "rightSword"]);
        //                     else if (this.currentDirection === "right")
        //                         this.addAction(p, "rightSword", ["rightSword", "leftSword"]);
        //                     break;
        //                 case 2:
        //                     if (this.currentDirection === "left")
        //                         this.addAction(p, "flame_effects_red_left", ["flame_effects_red_left", "flame_effects_red_right"]);
        //                     else if (this.currentDirection === "right")
        //                         this.addAction(p, "flame_effects_red_right", ["flame_effects_red_right", "flame_effects_red_left"]);
        //                     break;
        //                 case 3:
        //                     this.addAction(p, "ice_shield_right");
        //                     this.addAction(p, "ice_shield_left");
        //                     break;
        //                 case 4:
        //                     if (this.currentDirection === "left") {
        //                         this.shoot(p, "arrow_left", ["arrow_left", "arrow_right"]);
        //                     }
        //                     else if (this.currentDirection === "right") {
        //                         this.shoot(p, "arrow_right", ["arrow_right", "arrow_left"]);
        //                     }
        //                     break;
        //                 case 5:
        //                     if (this.currentDirection === "left") {
        //                         this.shoot(p, "shard_left", ["shard_left", "shard_right"]);
        //                     }
        //                     else if (this.currentDirection === "right") {
        //                         this.shoot(p, "shard_right", ["shard_right", "shard_left"]);
        //                     }
        //                     break;
        //                 case 6:
        //                     this.addAction(p, "explode", [], [], this);
        //                     break;
        //                 case 7:
        //                     this.addAction(p, "spark_explode", [], [], this);
        //                     break;
        //                 case 8:
        //                     if (this.currentDirection === "left" && this.jump) {
        //                         this.addAction(p, "ice_shard_wave_left", ["ice_shard_wave_left", "ice_shard_wave_right"], [], this);
        //                     }
        //                     else if (this.currentDirection === "right" && this.jump) {
        //                         this.addAction(p, "ice_shard_wave_right", ["ice_shard_wave_right", "ice_shard_wave_left"], [], this);
        //                     }
        //                     break;
        //             }
        //             break;
        //         case 2: // Dark
        //             switch (this.currentPower) {
        //                 case 1:
        //                     if (this.canMorph) {
        //                         this.morphedRecently = !this.morphedRecently;
        //                         this.canMorph = false;
        //                         this.morphSwapOverride = this.morphs[this.currentMorph].all;
        //                         this.currentMorph = "manticore";
        //                     }
        //                     break;
        //                 case 2:
        //                     if (this.canMorph) {
        //                         this.morphedRecently = !this.morphedRecently;
        //                         this.canMorph = false;
        //                         this.morphSwapOverride = this.morphs[this.currentMorph].all;
        //                         this.currentMorph = "forest_demon";
        //                     }
        //                     break;
        //             }
        //             break;
        //         case 3: // Energy
        //             switch (this.currentPower) {
        //                 case 1:
        //                     if (this.currentDirection === "left")
        //                         this.addAction(p, "leftSword", ["leftSword", "rightSword"]);
        //                     else if (this.currentDirection === "right")
        //                         this.addAction(p, "rightSword", ["rightSword", "leftSword"]);
        //                     break;
        //             }
        //             break;
        //     }
        // } 
        /*else */if (this.keys[88] && this.currentMorph === "manticore") {
            switch (this.currentPower) {
                case 1:
                    if (this.canMorph) {
                        this.morphedRecently = !this.morphedRecently;
                        this.canMorph = false;
                        this.morphSwapOverride = this.morphs[this.currentMorph].all;
                        this.currentMorph = "player";
                    }
                    break;
            }
        } else if (this.keys[88] && this.currentMorph === "forest_demon") {
            switch (this.currentPower) {
                case 2:
                    if (this.canMorph) {
                        this.morphedRecently = !this.morphedRecently;
                        this.canMorph = false;
                        this.morphSwapOverride = this.morphs[this.currentMorph].all;
                        this.currentMorph = "player";
                    }
                    break;
            }
        }
    }

    updateStateSprite(p, player) { }

    getProjectile(p, projectiles, passIn = {}) {
        switch (projectiles) {
            case "shard_left":
                return {
                    projectile: new IceProjectile(p, this.x, this.y + this.h / 5, 323 / 2, 123 / 2, this.iceProjectiles, this.currentDirection, "shard"),
                    delay: 30
                }
            case "shard_right":
                return {
                    projectile: new IceProjectile(p, this.x, this.y + this.h / 5, 323 / 2, 123 / 2, this.iceProjectiles, this.currentDirection, "shard"),
                    delay: 30
                }
            case "arrow_left":
                return {
                    projectile: new IceProjectile(p, this.x, this.y + this.h / 5, 323 / 2, 123 / 2, this.iceProjectiles, this.currentDirection, "arrow"),
                    delay: 30
                }
            case "arrow_right":
                return {
                    projectile: new IceProjectile(p, this.x, this.y + this.h / 5, 323 / 2, 123 / 2, this.iceProjectiles, this.currentDirection, "arrow"),
                    delay: 30
                }
            default:
                return {}
        }
    }

    getAction(p, action, x = this.x, y = this.y) {

        switch (action) {
            // Movement
            case "idle_left":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x + -8.5, this.y + 0.012018203735351562, 30, 90, this),],
                    sprite: new LoadSet(this.player, "idle", 512, 512, this.x + -79, this.y + -70, 0.34, 0.34, -1, 6),
                };
            case "idle_right":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x + -8.5, this.y + 0.012018203735351562, 30, 90, this),],
                    sprite: new LoadSet(this.player, "idle", 512, 512, this.x + -79, this.y + -70, 0.34, 0.34, 1, 6),
                };
            case "jump_right":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x + -8.5, this.y + 0.012018203735351562, 30, 90),],
                    sprite: new LoadSet(this.player, "jump", 512, 512, this.x + -79, this.y + -70, 0.34, 0.34, 1, 6),
                };
            case "jump_left":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x + -8.5, this.y + 0.012018203735351562, 30, 90),],
                    sprite: new LoadSet(this.player, "jump", 512, 512, this.x + -79, this.y + -70, 0.34, 0.34, -1, 6),
                };
            case "walk_left":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x + -8.5, this.y + 0.012018203735351562, 30, 90),],
                    sprite: new LoadSet(this.player, "walk", 512, 512, this.x + -79, this.y + -70, 0.34, 0.34, -1, 6),
                };
            case "walk_right":
                return {
                    complex: false,
                    attack: [],
                    body: [new MeshBox(p, this.x + -8.5, this.y + 0.012018203735351562, 30, 90),],
                    sprite: new LoadSet(this.player, "walk", 512, 512, this.x + -79, this.y + -70, 0.34, 0.34, 1, 6),
                };
            case "dash_left":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + -8.5, this.y + 0.012018203735351562, 30, 90, this),],
                    sprite: new LoadSet(this.player, "dash3", 512, 512, this.x + -79, this.y + -70, 0.34, 0.34, -1, 2),
                };
            case "dash_right":
                return {
                    complex: false,
                    attack: [],
                    // body: [new MeshBox(p, this.x + -8.5, this.y + 0.012018203735351562, 30, 90, this),],
                    sprite: new LoadSet(this.player, "dash3", 512, 512, this.x + -79, this.y + -70, 0.34, 0.34, 1, 2),
                };
            //
            // UI
            //
            case "heal":
                return {
                    complex: false,
                    attack: [],
                    sound: this.heal.framejson.idle.sound,
                    body: [],
                    sprite: new Sprite(this.healImage, 192, 190, { "idle": { "id": 0, "frames": 5 } }, this.x - 66, this.y - 56, 0.8, 0.8)
                };
            case "purple_orb":
                return {
                    complex: false,
                    sprite: new LoadSet(this.orbs, "purple_orb", 795, 778, this.orbX, this.orbY, 0.09, 0.09, 1, 6),
                }
            case "white_orb":
                return {
                    complex: false,
                    sprite: new LoadSet(this.orbs, "white_orb", 795, 778, this.orbX, this.orbY, 0.09, 0.09, 1, 6),
                }
            case "yellow_orb":
                return {
                    complex: false,
                    sprite: new LoadSet(this.orbs, "yellow_orb", 795, 778, this.orbX, this.orbY, 0.09, 0.09, 1, 6),
                }

            //
            // Attacks
            //
            case "leftSword":
                return {
                    complex: true,
                    delay: 40,
                    sound: this.slashSound,
                    attack:
                    {
                        3: [new KnockbackAttack(p, x - this.w * 6, y - 10, this.w * 6, this.h + 20, this, 30, 20, -1, 10)],
                    },
                    body: {},
                    sprite: new Sprite(this.swordImage, 110, 129, { "idle": { "id": 0, "frames": 4 } }, x - 280, y - 30, 5, 1, -1, 2)
                };
            case "rightSword":
                return {
                    complex: true,
                    delay: 40,
                    sound: this.slashSound,
                    attack: {
                        3: [new KnockbackAttack(p, x + this.w / 1.5, y - 10, this.w * 6, this.h + 20, this, 30, 20, 1, 10)],
                    },
                    body: {},
                    sprite: new Sprite(this.swordImage, 110, 129, { "idle": { "id": 0, "frames": 4 } }, x - 250, y - 30, 5, 1, 1, 2)
                };
            case "jump_effect":
                return {
                    complex: false,
                    attack: [],
                    body: [],
                    sprite: new LoadSet(this.jumpAnimation, "land", 523, 256, x + -70, y + 23, 0.28, 0.28, 1, 6),
                };
            case "jump_effect_left":
                return {
                    complex: false,
                    attack: [],
                    body: [],
                    sprite: new LoadSet(this.jumpAnimation, "take_off", 523, 256, x + -51, y + 23, 0.28, 0.28, 1, 6),
                };
            case "jump_effect_right":
                return {
                    complex: false,
                    attack: [],
                    body: [],
                    sprite: new LoadSet(this.jumpAnimation, "take_off", 523, 256, x + -51, y + 23, 0.28, 0.28, -1, 6),
                };
            case "flame_effects_red_left":
                return {
                    delay: 50,
                    complex: false,
                    attack: [new PlayerAttack(p, x - 400, y - this.h / 4 + 10, 537 / 1.5, this.h, this, 10, 30, 1)],
                    body: [],
                    sprite: new LoadSet(this.flameEffects, "red", 1024, 537, x - 517, y - 2 * this.h, 0.5, 0.5, -1, 2)
                };
            case "flame_effects_red_right":
                return {
                    delay: 50,
                    complex: false,
                    attack: [new PlayerAttack(p, x + this.w * 2.5, y, 537 / 1.5, this.h, this, 10, 30, 1)],
                    body: [],
                    sprite: new LoadSet(this.flameEffects, "red", 1024, 537, x + 30, y - 2 * this.h, 0.5, 0.5, 1, 2)
                };
            case "flame_effects_blue_left":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x - 400, this.y - this.h / 4 + 10, 537 / 1.5, this.h, this, 10, 30, 1)],
                    body: [],
                    sprite: new LoadSet(this.flameEffects, "blue", 1024, 537, this.x - 517, this.y - 2 * this.h, 0.5, 0.5, -1, 2)
                };
            case "flame_effects_blue_right":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x + this.w * 2.5, this.y, 537 / 1.5, this.h, this, 10, 30, 1)],
                    body: [],
                    sprite: new LoadSet(this.flameEffects, "blue", 1024, 537, this.x + 30, this.y - 2 * this.h, 0.5, 0.5, 1, 2)
                };
            case "flame_effects_green_left":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x - 400, this.y - this.h / 4 + 10, 537 / 1.5, this.h, this, 10, 30, 1)],
                    body: [],
                    sprite: new LoadSet(this.flameEffects, "green", 1024, 537, this.x - 517, this.y - 2 * this.h, 0.5, 0.5, -1, 2)
                };
            case "flame_effects_green_right":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x + this.w * 2.5, this.y, 537 / 1.5, this.h, this, 10, 30, 1)],
                    body: [],
                    sprite: new LoadSet(this.flameEffects, "green", 1024, 537, this.x + 30, this.y - 2 * this.h, 0.5, 0.5, 1, 2)
                };
            case "flame_effects_orange_left":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x - 400, this.y - this.h / 4 + 10, 537 / 1.5, this.h, this, 10, 30, 1)],
                    body: [],
                    sprite: new LoadSet(this.flameEffects, "orange", 1024, 537, this.x - 517, this.y - 2 * this.h, 0.5, 0.5, -1, 2)
                };
            case "flame_effects_orange_right":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x + this.w * 2.5, this.y, 537 / 1.5, this.h, this, 10, 30, 1)],
                    body: [],
                    sprite: new LoadSet(this.flameEffects, "orange", 1024, 537, this.x + 30, this.y - 2 * this.h, 0.5, 0.5, 1, 2)
                };
            case "flame_effects_yellow_left":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x - 400, this.y - this.h / 4 + 10, 537 / 1.5, this.h, this, 10, 30, 1)],
                    body: [],
                    sprite: new LoadSet(this.flameEffects, "yellow", 1024, 537, this.x - 517, this.y - 2 * this.h, 0.5, 0.5, -1, 2)
                };
            case "flame_effects_yellow_right":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x + this.w * 2.5, this.y, 537 / 1.5, this.h, this, 10, 30, 1)],
                    body: [],
                    sprite: new LoadSet(this.flameEffects, "yellow", 1024, 537, this.x + 30, this.y - 2 * this.h, 0.5, 0.5, 1, 2)
                };
            case "flame_effects_yellow_with_glow_left":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x - 400, this.y - this.h / 4 + 10, 537 / 1.5, this.h, this, 10, 30, 1)],
                    body: [],
                    sprite: new LoadSet(this.flameEffects, "yellow_with_glow", 1024, 537, this.x - 517, this.y - 2 * this.h, 0.5, 0.5, -1, 2)
                };
            case "flame_effects_yellow_with_glow_right":
                return {
                    complex: false,
                    attack: [new PlayerAttack(p, this.x + this.w * 2.5, this.y, 537 / 1.5, this.h, this, 10, 30, 1)],
                    body: [],
                    sprite: new LoadSet(this.flameEffects, "yellow_with_glow", 1024, 537, this.x + 30, this.y - 2 * this.h, 0.5, 0.5, 1, 2)
                };
            case "leftElectroPalmAttack":
                return {
                    complex: false, // Complex is true when you want to define a collision box for a given stage
                    delay: 0,
                    attack: [
                        new LightningHitbox(p, this.x - 245, this.y - this.h * 2.5, this.w * 6, this.h * 3.7, this, 1.5),
                        new LightningHitbox(p, this.x - 245 + this.w * 6, this.y - this.h * 1.5, this.w * 3, this.h * 1.7, this, 1.5),
                    ],
                    body: [],
                    // Sprite(spriteSheetImage, spriteW, spriteH, framejson, x = null, y = null, w = null, h = null, sc = 1, staggeredFrames = 6, stageSwitch = "idle") 
                    sprite: new Sprite(this.electroPalmAttack, 262, 245, { "idle": { "id": 0, "frames": 15 } }, this.x - 250 * 1.1, this.y - this.h * 2.9, 1.1, 1.1, -1, 1.2)
                };
            case "rightElectroPalmAttack":
                return {
                    complex: false, // Complex is true when you want to define a collision box for a given stage
                    delay: 0,
                    attack: [
                        new LightningHitbox(p, this.x + this.w * 4.5, this.y - this.h * 2.5, this.w * 6, this.h * 3.7, this, 1.5),
                        new LightningHitbox(p, this.x + this.w * 1.5, this.y - this.h * 1.5, this.w * 3, this.h * 1.7, this, 1.5),
                    ],
                    body: [],
                    sprite: new Sprite(this.electroPalmAttack, 262, 245, { "idle": { "id": 0, "frames": 15 } }, this.x + this.w * 0.25, this.y - this.h * 2.9, 1.1, 1.1, 1, 1.2)
                };
            case "bear_attack_left":
                return {
                    complex: true,
                    attack: {
                        30: [new PlayerAttack(p, this.x - this.w * 2 - 150, this.y - 10, this.w * 2.5, this.h + 20, this, 100, 30, -1)],
                        31: [new PlayerAttack(p, this.x - this.w * 2 - 150, this.y - 10, this.w * 2.5, this.h + 20, this, 100, 30, -1)],
                        32: [new PlayerAttack(p, this.x - this.w * 2 - 150, this.y - 10, this.w * 2.5, this.h + 20, this, 100, 30, -1)],
                        33: [new PlayerAttack(p, this.x - this.w * 2 - 150, this.y - 10, this.w * 2.5, this.h + 20, this, 100, 30, -1)],
                    },
                    sprite: new LoadSet(this.bearAttack, "upper_swipe", 540, 355, this.x - 190, this.y - 2 * this.h, 0.25, 0.25, 1, 4)
                };
            case "bear_attack_right":
                return {
                    complex: true,
                    attack: {
                        30: [new PlayerAttack(p, this.x + this.w / 2 + 140, this.y - 10, this.w * 2.5, this.h + 20, this, 100, 30, 1)],
                        31: [new PlayerAttack(p, this.x + this.w / 2 + 140, this.y - 10, this.w * 2.5, this.h + 20, this, 100, 30, 1)],
                        32: [new PlayerAttack(p, this.x + this.w / 2 + 140, this.y - 10, this.w * 2.5, this.h + 20, this, 100, 30, 1)],
                        33: [new PlayerAttack(p, this.x + this.w / 2 + 140, this.y - 10, this.w * 2.5, this.h + 20, this, 100, 30, 1)],
                    },
                    sprite: new LoadSet(this.bearAttack, "upper_swipe", 540, 355, this.x + 80, this.y - 2 * this.h, 0.25, 0.25, -1, 4)
                };
            case "ice_shard_wave_left":
                return {
                    complex: true,
                    delay: 50,
                    attack: {
                        17: [new KnockbackAttack(p, x - 750, y - 300, 367.5, 360, this, 100, 200, 1)],
                        18: [new KnockbackAttack(p, x - 750, y - 300, 367.5, 360, this, 100, 200, 1)],
                        19: [new KnockbackAttack(p, x - 750, y - 300, 367.5, 360, this, 100, 200, 1)],
                        20: [new KnockbackAttack(p, x - 750, y - 300, 367.5, 360, this, 100, 200, 1)],
                        21: [new KnockbackAttack(p, x - 750, y - 300, 367.5, 360, this, 100, 200, 1)],
                    },
                    sprite: new LoadSet(this.iceEffects, "shard_wave", 1024, 428, x - 850, y - 428 + this.h, 1, 1, 1, 2)
                };
            case "ice_shard_wave_right":
                return {
                    complex: true,
                    delay: 50,
                    attack: {
                        17: [new KnockbackAttack(p, x + this.w / 2 + 20 + 367.5, y - 300, 367.5, 360, this, 100, 200, 1)],
                        18: [new KnockbackAttack(p, x + this.w / 2 + 20 + 367.5, y - 300, 367.5, 360, this, 100, 200, 1)],
                        19: [new KnockbackAttack(p, x + this.w / 2 + 20 + 367.5, y - 300, 367.5, 360, this, 100, 200, 1)],
                        20: [new KnockbackAttack(p, x + this.w / 2 + 20 + 367.5, y - 300, 367.5, 360, this, 100, 200, 1)],
                        21: [new KnockbackAttack(p, x + this.w / 2 + 20 + 367.5, y - 300, 367.5, 360, this, 100, 200, 1)],
                    },
                    sprite: new LoadSet(this.iceEffects, "shard_wave", 1024, 428, x - 150, y - 428 + this.h, 1, 1, -1, 2)
                };
            case "ice_shield_left":
                return {
                    complex: false,
                    delay: 50,
                    attack: [new KnockbackAttack(p, this.x - 90, this.y - 50, this.w * 8.2, this.h * 1.8, this, 5, 30, 1)],
                    sprite: new LoadSet(this.iceEffects, "shield", 1024, 765, this.x - 115, this.y - 765 / 7, 0.25, 0.25, 1, 2)
                };
            case "ice_shield_right":
                return {
                    complex: false,
                    delay: 50,
                    sprite: new LoadSet(this.iceEffects, "shield", 1024, 765, this.x - 115, this.y - 765 / 7, 0.25, 0.25, -1, 2)
                };
            case "ice_explode":
                return {
                    complex: true,
                    delay: 50,
                    attack: {
                        20: [new KnockbackAttack(p, this.x - 230, this.y - 220, 367.5 + 110, 380, this, 100, 130, 1)],
                    },
                    sprite: new LoadSet(this.iceEffects, "explode", 500, 512, this.x - 240, this.y - 250, 1, 1, -1, 2)
                };
            case "energy_pop_left":
                return {
                    complex: false,
                    delay: 0,
                    attack: [new KnockbackAttack(p, this.x - 230, this.y - 100, 367.5 + 110, 150, this, 100, 130, 1)],
                    sprite: new LoadSet(this.electricAttacks, "energy_pop", 624, 446, this.x - 300, this.y - 210, 1, 1, 1, 2)
                };
            case "energy_pop_right":
                return {
                    complex: false,
                    delay: 0,
                    attack: [new KnockbackAttack(p, this.x - 230, this.y - 100, 367.5 + 110, 150, this, 100, 130, 1)],
                    sprite: new LoadSet(this.electricAttacks, "energy_pop", 624, 446, this.x - 300, this.y - 210, 1, 1, -1, 2)
                };
            case "explode":
                return {
                    complex: false,
                    delay: 0,
                    attack: [new KnockbackAttack(p, x - 220, y - 210, 446, 440, this, 100, 130, 1)],
                    sprite: new LoadSet(this.electricAttacks, "explode", 624, 446, x - 248, y - 240, 1, 1, 1, 2)
                };
            case "spark_explode":
                return {
                    complex: false,
                    delay: 0,
                    attack: [new KnockbackAttack(p, x - 940, y - 690, 790 * 2.5 - 200, 512 * 2.5 - 375, this, 100, 130, 1)],
                    sprite: new LoadSet(this.electricAttacks, "spark_explode", 790, 512, x - 1025, y - 800, 2.5, 2.5, 1, 2)
                };
            case "electric_slash_sword_left":
                return {
                    complex: false,
                    delay: 0,
                    // sound: this.slashSound,
                    attack: [new PlayerAttack(p, this.x - this.w * 2 - 400, this.y - 10 - 200, 250, 400, this, 30, 30, -1)],
                    sprite: new LoadSet(this.electricAttacks, "slash_two", 534, 512, this.x - 800, this.y - 1200, 3, 3, -1, 2)
                };
            case "electric_slash_sword_right":
                return {
                    complex: false,
                    delay: 0,
                    // sound: this.slashSound,
                    attack: [new PlayerAttack(p, this.x + 200, this.y - 10 - 200, 250, 400, this, 30, 30, 1)],
                    sprite: new LoadSet(this.electricAttacks, "slash_two", 534, 512, this.x - 800, this.y - 1200, 3, 3, 1, 2)
                };
        }
    }

    draw(p, obj) {
        if (this.restoreHealth >= 80) this.restoreHealth = 80;
        if (this.restoreHealth <= 0) this.restoreHealth = 0;
        if (this.health >= 100) this.health = 100;
        if (this.health <= 0) this.health = 0;

        p.push()
        p.angleMode(p.DEGREES)
        if (this.currentDirection === "left") this.transitionOrb += 0.5
        else this.transitionOrb -= 0.5

        this.orbX = p.lerp(this.orbX, this.x + this.transitionOrb - 25 + p.cos(p.frameCount * 2) * 10, 0.02);
        this.orbY = p.lerp(this.orbY, this.y - 90 + p.sin(p.frameCount * 2) * 20, 0.02);

        this.transitionOrb = p.constrain(this.transitionOrb, -60, 60)

        p.angleMode(p.RADIANS)
        p.pop()

        p.noStroke();
        for (var i = 0; i < this.particles.x.length; ++i) {
            p.push();
            p.translate(this.particles.x[i], this.particles.y[i]);
            p.rotate(this.particles.r[i]);

            switch (this.currentClass) {
                case 1:
                    p.fill(250, 250, 250, this.particles.s[i] * 5);
                    break;
                case 2:
                    p.fill(224, 29, 224, this.particles.s[i] * 5);
                    break;
                case 3:
                    p.fill(204, 232, 65, this.particles.s[i] * 5);
                    break;
            }
            p.ellipse(0, this.particles.upAmount[i], this.particles.s[i], this.particles.s[i]);
            p.pop();

            this.particles.s[i] -= 0.5;
            this.particles.upAmount[i] += this.particles.s[i] / 12;

            if (this.particles.s[i] <= 0) {
                this.particles.x[i] = this.orbX + 35;
                this.particles.y[i] = this.orbY + 35;
                this.particles.s[i] = p.random(0, 20);
                this.particles.r[i] = p.random(0, 360);
                this.particles.upAmount[i] = 0;
            }

        }

        if (this.particles.x.length <= 50) {
            this.particles.x.push(this.orbX + 35);
            this.particles.y.push(this.orbY + 35);
            this.particles.s.push(p.random(0, 20));
            this.particles.r.push(p.random(0, 360));
        }

        p.push();
        p.translate(this.x + 24, this.y + 9);
        p.image(this.focus, -190, -150);
        p.pop();
        // for(var i = 0; i < this.meshBody.length; i++)
        //     this.meshBody[i].draw(p, obj);

    }

    reset() {
        this.x = this.origx;
        this.y = this.origy - 10;
        this.health = 100;
    }

    applyUniqueColl(PlayerUnique, camera, obj) {

        for (var i = 0; i < PlayerUnique.length; i++) {
            var collider = PlayerUnique[i];

            switch (collider.constructor.name) {
                case 'CamBox':
                    if (!rectCollide(this, collider)) continue;
                    obj.spanLiveY = collider.spanY;
                    obj.spanLiveSize = collider.spanSize;
                    obj.spanLiveX = collider.spanX;
                    break;

                case "SoundBox":
                    if (!rectCollide(this, collider)) continue;
                    this.currentSound = collider.soundSwitch;
                    break;

                case 'Transition':
                    if (!rectCollide(this, collider)) {
                        collider.state = false;
                    }

                    if (rectCollide(this, collider) && !collider.state) {
                        this.level = collider.levelSwitch;
                        console.log(collider.x, collider.y, collider.levelSwitch);
                        this.x = collider.playerX;
                        this.y = collider.playerY;
                        camera.x = collider.playerX;
                        camera.y = collider.playerY;
                        collider.state = true;
                    }
                    break;

                case 'DeathBox':
                    if (!rectCollide(this, collider)) continue;
                    this.health = 0;
                    break;

                case 'Portal':
                    if (!rectCollide(this, collider)) continue;
                    playAudio(this.sound.portalS)
                    this.x = collider.portX;
                    this.y = collider.portY;
                    break;
            }
        }
    }

    updatePowerUp() {
        this.powerupInformation = [];
    }

    apply(p, passIn, obj) {
        this.jump = false
        p.noFill();
        this.updatePowerUp();
        this.detectDamage(p, passIn.hit, null);
        this.draw(p, obj);
        this.applyCollectables(p, passIn.collectable);
        this.applyPhysics(p, passIn.collision);
        this.applyUniqueColl(passIn.PlayerUnique, passIn.camera, obj);
        this.updateMesh(p, passIn.states);
        this.applyInventoryEffects();
        this.applyAllStates(p, null);
    }
}