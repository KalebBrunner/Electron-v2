<script setup lang="ts">
import PageRouter from "./components/Navigation/PageRouter.vue";
import { computed } from "vue";
import { currentPage, PageName } from "./components/Navigation/NavigationTools";

const isWelcome = computed(() => currentPage.value === PageName.Welcome);
</script>

<template>
    <div
        class="AppShell"
        :class="{ WelcomeMode: isWelcome }"
    >
        <PageRouter />
    </div>
</template>
