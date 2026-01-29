<script setup lang="ts">
import { onMounted, onUnmounted, Ref, useTemplateRef } from "vue";
import { getDesmosIframe } from "./Iframe";
import { crossSync } from "../objects/CrossSync";
import { DesPoint } from "../objects/DesObjects";

const emit = defineEmits<{ (e: "DesmosLoaded", msg: string): void }>();
const props = defineProps<{
    config: any;
    settings: any;
}>();

let calc: Desmos.Calculator;
let iframe: HTMLIFrameElement;
const Canvas = useTemplateRef("div");

/**
 *
 * core
 *
 **/

onMounted(async () => {
    iframe = await getDesmosIframe(Canvas.value!);
    const window = iframe.contentWindow;
    if (!window) return;
    calc = window.createCalc(props.config, props.settings);

    emit("DesmosLoaded", "Desmos is ready to run");
});

onUnmounted(() => {
    calc.destroy();
    iframe.remove();
});

/**
 *
 * Renaming Desmos Functions
 *
 **/

function setDesNote(note: DesNote) {
    calc.setExpression(note as Desmos.ExpressionState);
}

function getSensor(VariableName: string): Sensor {
    return calc.HelperExpression({ latex: VariableName });
}

/**
 *
 * Exposed Functions
 *
 **/

function getCalculator(): Desmos.Calculator {
    return calc;
}

function BindPoint(point: Ref<DesPoint>) {
    setDesNote(point.value.toDesNote);

    const sensor = getSensor(point.value.VariableName);

    sensor.observe("listValue", () => {
        console.log("Update");
        point.value.setFromArray(sensor.listValue);
    });
}

function BindConjugatePoints(A: Ref<DesPoint>, B: Ref<DesPoint>) {
    setDesNote(A.value.toDesNote);
    setDesNote(B.value.toDesNote);

    console.log("activate syncing");
    crossSync(calc, A, B);
}

defineExpose({
    getCalculator,
    BindPoint,
    BindConjugatePoints,
});
</script>

<template>
    <div
        ref="div"
        class="desmos-canvas"
    ></div>
</template>

<style scoped>
.desmos-canvas {
    display: flex;
    flex: 1 1 auto;
    min-height: 0;

    border-radius: 16px;
    overflow: hidden;
    background: #111;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}

.frame {
    flex: 1 1 auto;
}
</style>
