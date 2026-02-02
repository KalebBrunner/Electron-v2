export class CTXEngine {
    private rect!: DOMRect;
    #dpr = 1;

    // CSS pixel size
    #cssW = 1;
    #cssH = 1;

    get devicePixelRatio() {
        return this.#dpr;
    }
    get cssWidth() {
        return this.#cssW;
    }
    get cssHeight() {
        return this.#cssH;
    }

    constructor(
        public canvas: HTMLCanvasElement,
        public ctx: CanvasRenderingContext2D,
    ) {
        this.resizeCanvas();
    }

    resizeCanvas() {
        // 1) update metrics
        this.rect = this.canvas.getBoundingClientRect();
        this.#dpr = Math.max(1, window.devicePixelRatio || 1);

        // use integers for stability
        this.#cssW = Math.max(1, Math.floor(this.rect.width));
        this.#cssH = Math.max(1, Math.floor(this.rect.height));

        const pixelW = Math.max(1, Math.round(this.#cssW * this.#dpr));
        const pixelH = Math.max(1, Math.round(this.#cssH * this.#dpr));

        // 2) set backing store size (critical)
        if (this.canvas.width !== pixelW) this.canvas.width = pixelW;
        if (this.canvas.height !== pixelH) this.canvas.height = pixelH;

        // 3) clear in device pixels with identity transform
        this.ctx.setTransform(this.#dpr, 0, 0, this.#dpr, 0, 0);
        this.ctx.clearRect(0, 0, pixelW, pixelH);

        // 4) draw in CSS pixels
        this.ctx.setTransform(this.#dpr, 0, 0, this.#dpr, 0, 0);

        this.ResizeActions.forEach((act) => {
            act(this);
        });
    }

    ResizeActions: Function[] = [];

    onResize(f: (ctx: CTXEngine) => void | ((ctx: CTXEngine) => void)[]) {
        if (Array.isArray(f)) {
            this.ResizeActions.push(...f);
        } else {
            this.ResizeActions.push(f);
        }
    }
}
