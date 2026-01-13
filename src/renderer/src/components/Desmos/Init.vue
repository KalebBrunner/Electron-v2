<script setup lang="ts">
import DesmosCanvas from "./DesmosCanvas.vue";
import { pendulumPhaseRenderer } from "./PendulumPhase";

// bump this value to re-run the renderer (e.g. when your project settings change)
const renderName = "pendulum-v1";
</script>

<template>
    <DesmosCanvas
        :task="pendulumPhaseRenderer()"
        :name="renderName"
        :clearOnRender="true"
    />
</template>
