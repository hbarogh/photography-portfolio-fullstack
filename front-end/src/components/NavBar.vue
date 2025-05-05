<script setup lang="ts">
  import { NMenu } from 'naive-ui';
  import { useRouter } from 'vue-router';
  import {menuOptions} from '../constants/menu-options';
  
  const router = useRouter()

  function handleMenuSelect(key: string){
    if (key === 'Home') {
      router.push({ name: 'Home' })
    } 
    else if (key === 'AboutPage') {
      router.push({ name: 'AboutPage' })
    } 
    else if (key === 'ContactPage'){
      router.push({name: 'ContactPage'})
    }
    else {
      // Anything else is assumed to be a collection
      router.push({ name: 'PhotoCollectionPage', params: { collection: key } })
     }
  }

</script>


<template>
    <n-menu class="nav-bar"
    mode="horizontal" 
    :options="menuOptions"
    @update:value="handleMenuSelect"
    />
</template>


<style>
.nav-bar {
  display: flex;
  align-items: center; /* Centers items vertically */
  justify-content: space-between; 
  flex-wrap: wrap;
}
</style>