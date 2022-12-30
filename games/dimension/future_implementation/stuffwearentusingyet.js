
// appearing text in game
class StoryTxt {

    constructor (m, tx, ty, s, r, x, y, w, h, seeBox) {
        this.m = m;
        this.tx = tx; this.ty = ty;
        this.s = s; this.r = r;
        this.x = x; this.y = y;
        this.w = w; this.h = h;
        this.seeBox = seeBox;
        this.inView = false;
        this.show = 300;
    }

    draw () {

        // showcase
        noStroke();
        textFont("serif");
        textSize(this.s);
        fill(255, 255, 255, 30  - this.show);
        push();
        translate(this.tx, this.ty);
        rotate(this.r);
        text(this.m, 0, 0 - this.s / 12);
        text(this.m, 0, 0 + this.s / 12);
        text(this.m, 0 + this.s / 12, 0 + this.s / 12);
        text(this.m, 0 - this.s / 12, 0 - this.s / 12);
        fill(255, 255, 255, 300 - this.show);
        text(this.m, 0, 0);
        pop();

        // if collide in apear box make woosh sound and fade in text
        if(rectCollide(this,levelMap[level].player) && !this.inView)
        {
            this.inView = true;
            wind.play();
        }

        // once in view show text
        if(this.inView || this.seeBox)
        {
            this.show /= 1.1;
        }

        // for spectating
        if(this.seeBox)
        {
            fill(255);
            rect(this.x, this.y, this.w, this.h);
        }
    }

}

// checkpoint
class Checkpoint {
    constructor (x, y) {        
        this.x = x; this.y = y;
        this.w = 30; this.h = 100;
        this.gotit = false;
        this.shade = 300;
    }
    draw () {

        // show collision box for spectator mode
        if(spectMode)
        {
            stroke(255, 255, 255);
            noFill();
            rect(this.x, this.y, this.w, this.h);
        }

        if(view(this))
        {
            noFill();
            strokeWeight(6);
            stroke(255, 255, 255, 100);
            ellipse(this.x + this.w / 2, this.y + this.w / 2 - 2, this.w, this.w);
            line(this.x + this.w / 2, this.y + this.w, this.x + this.w / 2, this.y + this.h);
            strokeWeight(2);
            stroke(255);
            ellipse(this.x + this.w / 2, this.y + this.w / 2 - 2, this.w, this.w);
            line(this.x + this.w / 2, this.y + this.w, this.x + this.w / 2, this.y + this.h);

            noStroke();

            // effect
            if(this.gotit)
            {
                this.shade /= 1.01;
                fill(255, 255, 255, 300 - this.shade)
                ellipse(this.x + this.w / 2, this.y + this.w / 2 - 2, this.w, this.w);
            }

            // if player touches portal
            if(rectCollide(this, levelMap[level].player))
            {
                this.gotit = true;
                levelMap[level].player.origx = this.x + this.w / 2 + 30;
                levelMap[level].player.origy = this.y + this.h / 2 - 100;
            }
        }
    }
}

/**

    loadChap1(p) {

        this.chap1 = new Chapter(
            {
                player: p.loadImage("images/girl.png"),
                hope: p.loadImage("images/bird.png"),
                beetle: p.loadImage("images/beetle.png"),
                spider: p.loadImage("images/spider.png"),
                spiderWeb: p.loadImage("images/spiderweb.png"),
                wolf: p.loadImage("images/wolf.png"),
                sword: p.loadImage("images/sword.png"),
                heal: p.loadImage("images/heal.png"),
                froggyBoi: p.loadImage("images/froggyboi.png"),
                desolation: [
                    p.loadImage("images/backdrop1.jpg"),         // 0
                    p.loadImage("images/scene_1_rocks.png"),     // 1
                    p.loadImage("images/backdrop2.jpg"),         // 2
                    p.loadImage("images/scene_2_rocks.png"),     // 3
                    p.loadImage("images/backdrop3.jpg"),         // 4
                    p.loadImage("images/scene_3_rocks.png"),     // 5
                    p.loadImage("images/backdrop4.jpg"),         // 6
                    p.loadImage("images/scene_4_rocks.png"),     // 7
                    p.loadImage("images/isolationbanner.png"),   // 8
                    p.loadImage("images/backdrop5.jpg"),         // 9
                    p.loadImage("images/scene_5_rocks.png"),     // 10
                    p.loadImage("images/maps/FungalMap.png"), // 11
                ]
            }, // images
            {
                doveS: new Audio('sounds/whistle.mp3'),
                bgMusic: new Audio('sounds/desolation.wav'),
                walk: new Audio("sounds/walk.mp3"),
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
                desolationTrack: new Audio('sounds/Sad_Mysterious.mp3')
            }, // sounds
            {
                player: 0,
            }, // sprites

            this.pageNumber // current level number
        )

        {
            this.chap1.sounds.doveS.volume = 0.05;
            this.chap1.sounds.jumpS.volume = 0.8;
            this.chap1.sounds.playerhurt.volume = 0.2;
            this.chap1.sounds.playerheal.volume = 0.2;
            this.chap1.sounds.playerslash.volume = 0.2;
            this.chap1.sounds.portalS.volume = 0.05;
            this.chap1.sounds.wind.volume = 1;
            this.chap1.sounds.squid.volume = 0.2;
            this.chap1.sounds.spider.volume = 0.2;
            this.chap1.sounds.spiderhiss.volume = 0.4;
            this.chap1.sounds.beetle.volume = 0.4;
            this.chap1.sounds.beetledies.volume = 0.6;
            this.chap1.sounds.dog.volume = 0.3;
            this.chap1.sounds.desolationTrack.volume = 0.4;
        }

        this.chap1.levelMap.push( // 0
            new Page(this, p,
                [
                    this.chap1.images.desolation[0],
                    this.chap1.images.desolation[8],
                ],
                [
                    // [this.chap1.images.desolation[3], {xOffset: -1500, yOffset: -2000}]
                ],
                [
                    this.chap1.images.desolation[1],
                ],
                [

                ],

                2000, 1000,
                0, 0, 120,

                new Player(p, 250, 462, 25, 60, 0, 100, 0, true, 20, 10, this.chap1),

                [new BoxCollision(p, 148, 522, 532, 65), new BoxCollision(p, 148, 522, 532, 65), new BoxCollision(p, 870, 611, 533, 60), new BoxCollision(p, 1491, 742, 404, 54),],
                [new Portal(p, 1673, 690, 40, 40, 0, 0, 0, false, 20, 10, this.chap1)],
                [],
                [],
                [new Hope(p, 1107, 551 - 10, 40, 40, this.chap1)]
            )
        );
        this.chap1.levelMap.push( // 1
            new Page(this, p,
                [
                    this.chap1.images.desolation[6]
                ],
                [
                    // [this.chap1.images.desolation[3], {xOffset: -1500, yOffset: -2000}]
                ],
                [
                    this.chap1.images.desolation[7],
                ],
                [

                ],

                2000, 1500,
                0, -100, 100,

                new Player(p, 372, 1093, 25, 60, 0, 100, 0, true, 20, 10, this.chap1),

                [new BoxCollision(p, 107, 1153, 526, 60), new BoxCollision(p, 541, 998, 115, 16), new BoxCollision(p, 689, 822, 489, 26), new BoxCollision(p, 1181, 653, 131, 18), new BoxCollision(p, 1383, 527, 526, 21),
                ],
                [new Portal(p, 1642, 466, 40, 40, 0, 0, 0, false, 20, 10, this.chap1),
                ],
                [new Beetle(p, 909, 762, 60, 40, 0, 0, 0, true, 20, 10, this.chap1, 680, 1100, "right", 2)],
                [],
                [new Hope(p, 1260 - 25, 593 - 10, 40, 40, this.chap1)]
            )
        );
        this.chap1.levelMap.push( // 2
            new Page(this, p,
                [
                    this.chap1.images.desolation[2]
                ],
                [
                    // [this.chap1.images.desolation[3], {xOffset: -1500, yOffset: -2000}]
                ],
                [
                    this.chap1.images.desolation[3],
                ],
                [

                ],

                3000, 1000,
                0, 0, 120,

                new Player(p, 158, 753, 25, 60, 0, 100, 0, true, 20, 10, this.chap1),

                [new BoxCollision(p, 76, 813, 243, 28), new BoxCollision(p, 429, 702, 278, 32), new BoxCollision(p, 25, 591, 286, 25), new BoxCollision(p, 434, 486, 109, 14), new BoxCollision(p, 645, 383, 131, 22), new BoxCollision(p, 826, 264, 106, 24), new BoxCollision(p, 184, 226, 115, 13), new BoxCollision(p, 1011, 369, 233, 34), new BoxCollision(p, 1416, 348, 198, 36), new BoxCollision(p, 459, 179, 205, 14), new BoxCollision(p, 1835, 379, 126, 15), new BoxCollision(p, 2169, 375, 126, 16), new BoxCollision(p, 2733, 618, 239, 25), new BoxCollision(p, 2492, 383, 130, 15),
                ],
                [new Portal(p, 2832, 571, 40, 40, 0, 0, 0, false, 20, 10, this.chap1), new CamBox(0, 0, 120, p, 980, 0, 305, 1000), new CamBox(300, 0, 150, p, 1378, 0, 305, 1000),
                ],
                [new Spider(p, 2227, 120, 40, 40, 0, 0, 0, true, 20, 10, this.chap1, 30, 300), new Beetle(p, 580, 642, 60, 40, 0, 0, 0, true, 20, 10, this.chap1, 410, 660, "left", 2),
                new Beetle(p, 1113, 309, 60, 40, 0, 0, 0, true, 20, 10, this.chap1, 1000, 1200, "left", 2),],
                [],
                [new Hope(p, 222, 166 - 10, 40, 40, this.chap1),
                new Hope(p, 1509 - 5, 288 - 10, 40, 40, this.chap1),]
            )
        );
        this.chap1.levelMap.push( // 3
            new Page(this, p,
                [
                    this.chap1.images.desolation[4]
                ],
                [
                    // [this.chap1.images.desolation[3], {xOffset: -1500, yOffset: -2000}]
                ],
                [
                    this.chap1.images.desolation[5],
                ],
                [

                ],

                2000, 3000,
                0, 300, 100,

                new Player(p, 446, 652, 25, 60, 0, 100, 0, true, 20, 10, this.chap1),

                [new BoxCollision(p, 227, 712, 470, 43), new BoxCollision(p, 1050, 932, 230, 17), new BoxCollision(p, 1279, 1350, 259, 24), new BoxCollision(p, 1054, 1612, 166, 19), new BoxCollision(p, 776, 1805, 110, 16), new BoxCollision(p, 192, 2133, 523, 133), new BoxCollision(p, 873, 2493, 145, 16), new BoxCollision(p, 1218, 2577, 165, 15),
                ],
                [new Portal(p, 1285, 2531, 40, 40, 0, 0, 0, false, 20, 10, this.chap1),
                ],
                [new Spider(p, 461, 1793 - 400, 40, 40, 0, 0, 0, true, 20, 10, this.chap1, 30, 600)],
                [],
                [new Hope(p, 1168, 872 - 10, 40, 40, this.chap1), new Hope(p, 464, 2073 - 10, 40, 40, this.chap1)]
            )
        );
        this.chap1.levelMap.push( // 4
            new Page(this, p,
                [
                    this.chap1.images.desolation[9]
                ],
                [
                    // [this.chap1.images.desolation[3], {xOffset: -1500, yOffset: -2000}]
                ],
                [
                    this.chap1.images.desolation[10],
                ],
                [

                ],

                6000, 6000,
                0, 300, 80,

                new Player(p, 448, 856, 25, 60, 0, 100, 0, true, 20, 10, this.chap1),
                //new Player(p, 3883, 2295, 25, 60, 0, 0, 0, true, 20, 10, this.chap1),
                //new Player(p, 1764, 4038, 25, 60, 0, 0, 0, true, 20, 10, this.chap1),

                [new CurveCollision(p, 3597, 4410, 3767, 4586, -13), new BoxCollision(p, 120, 3274, 1110, 62), new BoxCollision(p, 1690, 3789, 350, 70), new BoxCollision(p, 2484, 4418, 1133, 54), new BoxCollision(p, 348, 916, 249, 23), new BoxCollision(p, 820, 1040, 318, 21), new BoxCollision(p, 1389, 1113, 288, 35), new BoxCollision(p, 1948, 1059, 260, 20), new BoxCollision(p, 2456, 1064, 250, 21), new BoxCollision(p, 2948, 1081, 241, 75), new BoxCollision(p, 3437, 1384, 691, 40), new BoxCollision(p, 4193, 2122, 1072, 292), new BoxCollision(p, 605, 2338, 3877, 41), new BoxCollision(p, 3898, 4640, 138, 35), new BoxCollision(p, 4198, 4666, 1560, 1477),
                ],
                [
                    new CamBox(0, 350, 70, p, 3169, 738, 1286, 1334), new CamBox(0, 350, 60, p, 233, 2110, 1430, 1232), new CamBox(0, 300, 80, p, 183, 573, 547, 975), new Portal(p, 4943, 4609, 40, 40, 0, 0, 0, false, 20, 10, this.chap1), new CamBox(0, 0, 120, p, 4059, 4142, 715, 895),],
                [
                    new Wolf(p, 3883 - 1000, 2295, 60, 40, 0, 0, 0, true, 20, 10, this.chap1, 3883 - 500 - 1000, 3883 - 1000),
                    new Wolf(p, 3883, 2295, 60, 40, 0, 0, 0, true, 20, 10, this.chap1, 3883 - 500, 3883),
                    new Spider(p, 1200, 800 - 100, 40, 40, 0, 0, 0, true, 20, 10, this.chap1, 30, 600),
                    new Spider(p, 1200 + 400, 800, 40, 40, 0, 0, 0, true, 20, 10, this.chap1, 50, 600),
                    new Spider(p, 1200 + 900, 800 - 100, 40, 40, 0, 0, 0, true, 20, 10, this.chap1, 20, 600),
                    new Spider(p, 1200 + 1300, 800 - 150, 40, 40, 0, 0, 0, true, 20, 10, this.chap1, 20, 600),
                    new Spider(p, 1200 + 1600, 800 - 150, 40, 40, 0, 0, 0, true, 20, 10, this.chap1, 25, 600),
                    new Spider(p, 1200 + 2200, 1200, 40, 40, 0, 0, 0, true, 20, 10, this.chap1, 25, 700),
                    new Spider(p, 1200 + 3000, 1600, 40, 40, 0, 0, 0, true, 20, 10, this.chap1, 50, 700),
                    new Spider(p, 1764 - 100, 4038 - 800, 40, 40, 0, 0, 0, true, 20, 10, this.chap1, 30, 700)],
                [],
                [new Sprint(p5, 2000, 9300, 100, 100), new Fly(p5, 2200, 9300, 50, 50)]
                )
                );
            }


 */


// slender enemy sprite
function slender (sw) {

    noFill();
    ellipse(193, 179, 100, 100);
    bezier(195, 229, 159+ sin(frameCount * 6) * 5, 269+ sin(frameCount * 6) * 5, 153+ sin(frameCount * 6) * 5, 282, 182+ sin(frameCount * 1) * 4, 356+ sin(frameCount * 5) * 2);
    bezier(207, 228, 225+ sin(frameCount * 6) * 5, 269+ sin(frameCount * 6) * 5, 153+ sin(frameCount * 4) * 6, 282, 223+ sin(frameCount * 6) * 5, 356+ sin(frameCount * 3) * 19);
    bezier(198, 230, 225+ sin(frameCount * 6) * 5, 332+ sin(frameCount * 6) * 5, 153+ sin(frameCount * 4) * 3, 244, 149+ sin(frameCount * 4) * 6, 356+ sin(frameCount * 7) * 10);
    bezier(170, 224, 108+ sin(frameCount * 6) * 5, 325+ sin(frameCount * 6) * 5, 190+ sin(frameCount * 5) * 6, 242, 125+ sin(frameCount * 3) * 8, 356+ sin(frameCount * 3) * 8);
    bezier(218, 224, 196+ sin(frameCount * 6) * 5, 338+ sin(frameCount * 6) * 5, 271+ sin(frameCount * 8) * 4, 297, 242+ sin(frameCount * 7) * 10, 356+ sin(frameCount * 4) * 6);
    bezier(218, 223, 269+ sin(frameCount * 6) * 5, 361+ sin(frameCount * 6) * 5, 231+ sin(frameCount * 5) * 5, 339, 232+ sin(frameCount * 3) * 19, 356+ sin(frameCount * 6) * 5);
    bezier(213, 225, 249+ sin(frameCount * 6) * 5, 354+ sin(frameCount * 6) * 5, 200+ sin(frameCount * 2) * 18, 273, 215+ sin(frameCount * 5) * 2, 356+ sin(frameCount * 1) * 4);
    bezier(178, 227, 204, 301+ sin(frameCount * 6) * 5, 156, 258, 168+ sin(frameCount * 6) * 8, 356);

    line(225, 139, 250, 128);
    line(162, 139, 134, 128);
    line(243, 169, 250, 128);
    line(144, 169, 134, 128);

    if(sw === "left")
    {
        push();
        translate(-10, -10);
        line(163, 200, 176, 180);
        line(193, 200, 176, 180);
        line(193, 200, 209, 180);
        line(223, 200, 209, 180);
        pop();
    }

    if(sw === "right")
    {
        push();
        translate(10, -10);
        line(163, 200, 176, 180);
        line(193, 200, 176, 180);
        line(193, 200, 209, 180);
        line(223, 200, 209, 180);
        pop();
    }
}
function slenderSprite (sw, x, y, s) {
    push();
    translate(x, y);
    scale(s / 100);
    stroke(0, 0, 0, 50);
    strokeWeight(15);
    slender(sw);
    stroke(0);
    strokeWeight(3);
    slender(sw);
    pop();
}

// hope sprite
function hope () {

    push();
    translate(270, 226);
    scale(2.7);
    rotate(- 4 + sin(frameCount * 10) * 12);
    ellipse(12,0,25,4);
    rotate(1 + sin(frameCount * 10) * 10);
    ellipse(12,0,25,4);
    rotate(1 + sin(frameCount * 10) * 10);
    ellipse(12,0,25,4);
    rotate(1 + sin(frameCount * 10) * 10);
    ellipse(12,0,25,4);
    rotate(1 + sin(frameCount * 10) * 10);
    ellipse(12,0,25,4);
    rotate(1 + sin(frameCount * 10) * 10);
    ellipse(12,0,25,4);
    rotate(1 + sin(frameCount * 10) * 10);
    ellipse(12,0,25,4);
    pop();

    push();
    translate(239, 226);
    scale(-2.7);
    rotate(- 4 - sin(frameCount * 10) * 12);
    ellipse(12,0,25,4);
    rotate(1 - sin(frameCount * 10) * 10);
    ellipse(12,0,25,4);
    rotate(1 - sin(frameCount * 10) * 10);
    ellipse(12,0,25,4);
    rotate(1 - sin(frameCount * 10) * 10);
    ellipse(12,0,25,4);
    rotate(1 - sin(frameCount * 10) * 10);
    ellipse(12,0,25,4);
    rotate(1 - sin(frameCount * 10) * 10);
    ellipse(12,0,25,4);
    rotate(1 - sin(frameCount * 10) * 10);
    ellipse(12,0,25,4);
    pop();
}
function hopeSprite (x, y, s) {
    push();
    translate(x, y + sin(frameCount * 5) * 4);
    scale(s / 100);
    noFill();
    stroke(255, 255, 255, 30);
    strokeWeight(5);
    ellipse(255,224,31,37);
    hope();
    stroke(255, 255, 255);
    strokeWeight(1);
    hope();
    strokeWeight(2);
    ellipse(255,224,25,30);
    ellipse(251,220,1,1);
    ellipse(259,220,1,1);
    triangle(250, 226, 254, 230, 258, 226);
    pop();
}

// preload images and sounds
function preload() {
    
    // load game sounds
    doveS = new Audio('sounds/whistle.mp3');
    bgMusic = new Audio('sounds/Mae.mp3');
    walk = new Audio("sounds/walk.mp3");
    jumpS = new Audio("sounds/jump.mp3");
    portalS = new Audio("sounds/portal.mp3");
    wind = new Audio("sounds/wind.mp3");
    squid = new Audio("sounds/squid.mp3");
    
    populateMaps();
    
    // fine tune volume and reverb settings
    doveS.volume = 0.05;
    doveS.reverb = 1;
    jumpS.volume = 0.25;
    portalS.volume = 0.05;
    wind.volume = 1;
    squid.volume = 0.2;
}


function draw() {

    createCanvas(window.innerWidth, window.innerHeight);

    // if in levels
    // startMusicDelay ++;
    // if(startMusicDelay >= 100)
    // {
        // bgMusic.play();
    //     startMusicDelay = 100;
    // }

    // textAlign(CENTER, CENTER);
    background(0);
    drawLevels();

    // spectateModeAssets();

    // trans /= 1.1;
    // fill(255, 255, 255, trans);
    // rect(0, 0, window.innerWidth, window.innerHeight);

}


//            // collide with squid enemy
//            for(var j = 0; j < e.length; j++)
//            {
//                if(!rectCollide(e[j], this))
//                {
//                    continue;
//                }
//
//                var i = (e[j].x - this.x1);
//
//                if(bezierCollisionPoint(i, e[j], this))
//                {
//                    e[j].y = this.y1 + (this.c*sin(pi*(i/((this.x2-this.x1)/57.4)))) + (this.y2 - this.y1)*i/(this.x2 - this.x1) - e[j].h;
//                    e[j].g = 1;
//                }
//            }