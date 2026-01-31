export {};

declare global {
    declare namespace Desmos {
        interface Calculator {
            asyncScreenshot(
                opts: Parameters<Calculator["screenshot"]>[0] & {
                    format?: "png" | "svg";
                    mode?: "contain" | "stretch" | "preserveX" | "preserveY";
                    mathBounds?: Parameters<Calculator["setMathBounds"]>[0];
                    showLabels?: boolean;
                },
                callback: (dataUri: string) => void,
            ): void;
            asyncScreenshot(callback: (dataUri: string) => void): void;
            clearHistory(): void;
            destroy(): void;
            focusFirstExpression(): void;
            getExpressions(): ExpressionState[];
            getState(): GraphState;
            isProjectionUniform(): boolean;
            mathToPixels<
                C extends
                    | {
                          x: number;
                      }
                    | {
                          y: number;
                      }
                    | {
                          x: number;
                          y: number;
                      },
            >(
                coords: C,
            ): C;
            newRandomSeed(): void;
            observe(eventName: string, callback: () => void): void;
            observeEvent(eventName: string, callback: () => void): void;
            pixelsToMath<
                C extends
                    | {
                          x: number;
                      }
                    | {
                          y: number;
                      }
                    | {
                          x: number;
                          y: number;
                      },
            >(
                coords: C,
            ): C;
            redo(): void;
            removeExpression(expression_state: { id: string }): void;
            removeExpressions(
                expression_states: ReadonlyArray<{
                    id: string;
                }>,
            ): void;
            removeSelected(): string;
            resize(): void;
            screenshot(opts?: {
                width?: number;
                height?: number;
                targetPixelRatio?: number;
                preserveAxisNumbers?: boolean;
            }): string;
            setBlank(options?: { allowUndo?: boolean }): void;
            setDefaultState(obj: GraphState): void;
            setExpression(expression: ExpressionState): void;
            setExpressions(expressions: readonly ExpressionState[]): void;
            setMathBounds(bounds: {
                left?: number;
                right?: number;
                bottom?: number;
                top?: number;
            }): void;
            setState(
                obj: GraphState,
                options?: {
                    allowUndo?: boolean;
                    remapColors?: boolean;
                },
            ): void;
            undo(): void;
            unobserve(eventName: string): void;
            unobserveEvent(eventName: string): void;
            updateSettings(settings: GraphConfiguration & GraphSettings): void;
            HelperExpression(expression: ExpressionState): {
                listValue: number[];
                numericValue: number;
                observe(
                    eventName: "numericValue" | "listValue" | string,
                    callback: () => void,
                ): void;
            };
            colors: {
                [key: string]: string;
            };
            expressionAnalysis: {
                [id: string]: {
                    isGraphable: boolean;
                    isError: boolean;
                    errorMessage?: string;
                    evaluationDisplayed?: boolean;
                    evaluation?:
                        | {
                              type: "Number";
                              value: number;
                          }
                        | {
                              type: "ListOfNumber";
                              value: readonly number[];
                          };
                };
            };
            graphpaperBounds: {
                mathCoordinates: {
                    top: number;
                    bottom: number;
                    left: number;
                    right: number;
                    width: number;
                    height: number;
                };
                pixelCoordinates: {
                    top: number;
                    bottom: number;
                    left: number;
                    right: number;
                    width: number;
                    height: number;
                };
            };
            isAnyExpressionSelected: boolean;
            selectedExpressionId: string;
            settings: GraphConfiguration &
                GraphSettings & {
                    observe(
                        eventName:
                            | keyof GraphConfiguration
                            | keyof GraphSettings
                            | string,
                        callback: () => void,
                    ): void;
                    unobserve(
                        eventName:
                            | keyof GraphConfiguration
                            | keyof GraphSettings
                            | string,
                    ): void;
                };
            supportedLanguages: string[];
        }
    }
}
