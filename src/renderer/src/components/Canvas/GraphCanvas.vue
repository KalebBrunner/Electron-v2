<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const myCanvas = ref<HTMLCanvasElement | null>(null);

type Point = { x: number; y: number }; // canvas coords (CSS pixels)
const points: Point[] = [];

let ctx: CanvasRenderingContext2D | null = null;
let dpr = 1;

const GRID_SIZE = 25;
const POINT_RADIUS = 6; // hit radius
const SNAP_WHILE_DRAGGING = true;

let draggingIndex: number | null = null;
let dragOffset = { dx: 0, dy: 0 };
let isPointerDown = false;

function resizeCanvas() {
    const canvas = myCanvas.value;
    if (!canvas || !ctx) return;

    dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));

    // draw in CSS px coords
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    draw();
}

function clear() {
    const canvas = myCanvas.value;
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
}

function drawGrid() {
    const canvas = myCanvas.value;
    if (!canvas || !ctx) return;

    const { width, height } = canvas.getBoundingClientRect();

    ctx.fillStyle = "#0b1020";
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    for (let x = 0; x <= width; x += GRID_SIZE) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
    }
    for (let y = 0; y <= height; y += GRID_SIZE) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
    }
    ctx.stroke();

    // Axes
    const cx = Math.floor(width / 2);
    const cy = Math.floor(height / 2);

    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(cx + 0.5, 0);
    ctx.lineTo(cx + 0.5, height);
    ctx.moveTo(0, cy + 0.5);
    ctx.lineTo(width, cy + 0.5);
    ctx.stroke();
}

function drawPoints() {
    if (!ctx) return;

    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const isDragging = draggingIndex === i;

        // halo
        ctx.fillStyle = isDragging
            ? "rgba(251,191,36,0.25)"
            : "rgba(96,165,250,0.25)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
        ctx.fill();

        // dot
        ctx.fillStyle = isDragging
            ? "rgba(251,191,36,0.95)"
            : "rgba(96,165,250,0.95)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

function draw() {
    clear();
    drawGrid();
    drawPoints();
}

function snapToGrid(x: number, y: number) {
    return {
        x: Math.round(x / GRID_SIZE) * GRID_SIZE,
        y: Math.round(y / GRID_SIZE) * GRID_SIZE,
    };
}

function getPointerPos(e: PointerEvent) {
    const canvas = myCanvas.value!;
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
    };
}

function hitTest(x: number, y: number) {
    // return topmost point index, or null
    for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        const dx = x - p.x;
        const dy = y - p.y;
        if (dx * dx + dy * dy <= POINT_RADIUS * POINT_RADIUS) return i;
    }
    return null;
}

function placePointIfEmpty(x: number, y: number) {
    const snapped = snapToGrid(x, y);
    points.push(snapped);
}

function onPointerDown(e: PointerEvent) {
    const canvas = myCanvas.value;
    if (!canvas || !ctx) return;

    isPointerDown = true;
    canvas.setPointerCapture(e.pointerId);

    const { x, y } = getPointerPos(e);
    const idx = hitTest(x, y);

    if (idx !== null) {
        draggingIndex = idx;
        // keep relative offset so it doesn't jump
        dragOffset.dx = points[idx].x - x;
        dragOffset.dy = points[idx].y - y;
    } else {
        // click empty space => add point
        placePointIfEmpty(x, y);
    }

    draw();
}

function onPointerMove(e: PointerEvent) {
    if (!isPointerDown) return;
    if (draggingIndex === null) return;

    const { x, y } = getPointerPos(e);
    let nx = x + dragOffset.dx;
    let ny = y + dragOffset.dy;

    if (SNAP_WHILE_DRAGGING) {
        const s = snapToGrid(nx, ny);
        nx = s.x;
        ny = s.y;
    }

    points[draggingIndex].x = nx;
    points[draggingIndex].y = ny;

    draw();
}

function onPointerUp(e: PointerEvent) {
    const canvas = myCanvas.value;
    if (!canvas) return;

    isPointerDown = false;

    if (draggingIndex !== null && !SNAP_WHILE_DRAGGING) {
        // snap on release instead
        const p = points[draggingIndex];
        const s = snapToGrid(p.x, p.y);
        p.x = s.x;
        p.y = s.y;
    }

    draggingIndex = null;
    canvas.releasePointerCapture(e.pointerId);

    draw();
}

function onKeyDown(e: KeyboardEvent) {
    if (e.key.toLowerCase() === "c") {
        points.length = 0;
        draggingIndex = null;
        draw();
    }
    if (e.key.toLowerCase() === "z") {
        points.pop();
        draggingIndex = null;
        draw();
    }
}

onMounted(() => {
    const canvas = myCanvas.value;
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    resizeCanvas();
});

onBeforeUnmount(() => {
    const canvas = myCanvas.value;
    if (canvas) {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointercancel", onPointerUp);
    }

    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("keydown", onKeyDown);

    ctx = null;
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
