<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import ScrollToTopButton from './components/ScrollToTopButton.vue';
import {Analytics} from '@vercel/analytics/vue';
import { lightTheme, NConfigProvider } from 'naive-ui';
</script>

<template>
  <n-config-provider :theme="lightTheme">
    <NavBar/>
    <ScrollToTopButton/>
    <router-view/>
    <Analytics/>
  </n-config-provider>
</template>

<style scoped>

</style>
