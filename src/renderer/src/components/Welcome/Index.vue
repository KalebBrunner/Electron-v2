<script setup lang="ts">
import PageSwapDirectory from "../Navigation/PageSwapDirectory.vue";
import Versions from "./Versions.vue";
const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

const DuplicateWindow = (): void => {
    window.electron.ipcRenderer.send("window:create");
};

import { useCounterStore } from "../Pinia/Store";
const store = useCounterStore();
</script>

<template>
    <img
        alt="logo"
        class="logo"
        src="../../assets/electron.svg"
    />
    <div class="creator">Powered by electron-vite</div>
    <div class="text">
        Build an Electron app with
        <span class="vue">Vue</span>
        and
        <span class="ts">TypeScript</span>
    </div>
    <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
    <p class="tip">{{ store.name }}, {{ store.count }}</p>
    <div class="actions">
        <PageSwapDirectory />
    </div>
    <div class="actions">
        <div class="action">
            <a
                href="https://electron-vite.org/"
                target="_blank"
                rel="noreferrer"
                >Documentation</a
            >
        </div>
        <div class="action">
            <a
                target="_blank"
                rel="noreferrer"
                @click="ipcHandle"
                >Send IPC</a
            >
        </div>
        <div class="action">
            <a
                target="_blank"
                rel="noreferrer"
                @click="DuplicateWindow"
                >Duplicate Window</a
            >
        </div>
    </div>
    <Versions />
</template>
