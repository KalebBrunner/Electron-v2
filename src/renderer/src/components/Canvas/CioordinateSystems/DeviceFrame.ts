import { CanvasEngine } from "../Objects/CanvasEngine";
import { CTXMatrix, CTXVector, Screenpx } from "./PixelUnits";

export class DeviceFrame {
    constructor(readonly engine: CanvasEngine) {}

    draw(x: Screenpx, y: Screenpx, width: Screenpx, height: Screenpx) {
        const dpr = this.engine.css.dpr;

        const xVector = new CTXVector(dpr, 0);
        const yVector = new CTXVector(0, dpr);
        const cssMatrix = new CTXMatrix(xVector, yVector);

        this.engine.ctx.setTransform(cssMatrix.asTransform());
        this.engine.ctx.fillStyle = "#21a10aff";
        this.engine.ctx.fillRect(x, y, width, height);
    }
}
