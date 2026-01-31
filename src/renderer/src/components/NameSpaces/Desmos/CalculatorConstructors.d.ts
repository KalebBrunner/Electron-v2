export {};

declare global {
    declare namespace Desmos {
        function Calculator3D(
            element: HTMLElement,
            options?: GraphConfiguration & GraphSettings,
        ): Calculator;

        function GraphingCalculator(
            element: HTMLElement,
            options?: GraphConfiguration & GraphSettings,
        ): Calculator;

        function Geometry(
            element: HTMLElement,
            options?: GraphConfiguration & GraphSettings,
        ): Calculator;

        function ScientificCalculator(
            element: HTMLElement,
            options?: {
                links?: boolean;
                qwertyKeyboard?: boolean;
                degreeMode?: boolean;
                fontSize?: number;
                invertedColors?: boolean;
                settingsMenu?: boolean;
                language?: string;
                brailleMode?: "nemeth" | "ueb" | "none";
                sixKeyInput?: boolean;
                brailleExpressionDownload?: boolean;
                projectorMode?: boolean;
                decimalToFraction?: boolean;
                capExpressionSize?: boolean;
                functionDefinition?: boolean;
                autosize?: boolean;
            },
        ): BasicCalculator;

        function FourFunctionCalculator(
            element: HTMLElement,
            options?: {
                links?: boolean;
                additionalFunctions?:
                    | ("exponent" | "percent" | "fraction" | "sqrt")
                    | ReadonlyArray<
                          "exponent" | "percent" | "fraction" | "sqrt"
                      >;
                fontSize?: number;
                invertedColors?: boolean;
                settingsMenu?: boolean;
                language?: string;
                brailleMode?: "nemeth" | "ueb" | "none";
                sixKeyInput?: boolean;
                projectorMode?: boolean;
                decimalToFraction?: boolean;
                capExpressionSize?: boolean;
            },
        ): BasicCalculator;
    }
}
