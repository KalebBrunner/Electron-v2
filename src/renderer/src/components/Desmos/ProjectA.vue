<script setup lang="ts">
import { ref } from "vue";
import DesmosCanvas from "./DesmosCanvas.vue";
import { myGraphCongif, myGraphSettings } from "./host/graphSettings";

const graphA = ref<InstanceType<typeof DesmosCanvas> | null>(null);
const graphB = ref<InstanceType<typeof DesmosCanvas> | null>(null);
const graphC = ref<InstanceType<typeof DesmosCanvas> | null>(null);

const hxx = ref<number>(0);
const hyy = ref<number>(0);

function doThing() {
    const a = graphA.value?.getCalculator();
    const b = graphB.value?.getCalculator();
    const c = graphC.value?.getCalculator();

    if (!c) return; // not ready yet

    // a.setExpression({ id: "fxx", latex: "f(x)=xx" });
    // b.setExpression({ id: "fxx", latex: "f(x)=xxx" });
    // c.setExpression({ id: "fxx", latex: "f(x)=xxx" });
    // c.setExpression({ id: "Circle", latex: "x^2+y^2=4" });

    c.setExpressions([
        { id: "X", latex: "X=0" },
        { id: "Y", latex: "Y=0" },
        { id: "P", latex: "P=(X,Y)" },
    ]);

    const hx = c.HelperExpression({ latex: "X" });
    const hy = c.HelperExpression({ latex: "Y" });

    hx.observe("numericValue", () => {
        hxx.value = hx.numericValue;
        hyy.value = hy.numericValue;
        console.log("P:", hx.numericValue, hy.numericValue);
    });
}
</script>

<template>
    <main class="page">
        <div>{{ hxx }} {{ hyy }}</div>
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
