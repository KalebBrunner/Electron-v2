import { CanvasEngine } from "./CanvasEngine";
import { CSSpx } from "./PixelUnits";

export class CSSFrame {
    readonly #canvas: HTMLCanvasElement;
    readonly #ctx: CanvasRenderingContext2D;

    constructor(readonly engine: CanvasEngine) {
        this.#canvas = engine.canvas;
        this.#ctx = engine.ctx;
    }

    get dpr() {
        return Math.max(1, window.devicePixelRatio || 1);
    }
    get rect() {
        return this.#canvas.getBoundingClientRect();
    }
    get width() {
        return Math.max(1, Math.floor(this.rect.width));
    }
    get height() {
        return Math.max(1, Math.floor(this.rect.height));
    }
    get size() {
        return { width: this.width, height: this.height };
    }

    resizeCSS() {
        // 1) update metrics
        const dpr = this.dpr;
        const cssW = this.width;
        const cssH = this.height;

        const pixelW = Math.max(1, Math.round(cssW * dpr));
        const pixelH = Math.max(1, Math.round(cssH * dpr));

        // 2) set backing store size
        if (this.#canvas.width !== pixelW) this.#canvas.width = pixelW;
        if (this.#canvas.height !== pixelH) this.#canvas.height = pixelH;

        // 3) clear in device pixels with identity transform
        this.#ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.#ctx.clearRect(0, 0, pixelW, pixelH);

        // 4) draw in CSS pixels (map CSS -> device)
        this.#ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    draw(x: CSSpx, y: CSSpx, width: CSSpx, height: CSSpx) {
        const dpr = this.engine.css.dpr;
        this.engine.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.engine.ctx.fillStyle = "#ff6a00ff";
        this.engine.ctx.fillRect(
            x as number,
            y as number,
            width as number,
            height as number,
        );
    }
}
