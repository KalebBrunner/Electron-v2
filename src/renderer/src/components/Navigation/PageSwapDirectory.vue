<script setup lang="ts">
import { PageName, pageSwapTo } from "./NavigationTools";
</script>
<template>
    <div class="action">
        <a
            target="_blank"
            rel="noreferrer"
            @click="pageSwapTo(PageName.Welcome)"
            >Welcome Page</a
        >
        <a
            target="_blank"
            rel="noreferrer"
            @click="pageSwapTo(PageName.FileExplorer)"
            >File Explorer</a
        >
        <a
            target="_blank"
            rel="noreferrer"
            @click="pageSwapTo(PageName.Emitter)"
            >Emitter</a
        >
        <a
            target="_blank"
            rel="noreferrer"
            @click="pageSwapTo(PageName.MonadA)"
            >Monad</a
        >
        <a
            target="_blank"
            rel="noreferrer"
            @click="pageSwapTo(PageName.Pinia)"
            >Pinia</a
        >
        <a
            target="_blank"
            rel="noreferrer"
            @click="pageSwapTo(PageName.Desmos)"
            >Desmos</a
        >
    </div>
</template>
