<script setup lang="ts">
import { useCounterStore } from "./Store";

const store = useCounterStore();
</script>

<template>
    <div>This is Pinia</div>
    <div>Store data: {{ store.name }}, {{ store.count }}</div>
    <div class="action">
        <a @click="store.increment">Increment</a>
    </div>
</template>
