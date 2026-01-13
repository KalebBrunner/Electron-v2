<script setup lang="ts">
import { currentPage, PageName } from "./NavigationTools";

import Welcome from "../Welcome/Index.vue";
import Emitter from "../Emiter/Parent.vue";
import FileExplorer from "../FileExplorer/ExploreElement.vue";
import MonadA from "../Monoids/MonadA.vue";
import Pinia from "../Pinia/Index.vue";
import Navbar from "./Navbar.vue";
import Desmos from "../Desmos/Init.vue";
</script>
<template>
    <Welcome v-if="currentPage === PageName.Welcome" />
    <div v-else>
        <Navbar />
        <div class="HasNavbar">
            <Emitter v-if="currentPage === PageName.Emitter" />
            <FileExplorer v-if="currentPage === PageName.FileExplorer" />
            <MonadA v-if="currentPage === PageName.MonadA" />
            <Pinia v-if="currentPage === PageName.Pinia" />
            <Desmos v-if="currentPage === PageName.Desmos" />
        </div>
    </div>
</template>

<style scoped>
.HasNavbar {
    padding-top: 64px; /* adjust to match toc-nav height (padding + link height) */
}
</style>
