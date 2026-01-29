import { Ref } from "vue";
import { DesPoint } from "./DesObjects";

type Lock = { current: string };

function BindAtoB(
    graph: Desmos.Calculator,
    lock: Lock,
    A: Ref<DesPoint>,
    B: Ref<DesPoint>,
) {
    const sensorA = graph.HelperExpression({ latex: A.value.VariableName });

    sensorA.observe("listValue", () => {
        if (lock.current == B.value.id) return;
        A.value.setFromArray(sensorA.listValue);

        lock.current = A.value.id;
        try {
            graph.setExpression({
                id: B.value.id,
                type: "expression",
                latex: `${B.value.VariableName} = (${A.value.x}, ${-A.value.y})`,
            });
        } finally {
            lock.current = "";
        }
    });
}

export function crossSync(
    graph: Desmos.Calculator,
    P: Ref<DesPoint>,
    Q: Ref<DesPoint>,
) {
    const lock: Lock = { current: "" };

    BindAtoB(graph, lock, P, Q);
    BindAtoB(graph, lock, Q, P);
}
