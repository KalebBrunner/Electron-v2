<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";

type DesmosMessage =
    | { type: "DESMOS_READY" }
    | { type: "DESMOS_STATE"; payload: unknown };

const iframeRef = ref<HTMLIFrameElement | null>(null);
const isReady = ref(false);

// Works in dev server AND in production file://
const iframeUrl = new URL(
    "desmos-iframe.html",
    window.location.href,
).toString();

function postToDesmos(message: object) {
    const win = iframeRef.value?.contentWindow;
    if (!win) return;
    win.postMessage(message, "*");
}

// Example API helpers you can call from your app:
function setDefaultGraph() {
    postToDesmos({
        type: "DESMOS_SET_EXPRESSIONS",
        payload: [
            { id: "1", latex: "y=x^2" },
            { id: "2", latex: "y=\\sin(x)" },
        ],
    });
}

function requestState() {
    postToDesmos({ type: "DESMOS_GET_STATE" });
}

function onMessage(event: MessageEvent) {
    const msg = event.data as DesmosMessage;

    if (!msg || typeof msg !== "object" || !("type" in msg)) return;

    if (msg.type === "DESMOS_READY") {
        isReady.value = true;
        setDefaultGraph();
    }

    if (msg.type === "DESMOS_STATE") {
        console.log("Desmos state:", msg.payload);
    }
}

onMounted(() => {
    window.addEventListener("message", onMessage);
});

onBeforeUnmount(() => {
    window.removeEventListener("message", onMessage);

    // optional cleanup
    postToDesmos({ type: "DESMOS_DESTROY" });
});
</script>

<template>
    <div class="desmos-stage">
        <div class="desmos-window">
            <iframe
                :src="iframeUrl"
                class="desmos-frame"
                title="Desmos"
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
    width: 80vw;
    height: 80vh;
    border-radius: 16px;
    overflow: hidden;
    background: #111;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}

.desmos-frame {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
}
</style>
