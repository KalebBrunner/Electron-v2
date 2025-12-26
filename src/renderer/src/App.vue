<script setup lang="ts">
import { ref } from "vue";
import Welcome from "./components/Welcome.vue";
import Dev from "./components/DevPage.vue";

const page = ref<"page1" | "page2">("page1");
</script>

<template>
    <Welcome
        v-if="page === 'page1'"
        @EnterMainCode="page = 'page2'"
    />
    <Dev
        v-if="page === 'page2'"
        @GotoFrontPage="page = 'page1'"
    />
</template>
