import { Ref } from "vue";
import { Expression } from "./Expression";

type Lock = { current: string };

function safeSync(
    graph: Desmos.Calculator,
    lock: Lock,
    A: Ref<Expression>,
    B: Ref<Expression>,
) {
    const sensorA = graph.HelperExpression({ latex: A.value.LatexName });

    sensorA.observe("listValue", () => {
        if (lock.current == B.value.id) return;
        A.value.setFromListValue(sensorA.listValue);

        lock.current = A.value.id;
        try {
            graph.setExpression({
                id: B.value.id,
                type: "expression",
                latex: B.value.equationAsConjugateOf(A.value),
            });
        } finally {
            lock.current = "";
        }
    });
}

export function crossSync(
    graph: Desmos.Calculator,
    A: Ref<Expression>,
    B: Ref<Expression>,
) {
    const lock: Lock = { current: "" };

    safeSync(graph, lock, A, B);
    safeSync(graph, lock, B, A);
}
