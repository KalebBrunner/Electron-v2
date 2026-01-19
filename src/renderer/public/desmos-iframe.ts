// public/desmos-iframe.js

(function () {
    const elt = document.getElementById("calculator");
    if (!elt) return;

    // Desmos is loaded from the API script tag
    const calculator = Desmos.GraphingCalculator(elt, {
        expressions: true,
        settingsMenu: true,
        zoomButtons: true,
        keypad: true,
    });

    // Tell parent we're ready
    window.parent.postMessage({ type: "DESMOS_READY" }, "*");

    // Receive commands from parent
    window.addEventListener("message", (event) => {
        const msg = event.data;
        if (!msg || typeof msg !== "object") return;

        switch (msg.type) {
            case "DESMOS_SET_EXPRESSIONS":
                calculator.setExpressions(msg.payload);
                break;

            case "DESMOS_SET_EXPRESSION":
                calculator.setExpression(msg.payload);
                break;

            case "DESMOS_SET_STATE":
                calculator.setState(msg.payload);
                break;

            case "DESMOS_GET_STATE":
                window.parent.postMessage(
                    { type: "DESMOS_STATE", payload: calculator.getState() },
                    "*",
                );
                break;

            case "DESMOS_DESTROY":
                calculator.destroy();
                break;
        }
    });
})();
