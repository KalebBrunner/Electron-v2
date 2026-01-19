<script setup lang="ts">
import { reactive } from "vue";

const versions = reactive({ ...window.electron.process.versions });
</script>

<template>
    <div class="d-flex justify-content-center w-100">
        <ul class="list-group list-group-horizontal shadow-sm">
            <li class="list-group-item">
                <span class="text-muted">Electron</span>
                <span class="fw-semibold ms-1">v{{ versions.electron }}</span>
            </li>
            <li class="list-group-item">
                <span class="text-muted">Chromium</span>
                <span class="fw-semibold ms-1">v{{ versions.chrome }}</span>
            </li>
            <li class="list-group-item">
                <span class="text-muted">Node</span>
                <span class="fw-semibold ms-1">v{{ versions.node }}</span>
            </li>
        </ul>
    </div>
</template>
