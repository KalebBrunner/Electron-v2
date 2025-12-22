<script setup lang="ts">
import DraggableTest from "./Draggable.vue";
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
    <DraggableTest />
</template>
