<script setup lang="ts">
import DesmosCanvas from "./DesmosCanvas.vue";

const graphA: GraphConfig = {
    settings: {},
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
            <DesmosCanvas
                class="square"
                :graph="graphA"
            />
            <DesmosCanvas
                class="fill"
                :graph="graphA"
            />
        </div>

        <!-- MAIN FILL -->
        <div class="mainFill">
            <DesmosCanvas :graph="graphB" />
            <!-- <p>hello this is text</p>
            <p>hello this is text</p>

            <p>hello this is text</p> -->
        </div>
    </main>
</template>

<style scoped>
.page {
    /* height: 100%; */
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    box-sizing: border-box;
    min-height: 0;
}

.topStrip {
    display: flex;
    gap: 20px;
    padding: 12px;
    height: 220px; /* IMPORTANT: needs a height so the square knows its size */
    min-height: 0;
}

.topStrip .square {
    height: 100%;
    aspect-ratio: 1 / 1; /* ✅ makes it a square */
    flex: 0 0 auto; /* don’t stretch */
}

.topStrip .fill {
    flex: 1 1 0; /* ✅ take remaining space */
    min-width: 0; /* ✅ prevents overflow in flex layouts */
}

.mainFill {
    /* flex-direction: column; */
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
}
</style>
