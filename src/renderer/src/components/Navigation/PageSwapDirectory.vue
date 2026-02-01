<script setup lang="ts">
import { PageName, pageSwapTo, currentPage } from "./NavigationTools";

const go = (page: PageName) => pageSwapTo(page);
const isActive = (page: PageName) => currentPage.value === page;
</script>

<template>
    <ul class="navbar-nav flex-row flex-wrap justify-content-center gap-2">
        <li
            class="nav-item"
            v-for="item in [
                { label: 'Welcome', page: PageName.Welcome },
                { label: 'File Explorer', page: PageName.FileExplorer },
                { label: 'Emitter', page: PageName.Emitter },
                { label: 'Monad', page: PageName.MonadA },
                { label: 'Pinia', page: PageName.Pinia },
                { label: 'Desmos', page: PageName.DesmosPg },
                { label: 'Canvas', page: PageName.GraphCanvas },
            ]"
            :key="item.label"
        >
            <a
                href="#"
                class="nav-link px-3 py-2 rounded-pill"
                :class="isActive(item.page) ? 'tab-active' : 'tab-inactive'"
                @click.prevent="go(item.page)"
            >
                {{ item.label }}
            </a>
        </li>
    </ul>
</template>

<style scoped>
/* Square “selected tab” */
.tab-active {
    background: var(--bs-primary);
    color: #fff !important;
    border-color: var(--bs-primary) !important;
    font-weight: 600;
}

/* Square “unselected tab” */
.tab-inactive {
    background: var(--bs-secondary-bg-subtle);
    color: var(--bs-secondary-text-emphasis) !important;
    border-color: var(--bs-secondary-border-subtle) !important;
}

.tab-inactive:hover {
    background: var(--bs-secondary-bg);
}
</style>
