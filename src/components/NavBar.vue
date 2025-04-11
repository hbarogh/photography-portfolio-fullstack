<script setup lang="ts">
</script>


<template>
<div class="nav-bar">
    <div class="nav-buttons-wrap">
      <router-link to="/Western">
        <button>Western</button>
      </router-link>

      <router-link to="/HomePage">
        <button>Home</button>
      </router-link>
    </div>
  </div>
</template>


<style>
.nav-bar {
  display: flex;
  align-items: center; /* Centers items vertically */
  justify-content: space-between; 
  flex-wrap: wrap;
}
</style>