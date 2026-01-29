<script setup lang="ts">
import { DesFunction, DesPoint } from "./objects/DesObjects";
import Graph from "./onload/Graph.vue";
import { myGraphCongif, myGraphSettings } from "./onload/GraphDefaults";
import { ref } from "vue";

const graphG = ref<InstanceType<typeof Graph> | null>(null);

const PointA = ref(new DesPoint("A", -3, 2));
const PointP = ref(new DesPoint("P", 1, 1));
const PointQ = ref(new DesPoint("Q", 4, -4));
const func = ref(new DesFunction("f(x)", "3x^{2.2}-5\\cdot\\sin(80x)"));

function onLoad() {
    if (!graphG.value) return;
    const g = graphG.value.getCalculator();
    if (!g) return;
    g.BindConjugatePoints(PointP, PointQ);
    g.setDesNote(func.value.toDesNote);
}

const click = ref(true);
function onClick() {
    click.value = !click.value;
}
</script>

<template>
    <main class="page">
        <div>{{ click }}{{ PointA.Expression }}{{ PointP.Expression }}</div>
        <!-- <div>{{ P }} {{ Q }}</div> -->
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
    padding: 20px;
    box-sizing: border-box;
    min-height: 0;
}

.upperRow {
    display: flex;
    gap: 20px;
    padding: 12px;
    height: 200px;
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
