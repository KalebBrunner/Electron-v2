import { Ref } from "vue";
import { DesPoint } from "./DesObjects";

type Lock = { current: string };

function BindLeadertoGhost(
    graph: Desmos.Calculator,
    lock: Lock,
    leader: Ref<DesPoint>,
    ghost: Ref<DesPoint>,
) {
    const SenseLeader = graph.HelperExpression({
        latex: leader.value.VariableName,
    });

    SenseLeader.observe("listValue", () => {
        if (lock.current == ghost.value.id) return;

        lock.current = leader.value.id;
        try {
            leader.value.setFromArray(SenseLeader.listValue);
            graph.setExpression({
                id: ghost.value.id,
                type: "expression",
                latex: `${ghost.value.VariableName} = (${leader.value.x}, ${-leader.value.y})`,
            });
        } finally {
            // requestAnimationFrame(() => {
            lock.current = "";
            // });
        }
    });
}

export function crossSync(
    graph: Desmos.Calculator,
    P: Ref<DesPoint>,
    Q: Ref<DesPoint>,
) {
    const lock: Lock = { current: "" };
    BindLeadertoGhost(graph, lock, Q, P);
    BindLeadertoGhost(graph, lock, P, Q);
}
