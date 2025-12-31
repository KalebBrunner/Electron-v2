<script setup lang="ts">
import page2 from "./Emiter/Parent.vue";
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
        <page2 />
        <!-- <page2 /> -->
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
