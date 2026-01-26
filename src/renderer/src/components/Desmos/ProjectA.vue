<script setup lang="ts">
import { ref } from "vue";
import DesmosCanvas from "./DesmosCanvas.vue";
import { myGraphCongif, myGraphSettings } from "./host/graphSettings";

const graphA = ref<InstanceType<typeof DesmosCanvas> | null>(null);
const graphB = ref<InstanceType<typeof DesmosCanvas> | null>(null);
const graphC = ref<InstanceType<typeof DesmosCanvas> | null>(null);

function doThing() {
    graphA.value?.setExpression({ id: "fxx", latex: "f(x)=xx" });
    graphB.value?.setExpression({ id: "fxx", latex: "f(x)=xxx" });
    graphC.value?.setExpression({ id: "fxx", latex: "\\frac{x}{4}\\cos(20x)" });
}
</script>

<template>
    <main class="page">
        <button @click="doThing">Press Me</button>

        <div class="upperRow">
            <DesmosCanvas
                class="square"
                ref="graphA"
                :config="myGraphCongif"
                :settings="myGraphSettings"
            />
            <DesmosCanvas
                class="fill"
                ref="graphB"
                :config="myGraphCongif"
                :settings="myGraphSettings"
            />
        </div>
        <div class="fillRow">
            <DesmosCanvas
                ref="graphC"
                :config="myGraphCongif"
                :settings="myGraphSettings"
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
