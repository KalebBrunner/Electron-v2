type ParentToChild =
    | { kind: "SET_EXPR"; expr: Desmos.ExpressionState }
    | { kind: "SET_SETTINGS"; settings: Partial<Desmos.GraphSettings> };

const elt = document.getElementById("calc");
if (!elt) throw new Error("Missing #calc element");

const calculator: GraphingCalc = Desmos.GraphingCalculator(elt, {
    expressions: false,
    settingsMenu: false,
    zoomButtons: false,
    autosize: true,
});

window.calculator = calculator;

calculator.setExpression({ id: "fx", latex: "f(x)=x" });

// Parent -> Child commands
window.addEventListener("message", (event: MessageEvent<ParentToChild>) => {
    const msg = event.data;
    if (!msg || typeof msg !== "object") return;

    if (msg.kind === "SET_EXPR") {
        calculator.setExpression(msg.expr);
        calculator.resize();
    }

    if (msg.kind === "SET_SETTINGS") {
        calculator.updateSettings(msg.settings);
    }
});

// Handshake: tell parent we're ready
window.parent.postMessage({ kind: "DESMOS_READY" }, "*");
