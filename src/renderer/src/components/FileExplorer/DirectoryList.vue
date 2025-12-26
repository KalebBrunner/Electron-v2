<script setup lang="ts">
import { ref, onMounted } from "vue";
import draggable from "vuedraggable";
import { DirectoryT } from "../../../../objects/Dirent";

const directory = ref<DirectoryT>([]);

onMounted(async () => {
    directory.value = (await window.api.readdir()) ?? [];
    console.log("[page2] dirents length:", directory.value.length);
});
</script>

<template>
    <div class="grid-wrap">
        <draggable
            v-model="directory"
            item-key="name"
            class="grid"
            ghost-class="ghost"
            :animation="150"
        >
            <template #item="{ element }">
                <div class="tile">{{ element.name }}</div>
            </template>
        </draggable>
    </div>
</template>

<style>
.ghost {
    opacity: 0.4;
}
</style>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(autofill, 1fr);
    gap: 0px;
}
.tile {
    background: #241717;
    border: 1px solid #ddd;
    border-radius: 0px;
    /* padding: 16px; */
    padding: 0 0px 0 20px;
    cursor: grab;
    user-select: none;
}
.tile:active {
    cursor: grabbing;
}

.grid-wrap {
    /* width: 800px; */
    height: 400px;
    overflow: auto; /* shows scrollbars only when needed */
}
</style>
