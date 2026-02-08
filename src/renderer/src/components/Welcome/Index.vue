<script setup lang="ts">
import PageSwapDirectory from "../Navigation/List.vue";
import Versions from "./Versions.vue";

const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

const DuplicateWindow = (): void => {
    window.electron.ipcRenderer.send("window:create");
};

import { useCounterStore } from "../Pinia/Store";
const store = useCounterStore();
</script>

<template>
    <div class="welcome-bg">
        <div
            class="container vh-100 d-flex flex-column justify-content-center align-items-center text-center py-4"
        >
            <!-- Logo -->
            <img
                alt="logo"
                src="../../assets/art/electron.svg"
                class="mb-4"
                style="width: 120px; height: 120px"
            />

            <!-- Creator -->
            <div class="text-muted fw-semibold mb-2">
                Powered by electron-vite
            </div>

            <!-- Main heading -->
            <h1 class="display-6 fw-bold mb-3">
                Build an Electron app with
                <span class="text-success">Vue</span>
                and
                <span class="text-primary">TypeScript</span>
            </h1>

            <!-- Tips -->
            <p class="text-secondary mb-2">
                Please try pressing <code>F12</code> to open the devTool
            </p>

            <p class="text-secondary mb-4">
                {{ store.name }}, <span class="fw-bold">{{ store.count }}</span>
            </p>

            <!-- Navigation directory -->
            <div class="mb-3 w-100 d-flex justify-content-center">
                <PageSwapDirectory />
            </div>

            <!-- Actions -->
            <div class="d-flex flex-wrap gap-2 justify-content-center">
                <a
                    class="btn btn-primary"
                    href="https://electron-vite.org/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Documentation
                </a>

                <button
                    type="button"
                    class="btn btn-primary"
                    @click="ipcHandle"
                >
                    Send IPC
                </button>

                <button
                    type="button"
                    class="btn btn-primary"
                    @click="DuplicateWindow"
                >
                    Duplicate Window
                </button>
            </div>

            <!-- Versions pinned near bottom -->
            <div class="mt-auto pt-4">
                <Versions />
            </div>
        </div>
    </div>
</template>

<style scoped>
.welcome-bg {
    min-height: 100vh;
    width: 100vw;

    /* Bootstrap-friendly centering */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    /* the old preset background */
    background-image: url("../../assets/art/wavy-lines.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>
