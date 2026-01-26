<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import DesmosCanvas from "./DesmosCanvas.vue";
import { myGraphCongif, myGraphSettings } from "./host/graphSettings";
import { bindExprToRef, bindRefToExpr } from "./DesmosUtilities";
import { exp } from "mathjs";

// const graphA = ref<InstanceType<typeof DesmosCanvas> | null>(null);
// const graphB = ref<InstanceType<typeof DesmosCanvas> | null>(null);
const graphC = ref<InstanceType<typeof DesmosCanvas> | null>(null);

type Point = { x: number; y: number };

// // 👇 this is the live-updating array you want
// const points = ref<Point[]>([]);
const X = ref<number>(0);
const Y = ref<number>(0);
const Z = ref<number>(0);

function doThing() {
    const c = graphC.value?.getCalculator();
    if (!c) return;

    c.setExpressions([
        { id: "X", type: "expression", latex: "X = -3" },
        { id: "Y", type: "expression", latex: "Y = -3" },

        {
            id: "P",
            type: "expression",
            latex: "P = (X, Y)",
        },
        {
            id: "Z",
            type: "expression",
            latex: "Z=0",
        },
    ]);

    bindRefToExpr(c, "X", X);
    bindRefToExpr(c, "Y", Y);
    bindExprToRef(c, "Z", Y);
}
</script>

<template>
    <main class="page">
        <div>({{ X }}, {{ Y }}) Z = {{ Z }}</div>
        <button @click="doThing">Press Me</button>

        <!-- <div class="upperRow">
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
        </div> -->
        <div class="fillRow">
            <DesmosCanvas
                ref="graphC"
                :config="myGraphCongif"
                :settings="myGraphSettings"
                @DesmosLoaded="doThing"
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
