<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

const tiles = ref([
    { id: 1, label: "A" },
    { id: 2, label: "B" },
    { id: 3, label: "C" },
    { id: 4, label: "D" },
]);
</script>

<template>
    <draggable
        v-model="tiles"
        item-key="id"
        class="grid"
        ghost-class="ghost"
        :animation="150"
    >
        <template #item="{ element }">
            <div class="tile">{{ element.label }}</div>
        </template>
    </draggable>
</template>

<style>
.ghost {
    opacity: 0.4;
}
</style>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
}
.tile {
    background: #241717;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 16px;
    cursor: grab;
    user-select: none;
}
.tile:active {
    cursor: grabbing;
}
</style>
