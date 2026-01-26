import { computed, Ref, watch } from "vue";

export function bindRefToExpr(
    graph: Desmos.Calculator,
    expression: string,
    variable: Ref<number>,
): void;

export function bindRefToExpr(
    graph: Desmos.Calculator,
    expression: string,
    variable: Ref<number[]>,
): void;

export function bindRefToExpr(
    graph: Desmos.Calculator,
    expression: string,
    variable: Ref<number | number[]>,
) {
    const h = graph.HelperExpression({ latex: expression });

    // if the ref starts as an array -> bind listValue, otherwise numericValue
    if (Array.isArray(variable.value)) {
        h.observe("listValue", () => {
            variable.value = h.listValue ?? [];
        });
    } else {
        h.observe("numericValue", () => {
            variable.value = h.numericValue;
        });
    }
}

export function bindExprToRef(
    graph: Desmos.Calculator,
    expression: string,
    v: Ref<number>,
): void;

export function bindExprToRef(
    graph: Desmos.Calculator,
    expression: string,
    v: Ref<number[]>,
): void;

export function bindExprToRef(
    graph: Desmos.Calculator,
    expression: string,
    v: Ref<number | number[]>,
) {
    watch(
        v,
        (val) => {
            const latex = Array.isArray(val)
                ? `${expression}=[${val.join(",")}]`
                : `${expression}=${val}`;

            graph.setExpression({ id: expression, latex });
        },
        { immediate: true, deep: true },
    );
}

export type Point = { x: number; y: number };

export function ListsToPoints(X: Ref<number[]>, Y: Ref<number[]>) {
    return computed<Point[]>(() => {
        const n = Math.min(X.value.length, Y.value.length);
        return Array.from({ length: n }, (_, i) => ({
            x: X.value[i],
            y: Y.value[i],
        }));
    });
}
