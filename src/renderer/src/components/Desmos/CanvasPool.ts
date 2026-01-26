import { defineStore } from "pinia";
import { ref } from "vue";
export const useDesmosStore = defineStore("Graphs", () => {
    const iframe = ref<HTMLIFrameElement | null>(null);

    function log() {
        console.log("Desmos Pool log");
    }

    function getIframe() {
        console.log("Getting iframe");

        if (!iframe.value) {
            const frame = document.createElement("iframe");
            frame.style.flex = "flex: 1 1 auto;";
            frame.style.width = "100%";
            frame.style.height = "100%";
            frame.style.border = "0";
            frame.src = "/desmos-iframe.html";
            iframe.value = frame;
        }
        return iframe.value;
    }

    return { log, getIframe };
});
