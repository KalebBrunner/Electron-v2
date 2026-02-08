declare const CSSpxBrand: unique symbol;
export type CSSpx = number & { readonly [CSSpxBrand]: "CSSpx" };

declare const VikingpxBrand: unique symbol;
export type Vikingpx = number & { readonly [VikingpxBrand]: "Vikingpx" };

declare const ScreenpxBrand: unique symbol;
export type Screenpx = number & {
    readonly [ScreenpxBrand]: "ScreenpxBrand";
};

export class CTXVector {
    constructor(
        public i: number, // x component
        public j: number, // y component
    ) {}
}

export class CTXMatrix {
    constructor(
        public U: CTXVector,
        public V: CTXVector,
        public vxOffset: number = 0,
        public vyOffset: number = 0,
    ) {}

    asTransform(): DOMMatrix2DInit {
        return {
            a: this.U.i,
            b: this.U.j,
            c: this.V.i,
            d: this.V.j,
            e: this.vxOffset,
            f: this.vyOffset,
        };
    }

    applyTo(ctx: CanvasRenderingContext2D) {
        ctx.setTransform(
            this.U.i,
            this.U.j,
            this.V.i,
            this.V.j,
            this.vxOffset,
            this.vyOffset,
        );
    }
}
