<script setup lang="ts">
import PageSwapDirectory from "./List.vue";
</script>

<template>
    <!-- Navbar.vue -->
    <header class="sticky-top border-bottom shadow-sm bg-body-tertiary">
        <nav class="navbar navbar-expand">
            <div class="container-fluid d-flex align-items-center">
                <span class="navbar-brand mb-0 h6"> The Lab </span>

                <div class="mx-auto">
                    <PageSwapDirectory />
                </div>

                <div style="width: 110px"></div>
            </div>
        </nav>
    </header>
</template>
