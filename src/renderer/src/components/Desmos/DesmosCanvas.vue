<script setup lang="ts">
import { ref } from "vue";
import { myGraphCongif, myGraphSettings } from "./host/graphSettings";

const frame = ref<HTMLIFrameElement | null>(null);
const calculator = ref<Desmos.Calculator | undefined>(undefined);

function onload() {
    calculator.value = frame.value?.contentWindow?.createCalc(
        myGraphCongif,
        myGraphSettings,
    );

    if (calculator.value == undefined) {
        console.log("Error: calculator failed to load.");
    }
}

function setExpression(expr) {
    calculator.value?.setExpression(expr);
}

defineExpose({
    setExpression,
});
</script>

<template>
    <div class="desmos-canvas">
        <iframe
            ref="frame"
            class="frame"
            src="/desmos-iframe.html"
            @load="onload"
        />
    </div>
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
