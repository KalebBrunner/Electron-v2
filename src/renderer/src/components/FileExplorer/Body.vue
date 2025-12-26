<script setup lang="ts">
import DirectoryList from "./DirectoryList.vue";
</script>

<template>
    <div class="window">
        <main class="body">
            <DirectoryList />
        </main>
    </div>
</template>
<style scoped>
.window {
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
}

.body {
    background-color: green;
    /* padding: 16px; */
    overflow: auto;
}
</style>
