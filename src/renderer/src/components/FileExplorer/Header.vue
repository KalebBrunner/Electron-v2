<template>
    <div class="header">
        <button
            class="link"
            type="button"
        >
            Edit
        </button>
        <span class="sep">|</span>
        <button
            class="link"
            type="button"
        >
            Delete
        </button>
        <span class="sep">|</span>
        <button
            class="back"
            type="button"
        >
            Go back
        </button>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    align-items: left;
    gap: 0px;
    background-color: white;
    /* padding: 12px 16px; */
    border-bottom: 1px solid #ddd;
}

.sep {
    opacity: 0.6;
}

.link,
.back {
    background: none;
    border: none;
    padding: 12px 16px;
    border-radius: 0px;
    cursor: pointer;
}

.link:hover,
.back:hover {
    background: #f3f3f3;
}
</style>
