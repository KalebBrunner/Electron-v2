<script setup lang="ts">
import { computed, ref } from "vue";
import katex from "katex";
import "katex/dist/katex.min.css";

type EqRow = {
    id: string;
    input: string;
    displayMode: boolean;
};

const rows = ref<EqRow[]>([
    { id: crypto.randomUUID(), input: String.raw`E = mc^2`, displayMode: true },
    {
        id: crypto.randomUUID(),
        input: String.raw`\int_0^1 x^2 \, dx = \frac{1}{3}`,
        displayMode: true,
    },
]);

function addRow() {
    rows.value.push({
        id: crypto.randomUUID(),
        input: "",
        displayMode: true,
    });
}

function removeRow(id: string) {
    rows.value = rows.value.filter((r) => r.id !== id);
}

function normalizeLatex(s: string) {
    const t = s.trim();

    // Allow users to type common delimiters; strip them before rendering
    if (t.startsWith("$$") && t.endsWith("$$") && t.length >= 4)
        return t.slice(2, -2).trim();
    if (t.startsWith("$") && t.endsWith("$") && t.length >= 2)
        return t.slice(1, -1).trim();
    if (t.startsWith("\\[") && t.endsWith("\\]")) return t.slice(2, -2).trim();
    if (t.startsWith("\\(") && t.endsWith("\\)")) return t.slice(2, -2).trim();

    return t;
}

function renderLatex(latex: string, displayMode: boolean) {
    const cleaned = normalizeLatex(latex);

    if (!cleaned) return { html: "", error: "" };

    try {
        const html = katex.renderToString(cleaned, {
            displayMode,
            throwOnError: false,
            strict: "warn",
            trust: false,
            output: "html",
        });
        return { html, error: "" };
    } catch (err: any) {
        return { html: "", error: String(err?.message ?? err) };
    }
}

const rendered = computed(() =>
    rows.value.map((r) => ({
        id: r.id,
        ...renderLatex(r.input, r.displayMode),
    })),
);
</script>

<template>
    <div class="equation-panel">
        <div class="header">
            <div class="title">Equations</div>
            <button
                class="btn"
                @click="addRow"
            >
                + Add
            </button>
        </div>

        <div class="list">
            <div
                v-for="(row, idx) in rows"
                :key="row.id"
                class="row"
            >
                <div class="row-top">
                    <div class="label">#{{ idx + 1 }}</div>

                    <label class="toggle">
                        <input
                            type="checkbox"
                            v-model="row.displayMode"
                        />
                        <span>Display</span>
                    </label>

                    <button
                        class="btn danger"
                        @click="removeRow(row.id)"
                    >
                        Remove
                    </button>
                </div>

                <textarea
                    v-model="row.input"
                    class="textbox"
                    placeholder="Type LaTeX here, e.g. \frac{a}{b}, \alpha, \sqrt{x}, \sum_{i=1}^n i"
                    rows="3"
                    spellcheck="false"
                />

                <div class="preview">
                    <div
                        v-if="rendered[idx]?.html"
                        class="math"
                        v-html="rendered[idx].html"
                    />
                    <div
                        v-else
                        class="hint"
                    >
                        Preview…
                    </div>

                    <div
                        v-if="rendered[idx]?.error"
                        class="error"
                    >
                        {{ rendered[idx].error }}
                    </div>
                </div>

                <div class="examples">
                    Examples:
                    <code>\alpha + \beta</code>
                    <code>\frac{1}{1+x}</code>
                    <code>\int_0^\infty e^{-x}\,dx</code>
                    <code>\sum_{i=1}^n i</code>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.equation-panel {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
    background: #0b1020;
    color: rgba(255, 255, 255, 0.9);
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.2px;
}

.btn {
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.9);
    padding: 6px 10px;
    border-radius: 10px;
    cursor: pointer;
}
.btn:hover {
    background: rgba(255, 255, 255, 0.1);
}
.btn.danger {
    border-color: rgba(248, 113, 113, 0.35);
    background: rgba(248, 113, 113, 0.08);
}

.list {
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-right: 4px;
}

.row {
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 14px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.04);
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.row-top {
    display: flex;
    align-items: center;
    gap: 10px;
}
.label {
    font-size: 12px;
    opacity: 0.8;
}

.toggle {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    opacity: 0.9;
}
.toggle input {
    accent-color: #60a5fa;
}

.textbox {
    width: 100%;
    resize: vertical;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(0, 0, 0, 0.25);
    color: rgba(255, 255, 255, 0.92);
    padding: 10px 12px;
    font-family:
        ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
        "Liberation Mono", "Courier New", monospace;
    font-size: 12px;
    outline: none;
}
.textbox:focus {
    border-color: rgba(96, 165, 250, 0.7);
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.12);
}

.preview {
    border-radius: 12px;
    padding: 10px 12px;
    background: rgba(0, 0, 0, 0.22);
    border: 1px solid rgba(255, 255, 255, 0.1);
    min-height: 44px;
}

.math :deep(.katex) {
    font-size: 1.05em;
}

.hint {
    font-size: 12px;
    opacity: 0.6;
}

.error {
    margin-top: 8px;
    font-size: 12px;
    color: rgba(248, 113, 113, 0.95);
}

.examples {
    font-size: 12px;
    opacity: 0.75;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
.examples code {
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    padding: 2px 8px;
    border-radius: 999px;
}
</style>
