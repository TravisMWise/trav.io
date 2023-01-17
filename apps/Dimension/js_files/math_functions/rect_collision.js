export function rectCollide(one, two) {
    // for rectangular collision hit boxes
    // gets x, y, w, and h of two objects and returns the collision for operations
    return one.x + one.w > two.x &&
        one.y + one.h > two.y &&
        one.x < two.x + two.w &&
        one.y < two.y + two.h;
}