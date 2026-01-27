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

// export type Point = { x: number; y: number };

// export function ListsToPoints(X: Ref<number[]>, Y: Ref<number[]>) {
//     return computed<Point[]>(() => {
//         const n = Math.min(X.value.length, Y.value.length);
//         return Array.from({ length: n }, (_, i) => ({
//             x: X.value[i],
//             y: Y.value[i],
//         }));
//     });
// }

export class Point {
    public constructor(
        public id: string, // e.g. "124214"
        public LatexName: string, // e.g. "P_point1"
        public x: number,
        public y: number,
    ) {}

    get valueExpression(): string {
        return `(${this.x},${this.y})`;
    }

    get latexEquation(): string {
        return `${this.LatexName}=${this.valueExpression}`;
    }

    toDesmosExpression() {
        return {
            id: this.id,
            type: "expression" as const,
            latex: this.latexEquation,
        };
    }

    setFromListValue(v: number[]) {
        if (!v || v.length < 2) return;
        this.x = v[0];
        this.y = v[1];
    }

    /** "(x,-y)" for *this* point */
    get conjugateValueExpression(): string {
        return `(${this.x},${-this.y})`;
    }

    /** "ThisLatexName = <expr>" */
    equationFrom(expr: string): string {
        return `${this.LatexName}=${expr}`;
    }

    /** "ThisLatexName = (other.x, -other.y)" */
    equationAsConjugateOf(other: Point): string {
        return this.equationFrom(other.conjugateValueExpression);
    }
}
