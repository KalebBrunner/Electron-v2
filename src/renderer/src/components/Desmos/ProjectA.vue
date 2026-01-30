<script setup lang="ts">
import Graph from "./objects/Graph.vue";
import { myGraphCongif, myGraphSettings } from "./objects/DefaultConfig";
import { Ref, ref } from "vue";
import { DesPoint, PointStyling } from "./objects/graphables/Points";
import { DesFunction } from "./objects/graphables/Functions";

const graphG = ref<InstanceType<typeof Graph> | null>(null);
var isMounted = ref(false);
const PointA = ref(
    new DesPoint(
        "A",
        -3.1214,
        2.4512,
        PointStyling.new({
            color: "#c74440",
            pointOpacity: 1,
            pointSize: 15,
        }),
    ),
);
// const PointP = ref(new DesPoint("P", 1, 1.125));
// const func = ref(new DesFunction("f(x)", "3x^{2.2}-5\\cdot\\sin(80x)"));
var ReactiveQ: Ref<DesPoint>;
function onLoad() {
    if (!graphG.value) return;
    const g = graphG.value.getCalculator();
    console.log("graph loaded");
    if (!g) return;

    g.BindGridPoint(PointA);

    isMounted.value = true;
}

// const Npoles: number = 3;
// const Poles = ref<DesPoint[]>(null!);
// const NRoots: number = 2;
// const Roots = ref<DesPoint[]>(null!);
// function loadPoles(

//     for()

// );

const click = ref(true);
function onClick() {
    click.value = !click.value;
}
</script>

<template>
    <main class="page">
        <div v-if:="isMounted">
            <!-- {{ click }}{{ PointA.Expression }}{{ PointP.Expression
            }}{{ PointQ.x }} -->
            {{ ReactiveQ.VariableName }} {{ ReactiveQ.Expression }}
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
