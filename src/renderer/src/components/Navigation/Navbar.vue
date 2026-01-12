<script setup lang="ts">
import PageSwapDirectory from "./PageSwapDirectory.vue";
</script>

<template>
    <div class="navbar">
        <PageSwapDirectory />
    </div>
</template>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;

    /* center items */
    display: flex;
    justify-content: center;

    /* give it a real bar height so it’s predictable */
    padding: 0px 0;

    /* optional but helps readability if content scrolls underneath */
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(6px);
}
</style>
