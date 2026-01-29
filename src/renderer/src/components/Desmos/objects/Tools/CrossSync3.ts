import type { Ref } from "vue";
import { DesPoint } from "../graphables/Points";

export function crossSync3(
    graph: Desmos.Calculator,
    P: Ref<DesPoint>,
    Q: Ref<DesPoint>,
) {
    const senseP = graph.HelperExpression({ latex: P.value.VariableName });
    const senseQ = graph.HelperExpression({ latex: Q.value.VariableName });

    let scheduled = false;
    let pendingSrc: "P" | "Q" | null = null;
    let pendingCoordinates: number[] | null = null;

    // id of the point we're currently writing (so we can ignore its sensor echo)
    let lockId = "";

    const flush = () => {
        if (scheduled) return;
        scheduled = true;

        // requestAnimationFrame(() => {
        scheduled = false;
        if (!pendingSrc || !pendingCoordinates) return;

        const src = pendingSrc;
        const pair = pendingCoordinates;
        pendingSrc = null;
        pendingCoordinates = null;

        const x = pair[0];
        const y = pair[1];

        if (src === "P") {
            P.value.setFromArray(pair);
            lockId = Q.value.id;
            graph.setExpression({
                id: Q.value.id,
                type: "expression",
                latex: `${Q.value.VariableName}=(${x},${-y})`,
            });
            lockId = "";
        } else {
            Q.value.setFromArray(pair);
            lockId = P.value.id;
            graph.setExpression({
                id: P.value.id,
                type: "expression",
                latex: `${P.value.VariableName}=(${x},${-y})`,
            });
            lockId = "";
        }
        // });
    };

    senseP.observe("listValue", () => {
        if (lockId === P.value.id) return;
        pendingSrc = "P";
        pendingCoordinates = senseP.listValue as number[];
        flush();
    });

    senseQ.observe("listValue", () => {
        if (lockId === Q.value.id) return;
        pendingSrc = "Q";
        pendingCoordinates = senseQ.listValue as number[];
        flush();
    });
}
