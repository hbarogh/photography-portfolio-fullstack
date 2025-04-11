<script setup lang="ts">
  import { NMenu } from 'naive-ui';
  import { useRouter } from 'vue-router';
  import {menuOptions} from '../constants/menu-options';
  
  const router = useRouter()

  function handleMenuSelect(key: string){
    router.push({name: key})
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