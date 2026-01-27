import { Ref } from "vue";
import { Point } from "./DesmosUtilities";

type Lock = { current: string };

function safeSync(
    graph: Desmos.Calculator,
    lock: Lock,
    A: Ref<Point>,
    B: Ref<Point>,
) {
    const sensorA = graph.HelperExpression({ latex: A.value.LatexName });

    sensorA.observe("listValue", () => {
        // Ignore if the other side is currently writing
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
    A: Ref<Point>,
    B: Ref<Point>,
) {
    const lock: Lock = { current: "" };

    safeSync(graph, lock, A, B);
    safeSync(graph, lock, B, A);
}
