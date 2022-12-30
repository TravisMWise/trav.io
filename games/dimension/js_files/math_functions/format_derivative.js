export function formatDeriv(p, y) {
    // ratio of speed resistance based on curvature
    // cut it in half for a smoother feel
    // make velocity almost look constant at all times
    return 1 - (0.5) * p.abs((2 / (1 + p.exp(y)) - 1));
}