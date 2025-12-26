<script setup lang="ts">
import ExplorerWindow from "./FileExplorer/ExploreElement.vue";
const platform = window.api.platform;
</script>

<template>
    <div>this is page 2</div>
    <div>You are using {{ platform }}</div>

    <div class="actions">
        <div class="action">
            <a
                target="_blank"
                rel="noreferrer"
                @click="$emit('GotoFrontPage')"
            >
                Go to welcome page
            </a>
        </div>
    </div>
    <div class="row">
        <ExplorerWindow />
        <ExplorerWindow />
    </div>
</template>

<style scoped>
.row {
    display: flex;
    gap: 12px;
    align-items: stretch;
}

.row > * {
    flex: 1; /* each takes half the width */
    min-width: 0; /* prevents overflow issues */
}
</style>
