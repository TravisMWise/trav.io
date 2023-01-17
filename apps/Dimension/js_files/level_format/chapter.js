import { Camera } from "../player_classes/camera.js";

export class Chapter {

    constructor(player, images, sounds, sprites, level) {
        this.images = images;
        this.sounds = sounds;
        this.sprites = sprites;
        this.levelMap = [];
        this.player = player;
        this.player.level = level;
        this.camera = new Camera(player.x, player.y);
    }

    draw(p) {
        this.levelMap[this.player.level].apply(p, this.player, this.camera);
    }
}