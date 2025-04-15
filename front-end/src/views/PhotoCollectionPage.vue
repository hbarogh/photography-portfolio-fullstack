<script setup lang="ts">
import {NGrid, NGridItem, NImage} from 'naive-ui';
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const collection = route.params.collection as string 


</script>


<template>
  <div>
    <h1>Photo Collection Page</h1>
  </div>
</template>



<style>
</style>