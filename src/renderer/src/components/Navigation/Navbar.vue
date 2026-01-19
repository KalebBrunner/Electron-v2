<script setup lang="ts">
import PageSwapDirectory from "./PageSwapDirectory.vue";
</script>

<template>
    <header class="sticky-top border-bottom shadow-sm bg-body-tertiary">
        <nav class="navbar navbar-expand">
            <div class="container-fluid d-flex align-items-center">
                <!-- Left: Brand -->
                <span class="navbar-brand mb-0 h6"> The Lab </span>

                <!-- Center: Nav -->
                <div class="mx-auto">
                    <PageSwapDirectory />
                </div>

                <!-- Right spacer: keeps the center actually centered -->
                <div style="width: 110px"></div>
            </div>
        </nav>
    </header>
</template>
