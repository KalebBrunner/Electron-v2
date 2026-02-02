import type { CanvasEngine } from "../Objects/CanvasEngine";

function niceStep(raw: number) {
    // raw is in "Vik units per line"
    if (!isFinite(raw) || raw <= 0) return 1;

    const pow10 = Math.pow(10, Math.floor(Math.log10(raw)));
    const n = raw / pow10;

    if (n <= 1) return 1 * pow10;
    if (n <= 2) return 2 * pow10;
    if (n <= 5) return 5 * pow10;
    return 10 * pow10;
}

export function drawGrid(engine: CanvasEngine) {
    const ctx = engine.ctx;
    const dpr = engine.css.dpr;
    const { width: cssW, height: cssH } = engine.css.size;

    // ----- 1) Background in CSS pixels -----
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS px
    ctx.fillStyle = "#0b1020";
    ctx.fillRect(0, 0, cssW, cssH);

    // ----- 2) Switch to Viking coords (Vik -> device) -----
    // xscale/yscale are CSSpx per Vikpx; include DPR to map to device px.
    const xscale = engine.coord.xscale;
    const yscale = engine.coord.yscale;

    const originCssX = cssW / 2;
    const originCssY = cssH / 2;

    ctx.setTransform(
        dpr * xscale,
        0,
        0,
        dpr * yscale,
        dpr * originCssX,
        dpr * originCssY,
    );

    // Visible bounds in Vik units
    const left = -originCssX / xscale;
    const right = originCssX / xscale;
    const top = -originCssY / yscale;
    const bottom = originCssY / yscale;

    // ----- 3) Pick a Viking grid step that "looks like" ~25 CSS px -----
    const targetCssSpacing = 25;
    const minorStep = niceStep(targetCssSpacing / xscale);
    const majorStep = minorStep * 5;

    // Crisp 1-device-pixel lines (in Vik units)
    const lineW = 1 / (dpr * Math.max(xscale, yscale));
    const ox = 0.5 / (dpr * xscale);
    const oy = 0.5 / (dpr * yscale);

    const x0Minor = Math.floor(left / minorStep) * minorStep;
    const y0Minor = Math.floor(top / minorStep) * minorStep;
    const x0Major = Math.floor(left / majorStep) * majorStep;
    const y0Major = Math.floor(top / majorStep) * majorStep;

    // ----- 4) Minor grid -----
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = lineW;

    ctx.beginPath();
    for (let x = x0Minor; x <= right; x += minorStep) {
        ctx.moveTo(x + ox, top);
        ctx.lineTo(x + ox, bottom);
    }
    for (let y = y0Minor; y <= bottom; y += minorStep) {
        ctx.moveTo(left, y + oy);
        ctx.lineTo(right, y + oy);
    }
    ctx.stroke();

    // ----- 5) Major grid -----
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = lineW;

    ctx.beginPath();
    for (let x = x0Major; x <= right; x += majorStep) {
        ctx.moveTo(x + ox, top);
        ctx.lineTo(x + ox, bottom);
    }
    for (let y = y0Major; y <= bottom; y += majorStep) {
        ctx.moveTo(left, y + oy);
        ctx.lineTo(right, y + oy);
    }
    ctx.stroke();

    // ----- 6) Axes -----
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 2 * lineW;

    ctx.beginPath();
    ctx.moveTo(0 + ox, top);
    ctx.lineTo(0 + ox, bottom);
    ctx.moveTo(left, 0 + oy);
    ctx.lineTo(right, 0 + oy);
    ctx.stroke();

    ctx.restore();
}
