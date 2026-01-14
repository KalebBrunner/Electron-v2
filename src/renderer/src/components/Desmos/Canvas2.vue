<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { createCalculator, DesmosCalculator } from "./DesmosFunctions";

const containerRef = ref<HTMLElement | null>(null);
let myCalculator: DesmosCalculator | null = null;

onMounted(() => {
    const element = containerRef.value;
    if (!element) return;
    myCalculator = createCalculator(element);
});

onBeforeUnmount(() => {
    myCalculator?.destroy();
});
</script>

<template>
    this is canvas 2
    <div
        ref="containerRef"
        class="desmos"
    ></div>
</template>

<style scoped>
.desmos {
    width: calc(100vw - 40px);
    height: calc(100vh - 40px); /* adjust if you have a header */
}
</style>
