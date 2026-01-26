<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useDesmosStore } from "./CanvasPool";

const CanvasDiv = ref<HTMLDivElement | null>(null);
const store = useDesmosStore();
const calculator = ref<Desmos.Calculator | undefined>(undefined);

const props = defineProps<{
    config: any;
    settings: any;
}>();

onMounted(async () => {
    if (!CanvasDiv.value) {
        console.log("[DesmosCanvas] ERROR: CanvasDiv missing");
        return;
    }

    const iframe = await store.mountInto(CanvasDiv.value);

    calculator.value = iframe.contentWindow?.createCalc(
        props.config,
        props.settings,
    );
});

function setExpression(expr) {
    calculator.value?.setExpression(expr);
}

defineExpose({
    setExpression,
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
