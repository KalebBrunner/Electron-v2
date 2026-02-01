<script setup lang="ts">
import GraphCanvas from "./GraphCanvas.vue";
import NoteWriter from "./NoteWriter.vue";
</script>
<template>
    <main class="page">
        <div class="fillRow">
            <section class="leftPane">
                <NoteWriter class="equations" />
            </section>

            <section class="rightPane">
                <GraphCanvas class="graph" />
            </section>
        </div>
    </main>
</template>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 80px;
    box-sizing: border-box;
    height: 100vh; /* ensures the split can size/scroll correctly */
    min-height: 0; /* IMPORTANT for nested flex scrolling */
}

.upperRow {
    display: flex;
    gap: 80px;
    padding: 12px;
    height: 40px;
    flex: 0 0 auto; /* don't let it stretch */
    min-height: 0;
}

.upperRow .square {
    height: 100%;
    aspect-ratio: 1 / 1;
    flex: 0 0 auto;
}

.upperRow .fill {
    flex: 1 1 0;
    min-width: 0;
}

.fillRow {
    flex: 1 1 auto;
    min-height: 0; /* IMPORTANT for children to be able to scroll */
    display: flex;
    gap: 12px;
}

/* Left equations column */
.leftPane {
    flex: 0 0 360px; /* sidebar width */
    min-width: 280px;
    max-width: 480px;

    min-height: 0; /* allow inner scroll */
    overflow: hidden; /* the panel handles its own scroll */
    border-radius: 12px;
}

/* Make the equations panel scroll vertically */
.equations {
    height: 100%;
    min-height: 0;
    overflow: auto;
}

/* Right graph column */
.rightPane {
    flex: 1 1 auto;
    min-width: 0; /* IMPORTANT so canvas can shrink without overflow */
    min-height: 0;

    border-radius: 12px;
    overflow: hidden; /* keeps canvas clipped to rounded corners if you style it */
}

/* Make sure GraphCanvas (and its canvas) can fill this area */
.graph {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
}
</style>
