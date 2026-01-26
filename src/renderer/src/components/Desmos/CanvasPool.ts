import { defineStore } from "pinia";

export const useDesmosStore = defineStore("Graphs", () => {
    async function mountInto(target: HTMLDivElement) {
        const iframe = createIframe();
        void target.appendChild(iframe);
        void (await waitForCreateCalc(iframe));
        void console.log("[DesmosStore] iframe ready in target");
        return iframe;
    }

    function createIframe(): HTMLIFrameElement {
        const iframe = document.createElement("iframe");
        iframe.style.flex = "1 1 auto";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "0";
        iframe.src = "/desmos-iframe.html";
        return iframe;
    }

    async function waitForCreateCalc(frame: HTMLIFrameElement): Promise<void> {
        while (typeof frame.contentWindow?.createCalc !== "function") {
            await new Promise<number>(
                (resolve) => void requestAnimationFrame(resolve),
            );
        }
    }

    return { mountInto };
});
