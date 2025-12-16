<script setup lang="ts">
import { DirectoryT, DirentKind, Folder } from "../../../../src/objects/Dirent";
import { ref, onMounted } from "vue";

const directory = ref<DirectoryT>([]);
function isFolder(value: any): value is Folder {
    return value instanceof Folder;
}

onMounted(async () => {
    directory.value = (await window.api.readdir()) ?? [];
    console.log("[page2] dirents length:", directory.value.length);
});
</script>

<template>
    <ul
        v-if="directory"
        class="dirents"
    >
        <li
            v-for="dirent of directory"
            :key="dirent.name"
            class="dirent-row"
        >
            <span class="left">{{ DirentKind[dirent.kind] }}</span>
            <span class="colon">:</span>
            <span class="right">
                <span class="name">{{ dirent.name }}</span>
                <span
                    v-if="isFolder(dirent)"
                    class="tag"
                    >(folder)</span
                >
            </span>
        </li>
    </ul>
    <div v-else>No files found</div>
</template>

<style scoped>
.dirents {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%; /* make rows span available width */
}

.dirent-row {
    display: grid;
    grid-template-columns: 0.3fr auto 1fr; /* center column is the colon */
    column-gap: 0.5rem;
    align-items: baseline;
}

.left {
    justify-self: end; /* hug the colon from the left */
    font-family:
        ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
        "Liberation Mono", "Courier New", monospace;
}

.colon {
    justify-self: center;
}

.right {
    justify-self: start; /* hug the colon from the right */
    font-family:
        ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
        "Liberation Mono", "Courier New", monospace;
}

.tag {
    margin-left: 0.5rem;
    opacity: 0.7;
}
</style>
