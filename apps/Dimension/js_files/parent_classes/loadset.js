export class LoadSet {
    constructor(loadset, id, spriteW, spriteH, x = null, y = null, w = null, h = null, sc = 1, staggeredFrames = 6, stageSwitch = "idle") {
        this.loadset = loadset;
        this.spriteW = spriteW;
        this.spriteH = spriteH;
        this.position = 0;
        this.sc = sc;
        this.staggeredFrames = staggeredFrames;
        this.frame = 0;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.id = id;
        this.played = false;
    }

    changeIdPlusScale(id, sc) { this.id = id; this.sc = sc; }
    changeId(id) { this.id = id; }
    getMaxStageProgress() { return this.staggeredFrames * this.loadset[this.id].length - 1; }
    changeScale(sc) { if (this.sc !== null) { this.sc = sc; } }
    resetPosition() {
        if (this.position >= this.getMaxStageProgress())
            this.position = 0;
    }

    // Only for actions!!!
    play(p, stageProgress) {
        if (!this.played) {
            this.frame = p.floor(stageProgress / this.staggeredFrames) % this.loadset[this.id].length;
        }

        if (this.frame >= this.loadset[this.id].length - 1) {
            this.frame = this.loadset[this.id].length - 1;
            this.played = true;
            this.finished = true;
        }

        p.push();
        p.translate(this.x, this.y);
        if (this.sc === -1) p.translate(this.spriteW * this.w, 0);
        // p.rotate(stageProgress / 10);
        // p.translate(-80, -80);
        p.scale(this.w * this.sc, this.h);
        p.image(this.loadset[this.id][this.frame], 0, 0);
        p.pop();
    }

    draw(x, y, w, h, p) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.frame = p.floor(this.position / this.staggeredFrames) % this.loadset[this.id].length;
        this.position++;

        p.push();
        p.translate(this.x, this.y);
        if (this.sc === -1) p.translate(this.spriteW * this.w, 0);
        p.scale(this.w * this.sc, this.h);
        p.image(this.loadset[this.id][this.frame], 0, 0);
        p.pop();

        this.resetPosition()
    }

    drawForEdit(x, y, p) {

        this.x = x;
        this.y = y;

        this.frame = p.floor(this.position / this.staggeredFrames) % this.loadset[this.id].length;
        this.position++;

        p.push();
        p.translate(this.x, this.y);
        if (this.sc === -1) p.translate(this.spriteW * this.w, 0);
        p.scale(this.w * this.sc, this.h);
        p.image(this.loadset[this.id][this.frame], 0, 0);
        p.pop();

        this.resetPosition()
    }

    playForEdit(x, y, p, stageProgress) {

        this.x = x;
        this.y = y;

        this.frame = p.floor(stageProgress / this.staggeredFrames) % this.loadset[this.id].length;

        p.push();
        p.translate(this.x, this.y);
        if (this.sc === -1) p.translate(this.spriteW * this.w, 0);
        p.scale(this.w * this.sc, this.h);
        p.image(this.loadset[this.id][this.frame], 0, 0);
        p.pop();

        this.resetPosition()
    }

    draw(p) {
        this.frame = p.floor(this.position / this.staggeredFrames) % this.loadset[this.id].length;
        this.position++;

        p.push();
        p.translate(this.x, this.y);
        if (this.sc === -1) p.translate(this.spriteW * this.w, 0);
        p.scale(this.w * this.sc, this.h);
        p.image(this.loadset[this.id][this.frame], 0, 0);
        p.pop();

        this.resetPosition()
    }
}