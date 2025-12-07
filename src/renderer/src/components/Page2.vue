<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Dirent } from "src/objects/Dirent";

const platform = window.api.platform;
const Dirents = ref<Dirent[]>([]);

onMounted(async () => {
    Dirents.value = await window.api.getDirents();
    console.log("[page2] dirents length:", Dirents.value.length);
});
</script>

<template>
    <div>this is page 2</div>
    <div>You are using {{ platform }}</div>

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

    <div class="actions">
        <div class="action">
            <a
                target="_blank"
                rel="noreferrer"
                @click="$emit('GotoFrontPage')"
            >
                Go to front page
            </a>
        </div>
    </div>
</template>
