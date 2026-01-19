<script setup lang="ts">
import { currentPage, PageName } from "./NavigationTools";

import Welcome from "../Welcome/Index.vue";
import Emitter from "../Emiter/Parent.vue";
import FileExplorer from "../FileExplorer/ExploreElement.vue";
import MonadA from "../Monoids/MonadA.vue";
import Pinia from "../Pinia/Index.vue";
import Navbar from "./Navbar.vue";
import Desmos from "../Desmos/Canvas2.vue";
</script>

<template>
    <!-- Welcome page: NO navbar -->
    <Welcome v-if="currentPage === PageName.Welcome" />

    <!-- All other pages: header + content -->
    <div
        v-else
        class="min-vh-100 d-flex flex-column"
    >
        <Navbar />

        <main class="flex-grow-1">
            <Emitter v-if="currentPage === PageName.Emitter" />
            <FileExplorer v-if="currentPage === PageName.FileExplorer" />
            <MonadA v-if="currentPage === PageName.MonadA" />
            <Pinia v-if="currentPage === PageName.Pinia" />
            <Desmos v-if="currentPage === PageName.Desmos" />
        </main>
    </div>
</template>
