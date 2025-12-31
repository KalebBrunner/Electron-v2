<script setup lang="ts">
const title = defineModel<string>("title");
const count = defineModel<number>("count");
</script>

<template>
    <div class="stack">
        <span>My inputd</span>
        <input v-model="title" />
        <span>Child says: {{ title }}</span>
        <span>Child says: {{ count }}</span>
    </div>
</template>

<style scoped>
.stack > * {
    display: block;
}
</style>
