import { createDesmosBridge, type DesmosBridge } from "../bridge/desmosBridge";

export type GraphB = {
    bridge: DesmosBridge;
    init: () => void;
    showQuadratic: () => void;
    showSin: () => void;
};

export function createGraphB(frame: HTMLIFrameElement): GraphB {
    const bridge = createDesmosBridge(frame);

    return {
        bridge,

        init() {
            bridge.setSettings({
                degreeMode: true,
            });
        },

        showQuadratic() {
            bridge.setExpression({ id: "gx", latex: "g(x)=x^2" });
        },

        showSin() {
            bridge.setExpression({ id: "sx", latex: "s(x)=\\sin(x)" });
        },
    };
}
