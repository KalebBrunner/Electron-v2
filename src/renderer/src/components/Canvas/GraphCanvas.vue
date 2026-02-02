<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import { CanvasEngine } from "./Objects/CanvasEngine";
import { drawGrid } from "./EngineActions/DrawGrid";
import { CSSpx, Screenpx, Vikingpx as Vikpx } from "./Objects/PixelUnits";

type Point = { x: number; y: number }; // canvas coords (CSS pixels)

const POINT_RADIUS = 6; // hit radius
const SNAP_WHILE_DRAGGING = true;

let draggingIndex: number | null = null;
let dragOffset = { dx: 0, dy: 0 };
let isPointerDown = false;

const myCanvas = useTemplateRef("myCanvas");
let ctx: CanvasRenderingContext2D | null = null;

onMounted(() => {
    const canvas = myCanvas.value;
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    if (!ctx) return;

    const engine = new CanvasEngine(canvas, ctx);

    engine.ResizeActions.push(drawGrid);
    engine.ResizeActions.push(() => {
        console.log("css rectangle");
        engine.css.draw(50 as CSSpx, 100 as CSSpx, 50 as CSSpx, 100 as CSSpx);
    });
    engine.ResizeActions.push(() => {
        console.log("coord rectangle");
        engine.coord.draw(150 as Vikpx, 100 as Vikpx, 50 as Vikpx, 50 as Vikpx);
    });
    engine.ResizeActions.push(() => {
        console.log("device pixel rectangle");
        engine.draw(
            100 as Screenpx,
            300 as Screenpx,
            50 as Screenpx,
            50 as Screenpx,
        );
    });

    window.addEventListener("resize", () => engine.resize());
    engine.resize();
});

onBeforeUnmount(() => {
    // const canvas = myCanvas.value;
    // if (canvas) {
    //     canvas.removeEventListener("pointerdown", onPointerDown);
    //     canvas.removeEventListener("pointermove", onPointerMove);
    //     canvas.removeEventListener("pointerup", onPointerUp);
    //     canvas.removeEventListener("pointercancel", onPointerUp);
    // }
    // window.removeEventListener("resize", resizeCanvas);
    // window.removeEventListener("keydown", onKeyDown);
    // ctx = null;
});
</script>

<template>
    <canvas
        ref="myCanvas"
        class="graph-canvas"
    ></canvas>
</template>

<style scoped>
.graph-canvas {
    display: flex;
    flex: 1 1 auto;
    min-height: 0;

    border-radius: 16px;
    overflow: hidden;
    background: #111;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}

.frame {
    flex: 1 1 auto;
}
</style>
