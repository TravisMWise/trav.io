import { Player } from "../player_classes/player.js";
import { CurveCollision, BoxCollision } from "../collisions/directory_export.js";
import { Page } from "./page.js";
import { Chapter } from "./chapter.js";
import { Hope } from "../collectables/hope.js";
import { Portal } from "../collisions/portal.js";
import { Beetle } from "../enemies/beetle.js";
import { Spider } from "../enemies/spider.js";
import { CamBox } from "../collisions/directory_export.js";
import { FroggyBoi } from "../enemies/froggyboi.js";
import { Sprint } from "../powerups/sprint.js";
import { Fly } from "../powerups/fly.js";
import { Transition } from "../collisions/transition.js";
import { BlackBear } from "../enemies/blackBear.js";
import { Loader } from "./loader.js";
import { Fox } from "../enemies/fox.js";
import { EyeBall } from "../enemies/eyeball.js";
import { Snail } from "../enemies/snail.js";
import { Knights } from "../enemies/knights.js";
import { Brute } from "../enemies/brute.js";
import { Manticore } from "../enemies/manticore.js";
import { ForestDemon } from "../enemies/forestDemon.js";
import { SoundBox } from "../collisions/sound_box.js";
import { Wolf } from "../enemies/wolf.js";
import { BlueFlower } from "../enemies/blueFlower.js";
import { GreenFlower } from "../enemies/greenFlower.js";
import { FireMage } from "../enemies/fireMage.js";
import { RougeMage } from "../enemies/rogueMage.js";
import { PinkPlant } from "../enemies/pinkPlant.js";
import { DeathBox } from "../collisions/directory_export.js";
import { BlackWidow } from "../enemies/blackWidow.js";
import { Hedgehog } from "../enemies/hedgehog.js";
import { Centipede } from "../enemies/centipede.js";
import { Beholder } from "../enemies/beholder.js";
import { Scorpion } from "../enemies/scorpion.js";
import { Golem } from "../enemies/golem.js";
import { DogMan } from "../enemies/dogMan.js";
import { VirusMonster } from "../enemies/virusMonster.js";
import { Rhino } from "../enemies/rhino.js";
import { Acide } from "../powerups/acide.js";
import { Sword } from "../powerups/sword.js";
import { Feu } from "../powerups/feu.js";
import { Energie } from "../powerups/energie.js";

export class App {
    constructor(p) {
        // clicked state
        this.clickDalay = 0;
        this.clicked = false;
        this.keys = [];
        this.portalAccess = true;

        this.chapters = [[], [], []];
        this.currentChap = 1;
        this.pageNumber = 0;
        // 0 -- First Grass Map
        // 1 -- The Tree Boss Fight
        // 2 -- The ForkInTheCave
        // 3 -- The Cave
        // 4 -- The Fungal Area Start
        // 5 -- The Small Fungal/Grass Section
        // 6 -- Fungal Pillar/Boss Section
        // 7 -- Fungal Branch off
        // 8 -- Fire section
        // 9 -- Cave Tunnel
        // 10 -- WalkwayToTheCastle

        // Loader
        this.loader = new Loader();
        this.treeIsDead = false;

        // Loadsets
        {
            this.greenBurst = {};
            // jump effects
            this.jumpDirection = {};
            // Player
            this.manticore = {};
            this.playerLoadset = {};
            (this.iceEffects = {}), (this.iceProjectiles = {}), (this.flameEffects = {}), (this.electricAttacks = {});
            this.orbs = {};
            this.data = {};
            this.virusMonsterBombAnimation = {}
        }

        this.firstAdvStart = [177, 537];
        this.mantiCaveStart = [2522, 300];
        this.startX = this.firstAdvStart[0];
        this.startY = this.firstAdvStart[1];
        this.scaleBossLevel = 0;
        this.bossLevel = 0;
    }
    update(p) {
        switch (this.currentChap) {
            case 0: // Test Map
                this.chapters[this.currentChap].levelMap[0].spanSize = window.innerWidth / 30.5;

                // if in levels
                this.startMusicDelay++;
                if (this.startMusicDelay >= 100) {
                    // this.chapters[this.currentChap].sounds.backgroundMusic.wanderingVibe.play()
                    this.startMusicDelay = 100;
                }
                break;
            case 1: // Grass Map
                // this.chapters[this.currentChap].levelMap[2].spanSize = window.innerWidth / 30;

                var chap = this.chapters[this.currentChap];

                // if in levels
                if (this.chapters[this.currentChap].level === 0) {
                    this.chapters[this.currentChap].sounds.backgroundMusic.grass.volume = 0.5;
                    this.chapters[this.currentChap].sounds.backgroundMusic.grass.play();
                    this.chapters[this.currentChap].sounds.backgroundMusic.combatVibe.currentTime = 0;
                } else {
                    this.chapters[this.currentChap].sounds.backgroundMusic.grass.volume /= 1.05;
                }

                if (
                    this.chapters[this.currentChap].level === 1 ||
                    this.chapters[this.currentChap].level === 3 ||
                    this.chapters[this.currentChap].level === 4 ||
                    this.chapters[this.currentChap].level === 5 ||
                    this.chapters[this.currentChap].level === 6 ||
                    this.chapters[this.currentChap].level === 7 ||
                    this.chapters[this.currentChap].level === 8 ||
                    this.chapters[this.currentChap].level === 9 ||
                    this.chapters[this.currentChap].level === 10
                ) {
                    this.chapters[this.currentChap].sounds.backgroundMusic.cave.volume = 0.8;
                    this.chapters[this.currentChap].sounds.backgroundMusic.cave.play();
                    chap.levelMap[chap.level].player.currentSound = "stone";
                } else {
                    this.chapters[this.currentChap].sounds.backgroundMusic.cave.volume /= 1.05;
                }

                if (this.chapters[this.currentChap].level === 2) {
                    if (this.treeIsDead) {
                        this.chapters[this.currentChap].sounds.backgroundMusic.combatVibe.volume /= 1.05;
                    } else {
                        this.chapters[this.currentChap].sounds.backgroundMusic.combatVibe.volume = 0.8;
                        this.chapters[this.currentChap].sounds.backgroundMusic.combatVibe.play();
                    }

                    if (chap.levelMap[chap.level].resetTimer >= 50) {
                        chap.levelMap[chap.level].trans = 0;
                        chap.levelMap[chap.level].reset = false;
                        chap.levelMap[chap.level].resetTimer = 0;
                        chap.levelMap[chap.level].player.health = 100;
                        chap.levelMap[chap.level].player.keys = [];
                        chap.levelMap[chap.level].player.x = chap.levelMap[chap.level].player.origx;
                        chap.levelMap[chap.level].player.y = chap.levelMap[chap.level].player.origy;
                        chap.levelMap[chap.level].enemies[0].x = chap.levelMap[chap.level].enemies[0].origx;
                        chap.levelMap[chap.level].enemies[0].y = chap.levelMap[chap.level].enemies[0].origy;
                        chap.levelMap[chap.level].enemies[0].health = 1000;
                        chap.level = 0;
                        chap.levelMap[chap.level].player.x = 14466;
                        chap.levelMap[chap.level].player.y = 1786;
                        chap.levelMap[chap.level].trans = 250;
                    }
                } else {
                    this.chapters[this.currentChap].sounds.backgroundMusic.combatVibe.volume /= 1.05;
                }

                if (chap.levelMap[chap.player.level].resetTimer >= 55) {
                    chap.levelMap[chap.player.level].resetTimer = 0;
                    chap.levelMap[chap.player.level].reset = false;
                    chap.levelMap[chap.player.level].trans = 0;
                    chap.player.level = 0;
                    chap.player.health = 100;
                    chap.player.x = chap.player.origx;
                    chap.player.y = chap.player.origy;
                }
                break;
        }
    }

    load(p) {
        switch (this.currentChap) {
            case 0: // Test Map
                // Create the chapter
                // Player
                this.playerLoadset = this.loader.loadAnimation(p, "main/char", ["idle", "jump", "walk", "dash3"], 512);
                this.loader.loadSet(p, this.jumpDirection, "effects/jump", "", ["land", "take_off"], [8, 7]);
                this.loader.loadSet(p, this.orbs, "effects/orb_effect", "__orb_effect_", ["purple_orb", "white_orb", "yellow_orb"], [6, 6, 6]);
                this.loader.loadSet(p, this.iceEffects, "effects/ice_effects", "__ice_effects_", ["shield", "shard_wave"], [13, 16]);
                this.loader.loadSet(p, this.iceProjectiles, "effects/ice_projectiles", "__ice_projectile_", ["arrow", "shard"], [7, 7]);
                this.loader.loadSet(p, this.flameEffects, "effects/flame_effects", "__flame_effects_", ["red"], [14]);
                this.loader.loadSet(p, this.electricAttacks, "effects/electric_attacks", "__electric_attacks_", ["explode", "spark_explode"], [10, 8]);
                // this.rhinoDark = this.loader.loadAnimation(p, "enemies/rhino/dark", ["charge", "die", "head_smash", "idle", "kick_back", "stomp", "stop", "walk", "whacked"], 805);
                // this.eyeBallGreen = this.loader.loadAnimation(p, "enemies/eyeBall/green", ["die", "idle", "move"], 869);
                // this.dogmanBlack = this.loader.loadAnimation(p, "enemies/dogman/black", ["bite", "die", "idle", "run_claws_out", "walk", "roar", "smash", "slash"], 1016);
                // this.bruteKnightSkeleton = this.loader.loadAnimation(p, "enemies/bruteKnight/skeleton", ["die", "idle", "run_sword_on_shoulder", "sword_smash", "walk", "jump_smash"], 891);
                // this.blackWidowBlack = this.loader.loadAnimation(p, "enemies/blackWidow/black", ["base", "bite", "die", "hurt", "idle", "move", "squirt_web"], 820);

                var chapArt = { images: this.loader.loadImages(p, this.currentChap), sounds: this.loader.loadSounds(p, this.currentChap) };

                this.player = new Player(p, 200, 1500 - 500, 25, 60, 0, 100, 0, true, 20, 10, chapArt, {
                    iceEffects: this.iceEffects,
                    iceProjectiles: this.iceProjectiles,
                    flameEffects: this.flameEffects,
                    electricAttacks: this.electricAttacks,
                    orbs: this.orbs,
                    player: this.playerLoadset,
                    manticore: this.manticore,
                    jumpAnimation: this.jumpDirection,
                    forestDemon: this.tree_being,
                });

                this.chapters[this.currentChap] = new Chapter(this.player, chapArt.images, chapArt.sounds, { player: 0 }, this.pageNumber);

                this.chapters[this.currentChap].levelMap.push(
                    // 0
                    new Page(
                        this,
                        p,
                        [
                            // Backgpround images
                        ],
                        [
                            // Mid-ground
                            // [this.chapters[this.currentChap].images.grass[1], { xOffset: -400, yOffset: -400 }],
                        ],
                        [
                            // Background after mid-ground images
                        ],
                        [
                            // Foreground
                            this.chapters[this.currentChap].images.test_map,
                        ],

                        // Set the width and height of the canvas
                        3000,
                        1500,

                        // Set the camera span editor offset
                        // (How close or how far is camera, AKA the field of view)
                        0,
                        -100,
                        94,

                        // Define Player
                        this.player,

                        [
                            // Collisions
                            new BoxCollision(p, -9, 1225, 3045, 359),
                            new BoxCollision(p, 0, -500, 179, 2085),
                            new BoxCollision(p, 2812, -478, 224, 2063),
                            new BoxCollision(p, 0, -500, 2988, 109),
                        ],
                        [
                            // Portals and Transitions
                        ],
                        [
                            // Aggressive
                            // new BlackWidow(p, 1500, 1727 - 500, 456, 296, 1, 100, 100, true, 20, 20, this.blackWidowBlack, 1200, 1600),
                            // new Manticore(p, 1500, 1727 - 500, 456, 296, 1, 100, 100, true, 20, 20, this.blackWidowBlack, 1200, 1600),
                            // new BlackWidow(p, 1757, 1727 - 500, 456, 296, 1, 100, 100, true, 20, 20, this.blackWidowBlack, 1500, 2000),
                            // new Hedgehog(p, 1757, 1727 - 500, 76, 77, 1, 100, 100, true, 20, 20, this.hedgehog, 1500, 2000),
                            // new Scorpion(p, 1757 - 200, 1727 - 500, 51, 70, 1, 100, 100, true, 20, 20, this.scorpionRed, 1500, 2000),
                            // new Beholder(p, 1757 - 400, 1080, 43, 48, 1, 100, 100, true, 20, 20, { monster: this.beholderRed, projectile: this.elecProjectile }, 1500, 2000),
                            // new Centipede(p, 1757 - 600, 1727 - 500, 84, 77, 1, 100, 100, true, 20, 20, this.centipedeRedCentipede, 1500, 2000),
                            // new Knights(p, 1500, 1727 - 500, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 600, 2500),
                            // new Golem(p, 1500 + 200, 1727 - 500, 205, 337, 1, 100, 100, true, 20, 20, this.rockGolemGolemLava, 600, 2500),
                            // new VirusMonster(p, 1500 + 200, 1727 - 500, 89, 90, 1, 100, 100, true, 20, 20, { monster: this.virusMonsterBlue, projectile: this.virusMonsterBombAnimation }, 600, 2500),
                            // new DogMan(p, 1500 + 400, 1727 - 500, 118, 230, 1, 100, 100, true, 20, 20, this.dogmanBlack, 600, 2500),
                            // new Rhino(p, 1500 + 400, 1727 - 500, 247, 171, 1, 100, 100, true, 20, 20, this.rhinoDark, 600, 2500),
                            // new Brute(p, 1500 + 400, 1727 - 500, 130, 327, 1, 100, 100, true, 20, 20, this.bruteKnightSkeleton, 600, 2500),
                            // new EyeBall(p, 1500 + 400, 1727 - 500, 869 / 11.1, 485 / 6.5, 1, 100, 100, true, 20, 10, { eyeball: this.eyeBallGreen, eyeballdie: this.chapters[this.currentChap].sounds.eyeballdie, eyeballmove: this.chapters[this.currentChap].sounds.eyeballmove }, 600, 2500),
                        ],
                        [
                            // Passives Enemies
                        ],
                        [
                            // Collectables
                        ]
                    )
                );

                break;
            case 1: // First Adventure
                {
                    this.playerLoadset = this.loader.loadAnimation(p, "main/char", ["idle", "jump", "walk", "dash3"], 512);
                    this.loader.loadSet(p, this.jumpDirection, "effects/jump", "", ["land", "take_off"], [8, 7]);
                    this.loader.loadSet(p, this.orbs, "effects/orb_effect", "__orb_effect_", ["white_orb"], [6]);
                    this.loader.loadSet(p, this.iceEffects, "effects/ice_effects", "__ice_effects_", ["shield"], [13]);
                    // this.loader.loadSet(p, this.iceProjectiles, "effects/ice_projectiles", "__ice_projectile_", ["arrow", "shard"], [7, 7]);
                    this.loader.loadSet(p, this.flameEffects, "effects/flame_effects", "__flame_effects_", ["red"], [14]);
                    // this.loader.loadSet(p, this.electricAttacks, "effects/electric_attacks", "__electric_attacks_", ["explode", "spark_explode"], [10, 8]);

                    // Effects
                    // this.loader.loadSet(p, this.greenBurst, "effects/toxic_effects/poison_spash/poison_splash", "poison_splash", [""], [9]);

                    // Plants
                    // let bluePlantData = { IDs: ["flower"], numFrames: [60] };
                    // this.loader.loadSet(p, this.blueFlowerSet, "plants/plant_blue", "__plant_blue_", bluePlantData.IDs, bluePlantData.numFrames);
                    // this.loader.loadSet(p, this.greenFlowerSet, "plants/plant_green", "__plant_green_", ["plant_5", "plant_wind"], [60, 30]);
                    // this.loader.loadSet(p, this.pinkPlantSet, "plants/plant_pink", "__plant_pink_", ["jump_plant"], [20]);

                    // Mages
                    // this.magesFemalefire = this.loader.loadAnimation(p, "enemies/mages/femaleFire", ["idle"], 884);
                    // this.magesRogue = this.loader.loadAnimation(p, "enemies/mages/rogue", ["idle"], 804);

                    // Enemies
                    // this.forestDemonTree = this.loader.loadAnimation(p, "enemies/forestDemon/tree", ["attack_2", "die", "idle", "jump_stomp", "roar", "walk"], 968);
                    // this.hedgehogBrown = this.loader.loadAnimation(p, "enemies/hedgehog/brown", ["die", "go_to_ball", "idle", "jump", "open_up", "rolling", "walk", "whacked"], 580);
                    // this.scorpionBlack = this.loader.loadAnimation(p, "enemies/scorpion/black", ["die", "high_attack", "idle", "pincer_whack", "walk", "walk_pinching"], 701);
                    // this.eyeBallGreen = this.loader.loadAnimation(p, "enemies/eyeBall/green", ["die", "idle", "move"], 869);
                    // this.spiderPurple = this.loader.loadAnimation(p, "enemies/spider/purple", ["die", "idle", "move"], 501);
                    // this.centipedePurple = this.loader.loadAnimation(p, "enemies/centipede/purple", ["come_out", "go_in", "idle_in", "ilde_out"], 670);
                    // this.dogmanBlack = this.loader.loadAnimation(p, "enemies/dogman/black", ["bite", "die", "idle", "run_claws_out", "walk", "roar", "smash", "slash"], 1016);
                    // this.rhinoDark = this.loader.loadAnimation(p, "enemies/rhino/dark", ["charge", "die", "head_smash", "idle", "kick_back", "stomp", "stop", "walk", "whacked"], 805);
                    // this.virusMosterBlue = this.loader.loadAnimation(p, "enemies/virusMoster/blue", ["die", "idle", "move", "throw_virus_bomb"], 898);
                    // this.bruteKnightSkeleton = this.loader.loadAnimation(p, "enemies/bruteKnight/skeleton", ["die", "idle", "run_sword_on_shoulder", "sword_smash", "walk", "jump_smash"], 891);
                    // this.knight1 = this.loader.loadAnimation(p, "enemies/knight/1", ["attack_one", "attack_four", "attack_two", "attack_three", "die", "idle", "run", "walk"], 982);
                    // this.skeletonWarrior1 = this.loader.loadAnimation(p, "enemies/skeletonWarrior/1", ["attack_slash", "die", "die_2", "idle", "run", "walk"], 1262);
                    // this.manticoreBlue = this.loader.loadAnimation(p, "enemies/manticore/blue", ["claw_attack", "run", "fly", "idle", "roar", "walk"], 1220);
                    // this.loader.loadSet(p, this.virusMonsterBombAnimation, "effects/virus_bomb", "__virus_bomb_", ["explode", "idle"], [7, 1]);
                    var chapArt = { images: this.loader.loadImages(p, this.currentChap), sounds: this.loader.loadSounds(p, this.currentChap) };

                    {
                        if (this.pageNumber === 0) {
                            this.startX = 177;
                            this.startY = 537;
                        }
                        if (this.pageNumber === 1) {
                            this.startX = 3662;
                            this.startY = 998;
                        }
                        if (this.pageNumber === 2) {
                            this.startX = 1500;
                            this.startY = 800;
                        }
                        if (this.pageNumber === 3) {
                            this.startX = 3992;
                            this.startY = 66;
                        }
                        if (this.pageNumber === 4) {
                            console.log(this.pageNumber);

                            this.startX = 20812;
                            this.startY = 1745;
                        }
                        if (this.pageNumber === 5) {
                            this.startX = 282;
                            this.startY = 1292;
                        }
                        if (this.pageNumber === 6) {
                            this.startX = 9719;
                            this.startY = 636;
                        }
                        if (this.pageNumber === 7) {
                            this.startX = 20812;
                            this.startY = 1745;
                        }
                        if (this.pageNumber === 8) {
                            this.startX = 20812;
                            this.startY = 1745;
                        }
                        if (this.pageNumber === 9) {
                            this.startX = 100;
                            this.startY = 900;
                        }
                        if (this.pageNumber === 10) {
                            this.startX = 117;
                            this.startY = 713;
                        }
                    }
                    this.player = new Player(p, this.startX, this.startY, 25, 60, 0, 100, 0, true, 20, 10, chapArt, {
                        iceEffects: this.iceEffects,
                        iceProjectiles: this.iceProjectiles,
                        flameEffects: this.flameEffects,
                        electricAttacks: this.electricAttacks,
                        orbs: this.orbs,
                        player: this.playerLoadset,
                        manticore: this.manticore,
                        jumpAnimation: this.jumpDirection,
                        forestDemon: this.tree_being,
                    });

                    // Create the chapter
                    this.chapters[this.currentChap] = new Chapter(this.player, chapArt.images, chapArt.sounds, { player: 0 }, this.pageNumber);
                }
                this.chapters[this.currentChap].levelMap.push( // 0 (Main Grass Map)
                    new Page(this, p,
                        [/* Background images */],
                        [/* Mid-ground */[this.chapters[this.currentChap].images.bg, { xOffset: -600, yOffset: -600 }]],
                        [/* Background after mid-ground images */ this.chapters[this.currentChap].images.mapData[4], this.chapters[this.currentChap].images.mapData[1]],
                        [/* Foreground */ this.chapters[this.currentChap].images.mapData[0], this.chapters[this.currentChap].images.mapData[5]],
                        // Set the width and height of the canvas
                        21000, 2000,
                        // Set the camera span editor offset (How close or how far is camera, AKA the field of view)
                        0, 0, 100,
                        // Define Player 177 537 14170 1750
                        this.player,
                        [/* Collisions */
                            new BoxCollision(p, 0, 1889, 11035, 138), new BoxCollision(p, -9, 680, 3717, 479), new BoxCollision(p, -7, 591, 310, 198), new BoxCollision(p, -5, 4, 69, 596),
                            new BoxCollision(p, 4168, 683, 1411, 518), new BoxCollision(p, 7875, 1791, 3157, 106), new BoxCollision(p, 8470, 1702, 2562, 195), new BoxCollision(p, 9048, 1593, 1984, 304),
                            new BoxCollision(p, 9622, 1486, 1410, 411), new BoxCollision(p, 10193, 1381, 839, 516), new BoxCollision(p, 5869, 767, 355, 121), new BoxCollision(p, 6521, 916, 931, 193),
                            new BoxCollision(p, 7613, 895, 735, 105), new BoxCollision(p, 8566, 898, 944, 205), new BoxCollision(p, 9756, 901, 752, 120), new BoxCollision(p, -31, 1511, 41, 458),
                            new BoxCollision(p, 10749, 903, 143, 118), new BoxCollision(p, 11143, 1125, 245, 894), new BoxCollision(p, 11258, 992, 128, 1021), new BoxCollision(p, 11032, 1239, 356, 780),
                            new BoxCollision(p, 11258, 992, 5781, 312), new BoxCollision(p, 11383, 1846, 3626, 239), new BoxCollision(p, 0, 0, 100, 100), new BoxCollision(p, 11300, 1378, 117, 621),
                            new BoxCollision(p, 0, 0, 100, 100), new BoxCollision(p, -3, 1158, 928, 258), new BoxCollision(p, -7, 1406, 112, 109), new BoxCollision(p, 105, 1406, 145, 81),
                            new BoxCollision(p, 249, 1407, 147, 59), new BoxCollision(p, 396, 1406, 379, 31), new BoxCollision(p, 15354, 1155, 3834, 995), new BoxCollision(p, 18859, 1163, 949, 41),
                            new BoxCollision(p, 6518, 814, 135, 102), new BoxCollision(p, 6885, 830, 214, 87), new BoxCollision(p, 7323, 823, 129, 95), new BoxCollision(p, 8566, 797, 136, 99),
                            new BoxCollision(p, 8937, 812, 207, 86), new BoxCollision(p, 9369, 808, 141, 91), new BoxCollision(p, 14803, 1739, 548, 250), new BoxCollision(p, 14802, 1304, 551, 221),
                        ],
                        [
                            /* Portals and Transitions */
                            new Transition(p, 0, 1500, 15, 500, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 1, 3662, 998),
                            new Transition(p, 15200, 1500, 160, 1000, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 2, 80, 583),
                            new Portal(p, 19721, 1070, 60, 60, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 11580, 1736),
                            new Portal(p, 11491, 1740, 60, 60, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 15006, 932),
                            new CamBox(0, 0, 60, p, 17475, 21, 2329, 1142),
                            new CamBox(0, 0, 100, p, 11392, 1305, 3484, 545),
                            new CamBox(0, 0, 100, p, 17007, 21, 465, 1138),
                            new SoundBox(11392, 1305, 3484, 545, "grass"),
                            new SoundBox(17007, 21, 465, 1138, "grass"),
                            new SoundBox(17475, 21, 2329, 1142, "stone"),
                            new DeathBox(p, 18854, 1926, 2141, 143),
                            new CamBox(0, 0, 100, p, 118, 495, 100, 100),
                            new DeathBox(p, 8706, 831, 231, 68),
                            new DeathBox(p, 9143, 842, 227, 56),
                            new DeathBox(p, 6659, 851, 226, 65),
                            new DeathBox(p, 7098, 854, 227, 63),
                            new SoundBox(163, 1455, 902, 478, "stone"),
                            new SoundBox(1064, 1453, 957, 508, "grass"),
                        ],
                        [
                            /* Aggressive Enemies */
                            // new Wolf(p, 2020, 550, 62, 106, 100, 100, 100, true, 20, 10, { wolf: this.wolfBlack, wolfBite: this.chapters[this.currentChap].sounds.wolf }, 500, 3400),
                            // new Wolf(p, 11742, 927, 62, 106, 100, 100, 100, true, 20, 10, { wolf: this.wolfBlack, wolfBite: this.chapters[this.currentChap].sounds.wolf }, 11345, 13190),
                            // new Wolf(p, 15784, 858, 62, 106, 100, 100, 100, true, 20, 10, { wolf: this.wolfBlack, wolfBite: this.chapters[this.currentChap].sounds.wolf }, 14475, 16732),
                            // new Hedgehog(p, 12250, 1786, 76, 77, 1, 100, 100, true, 20, 20, this.hedgehogBrown, 11715, 14600),
                            // new Hedgehog(p, 13250, 1786, 76, 77, 1, 100, 100, true, 20, 20, this.hedgehogBrown, 11715, 14600),
                            // new Hedgehog(p, 800, 600, 76, 77, 1, 100, 100, true, 20, 20, this.hedgehogBrown, 400, 3000),
                            // new Hedgehog(p, 1500, 600, 76, 77, 1, 100, 100, true, 20, 20, this.hedgehogBrown, 400, 3000),
                            // new Hedgehog(p, 4600, 600, 76, 77, 1, 100, 100, true, 20, 20, this.hedgehogBrown, 4200, 5500),
                            // new Hedgehog(p, 8000, 800, 76, 77, 1, 100, 100, true, 20, 20, this.hedgehogBrown, 7700, 8300),
                            // new Hedgehog(p, 10100, 800, 76, 77, 1, 100, 100, true, 20, 20, this.hedgehogBrown, 9800, 10400),
                            // new Hedgehog(p, 13000, 900, 76, 77, 1, 100, 100, true, 20, 20, this.hedgehogBrown, 12000, 16000),
                            // new Hedgehog(p, 14000, 900, 76, 77, 1, 100, 100, true, 20, 20, this.hedgehogBrown, 12000, 16000),
                            // new Hedgehog(p, 15000, 900, 76, 77, 1, 100, 100, true, 20, 20, this.hedgehogBrown, 12000, 16000),
                            // new DogMan(p, 2500, 1700, 118, 230, 1, 100, 100, true, 20, 20, this.dogmanBlack, 1300, 7500),
                            // new DogMan(p, 5000, 1700, 118, 230, 1, 100, 100, true, 20, 20, this.dogmanBlack, 1300, 7500),

                        ],
                        [
                            /* Passives Enemies */
                            // new BlueFlower(p, 120, 537, 89, 77, 1, 10, 0, true, 20, 10, this.blueFlowerSet, "flower", "left"),
                            // new BlueFlower(p, 117 + 50, 537, 89, 77, 1, 10, 0, true, 20, 10, this.blueFlowerSet, "flower", "right"),
                            // new GreenFlower(p, 11848, 1769, 89, 77, 1, 10, 0, true, 20, 10, this.greenFlowerSet, "plant_wind", "left"),
                            // new GreenFlower(p, 11927, 1769, 89, 77, 1, 10, 0, true, 20, 10, this.greenFlowerSet, "plant_wind", "right"),
                            // new GreenFlower(p, 11890, 1769, 89, 77, 1, 10, 0, true, 20, 10, this.greenFlowerSet, "plant_5", "left"),
                            // new GreenFlower(p, 12476, 1769, 89, 77, 1, 10, 0, true, 20, 10, this.greenFlowerSet, "plant_wind", "left"),
                            // new GreenFlower(p, 12476 + 79, 1769, 89, 77, 1, 10, 0, true, 20, 10, this.greenFlowerSet, "plant_wind", "right"),
                            // new GreenFlower(p, 12476 + 42, 1769, 89, 77, 1, 10, 0, true, 20, 10, this.greenFlowerSet, "plant_5", "left"),
                            // new GreenFlower(p, 13290, 1769, 89, 77, 1, 10, 0, true, 20, 10, this.greenFlowerSet, "plant_wind", "left"),
                            // new GreenFlower(p, 13290 + 79, 1769, 89, 77, 1, 10, 0, true, 20, 10, this.greenFlowerSet, "plant_wind", "right"),
                            // new GreenFlower(p, 13290 + 42, 1769, 89, 77, 1, 10, 0, true, 20, 10, this.greenFlowerSet, "plant_5", "left"),
                            // new GreenFlower(p, 14170, 1769, 89, 77, 1, 10, 0, true, 20, 10, this.greenFlowerSet, "plant_wind", "left"),
                            // new GreenFlower(p, 14170 + 79, 1769, 89, 77, 1, 10, 0, true, 20, 10, this.greenFlowerSet, "plant_wind", "right"),
                            // new GreenFlower(p, 14170 + 42, 1769, 89, 77, 1, 10, 0, true, 20, 10, this.greenFlowerSet, "plant_5", "left"),
                            // new FireMage(p, 14656, 1720, 43, 126, 10, 1000, 0, true, 20, 10, { mage: this.magesFemalefire, listen: this.chapters[this.currentChap].images.listen, talksound: this.chapters[this.currentChap].sounds.firemage }),
                        ],
                        [
                            new Feu(p, 500, 600, 60, 60),
                            new Energie(p, 600, 600, 60, 60),
                            /* Collectables */
                        ]
                    )
                );
                this.chapters[this.currentChap].levelMap.push( // 1 (ForkInTheCave)
                    new Page(this, p,
                        [/* Background images */ this.chapters[this.currentChap].images.mapData[9]],
                        [/* Mid-ground */],
                        [/* Background after mid-ground images */ this.chapters[this.currentChap].images.mapData[3]],
                        [/* Foreground */ this.chapters[this.currentChap].images.mapData[2], this.chapters[this.currentChap].images.mapData[8], this.chapters[this.currentChap].images.mapData[10]],
                        // Set the width and height of the canvas
                        4000, 2000,
                        // Set the camera span editor offset (How close or how far is camera, AKA the field of view)
                        0, 0, 100,

                        // Define Player 3847 1007
                        this.player,
                        [/* Collisions */
                            new BoxCollision(p, 0, 1058, 1721, 653), new BoxCollision(p, 0, 0, 10, 2000), new BoxCollision(p, 3990, 0, 10, 2000), new BoxCollision(p, 252, 1294, 558, 15),
                            new BoxCollision(p, 0, 0, 100, 100), new BoxCollision(p, 2115, 1056, 1912, 654)
                        ],
                        [
                            /* Portals and Transitions */
                            new Transition(p, 3980, 60, 15, 1000, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 0, 30, 1829),
                            new Transition(p, 1720, 1600, 390, 1000, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 3, 3992, 360),
                            new Transition(p, 0, 500, 30, 1000, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 4, 20812, 1745),
                            new SoundBox(3183, 567, 806, 605, "stone"),
                        ],
                        [ /* Aggressive Enemies */],
                        [
                            /* Passives Enemies */
                            // new PinkPlant(p, 860, 995, 61, 63, 0, 0, 0, false, 20, 20, this.pinkPlantSet, "jump_plant"), new PinkPlant(p, 419, 995, 61, 63, 0, 0, 0, false, 20, 20, this.pinkPlantSet, "jump_plant"), new PinkPlant(p, 619, 995, 61, 63, 0, 0, 0, false, 20, 20, this.pinkPlantSet, "jump_plant")
                        ],
                        [ /* Collectables */]
                    )
                );
                this.chapters[this.currentChap].levelMap.push( // 2 (Tree Fight) 
                    new Page(this, p,
                        [/* Background images */],
                        [/* Mid-ground */],
                        [/* Background after mid-ground images */ this.chapters[this.currentChap].images.mapData[6]],
                        [/* Foreground */ this.chapters[this.currentChap].images.mapData[7]],
                        // Set the width and height of the canvas
                        3000, 2000,
                        // Set the camera span editor offset (How close or how far is camera, AKA the field of view)
                        0, -300, 100,

                        // Define Player 117 537 14170 1750
                        this.player,
                        [
                            /* Collisions */
                            new BoxCollision(p, 2964, 88, 192, 1019), new BoxCollision(p, -89, -158, 100, 1342), new BoxCollision(p, 653, 909, 2299, 98), new BoxCollision(p, -4, 647, 147, 528),
                            new BoxCollision(p, 8, -10, 145, 364), new BoxCollision(p, 130, 989, 2923, 195), new BoxCollision(p, 2891, -1, 189, 684), new BoxCollision(p, 2914, 821, 245, 376),
                            new BoxCollision(p, 2945, 641, 100, 100), new BoxCollision(p, 2927, 610, 100, 100), new BoxCollision(p, 2914, 601, 100, 100), new BoxCollision(p, 2955, 804, 100, 100),
                            new BoxCollision(p, 2937, 812, 100, 100), new BoxCollision(p, -12, 643, 365, 134),
                        ],
                        [/* Portals and Transitions */
                            new Transition(p, 0, 300, 70, 500, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 0, 14449, 1786),
                            new DeathBox(p, 22, 909, 632, 131, this),
                            new DeathBox(p, 2363, 909, 604, 142, this)
                        ],
                        [
                            /* Aggressive Enemies */
                            // new ForestDemon(p, 2500, 500, 340, 373, 100, 1000, 100, true, 20, 10, {
                            //     set: this.forestDemonTree,
                            //     treeroar: this.chapters[this.currentChap].sounds.treeroar,
                            //     treepunch: this.chapters[this.currentChap].sounds.treepunch,
                            //     treewalk: this.chapters[this.currentChap].sounds.treewalk,
                            //     treesmash: this.chapters[this.currentChap].sounds.treesmash,
                            //     treehurt: this.chapters[this.currentChap].sounds.treehurt,
                            //     splash: this.greenBurst,
                            //     obj: this,
                            // }, 0, 3000, 6),
                        ],
                        [ /* Passives Enemies */],
                        [ /* Collectables */]
                    )
                );
                this.chapters[this.currentChap].levelMap.push( // 3 (The Cave)
                    new Page(this, p,
                        [/* Background images */ this.chapters[this.currentChap].images.cave[3]],
                        [/* Mid-ground */],
                        [/* Background after mid-ground images */ this.chapters[this.currentChap].images.cave[1]],
                        [/* Foreground */ this.chapters[this.currentChap].images.cave[0], this.chapters[this.currentChap].images.cave[4]],
                        // Set the width and height of the canvas
                        9000, 4000,
                        // Set the camera span editor offset (How close or how far is camera, AKA the field of view)
                        0, 0, 100,
                        // Define Player 3847 1007
                        this.player,
                        [
                            /* Collisions */
                            new BoxCollision(p, 3269, 692, 3124, 440), new BoxCollision(p, 4229, 19, 166, 350), new BoxCollision(p, 3622, 30, 176, 330), new BoxCollision(p, 0, 26, 3623, 168),
                            new BoxCollision(p, 1576, 1669, 3300, 558), new BoxCollision(p, 5191, 1669, 2069, 558), new BoxCollision(p, 514, 2522, 5724, 561), new BoxCollision(p, 515, 2352, 320, 168),
                            new BoxCollision(p, 5646, 3534, 2374, 520), new BoxCollision(p, 6561, 3396, 2446, 595), new BoxCollision(p, 6876, 3263, 2131, 728), new BoxCollision(p, 7111, 3095, 1896, 896),
                            new BoxCollision(p, 1039, 1626, 556, 155), new BoxCollision(p, 493, 1344, 217, 154), new BoxCollision(p, 484, 1897, 213, 155), new BoxCollision(p, 1261, 2081, 344, 146),
                            new BoxCollision(p, 855, 1052, 737, 150), new BoxCollision(p, 1219, 754, 373, 151), new BoxCollision(p, 1592, 189, 152, 1485), new BoxCollision(p, -9, 612, 529, 2470), new BoxCollision(p, -297, 158, 329, 541),
                            new BoxCollision(p, 5202, 3682, 146, 151), new BoxCollision(p, 4091, 3675, 552, 153), new BoxCollision(p, 3300, 3680, 145, 155), new BoxCollision(p, 2181, 3679, 555, 150), new BoxCollision(p, 1396, 3684, 137, 143),
                            new BoxCollision(p, -7, 3580, 1073, 436), new BoxCollision(p, -9, 3442, 176, 141), new BoxCollision(p, -3, 3071, 167, 140), new BoxCollision(p, 5693, 54, 1491, 267),
                            new BoxCollision(p, 5689, 558, 694, 151), new BoxCollision(p, 6237, 174, 156, 958), new BoxCollision(p, 2942, 803, 328, 390), new BoxCollision(p, 2621, 901, 649, 292),
                            new BoxCollision(p, 2371, 1046, 899, 147), new BoxCollision(p, 1744, 553, 541, 152), new BoxCollision(p, 1740, 1298, 129, 376), new BoxCollision(p, 1871, 1467, 123, 217),
                            new BoxCollision(p, 6503, 2519, 559, 154), new BoxCollision(p, 6832, 2623, 559, 151), new BoxCollision(p, 7157, 2727, 557, 148), new BoxCollision(p, 8465, 2908, 538, 191),
                            new BoxCollision(p, 8248, 2333, 556, 150), new BoxCollision(p, 8574, 2439, 488, 150), new BoxCollision(p, 8903, 2563, 396, 131), new BoxCollision(p, 7254, 2070, 690, 152),
                            new BoxCollision(p, 8493, 1788, 461, 151), new BoxCollision(p, 7262, 1707, 514, 154), new BoxCollision(p, 6242, 1378, 605, 291), new BoxCollision(p, 6849, 1533, 137, 136),
                            new BoxCollision(p, 7384, 1154, 1635, 155), new BoxCollision(p, 7173, 773, 372, 144), new BoxCollision(p, 6379, 571, 793, 352), new BoxCollision(p, 7772, 541, 1180, 154),
                            new BoxCollision(p, 2680, 1124, 1881, 132), new BoxCollision(p, 4872, 1242, 1972, 147), new BoxCollision(p, 6761, 1242, 100, 592), new BoxCollision(p, 7800, 1057, 1218, 251),
                            new BoxCollision(p, 7956, 963, 1062, 345), new BoxCollision(p, 7178, 26, 1844, 253), new BoxCollision(p, 8632, 248, 454, 94), new BoxCollision(p, 8626, 490, 394, 79),
                            new BoxCollision(p, 8943, 497, 102, 641), new BoxCollision(p, 8944, 1304, 148, 1029), new BoxCollision(p, 8947, 2321, 86, 659), new BoxCollision(p, 4385, 18, 1438, 170),
                            new BoxCollision(p, 7967, 2794, 182, 66), new BoxCollision(p, 7757, 2447, 179, 71), new BoxCollision(p, 2637, 541, 182, 71), new BoxCollision(p, 2010, 1104, 182, 64),
                            new BoxCollision(p, 771, 660, 184, 62), new BoxCollision(p, 8076, 1872, 190, 63), new BoxCollision(p, 0, 0, 100, 100), new BoxCollision(p, 7054, 1344, 180, 67),
                        ],
                        [
                            /* Portals and Transitions */
                            new Transition(p, 3799, 0, 400, 350, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 1, 1936, 800),
                            new DeathBox(p, 1076, 3813, 4571, 175),
                            new Transition(p, 0, 3220, 50, 300, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 8, 3850, 560), // Fire Level
                            new Transition(p, 8950, 300, 50, 500, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 9, 100, 1045), // Cave Tunnel
                        ],
                        [
                            /* Aggressive Enemies */
                            // new Centipede(p, 6897, 3316, 84, 77, 1, 100, 100, true, 20, 20, this.centipedePurple, 1500, 2000),
                            // new Centipede(p, 6260, 3580, 84, 77, 1, 100, 100, true, 20, 20, this.centipedePurple, 1500, 2000),
                            // new Centipede(p, 7412 - 60, 797, 84, 77, 1, 100, 100, true, 20, 20, this.centipedePurple, 1500, 2000),
                            // new Centipede(p, 8112 - 35, 1893, 84, 77, 1, 100, 100, true, 20, 20, this.centipedePurple, 1500, 2000),
                            // new Centipede(p, 4282, 3682, 84, 77, 1, 100, 100, true, 20, 20, this.centipedePurple, 1500, 2000),
                            // new Centipede(p, 2388, 3682, 84, 77, 1, 100, 100, true, 20, 20, this.centipedePurple, 1500, 2000),
                            // new Scorpion(p, 3437, 663, 51, 70, 1, 100, 100, true, 20, 20, this.scorpionBlack, 3300, 5633),
                            // new Scorpion(p, 3437 + 1000, 663, 51, 70, 1, 100, 100, true, 20, 20, this.scorpionBlack, 3300, 5633),
                            // new Scorpion(p, 2244, 1625, 51, 70, 1, 100, 100, true, 20, 20, this.scorpionBlack, 2000, 4800),
                            // new Scorpion(p, 3244, 1625, 51, 70, 1, 100, 100, true, 20, 20, this.scorpionBlack, 2000, 4800),
                            // new Scorpion(p, 3244 + 500, 1625, 51, 70, 1, 100, 100, true, 20, 20, this.scorpionBlack, 2000, 4800),
                            // new Scorpion(p, 5600, 1600, 51, 70, 1, 100, 100, true, 20, 20, this.scorpionBlack, 5200, 6100),
                            // new Scorpion(p, 1200, 994, 51, 70, 1, 100, 100, true, 20, 20, this.scorpionBlack, 900, 1500),
                            // new Scorpion(p, 8433, 900, 51, 70, 1, 100, 100, true, 20, 20, this.scorpionBlack, 8000, 8900),
                            // new Scorpion(p, 1200, 2400, 51, 70, 1, 100, 100, true, 20, 20, this.scorpionBlack, 900, 6200),
                            // new Scorpion(p, 3200, 2400, 51, 70, 1, 100, 100, true, 20, 20, this.scorpionBlack, 900, 6200),
                            // new Scorpion(p, 4200, 2400, 51, 70, 1, 100, 100, true, 20, 20, this.scorpionBlack, 900, 6200),
                        ],
                        [
                            /* Passives Enemies */
                            // new RougeMage(p, 300, 3492, 43, 126, 10, 1000, 0, true, 20, 10, { mage: this.magesRogue, listen: this.chapters[this.currentChap].images.listen, talksound: this.chapters[this.currentChap].sounds.firemage }),
                        ],
                        [
                            /* Collectables */
                        ]
                    )
                );
                this.chapters[this.currentChap].levelMap.push( // 4 (Main Fungal Area)
                    new Page(this, p,
                        [/* Background images */],
                        [/* Mid-ground */[this.chapters[this.currentChap].images.bg, { xOffset: -600, yOffset: -600 }]],
                        [/* Background after mid-ground images */ this.chapters[this.currentChap].images.fungal[5], this.chapters[this.currentChap].images.fungal[6]],
                        [/* Foreground */ this.chapters[this.currentChap].images.fungal[0], this.chapters[this.currentChap].images.fungal[7]],
                        // Set the width and height of the canvas
                        21000, 2000,
                        // Set the camera span editor offset (How close or how far is camera, AKA the field of view)
                        0, 0, 100,

                        // Define Player [Start: 20812, 1745]
                        this.player,
                        [
                            /* Collisions */
                            new BoxCollision(p, 0, 1800, 21000, 195), new BoxCollision(p, 0, 0, 20, 2000), new BoxCollision(p, 20990, 0, 50, 2000), new BoxCollision(p, 2825, 1409, 556, 151),
                            new BoxCollision(p, 2050, 1171, 544, 149), new BoxCollision(p, 2055, 971, 146, 207), new BoxCollision(p, -10, 766, 2068, 554), new BoxCollision(p, 2643, 751, 870, 147),
                            new BoxCollision(p, 3580, 1146, 560, 147), new BoxCollision(p, 3969, 940, 173, 206), new BoxCollision(p, 4113, 734, 1831, 556), new BoxCollision(p, 5855, 575, 7278, 557),
                            new BoxCollision(p, 8870, 502, 2705, 75), new BoxCollision(p, 7212, 1691, 2711, 114), new BoxCollision(p, 13021, 497, 3322, 177), new BoxCollision(p, 16004, 589, 5023, 550),
                            new BoxCollision(p, 4989, -78, 16008, 226), new BoxCollision(p, 22, 145, 4997, 115), new BoxCollision(p, 11316, 1548, 1837, 251), new BoxCollision(p, 11329, 1133, 1834, 215),
                            new BoxCollision(p, 13741, 1396, 1526, 151), new BoxCollision(p, 15950, 1550, 1828, 255), new BoxCollision(p, 15963, 1139, 1827, 210), new BoxCollision(p, 15958, 646, 145, 492),
                            new BoxCollision(p, 13069, 791, 94, 557), new BoxCollision(p, 21, 1282, 81, 551), new BoxCollision(p, 0, 0, 5019, 260), new BoxCollision(p, 2488, 1652, 144, 170),
                            new BoxCollision(p, 3522, 1651, 147, 173), new BoxCollision(p, 15, 236, 129, 562),
                        ],
                        [
                            /* Portals and Transitions */
                            new Transition(p, 20950, 1000, 50, 1000, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 1, 200, 998), // Bottom right of map (Back to ForkInTheCave)
                            new Transition(p, 20950, 0, 50, 1000, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 5, 282, 1292), // Top right of map
                        ],
                        [
                            /* Aggressive Enemies */
                            // new EyeBall(p, 17040, 1490, 869 / 11.1, 485 / 6.5, 1, 25, 100, true, 20, 10, { eyeball: this.eyeBallGreen, eyeballdie: this.chapters[this.currentChap].sounds.eyeballdie, eyeballmove: this.chapters[this.currentChap].sounds.eyeballmove }, 16000, 17750),
                            // new EyeBall(p, 15300, 1350, 869 / 11.1, 485 / 6.5, 1, 25, 100, true, 20, 10, { eyeball: this.eyeBallGreen, eyeballdie: this.chapters[this.currentChap].sounds.eyeballdie, eyeballmove: this.chapters[this.currentChap].sounds.eyeballmove }, 15110, 15640),
                            // new EyeBall(p, 14500, 1350, 869 / 11.1, 485 / 6.5, 1, 25, 100, true, 20, 10, { eyeball: this.eyeBallGreen, eyeballdie: this.chapters[this.currentChap].sounds.eyeballdie, eyeballmove: this.chapters[this.currentChap].sounds.eyeballmove }, 14252, 14781),
                            // new EyeBall(p, 13700, 1350, 869 / 11.1, 485 / 6.5, 1, 25, 100, true, 20, 10, { eyeball: this.eyeBallGreen, eyeballdie: this.chapters[this.currentChap].sounds.eyeballdie, eyeballmove: this.chapters[this.currentChap].sounds.eyeballmove }, 13420, 13943),
                            // new EyeBall(p, 8232, 1631, 869 / 11.1, 485 / 6.5, 1, 25, 100, true, 20, 10, { eyeball: this.eyeBallGreen, eyeballdie: this.chapters[this.currentChap].sounds.eyeballdie, eyeballmove: this.chapters[this.currentChap].sounds.eyeballmove }, 7221, 9922),
                            // new EyeBall(p, 9000, 1631, 869 / 11.1, 485 / 6.5, 1, 25, 100, true, 20, 10, { eyeball: this.eyeBallGreen, eyeballdie: this.chapters[this.currentChap].sounds.eyeballdie, eyeballmove: this.chapters[this.currentChap].sounds.eyeballmove }, 7221, 9922),
                            // new EyeBall(p, 2900, 1360, 869 / 11.1, 485 / 6.5, 1, 25, 100, true, 20, 10, { eyeball: this.eyeBallGreen, eyeballdie: this.chapters[this.currentChap].sounds.eyeballdie, eyeballmove: this.chapters[this.currentChap].sounds.eyeballmove }, 2826, 3378),
                            // new EyeBall(p, 2900, 730, 869 / 11.1, 485 / 6.5, 1, 25, 100, true, 20, 10, { eyeball: this.eyeBallGreen, eyeballdie: this.chapters[this.currentChap].sounds.eyeballdie, eyeballmove: this.chapters[this.currentChap].sounds.eyeballmove }, 2643, 3509),
                            // new EyeBall(p, 9521, 442, 869 / 11.1, 485 / 6.5, 1, 25, 100, true, 20, 10, { eyeball: this.eyeBallGreen, eyeballdie: this.chapters[this.currentChap].sounds.eyeballdie, eyeballmove: this.chapters[this.currentChap].sounds.eyeballmove }, 8870, 11570),
                            // new EyeBall(p, 13446, 437, 869 / 11.1, 485 / 6.5, 1, 25, 100, true, 20, 10, { eyeball: this.eyeBallGreen, eyeballdie: this.chapters[this.currentChap].sounds.eyeballdie, eyeballmove: this.chapters[this.currentChap].sounds.eyeballmove }, 13021, 16340),
                            // new VirusMonster(p, 19000, 1793, 89, 90, 1, 100, 100, true, 20, 20, { monster: this.virusMosterBlue, projectile: this.virusMonsterBombAnimation }, 17500, 20000),
                            // new VirusMonster(p, 12000, 1488, 89, 90, 1, 100, 100, true, 20, 20, { monster: this.virusMosterBlue, projectile: this.virusMonsterBombAnimation }, 11400, 13000),
                            // new VirusMonster(p, 4000, 1700, 89, 90, 1, 100, 100, true, 20, 20, { monster: this.virusMosterBlue, projectile: this.virusMonsterBombAnimation }, 4000, 5500),
                            // new VirusMonster(p, 16899, 500, 89, 90, 1, 100, 100, true, 20, 20, { monster: this.virusMosterBlue, projectile: this.virusMonsterBombAnimation }, 17000, 19000),

                            // new Spider(p, 10802, 1474, 116, 108, 100, 50, 100, true, 20, 10, {
                            //     spider: this.spiderPurple,
                            //     spiderWeb: this.chapters[this.currentChap].images.spiderWeb,
                            //     spiderhiss: this.chapters[this.currentChap].sounds.spiderhiss,
                            //     spidercrawl: this.chapters[this.currentChap].sounds.spider,
                            // }, 600),
                            // new Spider(p, 6439, 1474, 116, 108, 100, 50, 100, true, 20, 10, {
                            //     spider: this.spiderPurple,
                            //     spiderWeb: this.chapters[this.currentChap].images.spiderWeb,
                            //     spiderhiss: this.chapters[this.currentChap].sounds.spiderhiss,
                            //     spidercrawl: this.chapters[this.currentChap].sounds.spider,
                            // }, 600),
                            // new Spider(p, 6439 - 100, 1474 - 50, 116, 108, 100, 50, 100, true, 20, 10, {
                            //     spider: this.spiderPurple,
                            //     spiderWeb: this.chapters[this.currentChap].images.spiderWeb,
                            //     spiderhiss: this.chapters[this.currentChap].sounds.spiderhiss,
                            //     spidercrawl: this.chapters[this.currentChap].sounds.spider,
                            // }, 600),
                            // new Spider(p, 6439 + 100, 1474 - 50, 116, 108, 100, 50, 100, true, 20, 10, {
                            //     spider: this.spiderPurple,
                            //     spiderWeb: this.chapters[this.currentChap].images.spiderWeb,
                            //     spiderhiss: this.chapters[this.currentChap].sounds.spiderhiss,
                            //     spidercrawl: this.chapters[this.currentChap].sounds.spider,
                            // }, 600),
                            // new Spider(p, 5429, 453, 116, 108, 100, 50, 100, true, 20, 10, {
                            //     spider: this.spiderPurple,
                            //     spiderWeb: this.chapters[this.currentChap].images.spiderWeb,
                            //     spiderhiss: this.chapters[this.currentChap].sounds.spiderhiss,
                            //     spidercrawl: this.chapters[this.currentChap].sounds.spider,
                            // }, 600),
                        ],
                        [/* Passives Enemies */],
                        [/* Collectables */]
                    )
                );
                this.chapters[this.currentChap].levelMap.push( // 5 (Small Fungal/Grass Section)
                    new Page(this, p,
                        [
                            // Background images
                            this.chapters[this.currentChap].images.fungal[8],
                        ],
                        [ /* Mid-ground */],
                        [ /* Background after mid-ground images*/],
                        [
                            // Foreground
                            this.chapters[this.currentChap].images.fungal[4],
                        ],

                        // Set the width and height of the canvas
                        3000, 1500,

                        // Set the camera span editor offset
                        // (How close or how far is camera, AKA the field of view)
                        0, 0, 100,

                        // Define Player
                        this.player,

                        [
                            // Collisions
                            new BoxCollision(p, -7, 1275, 2982, 129), new BoxCollision(p, -7, 281, 1939, 361), new BoxCollision(p, 1591, 633, 341, 643), new BoxCollision(p, 1577, 820, 123, 47),
                            new BoxCollision(p, 1568, 944, 196, 85), new BoxCollision(p, 1554, 1038, 262, 32), new BoxCollision(p, 1563, 1117, 244, 39), new BoxCollision(p, 1575, 1168, 115, 109),
                            new BoxCollision(p, -10, 572, 14, 859),
                        ],
                        [
                            // Portals and Transitions
                            new Transition(p, 0, 500, 50, 1000, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 4, 20870, 529),
                        ],
                        [/* Aggressive Enemies*/],
                        [/* Passives Enemies*/],
                        [/* Collectables*/]
                    )
                );
                this.chapters[this.currentChap].levelMap.push( // 6 (Fungal Pillar/Boss Section)
                    new Page(this, p,
                        [/* Background images */ this.chapters[this.currentChap].images.fungalPillars[2], this.chapters[this.currentChap].images.fungalPillars[4]],
                        [/* Mid-ground */],
                        [/* Background after mid-ground images */ this.chapters[this.currentChap].images.fungalPillars[1]],
                        [/* Foreground */ this.chapters[this.currentChap].images.fungalPillars[0], this.chapters[this.currentChap].images.fungalPillars[3]],

                        // Set the width and height of the canvas
                        10000, 10000,

                        // Set the camera span editor offset (How close or how far is camera, AKA the field of view)
                        0, 0, 75,

                        // Define Player Start [9719, 636]
                        this.player,

                        [
                            /* Collisions */
                            new BoxCollision(p, 99990, 0, 10, 10000), new BoxCollision(p, 1823, 1827, 6355, 556), new BoxCollision(p, 8948, 828, 1065, 553), new BoxCollision(p, 9804, 1380, 198, 10000),
                            new BoxCollision(p, 0, 0, 198, 10000), new BoxCollision(p, 0, 0, 10000, 198), new BoxCollision(p, 0, 9798, 10000, 250), new BoxCollision(p, 9616, 196, 400, 132),
                            new BoxCollision(p, 9620, 696, 400, 130), new BoxCollision(p, 7629, 2384, 548, 2338), new BoxCollision(p, 7629, 4930, 548, 2661), new BoxCollision(p, 1827, 2384, 551, 2284),
                            new BoxCollision(p, 1827, 4868, 547, 3258), new BoxCollision(p, 1830, 7590, 6348, 556), new BoxCollision(p, 8777, 1344, 556, 152), new BoxCollision(p, 8269, 644, 148, 534),
                            new BoxCollision(p, 182, 644, 8083, 354), new BoxCollision(p, 8179, 1948, 129, 137), new BoxCollision(p, 8185, 2080, 548, 145), new BoxCollision(p, 9253, 1791, 558, 147),
                            new BoxCollision(p, 9256, 2201, 545, 149), new BoxCollision(p, 8149, 2508, 561, 152), new BoxCollision(p, 9252, 2728, 550, 153), new BoxCollision(p, 8177, 3008, 546, 151),
                            new BoxCollision(p, 9273, 3206, 534, 148), new BoxCollision(p, 8175, 3479, 542, 156), new BoxCollision(p, 9268, 3701, 539, 143), new BoxCollision(p, 8179, 4005, 549, 143),
                            new BoxCollision(p, 9279, 4202, 527, 147), new BoxCollision(p, 8174, 4476, 552, 152), new BoxCollision(p, 9267, 4681, 538, 149), new BoxCollision(p, 8172, 4986, 556, 151),
                            new BoxCollision(p, 9280, 5187, 529, 143), new BoxCollision(p, 8172, 5461, 546, 149), new BoxCollision(p, 9270, 5690, 540, 141), new BoxCollision(p, 8172, 5991, 555, 153),
                            new BoxCollision(p, 9281, 6191, 528, 144), new BoxCollision(p, 8174, 6463, 549, 151), new BoxCollision(p, 9268, 6729, 535, 143), new BoxCollision(p, 8178, 7036, 548, 143),
                            new BoxCollision(p, 9278, 7229, 526, 151), new BoxCollision(p, 8172, 7507, 549, 151), new BoxCollision(p, 9262, 7692, 534, 141), new BoxCollision(p, 8176, 7996, 546, 152),
                            new BoxCollision(p, 9275, 8198, 533, 145), new BoxCollision(p, 8162, 8474, 554, 145), new BoxCollision(p, 9258, 8720, 545, 152), new BoxCollision(p, 8166, 9029, 546, 141),
                            new BoxCollision(p, 9272, 9224, 536, 149), new BoxCollision(p, 8155, 9411, 549, 149), new BoxCollision(p, 193, 2079, 561, 152), new BoxCollision(p, 1292, 2386, 550, 153),
                            new BoxCollision(p, 196, 2613, 558, 144), new BoxCollision(p, 1284, 2890, 546, 145), new BoxCollision(p, 199, 3088, 530, 148), new BoxCollision(p, 1289, 3366, 539, 143),
                            new BoxCollision(p, 192, 3577, 549, 143), new BoxCollision(p, 1280, 3886, 544, 141), new BoxCollision(p, 193, 4084, 532, 141), new BoxCollision(p, 1284, 4358, 537, 143),
                            new BoxCollision(p, 196, 4640, 545, 149), new BoxCollision(p, 1283, 4905, 550, 149), new BoxCollision(p, 183, 5063, 541, 152), new BoxCollision(p, 1282, 5340, 541, 151),
                            new BoxCollision(p, 195, 5566, 540, 149), new BoxCollision(p, 1275, 5872, 553, 147), new BoxCollision(p, 198, 6070, 526, 149), new BoxCollision(p, 1282, 6344, 546, 149),
                            new BoxCollision(p, 182, 6608, 556, 145), new BoxCollision(p, 1278, 6914, 546, 152), new BoxCollision(p, 189, 7110, 538, 151), new BoxCollision(p, 1282, 7388, 558, 148),
                            new BoxCollision(p, 202, 7574, 538, 148), new BoxCollision(p, 1284, 7880, 549, 143), new BoxCollision(p, 179, 8075, 554, 145), new BoxCollision(p, 1292, 8355, 550, 144),
                            new BoxCollision(p, 193, 8603, 554, 143), new BoxCollision(p, 1289, 8912, 550, 140), new BoxCollision(p, 186, 9105, 549, 149), new BoxCollision(p, 1293, 9384, 554, 143),
                            new BoxCollision(p, 1266, 1959, 561, 147), new BoxCollision(p, 189, 1674, 557, 145), new BoxCollision(p, 9026, 9693, 782, 144), new BoxCollision(p, 195, 9638, 722, 166),
                            new BoxCollision(p, 8628, 905, 144, 152), new BoxCollision(p, 7932, 1170, 558, 150), new BoxCollision(p, 8377, 1586, 147, 140), new BoxCollision(p, 197, 556, 533, 109),
                            new BoxCollision(p, 2036, 531, 3530, 113), new BoxCollision(p, 2035, 190, 3530, 145), new BoxCollision(p, 1704, 1871, 119, 92),
                        ],
                        [/* Portals and Transitions */
                            new CamBox(0, 0, 50, p, 9619, 333, 64, 371),
                            new CamBox(0, 0, 75, p, 9715, 328, 271, 367),
                            new CamBox(0, 0, 75, p, 8424, 186, 517, 1153),
                            new Transition(p, 9950, 300, 50, 500, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 4, 200, 1572)],
                        [/* Aggressive Enemies */],
                        [/* Passives Enemies */],
                        [/* Collectables */]
                    )
                );
                this.chapters[this.currentChap].levelMap.push( // 7 (Empty canvas branching off fungal (Bridge area to nest?))
                    new Page(this, p, [ /* Background images */], [ /* Mid-ground */], [ /* Background after mid-ground images */], [ /* Foreground */],
                        // Set the width and height of the canvas
                        21000, 2000,
                        // Set the camera span editor offset (How close or how far is camera, AKA the field of view)
                        0, 0, 100,
                        // Define Player [Start: 20812, 1745]
                        this.player,
                        [/* Collisions */ new BoxCollision(p, 0, 1800, 21000, 195)], [ /* Portals and Transitions */], [ /* Aggressive Enemies */], [ /* Passives Enemies */], [ /* Collectables */]
                    )
                );
                this.chapters[this.currentChap].levelMap.push( // 8 Fire Boss
                    new Page(this, p, [ /* Background images */], [ /* Mid-ground */], [ /* Background after mid-ground images */this.chapters[this.currentChap].images.fireBoss[1]], [ /* Foreground */ this.chapters[this.currentChap].images.fireBoss[0],],
                        // Set the width and height of the canvas
                        4000, 1000,
                        // Set the camera span editor offset (How close or how far is camera, AKA the field of view)
                        0, 0, 100,
                        // Define Player [Start: 20812, 1745]
                        this.player,
                        [
                            /* Collisions */
                            new BoxCollision(p, -20, 862, 4160, 322), new BoxCollision(p, 3586, 620, 555, 568), new BoxCollision(p, 3587, -21, 572, 393),
                            new BoxCollision(p, -540, -63, 659, 1247), new BoxCollision(p, -10, -62, 4109, 198), new BoxCollision(p, 3988, 257, 1298, 477)],
                        [
                            /* Portals and Transitions */
                            new Transition(p, 3950, 0, 50, 1000, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 3, 150, 3382), // Back to the cave
                        ],
                        [
                            /* Aggressive Enemies */
                            // new Brute(p, 400, 900, 130, 327, 1, 100, 100, true, 20, 20, this.bruteKnightSkeleton, 200, 3200),
                        ],
                        [/* Passives Enemies */],
                        [/* Collectables */]
                    )
                );
                this.chapters[this.currentChap].levelMap.push( // 9 Cave Tunnel (Top right of cave)
                    new Page(this, p, [/* Background images */ this.chapters[this.currentChap].images.cave[5]], [ /* Mid-ground */], [ /* Background after mid-ground images */], [/* Foreground */ this.chapters[this.currentChap].images.cave[2], this.chapters[this.currentChap].images.cave[6]],
                        // Set the width and height of the canvas
                        12000, 1500,
                        // Set the camera span editor offset (How close or how far is camera, AKA the field of view)
                        0, 0, 100,
                        // Define Player [Start: 20812, 1745]
                        this.player,
                        [
                            /* Collisions */
                            new BoxCollision(p, -2, 1352, 5832, 155), new BoxCollision(p, -8, 1105, 336, 247), new BoxCollision(p, -2, 425, 336, 415), new BoxCollision(p, 274, 425, 8836, 219),
                            new BoxCollision(p, -40, 781, 45, 451), new BoxCollision(p, 4648, 643, 558, 207), new BoxCollision(p, 9066, 1000, 2894, 348), new BoxCollision(p, 9472, 898, 2488, 450),
                            new BoxCollision(p, 9916, 788, 2044, 560), new BoxCollision(p, 10249, 674, 1711, 674), new BoxCollision(p, 10463, 592, 1497, 756), new BoxCollision(p, 4654, 1128, 558, 237),
                            new BoxCollision(p, 6063, 1202, 173, 70), new BoxCollision(p, 6555, 1274, 180, 66), new BoxCollision(p, 7131, 1210, 156, 69), new BoxCollision(p, 7553, 1180, 788, 58),
                            new BoxCollision(p, 8570, 983, 176, 68), new BoxCollision(p, 6688, 882, 778, 69), new BoxCollision(p, 9077, 215, 410, 350), new BoxCollision(p, 9460, 121, 481, 300),
                            new BoxCollision(p, 9933, 15, 542, 298), new BoxCollision(p, 10391, 14, 1698, 110), new BoxCollision(p, 11500, 56, 501, 180), new BoxCollision(p, 11505, 470, 529, 162),
                            new BoxCollision(p, 11989, 58, 331, 618), new BoxCollision(p, 5592, 1501, 3616, 89), new BoxCollision(p, 9068, 1240, 259, 428),
                        ],
                        [
                            /* Portals and Transitions */
                            new Transition(p, 0, 0, 50, 1500, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 3, 8761, 430), // back to the cave
                            new Transition(p, 11950, 0, 50, 1000, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 10, 117, 713), // To the next forest location
                            new DeathBox(p, 5818, 1381, 3258, 165),
                            new SoundBox(0, 0, 12000, 1500, "stone"),
                        ],
                        [
                            /* Aggressive Enemies */
                            // new Centipede(p, 4851, 1145, 84, 77, 1, 100, 100, true, 20, 20, this.centipedePurple, 1500, 2000),
                            // new Scorpion(p, 600, 1200, 84, 77, 1, 100, 100, true, 20, 20, this.scorpionBlack, 390, 4500),
                            // new Scorpion(p, 1500, 1200, 84, 77, 1, 100, 100, true, 20, 20, this.scorpionBlack, 390, 4500),
                            // new Scorpion(p, 3000, 1200, 84, 77, 1, 100, 100, true, 20, 20, this.scorpionBlack, 390, 4500),
                            // new Scorpion(p, 10900, 530, 84, 77, 1, 100, 100, true, 20, 20, this.scorpionBlack, 10500, 11440),
                        ],
                        [
                            /* Passives Enemies */
                        ],
                        [
                            /* Collectables */
                        ]
                    )
                );
                this.chapters[this.currentChap].levelMap.push( // 10 WalkwayToTheCastle
                    new Page(this, p,
                        [/* Background images */],
                        [/* Mid-ground */[this.chapters[this.currentChap].images.bg, { xOffset: -600, yOffset: -600 }]],
                        [/* Background after mid-ground images */],
                        [/* Foreground */ this.chapters[this.currentChap].images.walkwayToTheCastle[0]],
                        // Set the width and height of the canvas
                        21000, 2000,
                        // Set the camera span editor offset (How close or how far is camera, AKA the field of view)
                        0, 0, 100,
                        // Define Player 117 537 14170 1750
                        this.player,
                        [
                            /* Collisions */
                            new BoxCollision(p, -18, 1713, 3629, 277), new BoxCollision(p, 0, 773, 1038, 270), new BoxCollision(p, 0, 871, 163, 1118), new BoxCollision(p, 114, 1426, 227, 72),
                            new BoxCollision(p, 882, 1041, 155, 293), new BoxCollision(p, 1038, 927, 140, 58), new BoxCollision(p, 1039, 1249, 325, 75), new BoxCollision(p, 1931, 1019, 148, 64),
                            new BoxCollision(p, 1640, 1523, 475, 424), new BoxCollision(p, 1550, 1631, 639, 355), new BoxCollision(p, 3053, 1543, 558, 447), new BoxCollision(p, -342, 272, 352, 527),
                            new BoxCollision(p, 2013, 228, 345, 222), new BoxCollision(p, 2038, 436, 295, 56), new BoxCollision(p, 2042, 493, 252, 212), new BoxCollision(p, 2072, 700, 312, 53),
                            new BoxCollision(p, 2110, 747, 336, 120), new BoxCollision(p, 2084, 847, 601, 63), new BoxCollision(p, 2058, 896, 639, 182), new BoxCollision(p, 2100, 1085, 203, 30),
                            new BoxCollision(p, 2072, 876, 100, 100), new BoxCollision(p, 2100, 835, 100, 100), new BoxCollision(p, 2100, 835, 100, 100), new BoxCollision(p, 2046, 950, 100, 100),
                            new BoxCollision(p, 2052, 936, 100, 100), new BoxCollision(p, 2276, 561, 3300, 526), new BoxCollision(p, 3870, 1615, 699, 102), new BoxCollision(p, 4875, 1516, 683, 102),
                            new BoxCollision(p, 5922, 1602, 696, 102), new BoxCollision(p, 6778, 1572, 452, 418), new BoxCollision(p, 7108, 1427, 13921, 563), new BoxCollision(p, 5576, 712, 1230, 334),
                            new BoxCollision(p, 6794, 767, 2230, 249), new BoxCollision(p, 8897, 920, 116, 137), new BoxCollision(p, 10241, 758, 10788, 299), new BoxCollision(p, 9204, 1339, 877, 367),
                            new BoxCollision(p, 9372, 1290, 577, 404), new BoxCollision(p, 9489, 1211, 365, 471), new BoxCollision(p, 9020, 871, 166, 230), new BoxCollision(p, 9165, 983, 187, 117),
                            new BoxCollision(p, 9942, 978, 380, 104), new BoxCollision(p, 2036, 101, 341, 96), new BoxCollision(p, 2070, 37, 256, 82), new BoxCollision(p, 2110, 2, 189, 38),
                            new BoxCollision(p, 10098, 874, 147, 116), new BoxCollision(p, 9306, 547, 691, 102), new BoxCollision(p, 16792, 592, 4185, 184), new BoxCollision(p, 20595, 483, 439, 429),
                            new BoxCollision(p, 20993, 175, 553, 354), new BoxCollision(p, 20591, 11, 600, 218), new BoxCollision(p, 18821, -22, 2318, 73), new BoxCollision(p, 19740, 1019, 267, 531),
                            new BoxCollision(p, 19673, 1395, 100, 100), new BoxCollision(p, 19701, 1375, 100, 100), new BoxCollision(p, 19725, 1361, 100, 100),
                        ],
                        [
                            /* Portals and Transitions */
                            new Transition(p, 0, 300, 50, 600, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 9, 11696, 410),
                            new Transition(p, 20900, 200, 100, 600, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 11, 99, 880),
                            new DeathBox(p, 3590, 1803, 3198, 187), new DeathBox(p, 152, 1043, 755, 118)
                        ],
                        [
                            // new DogMan(p, 8000, 1300, 118, 230, 1, 100, 100, true, 20, 20, this.dogmanBlack, 7200, 9000),
                            // new DogMan(p, 12000, 1300, 118, 230, 1, 100, 100, true, 20, 20, this.dogmanBlack, 10500, 19500),
                            // new DogMan(p, 14000, 1300, 118, 230, 1, 100, 100, true, 20, 20, this.dogmanBlack, 10500, 19500),
                            // new DogMan(p, 16000, 1300, 118, 230, 1, 100, 100, true, 20, 20, this.dogmanBlack, 10500, 19500),
                            // new DogMan(p, 18000, 1300, 118, 230, 1, 100, 100, true, 20, 20, this.dogmanBlack, 10500, 19500),
                            // new Rhino(p, 2438, 431, 247, 171, 1, 100, 100, true, 20, 20, this.rhinoDark, 2440, 5500),
                            // new Rhino(p, 2438 + 300, 431, 247, 171, 1, 100, 100, true, 20, 20, this.rhinoDark, 2440, 5500),
                            // new Rhino(p, 2438 + 700, 431, 247, 171, 1, 100, 100, true, 20, 20, this.rhinoDark, 2440, 5500),
                            // new Rhino(p, 16606, 640, 247, 171, 1, 100, 100, true, 20, 20, this.rhinoDark, 10376, 16600),
                            // new Rhino(p, 16606 - 500, 640, 247, 171, 1, 100, 100, true, 20, 20, this.rhinoDark, 10376, 16600),
                            // new Rhino(p, 16606 - 900, 640, 247, 171, 1, 100, 100, true, 20, 20, this.rhinoDark, 10376, 16600),
                        ],
                        [ /* Passives Enemies */],
                        [ /* Collectables */]
                    )
                );
                this.chapters[this.currentChap].levelMap.push( // 11 Castle
                    new Page(this, p,
                        [/* Background images */],
                        [/* Mid-ground */
                            // [this.chapters[this.currentChap].images.bg, { xOffset: -600, yOffset: -600 }]
                        ],
                        [
                            /* Background after mid-ground images */
                            this.chapters[this.currentChap].images.castle[2],
                            this.chapters[this.currentChap].images.castle[1],
                        ],
                        [
                            /* Foreground */
                            this.chapters[this.currentChap].images.castle[0],
                        ],
                        // Set the width and height of the canvas
                        21000, 1000,
                        // Set the camera span editor offset (How close or how far is camera, AKA the field of view)
                        0, 0, 100,

                        // Define Player 117 537 14170 1750
                        this.player,

                        [/* Collisions */ new BoxCollision(p, 0, 900, 19877, 94), new BoxCollision(p, 0, 0, 29, 1017), new BoxCollision(p, 0, 0, 21036, 89), new BoxCollision(p, 20219, 895, 977, 122), new BoxCollision(p, 1089, 820, 1523, 83), new BoxCollision(p, 3265, 821, 1481, 78), new BoxCollision(p, 4736, 745, 9397, 168), new BoxCollision(p, 4699, 693, 9463, 34), new BoxCollision(p, 20913, 77, 386, 916)],
                        [
                            /* Portals and Transitions */
                            new Transition(p, 0, 600, 50, 600, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 10, 20785, 423),
                            new Transition(p, 19600, 975, 1000, 930, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 12, 2522, 300),
                        ],
                        [
                            // new Knights(p, 800, 800, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 400, 1000),
                            // new Knights(p, 2300, 800, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 1100, 2500),
                            // new Knights(p, 1500, 800, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 1100, 2500),
                            // new Knights(p, 3800, 800, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 3300, 4500),
                            // new Knights(p, 4200, 800, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 3300, 4500),
                            // new Knights(p, 5200, 500, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 4800, 14000),
                            // new Knights(p, 7200, 500, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 4800, 14000),
                            // new Knights(p, 9200, 500, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 4800, 14000),
                            // new Knights(p, 10000, 500, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 4800, 14000),
                            // new Knights(p, 10500, 500, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 4800, 14000),
                            // new Knights(p, 11000, 500, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 4800, 14000),
                            // new Knights(p, 12000, 500, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 4800, 14000),
                            // new Knights(p, 12500, 500, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 4800, 14000),
                            // new Knights(p, 13500, 500, 58, 172, 1, 100, 100, true, 20, 20, this.knight1, 4800, 14000),
                            // new Brute(p, 9200, 500, 130, 327, 1, 100, 100, true, 20, 20, this.bruteKnightSkeleton, 4800, 14000),
                        ],
                        [/* Passives Enemies */],
                        [/* Collectables */]
                    )
                );
                this.chapters[this.currentChap].levelMap.push( // 12 (Manticore Cave)
                    new Page(this, p,
                        [/* Background images */],
                        [/* Mid-ground */],
                        [/* Background after mid-ground images */this.chapters[this.currentChap].images.manitCave[1]],
                        [/* Foreground */ this.chapters[this.currentChap].images.manitCave[0]],
                        // Set the width and height of the canvas
                        9000, 4500,
                        // Set the camera span editor offset (How close or how far is camera, AKA the field of view)
                        0, 0, 100,

                        // Define Player 3847 1007
                        this.player,
                        [
                            /* Collisions */
                            new BoxCollision(p, 2055, 474, 1410, 351),
                            new BoxCollision(p, 3317, 678, 663, 353),
                            new BoxCollision(p, 3832, 879, 674, 350),
                            new BoxCollision(p, 4290, 1740, 675, 363),
                            new BoxCollision(p, 4352, 1186, 150, 252),
                            new BoxCollision(p, 4818, 1543, 674, 359),
                            new BoxCollision(p, 5347, 1342, 495, 360),
                            new BoxCollision(p, 169, -45, 1894, 871),
                            new BoxCollision(p, 2051, -13, 274, 228),
                            new BoxCollision(p, 2822, 2, 240, 217),
                            new BoxCollision(p, 3061, 1, 2879, 180),
                            new BoxCollision(p, 5825, 165, 2322, 1617),
                            new BoxCollision(p, 2530, 1938, 1907, 361),
                            new BoxCollision(p, 2532, 2285, 145, 215),
                            new BoxCollision(p, 1711, 2916, 542, 628),
                            new BoxCollision(p, 1161, 2718, 552, 818),
                            new BoxCollision(p, 2251, 3119, 524, 425),
                            new BoxCollision(p, 2773, 3320, 539, 528),
                            new BoxCollision(p, 652, 2522, 518, 794),
                            new BoxCollision(p, 115, 2322, 535, 899),
                            new BoxCollision(p, -2, 0, 173, 4500),
                            new BoxCollision(p, 3301, 3517, 553, 503),
                            new BoxCollision(p, 3827, 3713, 558, 444),
                            new BoxCollision(p, 4358, 3911, 559, 473),
                            new BoxCollision(p, 0, 4110, 9000, 1000),
                            new BoxCollision(p, 8743, 2908, 480, 1626),
                            new BoxCollision(p, 4788, 1099, 390, 22),
                            new BoxCollision(p, 1067, 2169, 399, 26),
                            new BoxCollision(p, 1836, 2043, 400, 22),
                        ],
                        [
                            /* Portals and Transitions */
                            new Transition(p, 2200, 0, 1200, 180, 0, 0, 0, false, 20, 10, this.chapters[this.currentChap], 11, 20050, 700),
                        ],
                        [
                            // new Manticore(p, 7500, 3800, 221, 170, 1, 100, 100, true, 20, 20, this.manticoreBlue, 4900, 8400),
                        ],
                        [/* Passives Enemies */],
                        [/* Collectables */]
                    )
                );
                break;
        }

        // console.log(`Performance load image data for chapter ${this.currentChap} is`, this.loader.performanceData);
    }

    drawSequentialChaps(p) {
        this.chapters[this.currentChap].draw(p);
    }

    returnCurrentChap() {
        return this.chapters[this.currentChap];
    }
}
