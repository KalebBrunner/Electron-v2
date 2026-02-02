import { CanvasEngine } from "./CanvasEngine";
import { Vikingpx } from "./PixelUnits";

export class rect {
    constructor(
        public left: number,
        public right: number,
        public top: number,
        public bottom: number,
    ) {}

    height() {
        this.top - this.bottom;
    }
    width() {}
}

export class CoordinateFrame {
    rect: rect;
    scale;

    constructor(readonly engine: CanvasEngine) {
        const initialWidth = 10;
        this.scale = initialWidth / engine.css.width;
        this.rect = new rect(
            -initialWidth / 2,
            +initialWidth / 2,
            (+this.scale * engine.css.height) / 2,
            (-this.scale * engine.css.height) / 2,
        );
    }

    draw(x: Vikingpx, y: Vikingpx, width: Vikingpx, height: Vikingpx) {
        const dpr = this.engine.css.dpr;
        this.engine.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.engine.ctx.fillStyle = "#21a10aff";
        this.engine.ctx.fillRect(
            x as number,
            y as number,
            width as number,
            height as number,
        );
    }
}
