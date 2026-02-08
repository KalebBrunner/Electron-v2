<script setup lang="ts">
import GraphCanvas from "./GraphCanvas.vue";
</script>
<template>
    <div class="fill">
        <!-- Canvas Index -->
        <GraphCanvas class="graph" />
    </div>
</template>

<style scoped>
.fill {
    flex: auto;
    flex-grow: 1;
}
.graph {
    margin: 2rem;
}
</style>
