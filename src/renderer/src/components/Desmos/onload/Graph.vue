<script setup lang="ts">
import { onMounted, onUnmounted, Ref, useTemplateRef } from "vue";
import { getDesmosIframe } from "./Iframe";
import { Expression } from "../objects/Expression";
import { crossSync } from "../objects/CrossSync";

const emit = defineEmits<{ (e: "DesmosLoaded", msg: string): void }>();
const props = defineProps<{
    config: any;
    settings: any;
}>();

let calculator: Desmos.Calculator;
let iframe: HTMLIFrameElement;
const Canvas = useTemplateRef("div");

onMounted(async () => {
    iframe = await getDesmosIframe(Canvas.value!);
    const window = iframe.contentWindow;
    if (!window) return;
    calculator = window.createCalc(props.config, props.settings);

    emit("DesmosLoaded", "Desmos is ready to run");
});

onUnmounted(() => {
    calculator.destroy();
    iframe.remove();
});

function getCalculator(): Desmos.Calculator {
    return calculator;
}

function createPoint(point: Ref<Expression>) {
    calculator.setExpression(point.value.toDesmosExpression());

    const sensor = calculator.HelperExpression({
        latex: point.value.LatexName,
    });

    sensor.observe("listValue", () => {
        console.log("Update");
        point.value.setFromListValue(sensor.listValue);
    });
}

function createConjugatePoints(A: Ref<Expression>, B: Ref<Expression>) {
    calculator.setExpression(A.value.toDesmosExpression());
    calculator.setExpression(B.value.toDesmosExpression());

    console.log("activate syncing");
    crossSync(calculator, A, B);
}

defineExpose({
    getCalculator,
    createPoint,
    createConjugatePoints,
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
