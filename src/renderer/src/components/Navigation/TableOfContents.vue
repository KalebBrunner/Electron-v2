<script setup lang="ts">
import { PageId, pageSwapTo } from "./NavState";
</script>
<template>
    <a
        target="_blank"
        rel="noreferrer"
        @click="pageSwapTo(PageId.TableOfContents)"
        >Go to Table of Contents</a
    >
    <a
        target="_blank"
        rel="noreferrer"
        @click="pageSwapTo(PageId.Welcome)"
        >Go to Table of Contents</a
    >
    <a
        target="_blank"
        rel="noreferrer"
        @click="pageSwapTo(PageId.FileExplorer)"
        >Go to Table of Contents</a
    >
    <a
        target="_blank"
        rel="noreferrer"
        @click="pageSwapTo(PageId.Emitter)"
        >Go to Table of Contents</a
    >
</template>
