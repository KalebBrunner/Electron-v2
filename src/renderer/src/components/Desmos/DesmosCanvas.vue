<script setup lang="ts">
import { ref, watch } from "vue";
import { createDesmosBridge, DesmosBridge } from "./bridge/desmosBridge";

const props = defineProps<{
    graph: GraphConfig;
}>();

const src = "/desmos-iframe.html";

const frame = ref<HTMLIFrameElement | null>(null);
const bridge = ref<DesmosBridge | null>(null);

function applyGraphConfig() {
    if (!bridge.value) return;

    if (props.graph.settings) {
        bridge.value.setSettings(props.graph.settings);
    }

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

watch(() => props.graph, applyGraphConfig, { deep: true });
</script>

<template>
    <!-- This fills whatever container it's inside -->
    <div class="desmos-canvas">
        <iframe
            ref="frame"
            class="frame"
            :src="src"
            @load="onLoad"
        />
    </div>
</template>

<style scoped>
.desmos-canvas {
    display: flex;
    /* width: 100%; */
    /* height: 100%; */
    flex: 1 1 auto;
    min-height: 0;

    border-radius: 16px;
    overflow: hidden;
    background: #111;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}

.frame {
    flex: 1 1 auto;
    /* display: block; */
    /* width: 100%; */
    /* height: 100%; */
    /* border: none; */
}
</style>
