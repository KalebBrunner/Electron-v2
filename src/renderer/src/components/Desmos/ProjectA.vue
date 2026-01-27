<script setup lang="ts">
import DesmosCanvas from "./DesmosCanvas.vue";
import { myGraphCongif, myGraphSettings } from "./host/graphSettings";
import { crossSync } from "./crossSync";
import { ref } from "vue";

const graphG = ref<InstanceType<typeof DesmosCanvas> | null>(null);

const P = ref<number[]>([0, 0]);
const Q = ref<number[]>([0, 0]);
const Z = ref<number>(0);

function onLoad() {
    const g = graphG.value?.getCalculator();
    if (!g) return;

    g.setExpressions([
        {
            id: "P",
            type: "expression",
            latex: "P=(1, 2)",
        },
        {
            id: "Q",
            type: "expression",
            latex: "Q=(1, -2)",
        },
    ]);

    crossSync(g, "P", P, "Q", Q);
}
</script>

<template>
    <main class="page">
        <div>{{ P }} {{ Q }}</div>
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
