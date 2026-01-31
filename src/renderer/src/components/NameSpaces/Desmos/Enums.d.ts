export {};
declare global {
    declare namespace Desmos {
        const enabledFeatures: {
            Calculator3D: boolean;
            GeometryCalculator: boolean;
            GraphingCalculator: boolean;
            FourFunctionCalculator: boolean;
            ScientificCalculator: boolean;
        };
        const supportedLanguages: string[];
        const AxisArrowModes: {
            NONE: "NONE";
            POSITIVE: "POSITIVE";
            BOTH: "BOTH";
        };
        const Colors: {
            RED: "#c74440";
            BLUE: "#2d70b3";
            GREEN: "#388c46";
            PURPLE: "#6042a6";
            ORANGE: "#fa7e19";
            BLACK: "#000000";
        };
        const DragModes: {
            X: "X";
            Y: "Y";
            XY: "XY";
            NONE: "NONE";
            AUTO: "AUTO";
        };
        const FontSizes: {
            VERY_SMALL: 9;
            SMALL: 12;
            MEDIUM: 16;
            LARGE: 20;
            VERY_LARGE: 24;
        };
        const LabelOrientations: {
            ABOVE: "ABOVE";
            BELOW: "BELOW";
            LEFT: "LEFT";
            RIGHT: "RIGHT";
            DEFAULT: "DEFAULT";
        };
        const LabelSizes: {
            SMALL: "SMALL";
            MEDIUM: "MEDIUM";
            LARGE: "LARGE";
        };
        const Styles: {
            POINT: "POINT";
            OPEN: "OPEN";
            CROSS: "CROSS";
            SOLID: "SOLID";
            DASHED: "DASHED";
            DOTTED: "DOTTED";
        };
    }
}
