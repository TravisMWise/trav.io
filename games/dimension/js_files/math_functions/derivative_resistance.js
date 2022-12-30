import { formatDeriv } from "./format_derivative.js";
export function derivResistance(p, i, obj) {
    // p.abs(x) -> | x |
    // p.pow(x, y) -> x ^ y
    // p.exp(x) -> e^x
    // i -> player point
    // obj1 -> player
    // obj2 -> curvature
    // p -> pass if using p5 material (Math.pow)    
    var der = obj.c * (Math.PI / (obj.x2 - obj.x1)) * p.cos((Math.PI * (i - obj.x1)) / (obj.x2 - obj.x1)) + (obj.y2 - obj.y1) / (obj.x2 - obj.x1);
    return formatDeriv(p, der);
}