import { CoordinateFrame } from "../CioordinateSystems/CoordinateFrame";
import { CSSFrame } from "../CioordinateSystems/CSSFrame";
import {
    CTXMatrix,
    CTXVector,
    Screenpx,
} from "../CioordinateSystems/PixelUnits";

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

    onResize(f: resizeFunction) {
        if (Array.isArray(f)) {
            this.ResizeActions.push(...f);
        } else {
            this.ResizeActions.push(f);
        }
    }

    draw(x: Screenpx, y: Screenpx, width: Screenpx, height: Screenpx) {
        const xVector = new CTXVector(1, 0);
        const yVector = new CTXVector(0, 1);
        const ScreenMatrix = new CTXMatrix(xVector, yVector);
        ScreenMatrix.asTransform();

        this.ctx.setTransform();
        this.ctx.fillStyle = "#063ef7ff";
        this.ctx.fillRect(x, y, width, height);
    }
}
