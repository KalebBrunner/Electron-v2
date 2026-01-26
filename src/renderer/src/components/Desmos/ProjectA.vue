<script setup lang="ts">
import { ref } from "vue";
import DesmosCanvas from "./DesmosCanvas.vue";
import { myGraphCongif, myGraphSettings } from "./host/graphSettings";

// const graphA = ref<InstanceType<typeof DesmosCanvas> | null>(null);
// const graphB = ref<InstanceType<typeof DesmosCanvas> | null>(null);
const graphC = ref<InstanceType<typeof DesmosCanvas> | null>(null);

type Point = { x: number; y: number };

// 👇 this is the live-updating array you want
const points = ref<Point[]>([]);

let hx: any = null;
let hy: any = null;

function doThing() {
    const c = graphC.value?.getCalculator();
    if (!c) return;

    c.setExpression({
        id: "tbl",
        type: "table",
        columns: [
            { latex: "\\sigma_{Pneg}", values: ["1", "2", "3", "4", "5"] },
            {
                latex: "\\omega_{P}",
                values: ["1", "4", "9", "16", "25"],
                dragMode: "XY",
            },
        ],
    });

    // Clean up if doThing can run multiple times
    hx?.unobserve?.("listValue");
    hy?.unobserve?.("listValue");

    // Observe the table columns as lists
    hx = c.HelperExpression({ latex: "\\sigma_{Pneg}" });
    hy = c.HelperExpression({ latex: "\\omega_{P}" });

    const syncPoints = () => {
        const xs: number[] = hx.listValue ?? [];
        const ys: number[] = hy.listValue ?? [];

        points.value = xs.map((x, i) => ({
            x,
            y: ys[i] ?? NaN,
        }));
    };

    // Live update whenever a point is dragged
    hx.observe("listValue", syncPoints);
    hy.observe("listValue", syncPoints);

    // set initial value immediately
    syncPoints();
}
</script>

<template>
    <main class="page">
        <div>{{ points }}</div>
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
