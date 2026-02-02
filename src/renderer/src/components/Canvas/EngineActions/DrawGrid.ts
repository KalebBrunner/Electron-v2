import { CanvasEngine } from "../CanvasEngine";

export function drawGrid(engine: CanvasEngine) {
    console.log("drawing grid");
    const GRID_SIZE = 25; // CSS px
    const ctx = engine.ctx;
    const dpr = engine.css.dpr;

    const { width, height } = engine.css.size;

    // background
    ctx.fillStyle = "#0b1020";
    ctx.fillRect(0, 0, width, height);

    // half-pixel alignment for DPR
    const o = 0.5 / dpr;

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1 / dpr; // 1 physical px

    ctx.beginPath();
    for (let x = 0; x <= width; x += GRID_SIZE) {
        ctx.moveTo(x + o, 0);
        ctx.lineTo(x + o, height);
    }
    for (let y = 0; y <= height; y += GRID_SIZE) {
        ctx.moveTo(0, y + o);
        ctx.lineTo(width, y + o);
    }
    ctx.stroke();

    // Axes
    const cx = Math.floor(width / 2);
    const cy = Math.floor(height / 2);

    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2 / dpr; // 2 physical px

    ctx.beginPath();
    ctx.moveTo(cx + o, 0);
    ctx.lineTo(cx + o, height);
    ctx.moveTo(0, cy + o);
    ctx.lineTo(width, cy + o);
    ctx.stroke();
}
