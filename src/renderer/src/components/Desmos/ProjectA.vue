<script setup lang="ts">
import Graph from "./objects/Graph.vue";
import { myGraphCongif, myGraphSettings } from "./objects/DefaultConfig";
import { ref } from "vue";
import { QuickFunction } from "./objects/graphables/Functions";
import { DesPoint } from "./objects/graphables/Points";
// import { DesPointStyleObj } from "./objects/graphables/PointStyles";
// import { DesFunction } from "./objects/graphables/Functions";

const graphG = ref<InstanceType<typeof Graph> | null>(null);
// var isMounted = ref(false);
const PointA = ref(new DesPoint("A", -3.1214, 2.4512));
// const PointB = ref(
//     new DesPoint("B", 1, 1.125, { color: "#2fb56bff" } as DesPointStyleObj),
// );

const PointP = ref(new DesPoint("P", 1, 1.125));
const funcF = ref(new QuickFunction("f(x)", "3x^{2.2}-5\\cdot\\sin(80x)"));
function onLoad() {
    console.log("Loading Project A");
    if (!graphG.value) return console.log("GraphG failed to populate");
    const g = graphG.value.getCalculator();

    if (!g) {
        return console.log("graph failed to load");
    } else {
        console.log("graph loaded");
    }
    // g.setNote(funcF.value.toDesNote());
    // g.setNote(PointP.value.toDesNote());
    console.log("attempting to set expression");
    // g.setExpression({ id: "m", latex: "m=2" });

    g.BindGridPoint(PointA);
    g.BindPoint(PointP);
    // g.BindPoint(PointB);
    // console.log(g.calc.getExpressions());
    // isMounted.value = true;
}

// const Npoles: number = 3;
// const Poles = ref<DesPoint[]>(null!);
// const NRoots: number = 2;
// const Roots = ref<DesPoint[]>(null!);

const click = ref(true);
function onClick() {
    click.value = !click.value;
}
</script>

<template>
    <main class="page">
        <button @click="onClick">Press Me</button>
        <div class="fillRow">
            <Graph
                ref="graphG"
                :config="myGraphCongif"
                :settings="myGraphSettings"
                @DesmosLoaded="onLoad"
            />
        </div>
    </main>
</template>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 80px;
    box-sizing: border-box;
    min-height: 0;
}

.upperRow {
    display: flex;
    gap: 80px;
    padding: 12px;
    height: 800px;
    min-height: 0;
}

.upperRow .square {
    height: 100%;
    aspect-ratio: 1 / 1;
    flex: 0 0 auto;
}

.upperRow .fill {
    flex: 1 1 0;
    min-width: 0;
}

.fillRow {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
}
</style>
