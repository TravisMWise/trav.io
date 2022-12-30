import { rectCollide, view } from "../math_functions/directory_export.js";
import { CurveCollision, BoxCollision, CamBox, DeathBox } from "../collisions/directory_export.js";
import { Sprite } from "../parent_classes/sprite.js";
import { FroggyBoi } from "../enemies/froggyboi.js";
import { Spider } from "../enemies/spider.js";
import { Beetle } from "../enemies/beetle.js";
import { Portal } from "../collisions/portal.js";
import { BlackBear } from "../enemies/blackBear.js";
import { LoadSet } from "../parent_classes/loadset.js";
import { playAudio } from "../math_functions/play_audio.js";
import { VirusProjectile } from "../projectiles/virusProjectile.js";

export class Page {
  constructor(obj, p, bgImg, stagImg, bgImg2, fgImg, canvasW, canvasH, spanX, spanY, spanSize, player, generalCol, playerUniqueCol, enemies, passives, collectable, camera) {
    this.obj = obj;

    // images
    this.bgImg = bgImg; // backdrop, distant trees
    this.stagImg = stagImg; // stars, moon, mountains, ect
    this.bgImg2 = bgImg2; // player collide image
    this.fgImg = fgImg; // in front of player

    // set map canvas attributes
    this.canvasW = canvasW;
    this.canvasH = canvasH;

    // set initial span
    this.spanX = spanX;
    this.spanY = spanY;
    this.spanSize = spanSize;

    this.shake = 0;
    this.shakeValue = 0;
    this.shakePower = 0;

    this.generalCollisions = generalCol; // curves, boxes
    this.playerUniqueCollisions = playerUniqueCol;
    this.collectable = collectable;

    // Spanners, music switchers, text popups, checkpoints
    this.enemies = enemies;
    this.passives = passives;
    // player = player;
    // // camera = new Camera(player.x, player.y);
    // camera = camera;

    // all collisions (enemies, passives, etc)
    this.viewCollide = [];
    this.viewPlayerUniqueCollide = [];
    this.viewAttackBoxes = [];
    this.viewPlayerAttackBoxes = [];
    this.CollectableCollide = [];
    this.projectiles = { player: [], enemies: [] };

    // powerup
    this.switchChosenPower = 1;
    this.pickPowerUpScreen = false;
    this.pickPowerUpScreenTimer = 0;

    // spanner vars
    this.spanLiveSize;
    this.spanLiveX;
    this.spanLiveY;
    this.spanGrow;
    this.originSpanX = this.spanX;
    this.originSpanY = this.spanY;
    this.originSpanSize = this.spanSize;
    this.setSpanX = p.createInput("", "number");
    this.setSpanX.size(75, 20);
    this.setSpanY = p.createInput("", "number");
    this.setSpanY.size(75, 20);
    this.setSpanS = p.createInput("", "number");
    this.setSpanS.size(75, 20);

    // for level editor
    this.spectMode = false;
    this.classLabel = p.createSelect();
    this.classLabel.size(75, 30);
    this.classLabel.option("Portal");
    this.classLabel.option("FroggyBoi");
    this.classLabel.option("BlackBear");
    this.classLabel.option("Spider");
    this.classLabel.option("Beetle");
    this.setPointX = 0;
    this.setPointY = 0;
    this.setPointX_T = 0;
    this.setPointY_T = 0;
    this.stopSpan_AndExapand = false;
    this.toggle = false;

    /* SPRITE EDITOR VARS */
    this.spriteEditor = false;
    this.currentEvent = "";
    this.imgPassIn = p.loadImage("./images/ui/nosprite.png");
    this.sprite = new Sprite(this.imgPassIn, 256, 256, {
      idle: { id: 0, frames: 1 },
    });
    this.currentEvent = Object.keys(this.sprite.framejson)[0];
    this.label = p.createInput("", "string");
    this.id = p.createInput("", "number");
    this.frames = p.createInput("", "number");
    this.sound = p.createInput("", "string");
    this.label.size(100, 15);
    this.id.size(100, 15);
    this.frames.size(100, 15);
    this.sound.size(100, 15);
    this.width = p.createInput("", "number");
    this.height = p.createInput("", "number");
    this.image = p.createInput("", "string");
    this.width.size(58, 15);
    this.height.size(58, 15);
    this.image.size(58, 15);

    /* LOADSET EDITOR */
    this.showLoadsetEditor = false;
    this.loadset = p.createSelect();
    this.loadset.option("bruteKnightSkeleton");

    this.loadsetID = p.createSelect("", "string");
    this.loadsetScale = p.createSelect();
    this.loadsetScale.option(1);
    this.loadsetScale.option(-1);
    this.loadsetComplex = p.createSelect("boolean");
    this.loadsetComplex.option(false);
    this.loadsetComplex.option(true);
    this.loadsetFrame = p.createSlider(0, 1, 1, 1);
    this.loadsetFrame.hide();
    this.loadsetActionName = p.createInput("idle_left", "string");
    this.loadset.size(85, 18);
    this.loadsetID.size(85, 18);
    this.loadsetScale.size(85, 18);
    this.loadsetComplex.size(85, 18);
    this.loadsetFrame.size(85, 18);
    this.loadsetActionName.size(85, 18);
    this.actionSpeed = p.createInput("6", "number");
    this.actionSpeed.size(85, 18);
    this.cutX = window.innerWidth / 2 - 300;
    this.cutY = window.innerHeight / 2 - 420;
    this.cutW = 600;
    this.cutH = 400;
    this.scaleDownSprite = p.createSlider(0, 1, 1, 0.01);
    this.scaleDownSprite.size(85, 18);
    this.setSpriteX = this.cutX + 100;
    this.setSpriteY = this.cutY + 300;
    this.set = new Set();
    this.grabSet = null;
    this.actionsJson = {};
    this.offsetSpriteX = 0;
    this.offsetSpriteY = 0;
    this.loadsetMesh = [];
    this.pickMesh = p.createSelect();
    this.pickMesh.size(20, 25);
    this.loadsetHurt = [];
    this.pickHurt = p.createSelect();
    this.pickHurt.size(20, 25);
    this.showAllHurtBoxes = p.createCheckbox("", false);
    this.showAllHurtBoxes.size(20, 25);
    this.showHurtMotion = false;

    this.grabSet = new LoadSet(this.grabSetParseID, this.loadsetID.value(), 0, 0, window.innerWidth / 2 - 400, window.innerHeight / 2 - 600, 1, 1, Number(this.loadsetScale.value()), Number(this.actionSpeed.value()));

    // console.log(this.grabSetParseID)

    // reset map if dead
    this.reset = false;
    this.trans = 0;
    this.resetTimer = 0;
    this.particles = { x: [], y: [], s: [], r: [], upAmount: [] };

    // set all positions of inputs from level editor
    this.setSpanX.position(-1000, -1000);
    this.setSpanY.position(-1000, -1000);
    this.setSpanS.position(-1000, -1000);
    this.width.position(-1000, -1000);
    this.height.position(-1000, -1000);
    this.image.position(-1000, -1000);
    this.label.position(-1000, -1000);
    this.id.position(-1000, -1000);
    this.frames.position(-1000, -1000);
    this.sound.position(-1000, -1000);
    this.loadset.position(-1000, -1000);
    this.loadsetID.position(-1000, -1000);
    this.loadsetScale.position(-1000, -1000);
    this.loadsetComplex.position(-1000, -1000);
    this.loadsetFrame.position(-1000, -1000);
    this.scaleDownSprite.position(-1000, -1000);
    this.loadsetActionName.position(-1000, -1000);
    this.actionSpeed.position(-1000, -1000);
    this.pickMesh.position(-1000, -1000);
    this.pickHurt.position(-1000, -1000);
    this.showAllHurtBoxes.position(-1000, -1000);
    this.classLabel.position(-1000, -1000);

    this.pageDialogue = false;
    this.pageTalkbox = null;
    this.pageTalkboxEnter = null;
    this.pageMessages = [];
    this.writeText = 0;
    this.currentMessage = 0;
    this.transRed = 0;
  }
  classPusher(p, className) {
    var x = this.setPointX;
    var y = this.setPointY;
    var l = 0;
    var h = 100;
    var w = 0;
    var cX = 20;
    var cY = 10;
    var CA = this.obj.returnCurrentChap();

    switch (className.toLowerCase()) {
      case "froggyboi":
        return {
          instance: new FroggyBoi(p, x, y, 138, 110, l, h, w, false, cX, cY, CA),
          type: "Passive",
        };
      case "portal":
        return {
          instance: new Portal(p, x, y, 60, 60, l, h, w, false, cX, cY, CA, this.setPointX_T, this.setPointY_T),
          type: "Unique",
        };
      case "spider":
        return {
          instance: new Spider(p, x, y, 40, 40, l, h, w, true, cX, cY, CA, 600),
          type: "Enemy",
        };
      case "beetle":
        return {
          instance: new Beetle(p, x, y, 60, 40, l, h, w, true, cX, cY, CA, x - 300, x + 300, 3),
          type: "Enemy",
        };
      case "blackbear":
        return {
          instance: new BlackBear(p, x, y, 540, 355, l, h, w, true, cX, cY, this.obj.bear, x - 300, x + 300, 3),
          type: "Enemy",
        };
    }

    return {};
  }
  applyNob(camera, setx, sety, xory, obj, p, k) {
    let mX = p.mouseX * (100 / this.spanSize) + camera.x - (window.innerWidth / 2) * (100 / this.spanSize);
    let mY = p.mouseY * (100 / this.spanSize) + camera.y - (window.innerHeight / 2) * (100 / this.spanSize);

    if (xory === "DEL") {
      if (p.mouseIsPressed && mX > setx - 30 && mX < setx + 20 + 30 && mY > sety - 30 && mY < sety + 20 + 30 && this.obj.keys[85]) obj = null;
      return obj;
    }

    if (xory === "DEL-WH") {
      setx -= obj.x - obj.w;
      sety -= obj.y - obj.h;
      if (p.mouseIsPressed && mX > setx + obj.x - 30 && mX < setx + obj.x + 20 + 30 && mY > sety + obj.y - 30 && mY < sety + obj.y + 20 + 30 && this.obj.keys[85]) k = null;
      return k;
    }

    if (xory === "x" || xory === "y") {
      if (p.mouseIsPressed && mX > setx - 30 && mX < setx + 20 + 30 && mY > sety - 30 && mY < sety + 20 + 30 && this.obj.keys[k]) {
        setx = mX - 10;
        sety = mY - 10;
        if (obj !== null) obj.levelEditorSelected = true;
      }

      p.stroke(255, 255, 255, 50);
      p.fill(255, 255, 255, 30);
      p.ellipse(setx - 30 + 40, sety - 30 + 40, 20 + 60, 20 + 60);

      p.fill(255, 255, 255, 100);

      if (mX > setx && mX < setx + 20 && mY > sety && mY < sety + 20) p.fill(255, 255, 255, 150);

      p.rect(setx, sety, 20, 20);

      if (xory === "x") return setx;
      else return sety;
    } else if (xory !== "DEL" && xory !== "DEL-WH") {
      setx -= obj.x - obj.w;
      sety -= obj.y - obj.h;

      if (p.mouseIsPressed && mX > setx + obj.x - 30 && mX < setx + obj.x + 20 + 30 && mY > sety + obj.y - 30 && mY < sety + obj.y + 20 + 30 && this.obj.keys[k]) {
        setx = mX - 10 - obj.x;
        sety = mY - 10 - obj.y;
      }

      p.stroke(255, 255, 255, 50);
      p.fill(255, 255, 255, 30);
      p.ellipse(setx + obj.x - 30 + 40, sety + obj.y - 30 + 40, 20 + 60, 20 + 60);
      p.fill(255, 255, 255, 100);

      if (mX > setx + obj.x && mX < setx + obj.x + 20 && mY > sety + obj.y && mY < sety + obj.y + 20) p.fill(255, 255, 255, 150);

      p.rect(setx + obj.x, sety + obj.y, 20, 20);

      if (xory === "w") return setx;
      else return sety;
    }
  }
  applyNobMesh(setx, sety, xory, obj, p, k) {
    let mX = p.mouseX;
    let mY = p.mouseY;

    if (xory === "x" || xory === "y") {
      if (p.mouseIsPressed && mX > setx - 30 && mX < setx + 20 + 30 && mY > sety - 30 && mY < sety + 20 + 30 && this.obj.keys[k]) {
        setx = mX - 10;
        sety = mY - 10;
        if (obj !== null) obj.levelEditorSelected = true;
      }

      p.stroke(255, 255, 255, 50);
      p.fill(255, 255, 255, 30);
      p.ellipse(setx - 30 + 40, sety - 30 + 40, 20 + 60, 20 + 60);

      p.fill(255, 255, 255, 100);

      if (mX > setx && mX < setx + 20 && mY > sety && mY < sety + 20) p.fill(255, 255, 255, 150);

      p.rect(setx, sety, 20, 20);

      if (xory === "x") return setx;
      else return sety;
    } else if (xory === "w" || xory === "h") {
      setx -= this.cutX - this.cutW;
      sety -= this.cutY - this.cutH;

      if (p.mouseIsPressed && mX > setx + this.cutX - 30 && mX < setx + this.cutX + 20 + 30 && mY > sety + this.cutY - 30 && mY < sety + this.cutY + 20 + 30 && this.obj.keys[k]) {
        setx = mX - 10 - this.cutX;
        sety = mY - 10 - this.cutY;
      } else {
      }

      p.stroke(255, 255, 255, 50);
      p.fill(255, 255, 255, 30);
      p.ellipse(setx + this.cutX - 30 + 40, sety + this.cutY - 30 + 40, 20 + 60, 20 + 60);
      p.fill(255, 255, 255, 100);

      if (mX > setx + this.cutX && mX < setx + this.cutX + 20 && mY > sety + this.cutY && mY < sety + this.cutY + 20) p.fill(255, 255, 255, 150);

      p.rect(setx + this.cutX, sety + this.cutY, 20, 20);

      if (xory === "w") return setx;
      else return sety;
    } else if (xory === "w1" || xory === "h1") {
      setx -= obj.x - obj.w;
      sety -= obj.y - obj.h;

      if (p.mouseIsPressed && mX > setx + obj.x - 30 && mX < setx + obj.x + 20 + 30 && mY > sety + obj.y - 30 && mY < sety + obj.y + 20 + 30 && this.obj.keys[k]) {
        setx = mX - 10 - obj.x;
        sety = mY - 10 - obj.y;
      }

      p.stroke(255, 255, 255, 50);
      p.fill(255, 255, 255, 30);
      p.ellipse(setx + obj.x - 30 + 40, sety + obj.y - 30 + 40, 20 + 60, 20 + 60);
      p.fill(255, 255, 255, 100);

      if (mX > setx + obj.x && mX < setx + obj.x + 20 && mY > sety + obj.y && mY < sety + obj.y + 20) p.fill(255, 255, 255, 150);

      p.rect(setx + obj.x, sety + obj.y, 20, 20);

      if (xory === "w1") return setx;
      else return sety;
    }
  }
  applyCurve(obj, p, k, xory, obj2) {
    let setx = (obj.x1 + obj.x2) / 2;
    let sety = (obj.y1 + obj.y2) / 2 + obj.c - 10;

    p.stroke(255, 255, 255, 50);
    p.fill(255, 255, 255, 30);
    p.ellipse(setx - 30 + 40, sety - 30 + 40, 20 + 60, 20 + 60);
    p.fill(255, 255, 255, 100);

    let mX = p.mouseX * (100 / this.spanSize) + camera.x - (window.innerWidth / 2) * (100 / this.spanSize);
    let mY = p.mouseY * (100 / this.spanSize) + camera.y - (window.innerHeight / 2) * (100 / this.spanSize);

    if (mX > setx && mX < setx + 20 && mY > sety && mY < sety + 20) p.fill(255, 255, 255, 150);
    if (p.mouseIsPressed && mX > setx - 30 && mX < setx + 20 + 30 && mY > sety - 30 && mY < sety + 20 + 30 && this.obj.keys[k]) sety = mY - 10;

    p.rect(setx, sety, 20, 20);

    if (xory === "DEL") {
      if (p.mouseIsPressed && mX > setx - 30 && mX < setx + 20 + 30 && mY > sety - 30 && mY < sety + 20 + 30 && this.obj.keys[85]) obj2 = true;

      return obj2;
    }

    return -((obj.y1 + obj.y2) / 2 - 10 - sety);
  }
  buttonAsset(player, x, y, w, h, txt, txtSize, state, p) {
    var xV = this.setPointX;
    var yV = this.setPointY;

    p.fill(255, 255, 255, 50);
    p.textSize(txtSize);

    if (p.mouseX > x && p.mouseX < x + w && p.mouseY > y && p.mouseY < y + h) {
      p.fill(255, 255, 255, 100);

      if (p.mouseIsPressed && !this.obj.clicked) {
        switch (state) {
          case "pushclass":
            var info = this.classPusher(p, this.classLabel.value());

            switch (info.type) {
              case "Passive":
                this.passives.push(info.instance);
                break;

              case "Enemy":
                this.enemies.push(info.instance);
                break;

              case "Unique":
                this.playerUniqueCollisions.push(info.instance);
                break;
            }
            break;
          case "curve":
            this.generalCollisions.push(new CurveCollision(p, camera.x - window.innerWidth / 2 + 150 + 200, camera.y - window.innerHeight / 2 + 80 + 200, camera.x - window.innerWidth / 2 + 500 + 200, camera.y - window.innerHeight / 2 + 80, -40 + 200));
            break;
          case "PushLabel":
            var getLabel = this.label.value();
            if (getLabel !== "") {
              var getID = this.id.value();
              var getFrames = this.frames.value();
              this.sprite.framejson[getLabel] = { id: parseInt(getID), frames: parseInt(getFrames) };
            }
            break;
          case "LoadSprite":
            this.imgPassIn = p.loadImage("./images/" + this.image.value() + ".png");
            this.sprite.spriteSheetImage = this.imgPassIn;
            this.sprite.spriteW = this.width.value();
            this.sprite.spriteH = this.height.value();
            break;
          case "span":
            this.playerUniqueCollisions.push(new CamBox(this.setSpanX.value(), this.setSpanY.value(), this.setSpanS.value(), p, xV, yV, 100, 100));
            break;
          case "ExportSprite":
            var writer = p.createWriter("sprite.txt");
            writer.write("this.sprite = new Sprite('" + "./images/" + this.image.value() + ".png" + "', " + this.width.value() + ", " + this.height.value() + ", ");
            writer.write(JSON.stringify(this.sprite.framejson));
            writer.write(")");
            writer.close();
            break;
          case "spriteedit":
            switch (this.spriteEditor) {
              case true:
                this.spriteEditor = false;
                break;
              case false:
                this.spriteEditor = true;
                break;
            }
            break;
          case "loadseteedit":
            switch (this.showLoadsetEditor) {
              case true:
                this.showLoadsetEditor = false;
                break;
              case false:
                this.showLoadsetEditor = true;
                break;
            }
            break;
          case "print":
            let n = Math.random();
            let getChap = "this.chapters[this.currentChap]";
            var writer = p.createWriter("level_" + n + ".txt");
            writer.write("---GENERAL COLISIONS---");
            writer.write("\n");

            for (var i = 0; i < this.generalCollisions.length; i++) {
              switch (this.generalCollisions[i].constructor.name) {
                case "CurveCollision":
                  writer.write("new CurveCollision(p, " + Math.floor(this.generalCollisions[i].x1) + ", " + Math.floor(this.generalCollisions[i].y1) + ", " + Math.floor(this.generalCollisions[i].x2) + ", " + Math.floor(this.generalCollisions[i].y2) + ", " + Math.floor(this.generalCollisions[i].c) + "),");
                  writer.write("\n");
                  break;
                case "BoxCollision":
                  writer.write("new BoxCollision(p, " + Math.floor(this.generalCollisions[i].x) + ", " + Math.floor(this.generalCollisions[i].y) + ", " + Math.floor(this.generalCollisions[i].w) + ", " + Math.floor(this.generalCollisions[i].h) + "),");
                  writer.write("\n");
                  break;
              }
            }

            writer.write("\n\n");
            writer.write("---UNIQUE COLISIONS---");
            writer.write("\n");

            // todo, switch based on cam spanner and hope sprite

            for (var i = 0; i < this.playerUniqueCollisions.length; i++) {
              switch (this.playerUniqueCollisions[i].constructor.name) {
                case "CamBox":
                  writer.write(
                    "new CamBox(" + this.playerUniqueCollisions[i].spanX + ", " + this.playerUniqueCollisions[i].spanY + ", " + this.playerUniqueCollisions[i].spanSize + ", p" + ", " + Math.floor(this.playerUniqueCollisions[i].x) + ", " + Math.floor(this.playerUniqueCollisions[i].y) + ", " + Math.floor(this.playerUniqueCollisions[i].w) + ", " + Math.floor(this.playerUniqueCollisions[i].h) + "),"
                  );
                  writer.write("\n");
                  break;
                case "Hope":
                  writer.write("new Hope(p, " + Math.floor(this.playerUniqueCollisions[i].x) + ", " + Math.floor(this.playerUniqueCollisions[i].y) + ", " + Math.floor(this.playerUniqueCollisions[i].w) + ", " + Math.floor(this.playerUniqueCollisions[i].h) + ", 0, 0, 0, false, 20, 10, " + getChap + "),");
                  writer.write("\n");
                  break;
                case "Portal":
                  writer.write(
                    "new Portal(p, " +
                      Math.floor(this.playerUniqueCollisions[i].x) +
                      ", " +
                      Math.floor(this.playerUniqueCollisions[i].y) +
                      ", " +
                      Math.floor(this.playerUniqueCollisions[i].w) +
                      ", " +
                      Math.floor(this.playerUniqueCollisions[i].h) +
                      ", 0, 0, 0, false, 20, 10, " +
                      getChap +
                      ", " +
                      Math.floor(this.playerUniqueCollisions[i].portX) +
                      ", " +
                      Math.floor(this.playerUniqueCollisions[i].portY) +
                      "),"
                  );
                  writer.write("\n");
                  break;
                case "DeathBox":
                  writer.write("new DeathBox(p, " + Math.floor(this.playerUniqueCollisions[i].x) + ", " + Math.floor(this.playerUniqueCollisions[i].y) + ", " + Math.floor(this.playerUniqueCollisions[i].w) + ", " + Math.floor(this.playerUniqueCollisions[i].h) + ", this),");
                  writer.write("\n");
                  break;
              }
            }

            writer.write("\n\n");
            writer.write("---ENEMIES---");
            writer.write("\n");

            for (var i = 0; i < this.enemies.length; i++) {
              switch (this.enemies[i].constructor.name) {
                case "Spider":
                  writer.write("new Spider(p, " + Math.floor(this.enemies[i].x) + ", " + Math.floor(this.enemies[i].y) + ", " + Math.floor(this.enemies[i].w) + ", " + Math.floor(this.enemies[i].h) + ", 0, 0, 0, true, 20, 10, " + getChap + ", " + Math.floor(this.enemies[i].r) + "),");
                  writer.write("\n");
                  break;

                case "Beetle":
                  writer.write("new Beetle(p, " + Math.floor(this.enemies[i].x) + ", " + Math.floor(this.enemies[i].y) + ", " + Math.floor(this.enemies[i].w) + ", " + Math.floor(this.enemies[i].h) + ", 0, 0, 0, true, 20, 10, " + getChap + ", " + Math.floor(this.enemies[i].leftBound) + ", " + Math.floor(this.enemies[i].rightBound) + ", " + Math.floor(this.enemies[i].s) + "),");
                  writer.write("\n");
                  break;
                case "BlackBear":
                  writer.write("new BlackBear(p, " + Math.floor(this.enemies[i].x) + ", " + Math.floor(this.enemies[i].y) + ", " + Math.floor(this.enemies[i].w) + ", " + Math.floor(this.enemies[i].h) + ", 0, 0, 0, true, 20, 10, this.bear, " + Math.floor(this.enemies[i].leftBound) + ", " + Math.floor(this.enemies[i].rightBound) + "),");
                  writer.write("\n");
                  break;
              }
            }

            writer.write("\n\n");
            writer.write("---PASSIVES---");
            writer.write("\n");

            for (var i = 0; i < this.passives.length; i++) {
              switch (this.passives[i].constructor.name) {
                case "FroggyBoi":
                  writer.write("new FroggyBoi(p, " + Math.floor(this.passives[i].x) + ", " + Math.floor(this.passives[i].y) + ", " + Math.floor(this.passives[i].w) + ", " + Math.floor(this.passives[i].h) + ", 0, 0, 0, true, 20, 10, " + getChap + "),");
                  writer.write("\n");
                  break;
              }
            }

            writer.write("\n\n");
            writer.write("---PLAYER---");
            writer.write("\n");

            writer.write("new Player(p, " + Math.floor(player.x) + ", " + Math.floor(player.y) + ", " + Math.floor(player.w) + ", " + Math.floor(player.h) + ", 0, 0, 0, true, 20, 10, " + getChap + "),");

            writer.close();
            break;
          case "box":
            this.generalCollisions.push(new BoxCollision(p, xV, yV, 100, 100));
            break;
          case "deathbox":
            this.playerUniqueCollisions.push(new DeathBox(p, xV, yV, 100, 100));
            break;
          case "expand":
            switch (this.stopSpan_AndExapand) {
              case true:
                this.stopSpan_AndExapand = false;
                this.spanSize = this.originSpanSize;
                break;
              case false:
                this.stopSpan_AndExapand = true;
                break;
            }
            break;
          case "spect":
            this.spectMode = !this.spectMode;
            break;
          case "pushSet":
            var getLabel = String(this.loadsetActionName.value());

            if (getLabel !== "") {
              let clone = Object.assign(new LoadSet(), this.grabSet);

              let cloneMesh = [];
              for (var i = 0; i < this.loadsetMesh.length; i++) {
                cloneMesh.push(Object.assign(new Object(), this.loadsetMesh[i]));
              }

              let cloneHurt = [];
              for (var i = 0; i < this.loadsetHurt.length; i++) {
                cloneHurt.push(Object.assign(new Object(), this.loadsetHurt[i]));
              }

              this.actionsJson[getLabel] = {
                sprite: clone,
                offsetX: parseInt(this.offsetSpriteX),
                offsetY: parseInt(this.offsetSpriteY),
                width: parseInt(this.cutW),
                height: parseInt(this.cutH),
                mesh: cloneMesh || null,
                hurt: cloneHurt || null,
                complex: this.loadsetComplex.value(),
              };
            }
            break;
          case "pushMesh":
            this.pickMesh.remove();
            this.pickMesh = p.createSelect();
            this.pickMesh.size(20, 25);
            this.loadsetMesh.push({
              x: this.cutX,
              y: this.cutY,
              w: this.cutW,
              h: this.cutH,
              offsetX: 0,
              offsetY: 0,
            });
            for (var i = 0; i < this.loadsetMesh.length; i++) this.pickMesh.option(this.loadsetMesh.length - 1 - i);
            break;
          case "pushHurt":
            this.pickHurt.remove();
            this.pickHurt = p.createSelect();
            this.pickHurt.size(20, 25);
            this.loadsetHurt.push({
              x: this.cutX,
              y: this.cutY,
              w: this.cutW,
              h: this.cutH,
              offsetX: 0,
              offsetY: 0,
              stage: Number(this.loadsetFrame.value()) || null,
            });
            for (var i = 0; i < this.loadsetHurt.length; i++) this.pickHurt.option(this.loadsetHurt.length - 1 - i);
            break;
          case "exportActions":
            var writer = p.createWriter("actions.txt");
            writer.write("Enemy Width: " + this.cutW + " \n");
            writer.write("Enemy Height: " + this.cutH + "\n\n");
            writer.write("switch (action) {\n");

            for (var i = 0; i < Object.keys(this.actionsJson).length; i++) {
              var grabData = this.actionsJson[Object.keys(this.actionsJson)[i]];

              writer.write('case "' + Object.keys(this.actionsJson)[i] + '":\n');
              writer.write("return {\n");
              writer.write("complex: " + grabData.complex + ",\n");

              var grabHurt = grabData.hurt;

              if (grabData.complex === "false") {
                writer.write("attack: [");

                if (grabHurt !== null) for (var k = 0; k < grabHurt.length; k++) writer.write("new GeneralAttack(p, x + " + grabHurt[k].offsetX + ", y + " + grabHurt[k].offsetY + ", " + grabHurt[k].w + ", " + grabHurt[k].h + ", this, 20),");

                writer.write("],\n");
              }

              var set = new Set();

              var temp = false;

              if (grabData.complex === "true") {
                writer.write("attack: {\n");

                if (grabHurt !== null) {
                  for (var k = 0; k < grabHurt.length; k++) {
                    if (!set.has(grabHurt[k].stage) && k > 0) writer.write("],\n");

                    if (!set.has(grabHurt[k].stage)) writer.write(grabHurt[k].stage + ": [");

                    writer.write("new GeneralAttack(p, x + " + grabHurt[k].offsetX + ", y + " + grabHurt[k].offsetY + ", " + grabHurt[k].w + ", " + grabHurt[k].h + ", this, 20), ");

                    if (!set.has(grabHurt[k].stage)) set.add(grabHurt[k].stage);

                    if (k >= grabHurt.length - 1) writer.write("],\n");
                  }
                }

                writer.write("},\n");
              }

              writer.write("body: [");

              var grabMesh = grabData.mesh;

              if (grabMesh !== null) for (var j = 0; j < grabMesh.length; j++) writer.write("new MeshBox(p, x + " + grabMesh[j].offsetX + ", y + " + grabMesh[j].offsetY + ", " + grabMesh[j].w + ", " + grabMesh[j].h + ", this),");

              writer.write("],\n");

              var grabSprite = grabData.sprite;

              writer.write('sprite: new LoadSet(this.set, "' + grabSprite.id + '", ' + grabSprite.spriteW + ", " + grabSprite.spriteH + ", x + " + grabData.offsetX + ", y + " + grabData.offsetY + ", " + grabSprite.w + ", " + grabSprite.h + ", " + grabSprite.sc + ", " + grabSprite.staggeredFrames + "),\n");

              writer.write("};\n");
            }

            writer.write("}");
            writer.close();
            break;
          case "clearMesh":
            this.pickMesh.remove();
            this.pickMesh = p.createSelect();
            this.pickMesh.size(20, 25);
            this.loadsetMesh = [];
            break;
          case "clearHurt":
            this.pickHurt.remove();
            this.pickHurt = p.createSelect();
            this.pickHurt.size(20, 25);
            this.loadsetHurt = [];
            break;
        }

        this.obj.clickDalay = 50;
        this.obj.clicked = true;
      }
    }

    p.rect(x, y, w, h);
    p.text(txt, x + w / 2, y + h / 2);
  }
  spectateModeAssets(p, player) {
    if (this.toggle) {
      p.stroke(255);
      p.fill(0, 0, 0, 160);
      p.rect(0, 0, 100, window.innerHeight);

      this.buttonAsset(player, 10, 10, 80, 60, "CURVE\nKey: O", 20, "curve", p);
      this.buttonAsset(player, 10, 10 + 70, 80, 60, "BOX\nKey: P", 20, "box", p);
      this.buttonAsset(player, 0, 650 + 130 + 60 + 30, 100, 30, "PRINT", 20, "print", p);
      this.buttonAsset(player, 10, 10 + 30 + 70 + 70 + 60 + 70, 80, 60, "SPAN\nKey: {", 20, "span", p);
      this.buttonAsset(player, 10, 10 + 30 + 140 + 60 + 140, 80, 30, "SPRITE", 20, "spriteedit", p);
      this.buttonAsset(player, 10, 10 + 30 + 140 + 95 + 140, 80, 30, "ACTION", 15, "loadseteedit", p);
      this.buttonAsset(player, 10, 10 + 30 + 140 + 60 + 70 + 140, 80, 60, "DEATH\nKey: Y", 20, "deathbox", p);
      this.buttonAsset(player, 10, 10 + 30 + 140 + 60 + 180 + 140, 80, 60, "PUSH\nCLASS", 20, "pushclass", p);
      p.textSize(15);
      p.text("PLAYER\nK: 'I'", 10 + 40, 10 + 30 + 70 + 70 - 10);
      p.text("DEL OBJ\nK: 'U'", 10 + 40, 10 + 30 + 70 + 70 + 60 - 30);
      p.text("BOUNDS\nKEY: R", 50, 650);
      p.text("SET (x,y)\nKEY: F", 50, 650 + 40);
      p.text("PAWNS\nKEY: T", 50, 650 + 80);
      p.text("PORTAL\nKEY: Y", 50, 650 + 80 + 40);
      p.text("PORTAL(x,y)\nKEY: G", 50, 650 + 80 + 80);
      this.buttonAsset(player, 0, 650 + 130 + 60 + 60, 100, 30, "EXP: " + this.stopSpan_AndExapand, 17, "expand", p);
      this.buttonAsset(player, 0, 650 + 130 + 60, 100, 30, "SPECT: " + this.spectMode, 17, "spect", p);
    }

    if (this.spriteEditor) this.spriteEditorPage(p);
    else {
      this.width.position(-1000, -1000);
      this.height.position(-1000, -1000);
      this.image.position(-1000, -1000);
      this.label.position(-1000, -1000);
      this.id.position(-1000, -1000);
      this.frames.position(-1000, -1000);
      this.sound.position(-1000, -1000);
    }

    if (this.showLoadsetEditor) this.loadsetEditor(p, player);
    else {
      this.loadset.position(-1000, -1000);
      this.loadsetID.position(-1000, -1000);
      this.loadsetScale.position(-1000, -1000);
      this.loadsetComplex.position(-1000, -1000);
      this.loadsetFrame.position(-1000, -1000);
      this.scaleDownSprite.position(-1000, -1000);
      this.loadsetActionName.position(-1000, -1000);
      this.actionSpeed.position(-1000, -1000);
      this.pickMesh.position(-1000, -1000);
      this.pickHurt.position(-1000, -1000);
      this.showAllHurtBoxes.position(-1000, -1000);
    }

    this.obj.clickDalay--;

    if (this.obj.clickDalay <= 0) {
      this.obj.clickDalay = 0;
      this.obj.clicked = false;
    }
  }
  loadsetEditor(p, player) {
    p.strokeWeight(1);
    p.fill(0, 0, 0, 200);
    p.rect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
    p.textAlign(p.CENTER, p.CENTER);

    p.stroke(255, 255, 255, 200);
    p.fill(255, 255, 255, 100);
    p.rect(window.innerWidth / 2 - 600, window.innerHeight / 2 - 400, 1200, 800);
    p.rect(window.innerWidth / 2 - 600, window.innerHeight / 2 - 400, 200, 800);
    p.rect(window.innerWidth / 2 - 600, window.innerHeight / 2 - 140 + 60, 200, 1);
    p.rect(window.innerWidth / 2 + 500, window.innerHeight / 2 - 400, 100, 800);

    this.loadset.position(window.innerWidth / 2 - 500, window.innerHeight / 2 - 394 + 5);
    this.loadsetID.position(window.innerWidth / 2 - 500, window.innerHeight / 2 - 394 + 30 + 5);
    this.loadsetScale.position(window.innerWidth / 2 - 500, window.innerHeight / 2 - 394 + 60 + 5);
    this.loadsetComplex.position(window.innerWidth / 2 - 500, window.innerHeight / 2 - 394 + 150 + 65);
    this.loadsetFrame.position(window.innerWidth / 2 - 500, window.innerHeight / 2 - 394 + 180 + 60);
    this.scaleDownSprite.position(window.innerWidth / 2 - 500, window.innerHeight / 2 - 394 + 90);
    this.loadsetActionName.position(window.innerWidth / 2 - 500, window.innerHeight / 2 - 394 + 180 + 90);
    this.actionSpeed.position(window.innerWidth / 2 - 500, window.innerHeight / 2 - 394 + 120);
    this.pickMesh.position(window.innerWidth / 2 - 450, window.innerHeight / 2 - 394 + 150);
    this.pickHurt.position(window.innerWidth / 2 - 450, window.innerHeight / 2 - 394 + 180);
    this.showAllHurtBoxes.position(window.innerWidth / 2 - 450 + 25, window.innerHeight / 2 - 394 + 180);

    this.loadset.changed(() => {
      this.loadsetID.remove();
      this.loadsetID = p.createSelect("", "string");
      this.loadset.size(85, 18);
      this.set.clear();
    });

    if (this.loadset.value() !== undefined) {
      var grabSetParseID = Object(this.obj[this.loadset.value()]);

      if (grabSetParseID !== undefined) {
        for (var i = 0; i < Object.keys(grabSetParseID).length; i++) {
          if (!this.set.has(Object.keys(grabSetParseID)[i])) {
            this.loadsetID.option(Object.keys(grabSetParseID)[i]);
            this.set.add(Object.keys(grabSetParseID)[i]);
          }
        }
      }
    }

    // console.log(set)
    this.buttonAsset(player, window.innerWidth / 2 - 600, window.innerHeight / 2 + 370 - 30, 200, 30, "PUSH ACTION", 20, "pushSet", p);
    this.buttonAsset(player, window.innerWidth / 2 - 600, window.innerHeight / 2 + 370, 200, 30, "EXPORT", 20, "exportActions", p);
    this.buttonAsset(player, window.innerWidth / 2 - 500, window.innerHeight / 2 - 243, 20, 25, ">", 20, "pushMesh", p);
    this.buttonAsset(player, window.innerWidth / 2 - 500 + 26, window.innerHeight / 2 - 243, 20, 25, "C", 20, "clearMesh", p);
    this.buttonAsset(player, window.innerWidth / 2 - 500, window.innerHeight / 2 - 243 + 30, 20, 25, ">", 20, "pushHurt", p);
    this.buttonAsset(player, window.innerWidth / 2 - 500 + 26, window.innerHeight / 2 - 243 + 30, 20, 25, "C", 20, "clearHurt", p);

    p.stroke(0, 0, 255);
    this.cutX = this.applyNobMesh(this.cutX, this.cutY, "x", null, p, 76);
    this.cutY = this.applyNobMesh(this.cutX, this.cutY, "y", null, p, 76);
    this.cutW = this.applyNobMesh(this.cutX, this.cutY, "w", null, p, 76);
    this.cutH = this.applyNobMesh(this.cutX, this.cutY, "h", null, p, 76);

    p.rect(this.cutX, this.cutY, this.cutW, this.cutH);

    this.offsetSpriteX = -1200 + this.setSpriteX * 1.5;
    this.offsetSpriteY = -800 + this.setSpriteY * 1.5;

    if (this.grabSet !== null) {
      grabSetParseID = this.obj[this.loadset.value()];
      this.grabSet.spriteW = grabSetParseID[Object.keys(grabSetParseID)[0]][0].width;
      this.grabSet.spriteH = grabSetParseID[Object.keys(grabSetParseID)[0]][0].height;
      this.grabSet.loadset = this.obj[this.loadset.value()];
      this.grabSet.w = Number(this.scaleDownSprite.value());
      this.grabSet.h = Number(this.scaleDownSprite.value());
      this.grabSet.staggeredFrames = Number(this.actionSpeed.value());
      this.grabSet.id = this.loadsetID.value();
      this.grabSet.sc = Number(this.loadsetScale.value());

      var maxStage = this.grabSet.getMaxStageProgress();

      this.loadsetComplex.changed(() => {
        this.loadsetHurt = [];
        this.loadsetFrame.remove();
        this.loadsetFrame = p.createSlider(1, maxStage, 0, 1);
        this.loadsetFrame.size(85, 18);
      });

      if (this.loadsetComplex.value() === "true") {
        this.loadsetFrame.show();
        this.grabSet.playForEdit(this.cutX + this.offsetSpriteX, this.cutY + this.offsetSpriteY, p, Number(this.loadsetFrame.value()));
      } else {
        this.grabSet.drawForEdit(this.cutX + this.offsetSpriteX, this.cutY + this.offsetSpriteY, p);
        this.loadsetFrame.hide();
      }

      for (var i = 0; i < this.loadsetMesh.length; i++) {
        this.loadsetMesh[i].offsetX = -(this.cutX - this.loadsetMesh[i].x);
        this.loadsetMesh[i].offsetY = -(this.cutY - this.loadsetMesh[i].y);

        p.noFill();
        p.stroke(0, 255, 0);
        p.rect(this.loadsetMesh[i].x, this.loadsetMesh[i].y, this.loadsetMesh[i].w, this.loadsetMesh[i].h);
      }

      for (var i = 0; i < this.loadsetHurt.length; i++) {
        this.loadsetHurt[i].offsetX = -(this.cutX - this.loadsetHurt[i].x);
        this.loadsetHurt[i].offsetY = -(this.cutY - this.loadsetHurt[i].y);
        p.noFill();
        p.stroke(255, 0, 0);
        if (this.loadsetComplex.value() === "false") p.rect(this.loadsetHurt[i].x, this.loadsetHurt[i].y, this.loadsetHurt[i].w, this.loadsetHurt[i].h);
        else {
          if (this.loadsetHurt[i].stage === Number(this.loadsetFrame.value()) || this.showHurtMotion) p.rect(this.loadsetHurt[i].x, this.loadsetHurt[i].y, this.loadsetHurt[i].w, this.loadsetHurt[i].h);
        }
      }
    }

    this.showAllHurtBoxes.changed(() => {
      switch (this.showHurtMotion) {
        case false:
          this.showHurtMotion = true;
          break;
        case true:
          this.showHurtMotion = false;
          break;
      }
    });

    this.setSpriteX = this.applyNobMesh(this.setSpriteX, this.setSpriteY, "x", null, p, 76);
    this.setSpriteY = this.applyNobMesh(this.setSpriteX, this.setSpriteY, "y", null, p, 76);

    if (this.loadsetMesh.length > 0) {
      var grabMesh = this.loadsetMesh[Number(this.pickMesh.value())];
      grabMesh.x = this.applyNobMesh(grabMesh.x, grabMesh.y, "x", null, p, 75);
      grabMesh.y = this.applyNobMesh(grabMesh.x, grabMesh.y, "y", null, p, 75);
      grabMesh.w = this.applyNobMesh(grabMesh.x, grabMesh.y, "w1", grabMesh, p, 75);
      grabMesh.h = this.applyNobMesh(grabMesh.x, grabMesh.y, "h1", grabMesh, p, 75);
    }
    if (this.loadsetHurt.length > 0) {
      var grabMesh = this.loadsetHurt[Number(this.pickHurt.value())];
      grabMesh.x = this.applyNobMesh(grabMesh.x, grabMesh.y, "x", null, p, 74);
      grabMesh.y = this.applyNobMesh(grabMesh.x, grabMesh.y, "y", null, p, 74);
      grabMesh.w = this.applyNobMesh(grabMesh.x, grabMesh.y, "w1", grabMesh, p, 74);
      grabMesh.h = this.applyNobMesh(grabMesh.x, grabMesh.y, "h1", grabMesh, p, 74);
    }
    for (var i = 0; i < Object.keys(this.actionsJson).length; i++) {
      var listX = window.innerWidth / 2 + 500 + 10;
      var listY = window.innerHeight / 2 - 400 + i * 25 + 10;

      p.fill(255, 255, 255, 100);
      if (p.mouseX > listX && p.mouseX < listX + 200 && p.mouseY > listY && p.mouseY < listY + 25) {
        p.fill(255, 255, 255, 200);

        if (p.mouseIsPressed) {
          this.currentEvent = Object.keys(this.actionsJson)[i];
        }
      }

      if (this.currentEvent === Object.keys(this.actionsJson)[i]) {
        var grabAction = this.actionsJson[this.currentEvent];
        p.fill(255, 255, 255, 50);
        var x = window.innerWidth / 2 - 600 + 200;
        var y = window.innerHeight / 2 + 400 - grabAction.height;
        p.rect(x, y, grabAction.width, grabAction.height);
        grabAction.sprite.drawForEdit(x + grabAction.offsetX, y + grabAction.offsetY, p);
        p.noFill();
        p.stroke(0, 255, 0);
        if (grabAction.mesh !== null) {
          for (var j = 0; j < grabAction.mesh.length; j++) {
            p.rect(x + grabAction.mesh[j].offsetX, y + grabAction.mesh[j].offsetY, grabAction.mesh[j].w, grabAction.mesh[j].h);
          }
        }
        p.stroke(255, 0, 0);
        if (grabAction.hurt !== null) {
          for (var k = 0; k < grabAction.hurt.length; k++) {
            if (grabAction.complex === "false") p.rect(x + grabAction.hurt[k].offsetX, y + grabAction.hurt[k].offsetY, grabAction.hurt[k].w, grabAction.hurt[k].h);
            else {
              if (grabAction.hurt[k].stage === grabAction.sprite.position) p.rect(x + grabAction.hurt[k].offsetX, y + grabAction.hurt[k].offsetY, grabAction.hurt[k].w, grabAction.hurt[k].h);
            }
          }
        }

        p.noStroke();
        p.fill(255);
      }
      p.push();
      p.textAlign(p.LEFT, p.LEFT);
      p.text(Object.keys(this.actionsJson)[i], listX, listY + 10);
      p.pop();
    }

    p.fill(255);
    p.stroke(255, 255, 255, 200);
    p.push();
    p.textAlign(p.LEFT, p.LEFT);
    p.textSize(20);
    p.translate(window.innerWidth / 2, window.innerHeight / 2);
    p.text("SET:", -590, -380);
    p.text("ID:", -590, -380 + 30);
    p.text("FLIP:", -590, -380 + 60);
    p.text("SCALE:", -590, -380 + 90);
    p.text("SPEED:", -590, -380 + 120);
    p.text("MESH:", -590, -380 + 90 + 60);
    p.text("HURT:", -590, -380 + 120 + 60);
    p.text("COMPX:", -590, -380 + 150 + 60);
    p.text("STAGE:", -590, -380 + 180 + 60);
    p.text("ACTION:", -590, -380 + 180 + 90);
    p.pop();
  }
  spriteEditorPage(p) {
    p.strokeWeight(1);
    var xpos = 0;
    var ypos = 0;
    p.fill(0, 0, 0, 200);
    p.rect(xpos, ypos, window.innerWidth * 2, window.innerHeight * 2);
    p.textAlign(p.CENTER, p.CENTER);

    this.label.position(window.innerWidth / 2 + 240, window.innerHeight / 2 - 225);
    this.id.position(window.innerWidth / 2 + 240, window.innerHeight / 2 - 225 + 20);
    this.frames.position(window.innerWidth / 2 + 240, window.innerHeight / 2 - 225 + 40);
    this.sound.position(window.innerWidth / 2 + 240, window.innerHeight / 2 - 225 + 60);

    this.width.position(window.innerWidth / 2 - 320, window.innerHeight / 2 - 225 - 7);
    this.height.position(window.innerWidth / 2 - 320, window.innerHeight / 2 - 225 + 13);
    this.image.position(window.innerWidth / 2 - 320, window.innerHeight / 2 - 225 + 33);

    p.push();
    p.translate(xpos, ypos);
    p.scale(1);
    p.stroke(255, 255, 255, 200);
    p.fill(255, 255, 255, 100);
    p.rect(window.innerWidth / 2 - 250, window.innerHeight / 2 - 250, 400, 500);
    p.rect(window.innerWidth / 2 - 400, window.innerHeight / 2 - 250, 150, 130);

    p.rect(window.innerWidth / 2 - 250 + 400, window.innerHeight / 2 - 250, 200, 150);
    p.rect(window.innerWidth / 2 - 250 + 400, window.innerHeight / 2 - 250 + 150, 200, 350);

    p.noStroke();
    p.fill(255);
    p.textSize(20);
    p.stroke(255);
    p.fill(255, 255, 255, 50);
    this.buttonAsset(player, window.innerWidth / 2 + 250 - 100, window.innerHeight / 2 - 112 - 18, 200, 30, "PUSH", 20, "PushLabel", p);
    this.buttonAsset(player, window.innerWidth / 2 - 375, window.innerHeight / 2 - 150, 100, 25, "LOAD", 20, "LoadSprite", p);
    this.buttonAsset(player, window.innerWidth / 2 + 250 - 100, window.innerHeight / 2 + 220, 200, 30, "EXPORT >", 20, "ExportSprite", p);

    p.fill(255);
    p.push();
    p.textAlign(p.LEFT, p.LEFT);
    p.translate(window.innerWidth / 2, window.innerHeight / 2 - 440);
    p.text("Label:", 160, 230 - 2);
    p.text("ID:", 160, 250 - 2);
    p.text("Frames:", 160, 270 - 2);
    p.text("Sound:", 160, 290 - 2);
    p.text("Width:", -390, 290 - 70);
    p.text("Height:", -390, 290 - 50);
    p.text("Image:", -390, 290 - 30);

    p.noStroke();
    for (var i = 0; i < Object.keys(this.sprite.framejson).length; i++) {
      p.fill(255, 255, 255, 100);
      if (p.mouseX > window.innerWidth / 2 + 150 && p.mouseX < window.innerWidth / 2 + 150 + 200 && p.mouseY > window.innerHeight / 2 - 440 + 350 + i * 25 && p.mouseY < window.innerHeight / 2 - 440 + 350 + i * 25 + 25) {
        p.fill(255, 255, 255, 200);

        if (p.mouseIsPressed) {
          this.sprite.changeStage(Object.keys(this.sprite.framejson)[i]);
          this.currentEvent = Object.keys(this.sprite.framejson)[i];
        }
      }

      if (this.currentEvent === Object.keys(this.sprite.framejson)[i]) p.fill(255);

      p.text(Object.keys(this.sprite.framejson)[i], 160, 360 + i * 25);
    }

    p.textAlign(p5.CENTER, p5.CENTER);
    p.pop();

    this.sprite.draw(window.innerWidth / 2 - this.sprite.spriteW / 2 - 50, window.innerHeight / 2 - this.sprite.spriteH / 2, 1, 1, p);
    p.pop();
  }
  cords(p, x, y, offsetX, offsetY, important = false) {
    var cords = [Math.floor(x), Math.floor(y)];
    p.textSize(18);
    p.fill(255, 255, 255);
    if (important === "reg") p.fill(255, 0, 0);
    else if (important === "tel") p.fill(0, 255, 0);
    p.text("[" + cords + "]", x + offsetX, y + offsetY);
    p.text("[" + cords + "]", x + offsetX, y + offsetY);
  }
  applyLevelEditor(p, player, camera) {
    player.x = this.applyNob(camera, player.x, player.y, "x", player, p, 73);
    player.y = this.applyNob(camera, player.x, player.y, "y", player, p, 73);

    this.cords(p, player.x, player.y, -10, -30);

    let mX = p.mouseX * (100 / this.spanSize) + camera.x - (window.innerWidth / 2) * (100 / this.spanSize);
    let mY = p.mouseY * (100 / this.spanSize) + camera.y - (window.innerHeight / 2) * (100 / this.spanSize);

    this.cords(p, mX, mY, -10, -30);

    if (this.obj.keys[70]) {
      this.setPointX = mX;
      this.setPointY = mY;
    }

    this.cords(p, this.setPointX, this.setPointY, -10, -30, "reg");

    if (this.obj.keys[71]) {
      this.setPointX_T = mX;
      this.setPointY_T = mY;
    }

    this.cords(p, this.setPointX_T, this.setPointY_T, -10, -30, "tel");

    for (var i = 0; i < this.viewCollide.length; i++) {
      if (this.viewCollide[i].constructor.name === "BoxCollision") {
        this.viewCollide[i].x = this.applyNob(camera, this.viewCollide[i].x, this.viewCollide[i].y, "x", this.viewCollide[i], p, 80);
        this.viewCollide[i].y = this.applyNob(camera, this.viewCollide[i].x, this.viewCollide[i].y, "y", this.viewCollide[i], p, 80);
        this.viewCollide[i].w = this.applyNob(camera, this.viewCollide[i].x, this.viewCollide[i].y, "w", this.viewCollide[i], p, 80);
        this.viewCollide[i].h = this.applyNob(camera, this.viewCollide[i].x, this.viewCollide[i].y, "h", this.viewCollide[i], p, 80);
        this.viewCollide[i].x = this.applyNob(camera, this.viewCollide[i].x, this.viewCollide[i].y, "DEL", this.viewCollide[i].x, p, 0);
        this.viewCollide[i].x = this.applyNob(camera, this.viewCollide[i].x, this.viewCollide[i].y, "DEL-WH", this.viewCollide[i], p, this.viewCollide[i].x);

        this.cords(p, this.viewCollide[i].x, this.viewCollide[i].y, 10, 40);

        p.stroke(255, 255, 255);
        p.fill(0, 0, 255, 50);
        p.rect(this.viewCollide[i].x, this.viewCollide[i].y, this.viewCollide[i].w, this.viewCollide[i].h);
      }
      if (this.viewCollide[i].constructor.name === "CurveCollision") {
        p.stroke(255);
        p.strokeWeight(2);
        p.noFill();
        for (var j = this.viewCollide[i].x1; j < this.viewCollide[i].x2; j += 10) p.point(j, this.viewCollide[i].y1 + this.viewCollide[i].c * p.sin((Math.PI * (j - this.viewCollide[i].x1)) / (this.viewCollide[i].x2 - this.viewCollide[i].x1)) + ((this.viewCollide[i].y2 - this.viewCollide[i].y1) * (j - this.viewCollide[i].x1)) / (this.viewCollide[i].x2 - this.viewCollide[i].x1));

        this.viewCollide[i].x1 = this.applyNob(camera, this.viewCollide[i].x1, this.viewCollide[i].y1, "x", this.viewCollide[i], p, 79);
        this.viewCollide[i].y1 = this.applyNob(camera, this.viewCollide[i].x1, this.viewCollide[i].y1, "y", this.viewCollide[i], p, 79);
        this.viewCollide[i].x2 = this.applyNob(camera, this.viewCollide[i].x2, this.viewCollide[i].y2, "x", this.viewCollide[i], p, 79);
        this.viewCollide[i].y2 = this.applyNob(camera, this.viewCollide[i].x2, this.viewCollide[i].y2, "y", this.viewCollide[i], p, 79);
        this.viewCollide[i].c = this.applyCurve(this.viewCollide[i], p, 79, "", null);
        this.viewCollide[i].x = this.applyNob(camera, this.viewCollide[i].x1, this.viewCollide[i].y1, "DEL", this.viewCollide[i].x, p, 0);
        this.viewCollide[i].x = this.applyNob(camera, this.viewCollide[i].x2, this.viewCollide[i].y2, "DEL", this.viewCollide[i].x, p, 0);
        this.viewCollide[i].x = this.applyCurve(this.viewCollide[i], p, 79, "DEL", this.viewCollide[i].x);
      }
    }

    for (var i = 0; i < this.viewPlayerUniqueCollide.length; i++) {
      this.cords(p, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, 10, 40);

      if (this.viewPlayerUniqueCollide[i].constructor.name === "CamBox") {
        this.viewPlayerUniqueCollide[i].x = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "x", this.viewPlayerUniqueCollide[i], p, 219);
        this.viewPlayerUniqueCollide[i].y = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "y", this.viewPlayerUniqueCollide[i], p, 219);
        this.viewPlayerUniqueCollide[i].w = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "w", this.viewPlayerUniqueCollide[i], p, 219);
        this.viewPlayerUniqueCollide[i].h = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "h", this.viewPlayerUniqueCollide[i], p, 219);
        this.viewPlayerUniqueCollide[i].x = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "DEL", this.viewPlayerUniqueCollide[i].x, p, 0);
        this.viewPlayerUniqueCollide[i].x = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "DEL-WH", this.viewPlayerUniqueCollide[i], p, this.viewPlayerUniqueCollide[i].x);
        p.noStroke();
        p.fill(255, 255, 255, 50);
        p.rect(this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, this.viewPlayerUniqueCollide[i].w, this.viewPlayerUniqueCollide[i].h);
      }

      if (this.viewPlayerUniqueCollide[i].constructor.name === "DeathBox") {
        this.viewPlayerUniqueCollide[i].x = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "x", this.viewPlayerUniqueCollide[i], p, 89);
        this.viewPlayerUniqueCollide[i].y = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "y", this.viewPlayerUniqueCollide[i], p, 89);
        this.viewPlayerUniqueCollide[i].w = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "w", this.viewPlayerUniqueCollide[i], p, 89);
        this.viewPlayerUniqueCollide[i].h = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "h", this.viewPlayerUniqueCollide[i], p, 89);
        this.viewPlayerUniqueCollide[i].x = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "DEL", this.viewPlayerUniqueCollide[i].x, p, 0);
        this.viewPlayerUniqueCollide[i].x = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "DEL-WH", this.viewPlayerUniqueCollide[i], p, this.viewPlayerUniqueCollide[i].x);
        p.noStroke();
        p.fill(255, 0, 0, 50);
        p.rect(this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, this.viewPlayerUniqueCollide[i].w, this.viewPlayerUniqueCollide[i].h);
      }

      if (this.viewPlayerUniqueCollide[i].constructor.name === "Portal") {
        this.viewPlayerUniqueCollide[i].x = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "x", this.viewPlayerUniqueCollide[i], p, 89);
        this.viewPlayerUniqueCollide[i].y = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "y", this.viewPlayerUniqueCollide[i], p, 89);
        this.viewPlayerUniqueCollide[i].w = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "w", this.viewPlayerUniqueCollide[i], p, 89);
        this.viewPlayerUniqueCollide[i].h = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "h", this.viewPlayerUniqueCollide[i], p, 89);
        this.viewPlayerUniqueCollide[i].x = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "DEL", this.viewPlayerUniqueCollide[i].x, p, 0);
        this.viewPlayerUniqueCollide[i].x = this.applyNob(camera, this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, "DEL-WH", this.viewPlayerUniqueCollide[i], p, this.viewPlayerUniqueCollide[i].x);
        p.noStroke();
        p.fill(255, 255, 255, 50);
        p.rect(this.viewPlayerUniqueCollide[i].x, this.viewPlayerUniqueCollide[i].y, this.viewPlayerUniqueCollide[i].w, this.viewPlayerUniqueCollide[i].h);
      }
    }

    for (var i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].constructor.name === "Spider") {
        this.cords(p, this.enemies[i].x, this.enemies[i].y, 10, 40);
        this.enemies[i].originX = this.applyNob(camera, this.enemies[i].originX, this.enemies[i].originY, "x", this.enemies[i], p, 84);
        this.enemies[i].originY = this.applyNob(camera, this.enemies[i].originX, this.enemies[i].originY, "y", this.enemies[i], p, 84);
        this.enemies[i].x = this.applyNob(camera, this.enemies[i].x, this.enemies[i].y, "DEL", this.enemies[i].x, p, 0);
        this.enemies[i].x = this.applyNob(camera, this.enemies[i].x, this.enemies[i].y, "DEL-WH", this.enemies[i], p, this.enemies[i].x);
      } else {
        if (this.enemies[i].leftBound !== null && this.enemies[i].rightBound !== null) {
          this.enemies[i].leftBound = this.applyNob(camera, this.enemies[i].leftBound, this.enemies[i].y, "x", this.enemies[i], p, 82);
          this.enemies[i].rightBound = this.applyNob(camera, this.enemies[i].rightBound, this.enemies[i].y, "x", this.enemies[i], p, 82);
        }

        this.cords(p, this.enemies[i].x, this.enemies[i].y, 10, 40);
        this.enemies[i].x = this.applyNob(camera, this.enemies[i].x, this.enemies[i].y, "x", this.enemies[i], p, 84);
        this.enemies[i].y = this.applyNob(camera, this.enemies[i].x, this.enemies[i].y, "y", this.enemies[i], p, 84);
        this.enemies[i].x = this.applyNob(camera, this.enemies[i].x, this.enemies[i].y, "DEL", this.enemies[i].x, p, 0);
        this.enemies[i].x = this.applyNob(camera, this.enemies[i].x, this.enemies[i].y, "DEL-WH", this.enemies[i], p, this.enemies[i].x);
      }
    }

    for (var i = 0; i < this.passives.length; i++) {
      if (this.passives[i].leftBound !== null && this.passives[i].rightBound !== null) {
        this.passives[i].leftBound = this.applyNob(camera, this.passives[i].leftBound, this.passives[i].y, "x", this.passives[i], p, 82);
        this.passives[i].rightBound = this.applyNob(camera, this.passives[i].rightBound, this.passives[i].y, "x", this.passives[i], p, 82);
      }

      this.cords(p, this.passives[i].x, this.passives[i].y, 10, 40);
      this.passives[i].x = this.applyNob(camera, this.passives[i].x, this.passives[i].y, "x", this.passives[i], p, 84);
      this.passives[i].y = this.applyNob(camera, this.passives[i].x, this.passives[i].y, "y", this.passives[i], p, 84);
      this.passives[i].x = this.applyNob(camera, this.passives[i].x, this.passives[i].y, "DEL", this.passives[i].x, p, 0);
      this.passives[i].x = this.applyNob(camera, this.passives[i].x, this.passives[i].y, "DEL-WH", this.passives[i], p, this.passives[i].x);
    }

    for (var i = 0; i < this.generalCollisions.length; i++) {
      if (this.generalCollisions[i].x === null) {
        this.generalCollisions.splice(i, 1);
      }
    }

    for (var i = 0; i < this.playerUniqueCollisions.length; i++) {
      if (this.playerUniqueCollisions[i].x === null) {
        this.playerUniqueCollisions.splice(i, 1);
      }
    }

    for (var i = 0; i < this.collectable.length; i++) {
      if (this.collectable[i].x === null) {
        this.collectable.splice(i, 1);
      }
    }
  }
  snow(p, camera) {
    p.push();
    p.noStroke();

    //particles
    for (var i = 0; i < this.particles.x.length; ++i) {
      //fill
      p.fill(255, 255, 255, 100);
      p.ellipse(this.particles.x[i], this.particles.y[i], this.particles.s[i], this.particles.s[i]); // circle for particle

      //particles.s[i] -= 0.4; // size decreases
      this.particles.y[i] += this.particles.s[i]; // particl goes up
      this.particles.x[i] -= 0.5;

      if (this.particles.y[i] >= camera.y + window.innerHeight + 600) {
        // is particle is totally shrunk
        this.particles.x[i] = p.random(-600, window.innerWidth + 600) + camera.x - window.innerWidth / 2;
        this.particles.y[i] = -10 + camera.y - window.innerHeight / 2;
        this.particles.s[i] = p.random(1, 3);
      }
    }

    //appear
    if (this.particles.x.length <= 400) {
      this.particles.x.push(p.random(0, window.innerWidth) + camera.x - window.innerWidth / 2);
      this.particles.y.push(p.random(0, window.innerWidth) + camera.y - window.innerHeight / 2);
      this.particles.s.push(p.random(1, 3));
      this.particles.r.push(p.random(0, 360));
    }
    p.pop();
  }
  startScreenShake(shakePower) {
    this.shakeValue = 1;
    this.shakePower = shakePower;
  }
  apply(p, player, camera) {
    this.pageDialogue = false;

    p.push();
    camera.view(player, p, this);
    var shake = Math.pow(this.shakeValue, 2) * this.shakePower;
    camera.x += p.random(-shake, shake);
    camera.y += p.random(-shake, shake);
    this.shakeValue -= 0.1;
    if (this.shakeValue <= 0) {
      this.shakeValue = 0;
    }

    for (var i = 0; i < this.bgImg.length; i++) p.image(this.bgImg[i], 0, 0);

    for (var i = 0; i < this.stagImg.length; i++) p.image(this.stagImg[i][0], camera.x - window.innerWidth / 2 + this.stagImg[i][1].xOffset, camera.y - window.innerHeight / 2 + this.stagImg[i][1].yOffset);

    // this.snow(p);

    for (var i = 0; i < this.playerUniqueCollisions.length; i++) {
      if (view(this.playerUniqueCollisions[i], this, camera, 2.5)) {
        if (this.playerUniqueCollisions[i].constructor.name == "Transition") this.playerUniqueCollisions[i].draw(p);
      }
    }

    for (var i = 0; i < this.bgImg2.length; i++) p.image(this.bgImg2[i], 0, 0);

    this.viewCollide = [];
    this.viewPlayerUniqueCollide = [];
    this.viewAttackBoxes = [];
    this.viewPlayerAttackBoxes = [];
    this.CollectableCollide = [];

    for (var i = 0; i < player.projectiles.length; i++) {
      this.projectiles.player.push(player.projectiles[i]);
    }
    player.projectiles = [];

    for (var i = 0; i < this.generalCollisions.length; i++) {
      if (view(this.generalCollisions[i], this, camera, 3)) {
        this.generalCollisions[i].draw(p);
        this.viewCollide.push(this.generalCollisions[i]);
      }
    }

    for (var i = 0; i < this.playerUniqueCollisions.length; i++) {
      if (view(this.playerUniqueCollisions[i], this, camera, 2.5)) {
        if (this.playerUniqueCollisions[i].constructor.name != "Transition") this.playerUniqueCollisions[i].draw(p);
        this.viewPlayerUniqueCollide.push(this.playerUniqueCollisions[i]);
      }
    }

    for (var i = 0; i < this.projectiles.player.length; i++) {
      if (view(this.projectiles.player[i], this, camera, 2.5) && this.projectiles.player[i].state === "active") {
        for (var j = 0; j < this.projectiles.player[i].meshAttack.length; j++) {
          this.viewPlayerAttackBoxes.push(this.projectiles.player[i].meshAttack[j]);
        }
      }
    }

    for (var i = 0; i < this.collectable.length; i++) {
      if (view(this.collectable[i], this, camera, 1.2) && !this.collectable[i].collected) {
        this.collectable[i].apply(p, {});
        this.CollectableCollide.push(this.collectable[i]);
      }
    }

    for (var j = 0; j < player.meshAttack.length; j++) {
      this.viewPlayerAttackBoxes.push(player.meshAttack[j]);
      player.meshAttack[j].draw(p, this, player);
    }

    for (var i = 0; i < this.enemies.length; i++) {
      if (this.resetTimer <= 40 && view(this.enemies[i], this, camera, 2)) {
        this.enemies[i].apply(p, { collision: this.viewCollide, player: player, hit: this.viewPlayerAttackBoxes });

        for (var j = 0; j < this.enemies[i].projectiles.length; j++) {
          this.projectiles.enemies.push(this.enemies[i].projectiles[j]);
        }

        this.enemies[i].projectiles = [];
        for (var j = 0; j < this.enemies[i].meshAttack.length; j++) {
          this.viewAttackBoxes.push(this.enemies[i].meshAttack[j]);
          this.enemies[i].meshAttack[j].draw(p, this, player);
        }
        for (var j = 0; j < this.enemies[i].meshBody.length; j++) {
          this.enemies[i].meshBody[j].draw(p, this, player);
        }
      }
    }

    for (var i = 0; i < this.passives.length; i++) {
      if (view(this.passives[i], this, camera, 2)) {
        this.passives[i].apply(p, { collision: this.viewCollide, player: player, hit: this.viewPlayerAttackBoxes });

        for (var j = 0; j < this.passives[i].meshBody.length; j++) {
          this.passives[i].meshBody[j].draw(p, this, player);
        }

        if (this.passives[i].talkable) {
          this.passives[i].updateDialogue(p, this.obj.chapters[this.obj.currentChap].images.listen);

          if (
            this.obj.keys[69] &&
            !this.passives[i].talk &&
            this.currentMessage === 0 &&
            rectCollide(
              {
                x: this.passives[i].x - this.passives[i].talkBoxOffset.w,
                y: this.passives[i].y - this.passives[i].talkBoxOffset.h,
                w: this.passives[i].w + this.passives[i].talkBoxOffset.w * 2,
                h: this.passives[i].h + this.passives[i].talkBoxOffset.h * 2,
              },
              player
            )
          ) {
            this.passives[i].talkSound.play();
            this.writeText = 0;
            this.passives[i].talk = true;
          }
        }

        if (this.passives[i].talk) {
          this.pageDialogue = true;
          this.pageTalkbox = this.obj.chapters[this.obj.currentChap].images.talkbox;
          this.pageTalkboxEnter = this.obj.chapters[this.obj.currentChap].images.talkboxenter;
          this.pageMessages = this.passives[i].talkMessages;

          if (this.currentMessage >= this.pageMessages.length) {
            this.passives[i].talk = false;
            this.pageDialogue = false;

            setTimeout(() => {
              this.currentMessage = 0;
            }, "1500");
          }
        }
      }
    }

    for (var i = 0; i < this.projectiles.player.length; i++) {
      if (view(this.projectiles.player[i], this, camera, 2.5) && this.projectiles.player[i].state === "active") {
        this.projectiles.player[i].apply(p, { collision: this.viewCollide });
        for (var j = 0; j < this.projectiles.player[i].meshAttack.length; j++) {
          this.projectiles.player[i].meshAttack[j].draw(p, this, player);
        }
      } else if (this.projectiles.player[i].state === "dying" && this.projectiles.player[i].kill()) {
        this.projectiles.player.splice(i, 1);
      } else if (!view(this.projectiles.player[i], this, camera, 2.5)) {
        this.projectiles.player.splice(i, 1);
      } else if (!this.projectiles.player[i].kill()) {
        this.projectiles.player[i].apply(p, { collision: [] });
      }
    }

    for (var i = 0; i < this.projectiles.enemies.length; i++) {
      if (view(this.projectiles.enemies[i], this, camera, 2.5) && this.projectiles.enemies[i].state === "active") {
        this.projectiles.enemies[i].apply(p, { collision: this.viewCollide });
        for (var j = 0; j < this.projectiles.enemies[i].meshAttack.length; j++) {
          this.projectiles.enemies[i].meshAttack[j].draw(p, this, player);
          this.viewAttackBoxes.push(this.projectiles.enemies[i].meshAttack[j]);
        }
      } else if (this.projectiles.enemies[i].state === "dying" && this.projectiles.enemies[i].kill()) {
        this.projectiles.enemies.splice(i, 1);
      } else if (!view(this.projectiles.enemies[i], this, camera, 2.5)) {
        this.projectiles.enemies.splice(i, 1);
      } else if (!this.projectiles.enemies[i].kill()) {
        this.projectiles.enemies[i].apply(p, { collision: [] });
      }
    }

    if (this.pageDialogue) {
      player.keys = [];
    }

    player.apply(p, { collision: this.viewCollide, collectable: this.CollectableCollide, PlayerUnique: this.viewPlayerUniqueCollide, hit: this.viewAttackBoxes, camera: camera }, this);

    if (player.y >= this.canvasH || player.health <= 0) {
      this.reset = true;
    }

    if (this.reset) {
      this.resetTimer++;
      this.trans += 20;
    }

    if (!this.reset) {
      this.trans /= 1.1;
    }

    if (this.resetTimer >= 60) {
      player.reset();
      this.spanX = this.originSpanX;
      this.spanY = this.originSpanY;
      this.spanSize = this.originSpanSize;
      this.reset = false;
      this.resetTimer = 0;
    }

    p.textSize(20);
    for (var i = 0; i < player.inventory.length; i++) p.text(player.inventory[i].constructor.name, player.x + i * 70, player.y - 40);

    /** IN FRONT IMAGES **/
    for (var i = 0; i < this.fgImg.length; i++) p.image(this.fgImg[i], 0, 0);

    // LIVE CAMERA SPANNING DETECTION
    if (this.spanSize <= this.spanLiveSize) this.spanSize += 0.2;
    if (this.spanSize >= this.spanLiveSize) this.spanSize -= 0.2;
    if (this.spanSize === this.spanLiveSize) this.spanSize = this.spanLiveSize;

    if (this.spanX <= this.spanLiveX) this.spanX += 2;
    if (this.spanX >= this.spanLiveX) this.spanX -= 2;
    if (this.spanX === this.spanLiveX) this.spanX = this.spanLiveX;

    if (this.spanY <= this.spanLiveY) this.spanY += 2;
    if (this.spanY >= this.spanLiveY) this.spanY -= 2;
    if (this.spanY === this.spanLiveY) this.spanY = this.spanLiveY;

    if (this.stopSpan_AndExapand) {
      this.spanSize = window.innerWidth / 30.5;
    }

    if (this.spectMode) {
      this.applyLevelEditor(p, player, camera);
    }

    if (this.toggle) {
      this.setSpanX.position(9, 10 + 30 + 70 + 70 + 50);
      this.setSpanY.position(9, 10 + 30 + 70 + 70 + 50 + 25);
      this.setSpanS.position(9, 10 + 30 + 70 + 70 + 50 + 50);
      this.classLabel.position(9, 10 + 60 + 70 + 140 + 60 + 40 + 140);
    } else {
      this.setSpanX.position(-1000, -1000);
      this.setSpanY.position(-1000, -1000);
      this.setSpanS.position(-1000, -1000);
      this.classLabel.position(-1000, -1000);
    }

    p.pop();

    if (!this.spectMode) {
      p.push();
      p.angleMode(p.DEGREES);
      p.noStroke();
      p.fill(255, 255, 255, 20);
      p.ellipse(60, 60, 100, 100);
      p.ellipse(60, 60, 90, 90);
      p.rect(110 - 5, 25 - 5, 300 + 10, 20 + 10, 100);
      p.rect(110 - 10, 25 - 10, 300 + 20, 20 + 20, 100);

      //
      p.fill(148, 235, 255, 20);
      p.rect(110 - 5, 25 - 5 + 35, 300 + 10, 20 + 10, 100);
      p.rect(110 - 10, 25 - 10 + 35, 300 + 20, 20 + 20, 100);

      p.strokeWeight(3);
      p.stroke(255, 255, 255, 100);
      p.fill(255, 255, 255, 100);
      p.rect(110, 25, 300, 20, 100);
      p.ellipse(60, 60, 80, 80);

      //stamina
      p.strokeWeight(3);
      p.stroke(148, 235, 255, 100);
      p.fill(148, 235, 255, 100);
      p.rect(110, 25 + 35, 300, 20, 100);

      p.fill(player.healthBarColor);
      p.stroke(255, 255, 255, 100);
      p.rect(110, 25, player.health * 3, 20, 100);
      p.ellipse(60, 60, player.restoreHealth, player.restoreHealth);

      p.fill(148, 235, 255, 200);
      p.stroke(148, 235, 255, 100);
      p.rect(110, 25 + 35, player.stamina * 3, 20, 100);
      p.stroke(0, 0, 0, 100);
      p.rect(110 + 75, 25 + 35, 1, 20, 50);
      p.rect(110 + 75 * 2, 25 + 35, 1, 20, 50);
      p.rect(110 + 75 * 3, 25 + 35, 1, 20, 50);
      p.strokeWeight(1);
      p.angleMode(p.RADIANS);
      p.pop();
      p.fill(0, 0, 0, this.trans);
      p.rect(0, 0, window.innerWidth, window.innerHeight);
    }

    p.fill(0, 0, 0, this.transRed);
    p.rect(0, 0, window.innerWidth, window.innerHeight);
    if (player.takenDamage) {
      this.transRed = 150;
      player.takenDamage = false;
    }

    this.transRed /= 1.1;

    if (this.obj.keys[27] && !this.obj.clicked) {
      switch (this.toggle) {
        case true:
          this.toggle = false;
          break;
        case false:
          this.toggle = true;
          break;
      }

      this.obj.clickDalay = 50;
      this.obj.clicked = true;
    }

    // Keys and delay for spec
    this.obj.spectDelay--;
    if (this.obj.spectDelay <= 0) {
      this.obj.spectDelay = 0;
      this.obj.pressed = false;
    }
    if (this.obj.keys[13] && !this.obj.pressed) {
      this.spectMode = !this.spectMode;
      this.obj.spectDelay = 50;
      this.obj.pressed = true;
    }

    this.spectateModeAssets(p, player);

    if(player.keys[17] && this.pickPowerUpScreenTimer < 0)
    {
      this.pickPowerUpScreenTimer = 20;
      if(this.pickPowerUpScreen)
        this.pickPowerUpScreen = false;
      else
        this.pickPowerUpScreen = true;
    }
    this.pickPowerUpScreenTimer--;

    // pick powerups
    p.textAlign(p.CENTER, p.CENTER);
    p.stroke(231, 183, 255, 50)
    p.strokeWeight(8);
    p.fill(231, 183, 255, 200);
    p.ellipse(45, 130, 50, 50);

    if(player.powerupBinding[1] === player.powerupBinding[player.currentPower])
    {
      p.stroke(255, 255, 255);
      p.strokeWeight(2);
    }
    p.ellipse(45 + 45, 130 - 5, 35, 35);
    p.stroke(231, 183, 255, 50)
    p.strokeWeight(8);
    
    if(player.powerupBinding[2] === player.powerupBinding[player.currentPower])
    {
      p.stroke(255, 255, 255);
      p.strokeWeight(2);
    }
    p.ellipse(45 + 40 + 30, 130 - 30, 30, 30);
    p.stroke(231, 183, 255, 50)
    p.strokeWeight(8);
    p.fill(255, 255, 255);
    p.stroke(255, 255, 255, 50);
    p.strokeWeight(2);
    p.textSize(15);
    p.text(player.powerupBinding[player.currentPower], 45, 130);
    p.textSize(10);
    p.text(player.powerupBinding[1], 45 + 45, 130 - 5);
    p.textSize(7);
    p.text(player.powerupBinding[2], 45 + 40 + 30, 130 - 30);


    if (this.pickPowerUpScreen) {
      p.strokeWeight(1);
      p.fill(0, 0, 0, 200);
      p.rect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
      p.stroke(255, 255, 255, 50);
      p.strokeWeight(10);
      p.fill(215, 168, 239, 100);
      p.rect(window.innerWidth / 2 - 400, window.innerHeight / 2 - 400, 800, 800, 20);

      for (var i = 0; i < player.powerupInformation.length; i++) {
        p.stroke(255, 255, 255, 50);
        p.fill(215, 168, 239, 100);
        
        if(player.powerupBinding[1] === player.powerupInformation[i].name || player.powerupBinding[2] === player.powerupInformation[i].name)
          p.rect(window.innerWidth / 2 - 400 + 20 + i * 120 - 10, window.innerHeight / 2 + 20 - 400 - 10, 120, 120, 40);
        
        if (p.mouseX > window.innerWidth / 2 - 400 + 20 + i * 120 && p.mouseX < window.innerWidth / 2 - 400 + 20 + i * 120 + 100 && p.mouseY > window.innerHeight / 2 + 20 - 400 && p.mouseY < window.innerHeight / 2 + 20 - 400 + 100) {
          p.fill(255, 255, 255);
          p.noStroke();
          p.textSize(20);
          p.text(player.powerupInformation[i].description, window.innerWidth / 2 - 100, window.innerHeight / 2 - 100, 200, 200);
          p.textSize(30);
          p.text("Cooldown: " + player.powerupInformation[i].cooldown + " seconds", window.innerWidth / 2, window.innerHeight / 2 + 150);
          p.stroke(255, 255, 255, 50);
          p.fill(255, 255, 255, 100);
        }

        p.textSize(20);
        p.rect(window.innerWidth / 2 - 400 + 20 + i * 120, window.innerHeight / 2 + 20 - 400, 100, 100, 20);
        p.fill(255, 255, 255);
        p.noStroke();
        p.text(player.powerupInformation[i].name, window.innerWidth / 2 - 400 + 50 + 20 + i * 120, window.innerHeight / 2 + 20 + 50 - 400);

        if (player.powerupBinding[1] !== player.powerupInformation[i].name && player.powerupBinding[2] !== player.powerupInformation[i].name&& p.mouseIsPressed && !this.obj.clicked && p.mouseX > window.innerWidth / 2 - 400 + 20 + i * 120 && p.mouseX < window.innerWidth / 2 - 400 + 20 + i * 120 + 100 && p.mouseY > window.innerHeight / 2 + 20 - 400 && p.mouseY < window.innerHeight / 2 + 20 - 400 + 100)
        {

          switch(this.switchChosenPower)
          {
            case 1:
              player.powerupBinding[1] = player.powerupInformation[i].name;
              this.switchChosenPower = 2;
              break;
            case 2:
              player.powerupBinding[2] = player.powerupInformation[i].name;
              this.switchChosenPower = 1;
              break;
          }

          this.obj.clickDalay = 50;
          this.obj.clicked = true;
        }
      }
    }

    if (this.pageDialogue) {
      p.push();
      p.translate(window.innerWidth / 2 - 680, window.innerHeight / 3 - 200);
      p.scale(1, 0.5);
      if (this.currentMessage < this.pageMessages.length) {
        if (this.writeText >= this.pageMessages[this.currentMessage].length) {
          p.image(this.pageTalkboxEnter, 0, 0);
          if (this.obj.keys[69]) {
            playAudio(this.obj.chapters[this.obj.currentChap].sounds.nextmessage);
            this.currentMessage++;
            this.writeText = 0;
          }
        } else {
          p.image(this.pageTalkbox, 0, 0);
        }
      }
      p.pop();

      p.push();
      p.translate(window.innerWidth / 2 - 680, window.innerHeight / 3 - 400);
      p.fill(255);
      p.textSize(30);
      p.textAlign(p.LEFT, p.TOP);
      p.stroke(255, 255, 255, 50);
      p.strokeWeight(5);
      p.textFont("Curlz MT");
      this.writeText += 0.3;
      if (this.currentMessage < this.pageMessages.length) {
        p.text(this.pageMessages[this.currentMessage].substring(0, p.round(this.writeText)), 220, 250, 930, 500);
      }
      p.pop();
    }
  }
}
