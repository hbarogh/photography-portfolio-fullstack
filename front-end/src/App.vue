<script setup lang="ts">
import BottomNav from './components/BottomNav.vue';
import NavBar from './components/NavBar.vue';
import ScrollToTopButton from './components/ScrollToTopButton.vue';
import {Analytics} from '@vercel/analytics/vue';
import { lightTheme, NConfigProvider } from 'naive-ui';
import { ref, onMounted, onBeforeUnmount } from "vue";

const isMobile = ref(false);

function checkSize(): void {
  isMobile.value = window.innerWidth <= 500;
}

onMounted(() => {
  checkSize();
  window.addEventListener("IsMobile", checkSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("IsMobile", checkSize);
});
</script>

<template>
  <n-config-provider :theme="lightTheme">
    <NavBar/>
    <ScrollToTopButton/>
    <router-view/>
    <Analytics/>
    <BottomNav v-if="isMobile"/>
  </n-config-provider>
</template>

<style scoped>

</style>
