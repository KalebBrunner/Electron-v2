<script setup lang="ts">
import { ref } from 'vue'
import Page1 from './components/FrontPage.vue'
import Page2 from './components/Page2.vue'

const page = ref<'page1' | 'page2'>('page1')
</script>

<template>
  <Page1 v-if="page === 'page1'" @EnterMainCode="page = 'page2'" />
  <Page2 v-if="page === 'page2'" @GotoFrontPage="page = 'page1'" />
</template>
