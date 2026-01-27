<script setup lang="ts">
import { onMounted, onUnmounted, Ref, ref } from "vue";
import { useDesmosStore } from "./CanvasPool";
import { Point } from "./DesmosUtilities";
import { crossSync } from "./crossSync2";

const props = defineProps<{
    config: any;
    settings: any;
}>();

const emit = defineEmits(["DesmosLoaded"]);

const store = useDesmosStore();
const CanvasDiv = ref<HTMLDivElement | null>(null);
const calculator = ref<Desmos.Calculator | undefined>(undefined);
const iframe = ref<HTMLIFrameElement | null>(null);

onMounted(async () => {
    if (!CanvasDiv.value) {
        console.log("[DesmosCanvas] ERROR: CanvasDiv missing");
        return;
    }

    iframe.value = await store.mountInto(CanvasDiv.value);

    calculator.value = iframe.value.contentWindow?.createCalc(
        props.config,
        props.settings,
    );

    emit("DesmosLoaded", "Desmos is ready to run");
});

onUnmounted(() => {
    calculator.value?.destroy?.();
    calculator.value = undefined;

    iframe.value?.remove();
    iframe.value = null;
});

function calc(): Desmos.Calculator {
    if (!calculator.value) throw new Error("Desmos calculator not ready yet");
    return calculator.value;
}

function createPoint(point: Ref<Point>) {
    calc().setExpression(point.value.toDesmosExpression());

    const sensor = calc().HelperExpression({
        latex: point.value.LatexName,
    });

    sensor.observe("listValue", () => {
        console.log("Update");
        point.value.setFromListValue(sensor.listValue);
    });
}

function createConjugatePoints(A: Ref<Point>, B: Ref<Point>) {
    calc().setExpression(A.value.toDesmosExpression());
    calc().setExpression(B.value.toDesmosExpression());

    console.log("activate syncing");
    crossSync(calc(), A, B);
}

defineExpose({
    getCalculator: calc,
    createPoint,
    createConjugatePoints,
});
</script>

<template>
    <div
        ref="CanvasDiv"
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
