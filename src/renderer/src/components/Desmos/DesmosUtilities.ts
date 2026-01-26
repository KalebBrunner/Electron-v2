import { Ref, watch } from "vue";

export function bindRefToExpr(
    graph: Desmos.Calculator,
    expression: string,
    variable: Ref<number>,
) {
    const hx = graph.HelperExpression({ latex: expression });
    hx.observe("numericValue", () => {
        variable.value = hx.numericValue;
        // console.log(variable.value);
    });
}

export function bindExprToRef(
    graph: Desmos.Calculator,
    expression: string,
    variable: Ref<number>,
) {
    watch(variable, () => {
        console.log("seatch set" + variable.value);
        graph.setExpression({
            id: expression,
            latex: `${expression}=${variable.value}`,
        });
    });
}
