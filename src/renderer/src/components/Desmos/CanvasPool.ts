import { defineStore } from "pinia";
import { ref } from "vue";

export const useDesmosStore = defineStore("Graphs", () => {
    const iframe = ref<HTMLIFrameElement | null>(null);

    async function mountInto(target: HTMLElement) {
        const frame = getIframe();
        void target.appendChild(frame);
        void (await waitForCreateCalc(frame));
        void console.log("[DesmosStore] iframe ready in target");
        return frame;
    }

    function getIframe() {
        if (!iframe.value) {
            const frame = document.createElement("iframe");
            frame.style.flex = "1 1 auto";
            frame.style.width = "100%";
            frame.style.height = "100%";
            frame.style.border = "0";
            frame.src = "/desmos-iframe.html";
            iframe.value = frame;
        }
        return iframe.value;
    }

    function waitForCreateCalc(frame: HTMLIFrameElement) {
        return new Promise<void>((resolve) => {
            const check = () => {
                const fn = frame.contentWindow?.createCalc;
                if (typeof fn === "function") {
                    resolve();
                    return;
                }
                requestAnimationFrame(check);
            };

            check();
        });
    }

    return { mountInto };
});
