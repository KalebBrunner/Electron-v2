declare const CSSpxBrand: unique symbol;
export type CSSpx = number & { readonly [CSSpxBrand]: "CSSpx" };

declare const VikingpxBrand: unique symbol;
export type Vikingpx = number & { readonly [VikingpxBrand]: "Vikingpx" };

declare const ScreenpxBrand: unique symbol;
export type Screenpx = number & {
    readonly [ScreenpxBrand]: "ScreenpxBrand";
};
