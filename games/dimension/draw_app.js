import { App } from "./js_files/level_format/app.js";

var Application;

new p5(function (p5) {
    p5.preload = function () {
        Application = new App(p5);
        Application.load(p5);
    }
    p5.keyPressed = function () {
        Application.keys[p5.keyCode] = true;
        var chapDetails = Application.returnCurrentChap();
        chapDetails.player.keys[p5.keyCode] = true;
    };
    p5.keyReleased = function () {
        Application.keys[p5.keyCode] = false;
        var chapDetails = Application.returnCurrentChap();
        chapDetails.player.keys[p5.keyCode] = false;
    };
    p5.setup = function () {
        p5.createCanvas(window.innerWidth, window.innerHeight);
        p5.angleMode(p5.RADIANS);
        p5.frameRate(60);
    }
    p5.draw = function () {

        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.createCanvas(window.innerWidth, window.innerHeight);

        p5.background(0, 0, 0);
        Application.update(p5);
        Application.drawSequentialChaps(p5)
        // p5.stroke(255,255,255);
        // p5.textSize(50);
        // p5.text("Yo", 500, 500);
    }
});
