import { createDesmosBridge, type DesmosBridge } from "../bridge/desmosBridge";

export type GraphA = {
    bridge: DesmosBridge;
    init: () => void;
    showIdentity: () => void;
    clear: () => void;
};

export function createGraphA(frame: HTMLIFrameElement): GraphA {
    const bridge = createDesmosBridge(frame);

    return {
        bridge,

        init() {
            bridge.setSettings({
                degreeMode: false,
            });
        },

        showIdentity() {
            bridge.setExpression({ id: "fx", latex: "f(x)=x" });
        },

        clear() {
            // simplest "clear" pattern: remove known IDs you used
            // (or add a CLEAR command to your host if you want)
            bridge.setExpression({ id: "fx", latex: "" });
        },
    };
}
