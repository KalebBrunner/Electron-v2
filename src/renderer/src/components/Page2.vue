<script setup lang="ts">
import { Dirent } from 'src/objects/Dirent';



const platform = window.api.platform
const myfile: Dirent = window.api.getfile()

</script>

<template>
    <div>this is page 2</div>
    <div>You are using {{ platform }}</div>
    <div>Here is the file {{ myfile }}</div>
    <div class="actions">
        <div class="action">
            <a target="_blank" rel="noreferrer" @click="$emit('GotoFrontPage')">Go to front page</a>
        </div>
    </div>
</template>
