<script setup lang="ts">
import { onMounted, onUnmounted, Ref, useTemplateRef } from "vue";
import { getDesmosIframe } from "./GraphStore";
import { Calculator } from "./Calculator";
// import { crossSync } from "../objects/CrossSync";
// import { DesPoint } from "../objects/DesObjects";
// import { crossSync3 } from "../objects/CrossSync3";

const emit = defineEmits<{ (e: "DesmosLoaded", msg: string): void }>();
const props = defineProps<{
    config: any;
    settings: any;
}>();

let calc: Calculator;
let iframe: HTMLIFrameElement;
const Canvas = useTemplateRef("div");

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

function getCalculator(): Calculator {
    return calc;
}

defineExpose({
    getCalculator,
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
