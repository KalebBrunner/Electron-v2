<script setup lang="ts">
import DesmosCanvas from "./DesmosCanvas.vue";
import { myGraphCongif, myGraphSettings } from "./host/graphSettings";
import { ref } from "vue";
import { Point } from "./DesmosUtilities";
// import { Point } from "./DesmosUtilities";

const graphG = ref<InstanceType<typeof DesmosCanvas> | null>(null);

const PointA = ref(new Point("1", "P", 1, 2));
const PointB = ref(new Point("2", "Q", 1, 9));
const PointC = ref(new Point("3", "C", 1, 9));

function onLoad() {
    const g = graphG.value?.getCalculator();
    if (!g) return;
    graphG.value?.createPoint(PointC);

    graphG.value?.createConjugatePoints(PointA, PointB);
}
</script>

<template>
    <main class="page">
        <div>{{ PointA.valueExpression }}{{ PointB.valueExpression }}</div>
        <!-- <div>{{ P }} {{ Q }}</div> -->
        <button @click="onLoad">Press Me</button>
        <div class="fillRow">
            <DesmosCanvas
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
    height: 350px;
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
