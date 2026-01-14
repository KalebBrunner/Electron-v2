<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { makeDesmosInstance } from "./DesmosFunctions";

const MyGraph = makeDesmosInstance();
const containerRef = ref<HTMLElement | null>(null);

onMounted(() => {
    const el = containerRef.value;
    if (!el) return;
    MyGraph.mount(el);
});

onBeforeUnmount(() => {
    MyGraph.unmount();
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
