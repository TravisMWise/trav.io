export function view(obj, obj2, cam, muliply = 1) {
    // only view objects if they are visible in camera for efficency
    return obj.x + ((window.innerWidth / 2) * muliply) * (100 / obj2.spanSize) - cam.x < (window.innerWidth * muliply) * (100 / obj2.spanSize) &&
        obj.x + ((window.innerWidth / 2) * muliply) * (100 / obj2.spanSize) - cam.x > -obj.w &&
        obj.y + ((window.innerHeight / 2) * muliply) * (100 / obj2.spanSize) - cam.y < (window.innerHeight * muliply) * (100 / obj2.spanSize) &&
        obj.y + ((window.innerHeight / 2) * muliply) * (100 / obj2.spanSize) - cam.y > -obj.h;
}