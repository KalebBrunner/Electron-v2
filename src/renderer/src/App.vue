<script setup lang="ts">
import {
    currentPage,
    PageId,
    pageSwapTo,
} from "./components/Navigation/NavState";

import Welcome from "./components/Welcome/Index.vue";
import Emitter from "./components/Emiter/Parent.vue";
import FileExplorer from "./components/FileExplorer/ExploreElement.vue";
import MonadA from "./components/Monoids/MonadA.vue";
</script>

<template>
    <Welcome v-if="currentPage === PageId.Welcome" />
    <div v-else>
        <div class="navbar">
            <div class="action">
                <a
                    target="_blank"
                    rel="noreferrer"
                    @click="pageSwapTo(PageId.Welcome)"
                    >Welcome Page</a
                >
                <a
                    target="_blank"
                    rel="noreferrer"
                    @click="pageSwapTo(PageId.FileExplorer)"
                    >File Explorer</a
                >
                <a
                    target="_blank"
                    rel="noreferrer"
                    @click="pageSwapTo(PageId.Emitter)"
                    >Emitter</a
                >
                <a
                    target="_blank"
                    rel="noreferrer"
                    @click="pageSwapTo(PageId.MonadA)"
                    >Monad</a
                >
            </div>
        </div>

        <div class="page">
            <Emitter v-if="currentPage === PageId.Emitter" />
            <FileExplorer v-if="currentPage === PageId.FileExplorer" />
            <MonadA v-if="currentPage === PageId.MonadA" />
        </div>
    </div>
</template>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;

    /* center items */
    display: flex;
    justify-content: center;

    /* give it a real bar height so it’s predictable */
    padding: 0px 0;

    /* optional but helps readability if content scrolls underneath */
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(6px);
}

.page {
    padding-top: 64px; /* adjust to match toc-nav height (padding + link height) */
}
</style>
