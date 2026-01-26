<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useDesmosStore } from "./CanvasPool";

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

function getCalculator(): Desmos.Calculator {
    if (!calculator.value) throw new Error("Desmos calculator not ready yet");
    return calculator.value;
}

defineExpose({
    getCalculator,
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
