<script setup lang="ts">
import DesmosCanvas from "./DesmosCanvas.vue";

const graphA: GraphConfig = {
    settings: { degreeMode: false },
    expressions: [{ id: "fx", latex: "f(x)=2x^2" }],
};
</script>

<template>
    <div>
        <DesmosCanvas :graph="graphA" />
    </div>
    <div>
        <DesmosCanvas :graph="graphA" />
    </div>
</template>
