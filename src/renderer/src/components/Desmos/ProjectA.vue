<script setup lang="ts">
import { computed, Ref, ref, watch } from "vue";
import DesmosCanvas from "./DesmosCanvas.vue";
import { myGraphCongif, myGraphSettings } from "./host/graphSettings";
import { bindExprToRef, bindRefToExpr, ListsToPoints } from "./DesmosUtilities";

// const graphA = ref<InstanceType<typeof DesmosCanvas> | null>(null);
// const graphB = ref<InstanceType<typeof DesmosCanvas> | null>(null);
const graphC = ref<InstanceType<typeof DesmosCanvas> | null>(null);

// // 👇 this is the live-updating array you want
// const points = ref<Point[]>([]);
const sigma_1 = ref<number[]>([]);
const omega_1 = ref<number[]>([]);
const omega_2 = computed(() => omega_1.value.map((n) => -n));
const Z = ref<number>(0);
const points = ListsToPoints(sigma_1, omega_1);

function doThing() {
    const c = graphC.value?.getCalculator();
    if (!c) return;

    c.setExpressions([
        {
            type: "table",
            columns: [
                {
                    latex: "\\sigma_1",
                    values: ["1", "2"],
                },
                {
                    latex: "\\omega_1",
                    values: ["1", "4"],
                    dragMode: "XY",
                },
            ],
        },
        {
            type: "table",
            columns: [
                {
                    latex: "\\sigma_2",
                    values: ["1", "2"],
                },
                {
                    latex: "\\omega_2",
                    values: ["-1", "-4"],
                    dragMode: "XY",
                },
            ],
        },
    ]);

    bindRefToExpr(c, "\\sigma_1", sigma_1);
    bindRefToExpr(c, "\\omega_1", omega_1);

    bindExprToRef(c, "\\sigma_2", sigma_1);
    bindExprToRef(c, "\\omega_2", omega_2);
}
</script>

<template>
    <main class="page">
        <div>{{ points }} Z = {{ Z }}</div>
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
