import { CSSFrame } from "./CSSFrame";

type resizeFunction = (engine: CanvasEngine) => void;

export class CanvasEngine {
    readonly css: CSSFrame;

    constructor(
        readonly canvas: HTMLCanvasElement,
        readonly ctx: CanvasRenderingContext2D,
    ) {
        this.css = new CSSFrame(canvas, ctx);
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

    draw(x: number, y: number, width: number, height: number) {
        this.ctx.fillStyle = "#063ef7ff";
        this.ctx.fillRect(x, y, width, height);
    }
}
