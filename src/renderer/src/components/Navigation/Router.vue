<script setup lang="ts">
import { currentPage, PageName } from "./Nav";

import Welcome from "../Welcome/Index.vue";
import Emitter from "../Emiter/Parent.vue";
import FileExplorer from "../FileExplorer/ExploreElement.vue";
import MonadA from "../Monoids/MonadA.vue";
import Pinia from "../Pinia/Index.vue";
import Navbar from "./Navbar.vue";
import Desmos from "../Desmos/ProjectA.vue";
import GraphCanvas from "../Canvas/Index.vue";
</script>

<template>
    <!-- <div class="AppPrimary"> -->
    <!-- PageRouter.vue -->
    <Welcome v-if="currentPage === PageName.Welcome" />
    <div
        v-else
        class="AppSub"
    >
        <Navbar />

        <!-- Page router's active page -->
        <main class="body">
            <Emitter v-if="currentPage === PageName.Emitter" />
            <FileExplorer v-if="currentPage === PageName.FileExplorer" />
            <MonadA v-if="currentPage === PageName.MonadA" />
            <Pinia v-if="currentPage === PageName.Pinia" />

            <Desmos v-if="currentPage === PageName.DesmosPg" />
            <GraphCanvas v-if="currentPage === PageName.GraphCanvas" />
        </main>
    </div>
    <!-- </div> -->
</template>

<style scoped>
.AppSub {
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
}

.body {
    flex: auto;
}
</style>
