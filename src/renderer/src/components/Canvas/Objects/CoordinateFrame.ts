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
    xscale = 1;
    yscale = 1;

    scale() {
        return [this.xscale, this.yscale];
    }

    constructor(readonly engine: CanvasEngine) {
        const initialWidth = 20;
        this.xscale = engine.css.width / initialWidth;
        this.yscale = this.xscale;
    }

    draw(x: Vikingpx, y: Vikingpx, width: Vikingpx, height: Vikingpx) {
        const dpr = this.engine.css.dpr;
        console.log(`dpr is ${dpr}`);
        console.log(`xscale = ${this.xscale}, yscale = ${this.yscale}`);
        this.engine.ctx.setTransform(
            this.xscale,
            0,
            0,
            this.yscale,
            this.xscale * 10,
            this.yscale * 10,
        );

        this.engine.ctx.fillStyle = "#21a10aff";
        this.engine.ctx.fillRect(x, y, width, height);
    }
}
