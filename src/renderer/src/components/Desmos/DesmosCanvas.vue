<script setup lang="ts">
import { ref } from "vue";

const frame = ref<HTMLIFrameElement | null>(null);

// This should point to a page you control (ex: /desmos-child.html)
const src = "../../../public/desmos-iframe.html";

function onLoad() {
    console.log("child loaded");
}

// Example: “put f(x)=x on line 3”
function setLine3() {
    frame.value?.contentWindow?.postMessage(
        { kind: "DESMOS_SET_LINE", index: 2, latex: "f(x)=x" },
        "*",
    );
}
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
