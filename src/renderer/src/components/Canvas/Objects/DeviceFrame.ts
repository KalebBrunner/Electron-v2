import { CanvasEngine } from "./CanvasEngine";
import { Screenpx } from "./PixelUnits";

export class DeviceFrame {
    constructor(readonly engine: CanvasEngine) {}
    draw(x: Screenpx, y: Screenpx, width: Screenpx, height: Screenpx) {
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
