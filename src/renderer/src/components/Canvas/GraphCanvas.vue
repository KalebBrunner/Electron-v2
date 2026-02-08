<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";

const myCanvas = useTemplateRef("myCanvas");
// let ctx: CanvasRenderingContext2D | null = null;

function resizeCanvas() {
    const canvas = myCanvas.value;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.scale(dpr, dpr);
}

onMounted(() => {
    // const canvas = myCanvas.value;
    // if (!canvas) return;

    // const ctx = canvas.getContext("2d");
    // if (!ctx) return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeCanvas);
});
</script>

<template>
    <canvas
        ref="myCanvas"
        class="canvas"
    ></canvas>
</template>

<style scoped>
canvas {
    background-color: black;
}
</style>
