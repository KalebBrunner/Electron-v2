import { Ref } from "vue";

type Lock = { current: string };

function safeSync(
    graph: Desmos.Calculator,
    lock: Lock,
    latexA: string,
    A: Ref<number[]>,
    latexB: string,
) {
    const ha = graph.HelperExpression({ latex: latexA });

    ha.observe("listValue", () => {
        // Ignore if the other side is currently writing
        if (lock.current === latexB) return;
        A.value = [ha.listValue[0], ha.listValue[1]];
        lock.current = latexA;
        try {
            graph.setExpression({
                id: latexB,
                type: "expression",
                latex: `${latexB}=(${A.value[0]},${-A.value[1]})`,
            });
        } finally {
            lock.current = "";
        }
    });
}

export function crossSync(
    graph: Desmos.Calculator,
    latexA: string,
    A: Ref<number[]>,
    latexB: string,
    B: Ref<number[]>,
) {
    const lock: Lock = { current: "" };

    safeSync(graph, lock, latexA, A, latexB);
    safeSync(graph, lock, latexB, B, latexA);
}
