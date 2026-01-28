import { defineStore } from "pinia";

export function getDesmosIframe(
    div: HTMLDivElement,
): Promise<HTMLIFrameElement> {
    return DesmosStore().mountInto(div);
}

const DesmosStore = defineStore("Graphs", () => {
    async function mountInto(target: HTMLDivElement) {
        const iframe = createIframe();
        void target.appendChild(iframe);
        void (await waitReady());
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

    function waitReady() {
        return new Promise<void>((response) =>
            window.addEventListener("message", () => response(), {
                once: true,
            }),
        );
    }

    return { mountInto };
});
