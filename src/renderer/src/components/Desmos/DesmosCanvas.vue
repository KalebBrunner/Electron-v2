<script setup lang="ts">
import { onMounted, PropType, ref } from "vue";
import { useDesmosStore } from "./CanvasPool";

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

const CanvasDiv = ref<HTMLDivElement | null>(null);
const calculator = ref<Desmos.Calculator | undefined>(undefined);
const store = useDesmosStore();

onMounted(() => {
    const iframe = store.getIframe();
    if (!CanvasDiv.value) {
        console.log("[DesmosCanvas] ERROR: CanvasDiv missing");
        return;
    }
    CanvasDiv.value.appendChild(iframe);
    iframe.addEventListener(
        "load",
        () => {
            console.log("[DesmosCanvas] iframe load event fired");
            calculator.value = iframe.contentWindow?.createCalc(
                props.config,
                props.settings,
            );
        },
        { once: true },
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
    >
        <!-- <iframe
            ref="frame"
            class="frame"
            src="/desmos-iframe.html"
            @load="onload"
        ></iframe> -->
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
