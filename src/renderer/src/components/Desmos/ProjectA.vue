<script setup lang="ts">
import DesmosCanvas from "./DesmosCanvas.vue";

const graphA: GraphConfig = {
    settings: { degreeMode: false },
    expressions: [{ id: "fx", latex: "f(x)=x" }],
};

const graphB: GraphConfig = {
    settings: { degreeMode: false },
    expressions: [{ id: "gx", latex: "g(x)=x^2" }],
};
</script>

<template>
    <main class="page">
        <!-- TOP STRIP -->
        <div class="topStrip">
            <DesmosCanvas :graph="graphA" />
        </div>

        <!-- MAIN FILL -->
        <div class="mainFill">
            <DesmosCanvas :graph="graphB" />
        </div>
    </main>
</template>

<style scoped>
.page {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 12px;
    padding: 12px;
    box-sizing: border-box;

    min-height: 0; /* important */
}

.topStrip {
    width: 100%;
    height: 160px;
    flex: 0 0 auto;
}

.mainFill {
    width: 100%;
    flex: 1 1 auto;
    min-height: 0; /* important */
    display: flex; /* important: lets inner fill */
}
</style>
