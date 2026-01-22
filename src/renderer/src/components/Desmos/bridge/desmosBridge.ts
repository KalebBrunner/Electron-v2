export type DesmosBridge = {
    setExpression: (expr: Desmos.ExpressionState) => void;
    setSettings: (settings: Partial<Desmos.GraphSettings>) => void;
};

export function createDesmosBridge(frame: HTMLIFrameElement): DesmosBridge {
    const send = (data: unknown) => {
        frame.contentWindow?.postMessage(data, "*");
    };

    return {
        setExpression(expr) {
            send({ kind: "SET_EXPR", expr });
        },
        setSettings(settings) {
            send({ kind: "SET_SETTINGS", settings });
        },
    };
}
