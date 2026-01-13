export function pendulumPhaseRenderer(): (calc: any) => void {
    return (calc) => {
        const folderId = "phase_folder";
        calc.setExpression({
            id: folderId,
            type: "folder",
            title: "Pendulum trajectories",
            collapsed: true,
        });

        const xs = ["0", "0.1", "0.2", "0.3"];
        const ys = ["0", "0.2", "0.1", "-0.1"];

        calc.setExpression({
            id: "phaseTable",
            type: "table",
            folderId,
            columns: [
                { latex: "x", values: xs },
                {
                    latex: "y",
                    values: ys,
                    columnMode: (window as any).Desmos.ColumnModes.LINES, // ✅
                    // or: (window as any).Desmos.ColumnModes.POINTS
                },
            ],
        });
    };
}
