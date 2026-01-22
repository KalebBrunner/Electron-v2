<script setup lang="ts">
const src = "../../../public/desmos-iframe.html";

import { ref, watch } from "vue";
import { createDesmosBridge, DesmosBridge } from "./bridge/desmosBridge";

const props = defineProps<{
    graph: GraphConfig;
}>();

const frame = ref<HTMLIFrameElement | null>(null);
const bridge = ref<DesmosBridge | null>(null);

function applyGraphConfig() {
    if (!bridge.value) return;

    // settings first
    if (props.graph.settings) {
        bridge.value.setSettings(props.graph.settings);
    }

    // then expressions
    if (props.graph.expressions) {
        for (const expr of props.graph.expressions) {
            bridge.value.setExpression(expr);
        }
    }
}

function onLoad() {
    if (!frame.value) return;
    bridge.value = createDesmosBridge(frame.value);
    applyGraphConfig();
}

// If parent changes graph data later, re-apply
watch(
    () => props.graph,
    () => applyGraphConfig(),
    { deep: true },
);
</script>
<template>
    <div class="desmos-stage">
        <div class="desmos-window">
            <iframe
                ref="frame"
                class="frame"
                :src="src"
                @load="onLoad"
            />
        </div>
    </div>
</template>

<style scoped>
.desmos-stage {
    flex: 1; /* <-- critical: take height from <main> */
    min-height: 0; /* <-- critical in flex layouts */
    width: 100%;

    display: flex;
    align-items: center; /* vertical center */
    justify-content: center; /* horizontal center */
}

.desmos-window {
    width: 90vw;
    height: 80vh;
    border-radius: 16px;
    overflow: hidden;
    background: #111;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}

.frame {
    width: 100%;
    height: 100%;
    border: none;
}
</style>
