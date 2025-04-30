<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue';
import { NButton, NIcon } from 'naive-ui';
import {ArrowUpCircleOutline} from '@vicons/ionicons5'; 
const showButton = ref(false)
function handleScroll():void {
  showButton.value = window.scrollY > 250 
}

function scrollToTop():void {
  window.scrollTo({ top: 0, behavior: 'smooth'})
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <n-button v-show="showButton" @click="scrollToTop" style="position: fixed; bottom: 2rem; right: 2rem; z-index: 1000" circle type="default" >
    <n-icon size="24">
      <ArrowUpCircleOutline/>
    </n-icon>
  </n-button>
</template>


<style>

</style>