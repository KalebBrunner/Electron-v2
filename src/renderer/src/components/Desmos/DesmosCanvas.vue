<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";

declare const Desmos: any;

export type DesmosRenderer = (calc: any) => void | (() => void);

const props = defineProps<{
    task: DesmosRenderer;
    options?: Record<string, any>;
    /** change this to force a full re-render */
    name?: string | number;
    /** if true, call calc.setBlank() before running renderer */
    clearOnRender?: boolean;
}>();

const el = ref<HTMLDivElement | null>(null);
let calc: any = null;
let cleanup: void | (() => void) = undefined;

function runRenderer() {
    if (!calc) return;

    // run previous cleanup if renderer returned one
    if (typeof cleanup === "function") cleanup();
    cleanup = undefined;

    if (props.clearOnRender) calc.setBlank();

    const maybeCleanup = props.task(calc);
    if (typeof maybeCleanup === "function") cleanup = maybeCleanup;
}

onMounted(() => {
    if (!el.value) return;

    calc = Desmos.GraphingCalculator(el.value, {
        expressions: true,
        settingsMenu: true,
        ...(props.options ?? {}),
    });

    runRenderer();
});

watch(
    () => props.name,
    () => runRenderer(),
);

onBeforeUnmount(() => {
    if (typeof cleanup === "function") cleanup();
    calc?.destroy?.();
    calc = null;
});
</script>

<template>
    <div
        ref="el"
        class="desmos"
    ></div>
</template>

<style scoped>
.desmos {
    width: calc(100vw - 40px);
    height: calc(100vh - 40px); /* adjust if you have a header */
}
</style>
