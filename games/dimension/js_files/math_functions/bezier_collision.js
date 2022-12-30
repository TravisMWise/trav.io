export function bezierCollisionPoint(p, i, obj1, obj2) {

    var equation = (obj2.y1 + obj2.c * p.sin((Math.PI * (i - obj2.x1)) / (obj2.x2 - obj2.x1)) + ((obj2.y2 - obj2.y1) * (i - obj2.x1)) / (obj2.x2 - obj2.x1));
    var equationX = (obj2.y1 + obj2.c * p.sin((Math.PI * (i - obj1.velocityX - obj2.x1)) / (obj2.x2 - obj2.x1)) + ((obj2.y2 - obj2.y1) * (i - obj1.velocityX - obj2.x1)) / (obj2.x2 - obj2.x1));

    return (obj1.y + obj1.h >= equation - 10 && obj1.y + obj1.h <= equationX + 10 + obj1.velocityY) &&
        obj1.x + obj1.w >= (i) - 10 - obj1.velocityX &&
        obj1.x <= (i) + 10 + obj1.velocityX;
}