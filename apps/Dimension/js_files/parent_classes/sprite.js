export class Sprite {
    constructor(spriteSheetImage, spriteW, spriteH, framejson, x = null, y = null, w = null, h = null, sc = 1, staggeredFrames = 6, stageSwitch = "idle") {
        this.spriteSheetImage = spriteSheetImage;
        this.spriteW = spriteW;
        this.spriteH = spriteH;
        this.framejson = framejson;
        this.currentState = stageSwitch;
        this.stageProgress = 0;
        this.sc = sc;
        this.staggeredFrames = staggeredFrames;
        this.offset = 0;
        this.position = 0;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.played = false;
        this.finished = false;
    }

    frameLength() {
        return this.framejson[this.currentState].frames;
    }

    changeStagePlusScale(stageSwitch, sc) {
        this.currentState = stageSwitch;
        this.sc = sc;
    }

    resetPosition() {
        if (this.stageProgress >= this.getMaxStageProgress())
            this.stageProgress = 0;
    }

    changeStage(stageSwitch) {
        this.currentState = stageSwitch;
    }

    changeScale(sc) {
        if (this.sc !== null)
            this.sc = sc;
    }

    getMaxStageProgress() {
        return this.staggeredFrames * this.framejson[this.currentState].frames;
    }

    // Only for actions!!!
    play(p, stageProgress) {
        if (!this.played) {
            this.position = p.floor(stageProgress / this.staggeredFrames) % this.framejson[this.currentState].frames;
        }

        var frameX = (this.position + this.offset) * this.spriteW;
        var frameY = this.framejson[this.currentState].id * this.spriteH;

        if (this.position >= this.framejson[this.currentState].frames - 1) {
            this.position = this.framejson[this.currentState].frames - 1;
            this.played = true;
            this.finished = true;
        }

        p.push();
        p.translate(this.x, this.y);
        if (this.sc === -1) p.translate(this.spriteW * this.w, 0);
        p.scale(this.w * this.sc, this.h);
        var m = this.spriteSheetImage.get(frameX, frameY, this.spriteW, this.spriteH);
        p.image(m, 0, 0);
        p.pop();
    }

    draw(x, y, w, h, p) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.position = p.floor(this.stageProgress / this.staggeredFrames) % this.framejson[this.currentState].frames;
        var frameX = (this.position + this.offset) * this.spriteW;
        var frameY = this.framejson[this.currentState].id * this.spriteH;
        this.stageProgress++;

        p.push();
        p.translate(this.x, this.y);
        if (this.sc === -1) p.translate(this.spriteW * this.w, 0);
        p.scale(this.w * this.sc, this.h);
        var m = this.spriteSheetImage.get(frameX, frameY, this.spriteW, this.spriteH);
        p.image(m, 0, 0);
        p.pop();

        this.resetPosition()
    }
}