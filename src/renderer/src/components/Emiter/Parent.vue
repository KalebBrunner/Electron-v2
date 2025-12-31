<script setup lang="ts">
import Child from "./Child.vue";
import { ref } from "vue";

const title = ref("Hello World!");
const count = ref(5);
</script>

<template>
    <div>
        <p>Parent says: {{ title }}</p>
        <Child
            v-model="title"
            v-model:count="count"
        />
    </div>
</template>
