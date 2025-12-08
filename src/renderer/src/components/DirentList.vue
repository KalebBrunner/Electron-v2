<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Dirent } from "src/objects/Dirent";
const Dirents = ref<Dirent[]>([]);

onMounted(async () => {
    Dirents.value = await window.api.getDirents();
    console.log("[page2] dirents length:", Dirents.value.length);
});
</script>

<template>
    <div v-if="Dirents.length === 0">
        No files found (or getDirents returned empty).
    </div>

    <ul v-else>
        <li
            v-for="d in Dirents"
            :key="d.path ?? d.name"
        >
            {{ d.name }} <span v-if="d.isDirectory">(folder)</span>
        </li>
    </ul>
</template>
