export class Camera {

    constructor(x, y) {
        this.x = x; this.y = y;
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.scaleW = 0;
        this.scaleH = 0;
    }

    view(plyer, p, obj) {

        // set spangrow to be initialized with map
        obj.spanGrow = obj.spanSize;

        // interpolation for camera following player
        this.x = p.lerp(this.x, plyer.x + obj.spanX, 0.05);
        this.y = p.lerp(this.y, plyer.y + obj.spanY, 0.05);

        // scale based on map span grow settings
        p.scale(obj.spanGrow / 100);
        this.w = window.innerWidth;
        this.h = window.innerHeight;

        // scale width and height based on span grow
        this.scaleW = (this.w / (obj.spanGrow / 100)) / 2;
        this.scaleH = (this.h / (obj.spanGrow / 100)) / 2;

        // constrain player to ends of screen
        this.x = p.constrain(this.x, this.scaleW, obj.canvasW - this.scaleW);
        this.y = p.constrain(this.y, this.scaleH, obj.canvasH - this.scaleH);

        // translate accordingly
        p.translate(this.scaleW - this.x, this.scaleH - this.y);
    };
}