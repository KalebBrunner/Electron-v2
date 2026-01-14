export type DesmosCalculator = { destroy(): void };

export type DesmosGlobal = {
    GraphingCalculator(
        element: HTMLElement,
        options?: Record<string, unknown>,
    ): DesmosCalculator;
};

declare global {
    interface Window {
        Desmos?: DesmosGlobal;
    }
}

export function getDesmos(): DesmosGlobal {
    const d = window.Desmos;
    if (!d) throw new Error("Desmos not loaded (window.Desmos missing).");
    return d;
}

export function createCalculator(
    element: HTMLElement,
    options?: Record<string, unknown>,
): DesmosCalculator {
    return getDesmos().GraphingCalculator(element, options);
}
