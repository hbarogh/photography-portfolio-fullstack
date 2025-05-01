<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import ScrollToTopButton from './components/ScrollToTopButton.vue';
import {Analytics} from '@vercel/analytics/vue';
</script>

<template>
  <NavBar/>
  <ScrollToTopButton/>
  <router-view/>
  <Analytics/>
</template>

<style scoped>

</style>
