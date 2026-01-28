<script setup lang="ts">
import Graph from "./onload/Graph.vue";
import { myGraphCongif, myGraphSettings } from "./onload/GraphDefaults";
import { ref } from "vue";
import { Expression } from "./objects/Expression";

const graphG = ref<InstanceType<typeof Graph> | null>(null);

const PointA = ref(new Expression("1", "P", 1, 2));
const PointB = ref(new Expression("2", "Q", 1, 9));
const PointC = ref(new Expression("3", "C", 1, 9));
const click = ref(true);

function onClick() {
    click.value = !click.value;
}

function onLoad() {
    const g = graphG.value?.getCalculator();
    if (!g) return;
    graphG.value?.createPoint(PointC);
    graphG.value?.createConjugatePoints(PointA, PointB);
}
</script>

<template>
    <main class="page">
        <div>
            {{ click }}{{ PointA.valueExpression }}{{ PointB.valueExpression }}
        </div>
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
