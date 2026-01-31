export {};
declare global {
    declare namespace Desmos {
        interface BasicCalculator extends Pick<
            Calculator,
            | "getState"
            | "setState"
            | "setBlank"
            | "undo"
            | "redo"
            | "clearHistory"
            | "resize"
            | "focusFirstExpression"
            | "observeEvent"
            | "unobserveEvent"
            | "destroy"
        > {
            updateSettings(
                settings:
                    | Parameters<typeof FourFunctionCalculator>[1]
                    | Parameters<typeof ScientificCalculator>[1],
            ): void;
        }
    }
}
