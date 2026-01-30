import { Ref } from "vue";
import { DesPoint } from "../graphables/Points";

type Lock = { id: string };

function BindLeadertoGhost(
    graph: Desmos.Calculator,
    permission: Lock,
    leader: Ref<DesPoint>,
    ghost: Ref<DesPoint>,
) {
    const SenseLeader = graph.HelperExpression(leader.value.helperExpression);
    // const SenseGhost = graph.HelperExpression({
    //     latex: leader.value.VariableName,
    // });

    SenseLeader.observe("listValue", () => {
        if (permission.id == ghost.value.id) return;
        permission.id = leader.value.id;

        var L = leader.value.coordinateArray;
        ghost.value.setFromArray([L[0], -L[1]]);
        graph.setExpression(ghost.value.toDesNote);
        requestAnimationFrame(() => {
            permission.id = "";
            graph.setExpression(leader.value.toDesNote);
        });
    });
}

export function crossSync(
    graph: Desmos.Calculator,
    P: Ref<DesPoint>,
    Q: Ref<DesPoint>,
) {
    const lock: Lock = { id: "" };
    BindLeadertoGhost(graph, lock, Q, P);
    BindLeadertoGhost(graph, lock, P, Q);
}
