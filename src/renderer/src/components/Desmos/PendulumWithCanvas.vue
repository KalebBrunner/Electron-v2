<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";

declare const Desmos: any;

const el = ref<HTMLDivElement | null>(null);
let calc: any = null;

function wrapToPi(x: number) {
    const twoPi = 2 * Math.PI;
    x = (((x + Math.PI) % twoPi) + twoPi) % twoPi; // [0, 2pi)
    return x - Math.PI; // [-pi, pi)
}

function rk4PendulumStep(
    theta: number,
    omega: number,
    dt: number,
    g: number,
    L: number,
) {
    const domega = (th: number) => -(g / L) * Math.sin(th);

    const k1_theta = omega;
    const k1_omega = domega(theta);

    const k2_theta = omega + 0.5 * dt * k1_omega;
    const k2_omega = domega(theta + 0.5 * dt * k1_theta);

    const k3_theta = omega + 0.5 * dt * k2_omega;
    const k3_omega = domega(theta + 0.5 * dt * k2_theta);

    const k4_theta = omega + dt * k3_omega;
    const k4_omega = domega(theta + dt * k3_theta);

    const thetaNext =
        theta + (dt / 6) * (k1_theta + 2 * k2_theta + 2 * k3_theta + k4_theta);
    const omegaNext =
        omega + (dt / 6) * (k1_omega + 2 * k2_omega + 2 * k3_omega + k4_omega);

    return { theta: thetaNext, omega: omegaNext };
}

/**
 * Simulate and return multiple polyline segments in (thetaWrapped, omega)
 * so we don't draw a line across the -pi/pi wrap discontinuity.
 */
function simulatePhaseSegments(opts: {
    g: number;
    L: number;
    theta0: number;
    omega0: number;
    dt: number;
    steps: number;
}) {
    const { g, L, theta0, omega0, dt, steps } = opts;

    let theta = theta0;
    let omega = omega0;

    const segments: { xs: string[]; ys: string[] }[] = [];
    let xs: string[] = [];
    let ys: string[] = [];

    let prevWrapped: number | null = null;

    for (let i = 0; i <= steps; i++) {
        const wrapped = wrapToPi(theta);

        if (prevWrapped !== null) {
            const jump = Math.abs(wrapped - prevWrapped);
            // if we crossed the -pi/pi boundary, start a new segment
            if (jump > Math.PI * 0.9) {
                if (xs.length > 1) segments.push({ xs, ys });
                xs = [];
                ys = [];
            }
        }

        xs.push(wrapped.toFixed(6));
        ys.push(omega.toFixed(6));

        prevWrapped = wrapped;

        if (i < steps) {
            const next = rk4PendulumStep(theta, omega, dt, g, L);
            theta = next.theta;
            omega = next.omega;
        }
    }

    if (xs.length > 1) segments.push({ xs, ys });
    return segments;
}

function addTrajectoryTables(args: {
    folderId: string;
    baseId: string;
    g: number;
    L: number;
    theta0: number;
    omega0: number;
    dt: number;
    steps: number;
}) {
    const segs = simulatePhaseSegments(args);

    segs.forEach((seg, idx) => {
        calc.setExpression({
            id: `${args.baseId}_seg${idx}`,
            type: "table",
            folderId: args.folderId,
            columns: [
                { latex: "x", values: seg.xs },
                {
                    latex: "y",
                    values: seg.ys,
                    // columnMode: Desmos.ColumnModes.LINES,
                },
            ],
        });
    });
}

onMounted(() => {
    if (!el.value) return;

    calc = Desmos.GraphingCalculator(el.value, {
        expressions: true,
        settingsMenu: true,
    });

    calc.setBlank();

    // Folder to keep tables out of the way
    const folderId = "phase_folder";
    calc.setExpression({
        id: folderId,
        type: "folder",
        title: "Pendulum phase-space trajectories (hidden tables)",
        collapsed: true, // keep the list tidy
    });

    // Parameters
    const g = 3.81;
    const L = 1.0;
    const dt = 0.01;
    const steps = 2500; // adjust for length/detail

    // ---- 3 circles (small oscillations) ----
    // (theta0 varied, omega0 = 0)
    [
        { theta0: 0.4, omega0: 0.0 },
        { theta0: 0.9, omega0: 0.0 },
        { theta0: 1.4, omega0: 0.0 },
    ].forEach((ic, i) => {
        addTrajectoryTables({
            folderId,
            baseId: `circle${i}`,
            g,
            L,
            theta0: ic.theta0,
            omega0: ic.omega0,
            dt,
            steps,
        });
    });

    // ---- 3 wave lines on top (rotations, +omega0) ----
    [3.5, 4.5, 5.5].forEach((w0, i) => {
        addTrajectoryTables({
            folderId,
            baseId: `topwave${i}`,
            g,
            L,
            theta0: 0.0,
            omega0: w0,
            dt,
            steps,
        });
    });

    // ---- 3 wave lines on bottom (rotations, -omega0) ----
    [-3.5, -4.5, -5.5].forEach((w0, i) => {
        addTrajectoryTables({
            folderId,
            baseId: `botwave${i}`,
            g,
            L,
            theta0: 0.0,
            omega0: w0,
            dt,
            steps,
        });
    });

    // View window for wrapped theta
    calc.setMathBounds({
        left: -Math.PI,
        right: Math.PI,
        bottom: -6.5,
        top: 6.5,
    });

    calc.setExpression({
        id: "axislabel",
        type: "text",
        text: "Phase space: x = θ wrapped to [-π, π], y = ω",
    });
});

onBeforeUnmount(() => {
    calc?.destroy?.();
    calc = null;
});
</script>

<template>
    <div
        ref="el"
        class="desmos"
    ></div>
</template>

<style scoped>
.desmos {
    width: 80vw;
    height: 80vh;
}
</style>

<style scoped>
.desmos-wrap {
    width: calc (100vw - 40px);
    height: calc(100vh - 40px); /* adjust if you have a header */
}

.desmos-calc {
    width: 100%;
    height: 100%;
}
</style>
