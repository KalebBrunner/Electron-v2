import { CoordinateFrame } from "./CoordinateFrame";
import { CSSFrame } from "./CSSFrame";
import { Screenpx } from "./PixelUnits";

type resizeFunction = (engine: CanvasEngine) => void;

export class CanvasEngine {
    readonly css: CSSFrame;
    readonly coord: CoordinateFrame;

    constructor(
        readonly canvas: HTMLCanvasElement,
        readonly ctx: CanvasRenderingContext2D,
    ) {
        this.css = new CSSFrame(this);
        this.coord = new CoordinateFrame(this);
    }

    resize() {
        this.css.resizeCSS();
        this.ResizeActions.forEach((act) => {
            act(this);
        });
    }

    ResizeActions: resizeFunction[] = [];

    onResize(f: resizeFunction | resizeFunction[]) {
        if (Array.isArray(f)) {
            this.ResizeActions.push(...f);
        } else {
            this.ResizeActions.push(f);
        }
    }

    draw(x: Screenpx, y: Screenpx, width: Screenpx, height: Screenpx) {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = "#063ef7ff";
        this.ctx.fillRect(x, y, width, height);
    }
}
