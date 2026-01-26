<script setup lang="ts">
import { PropType, ref } from "vue";

const props = defineProps({
    config: {
        type: Object as PropType<Desmos.GraphConfiguration>,
        required: true,
    },
    settings: {
        type: Object as PropType<Desmos.GraphSettings>,
        required: true,
    },
});

const frame = ref<HTMLIFrameElement | null>(null);
const calculator = ref<Desmos.Calculator | undefined>(undefined);

function onload() {
    calculator.value = frame.value?.contentWindow?.createCalc(
        props.config,
        props.settings,
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
        ></iframe>
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
