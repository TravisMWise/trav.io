export class Loader {

    constructor() {

        // Images
        this.allMapsImageData = {}
        this.specificMapImageData = {};

        // Sounds
        this.allMapsSoundData = {}
        this.specificMapSoundData = {};

        // Performance
        this.performanceData = { total: 0 }
    }

    loadSet(p, val, folder, name, labels, frames, offset = 0) {
        let start = performance.now();
        for (var i = 0; i < labels.length; i++) {
            var label = labels[i];
            val[label] = [];
            // let subStart = performance.now();
            for (var j = 0 + offset; j < frames[i]; j++) {
                val[label].push(
                    p.loadImage('images/' + folder + "/" + labels[i] + "/" + name + labels[i] + "_" + "0" + ('0' + j).slice(-2) + ".png")
                )
            }
            // let subDuration = performance.now() - subStart;
            // console.log(name, label, subDuration)
        }
        let duration = performance.now() - start;
        this.performanceData.total += duration;
        var nameInfo = name;
        this.performanceData[nameInfo] = duration;
    }

    loadAnimation(p, folder, labels, width) {
        var val = {};
        for (var i = 0; i < labels.length; i++) {
            var label = labels[i];
            this.loadHelper(p, folder, label, val, width);
        }
        return val;
    }

    loadHelper(p, folder, label, val, width) {
        val[label] = [];
        var img = p.loadImage('images/' + folder + "/" + label + ".png", img => {
            var frames = img.width / width;
            var height = img.height;
            for (var i = 0; i < frames; i++) {
                val[label].push(
                    img.get((i * width), 0, width, height)
                );
            }
        });
    }

    loadImages(p, currentChap) {
        // Data to be loaded in every map
        this.allMapsImageData = {
            // Main Character
            focus: p.loadImage("images/effects/focus_effect.png"),

            // Main Character abilities and effects
            heal: p.loadImage("images/old/heal.png"),

            // Enemies
            spiderWeb: p.loadImage("images/old/spiderweb.png"),
            sword: p.loadImage("images/old/sword.png"),

            // Dialogue system
            listen: p.loadImage("images/dialogueBox/listen.png"),
            talkbox: p.loadImage("images/dialogueBox/boxwrite.png"),
            talkboxenter: p.loadImage("images/dialogueBox/boxenter.png"),

            // Map Effects
            portal: p.loadImage("images/old/effects/portal.png"),

            // Maps
            bg: p.loadImage("images/maps/backdrops/moon.png"),
        }

        // Data to be loaded based on specific chapter
        switch (currentChap) {
            case 0: // Test Map
                this.specificMapImageData = {
                    test_map: p.loadImage("images/maps/test_map/TestMap.png"),
                }
                break;
            case 1: // First Adventure
                this.specificMapImageData = {
                    mapData: [
                        p.loadImage("images/maps/first_adventure/FirstAdventureMain.png"),               // 0
                        p.loadImage("images/maps/first_adventure/FirstAdventureBg1.png"),                // 1
                        p.loadImage("images/maps/fork_in_the_cave/ForkInTheCave.png"),                   // 2
                        p.loadImage("images/maps/fork_in_the_cave/ForkInTheCaveBg.png"),                 // 3
                        p.loadImage("images/maps/first_adventure/FirstAdventureBg2.png"),                // 4
                        p.loadImage("images/maps/first_adventure/FirstAdventureFg1.png"),                // 5
                        p.loadImage("images/maps/tree_fight/TreeFight_Bg.png"),                          // 6
                        p.loadImage("images/maps/tree_fight/TreeFight_Fg1_alt.png"),                     // 7
                        p.loadImage("images/maps/fork_in_the_cave/ForkInTheCaveFront.png"),              // 8
                        p.loadImage("images/maps/fork_in_the_cave/ForkInTheCave_Backdrop.png"),          // 9
                        p.loadImage("images/maps/fork_in_the_cave/ForkInTheCave_Fg.png"),                // 10
                    ],
                    cave: [
                        p.loadImage("images/maps/cave/CaveMain.png"),                                    // 0
                        p.loadImage("images/maps/cave/CaveMainBg.png"),                                  // 1
                        p.loadImage("images/maps/cave/CaveTunnelMain.png"),                              // 2
                        p.loadImage("images/maps/cave/CaveMainBg_0.png"),                                // 3
                        p.loadImage("images/maps/cave/CaveMainFg.png"),                                  // 4
                        p.loadImage("images/maps/cave/CaveTunnelMain_Bg.png"),                              // 5
                        p.loadImage("images/maps/cave/CaveTunnelMain_Fg.png"),                              // 6
                    ],
                    fungal: [
                        p.loadImage("images/maps/fungal/FungalAreaMain.png"),               // 0
                        p.loadImage("images/maps/fungal/FungalMap.png"),                    // 1
                        p.loadImage("images/maps/fungal/FungalMap_Backdrop.jpg"),           // 2
                        p.loadImage("images/maps/fungal/FungalMap_Foreground.png"),         // 3
                        p.loadImage("images/maps/fungal/FungalGrass.png"),                  // 4
                        p.loadImage("images/maps/fungal/FungalAreaMain_Bg1.png"),           // 5
                        p.loadImage("images/maps/fungal/FungalAreaMain_Bg2.png"),           // 6
                        p.loadImage("images/maps/fungal/FungalAreaMain_Fg.png"),            // 7
                        p.loadImage("images/maps/fungal/FungalGrass_Bg.png"),               // 8
                    ],
                    fungalPillars: [
                        p.loadImage("images/maps/fungal_pillars/FungalPillarsMain.png"),        // 0
                        p.loadImage("images/maps/fungal_pillars/FungalPillars.png"),             // 1
                        p.loadImage("images/maps/fungal_pillars/FungalPillarsMain_Bg.png"),     // 2
                        p.loadImage("images/maps/fungal_pillars/FungalPillarsMain_Fg.png"),      // 3
                        p.loadImage("images/maps/fungal_pillars/FungalPillarsMain_Bg0.png"),      // 4
                    ],
                    walkwayToTheCastle: [
                        p.loadImage("images/maps/walkway_to_the_castle/WalkwayToTheCastleMain.png") // 0
                    ],
                    fireBoss: [
                        p.loadImage("images/maps/fire/FireBossMain.png"),
                        p.loadImage("images/maps/fire/FireBossBGBlur.png")
                    ],
                    castle: [
                        p.loadImage("images/maps/castle/CastleMain.png"),
                        p.loadImage("images/maps/castle/CastleBG.png"),
                        p.loadImage("images/maps/castle/CastleBG2.png")
                    ],
                    manitCave: [
                        p.loadImage("images/maps/manticoreCastle/MantiCaveMain.png"),
                        p.loadImage("images/maps/manticoreCastle/MantiCaveBG.png"),
                    ]
                }
                break;
            case 3: // Snow Map
                this.specificMapImageData = {}
                break;
        }

        let loadData = {};
        Object.keys(this.specificMapImageData).forEach(key => { loadData[key] = this.specificMapImageData[key]; });
        Object.keys(this.allMapsImageData).forEach(key => { loadData[key] = this.allMapsImageData[key]; });
        return loadData;
    }

    loadSounds(p, currentChap) {
        // Data to be loaded in every map
        this.allMapsSoundData = { // Create new sound object
            doveS: new Audio('sounds/whistle.mp3'),
            walk: new Audio("sounds/grass_fast.mp3"),
            stone: new Audio("sounds/walk.mp3"),
            jumpS: new Audio("sounds/jump.mp3"),
            portalS: new Audio("sounds/portal.mp3"),
            wind: new Audio("sounds/wind.mp3"),
            squid: new Audio("sounds/squid.mp3"),
            spider: new Audio("sounds/spiderwalk.mp3"),
            spiderhiss: new Audio("sounds/spiderhiss.mp3"),
            dog: new Audio("sounds/dog.mp3"),
            beetle: new Audio("sounds/beetle.mp3"),
            beetledies: new Audio("sounds/beetledies.mp3"),
            playerhurt: new Audio('sounds/playerhurt.mp3'),
            playerheal: new Audio('sounds/heal.mp3'),
            playerslash: new Audio('sounds/playerslash.mp3'),
            desolationTrack: new Audio('sounds/Sad_Mysterious.mp3'),
            firemage: new Audio('sounds/firemagetalk.mp3'),
            wolf: new Audio('sounds/wolf.mp3'),
            treeroar: new Audio('sounds/tree_roar.mp3'),
            treepunch: new Audio('sounds/tree_punch.mp3'),
            treewalk: new Audio('sounds/tree_walk.mp3'),
            treesmash: new Audio('sounds/tree_smash.mp3'),
            treehurt: new Audio('sounds/tree_hurt.mp3'),
            nextmessage: new Audio('sounds/nextmessage.mp3'),
            eyeballmove: new Audio('sounds/eyeballmove.mp3'),
            eyeballdie: new Audio('sounds/eyeballdie.mp3'),
        }

        this.allMapsSoundData.doveS.volume = 0.05;
        this.allMapsSoundData.jumpS.volume = 0.8;
        this.allMapsSoundData.playerhurt.volume = 0.2;
        this.allMapsSoundData.playerheal.volume = 0.2;
        this.allMapsSoundData.playerslash.volume = 0.2;
        this.allMapsSoundData.portalS.volume = 0.05;
        this.allMapsSoundData.wind.volume = 0.5;
        this.allMapsSoundData.squid.volume = 0.2;
        this.allMapsSoundData.spider.volume = 0.2;
        this.allMapsSoundData.spiderhiss.volume = 0.4;
        this.allMapsSoundData.beetle.volume = 0.4;
        this.allMapsSoundData.beetledies.volume = 0.6;
        this.allMapsSoundData.dog.volume = 0.3;
        this.allMapsSoundData.desolationTrack.volume = 0.4;

        this.allMapsSoundData.firemage.volume = 0.3;

        // Data to be loaded based on specific chapter
        switch (currentChap) {
            case 0: // Test Map
                this.specificMapSoundData = {
                    backgroundMusic: {
                        wanderingVibe: new Audio('music/Wandering_Vibe.mp3')
                    }
                }
                break;
            case 1: // Grass Map
                this.specificMapSoundData = {
                    backgroundMusic: {
                        wanderingVibe: new Audio('music/Wandering_Vibe.mp3'),
                        combatVibe: new Audio('music/Combat_Tense_Vibe.mp3'),
                        cave: new Audio('music/caveambiance.mp3'),
                        grass: new Audio('music/grassambiance.mp3')
                    }
                }
                break;
        }

        let loadData = {};
        Object.keys(this.specificMapSoundData).forEach(key => { loadData[key] = this.specificMapSoundData[key]; });
        Object.keys(this.allMapsSoundData).forEach(key => { loadData[key] = this.allMapsSoundData[key]; });
        return loadData;
    }
}