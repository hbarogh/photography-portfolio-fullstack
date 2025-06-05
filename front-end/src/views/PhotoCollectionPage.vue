<script setup lang="ts">
import {NGrid, NGridItem, NImage, NCard, NSkeleton} from 'naive-ui';
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios';
const route = useRoute()
const collection = ref(route.params.collection as string); 
const photos = ref<string[]>([]);
const skeleton = ref(true)
async function fetchPhotos(collection: string): Promise<void> {
  try{
    const response = await axios.get(`https://backend-3497.onrender.com/api/photos/${collection}`);
    photos.value = response.data.map((img: any) => img.optimized_url);
  }
  catch (error){
    alert(`Axios error: ${error}`);
    console.error('Axios error:', error);
  }
  finally{
    skeleton.value = false
  }
}

onMounted(() => {
  fetchPhotos(collection.value);
})

watch(() => route.params.collection, (newCollection) => {
  collection.value = newCollection as string;
  fetchPhotos(collection.value) 
});


</script>


<template>
  <div>
    <h1 class="collection-title">{{ collection }} Collection</h1>
    <div class="container">
      <n-grid v-if="skeleton" cols="1 s:2 m:3 1:5" x-gap="10" y-gap="8" responsive="screen" class="skeleton-grid">
        <n-grid-item v-for="n in 12" :key="n">
          <n-card :bordered="false">
            <n-skeleton height="350px" width="100%" :sharp="false"/>
          </n-card>
        </n-grid-item>
      </n-grid>

      <n-grid v-else cols="1 s:2 m:3 1:5" x-gap="10" y-gap="8" class="photo-grid" responsive="screen">
        <n-grid-item v-for="(url, index) in photos" :key="index" >
          <n-card :bordered="false" :hoverable="true" class="grid-card">
            <n-image :src="url" lazy alt="photo" width="100%" height="100%" class="photo-img" object-fit="cover" />
          </n-card>
        </n-grid-item>
      </n-grid>
      <!-- <n-grid v-else cols="1 s:2 m:3 1:5" x-gap="10" y-gap="8" class="photo-grid" responsive="screen">
        <n-grid-item v-for="(url, index) in photos" :key="index" >
        </n-grid-item>
      </n-grid> -->
      
      <!-- <n-card v-else v-for="(url,index) in photos" :key="index" :bordered="false" :hoverable="true" class="grid-card">
        <n-image :src="url" lazy alt="photo" width="100%" height="100%" class="photo-img" object-fit="cover" />
      </n-card>
       -->
    </div>
  </div>

</template>



<style>


 .skeleton-grid{
  width: 100%;
  max-width: 1000px;
  align-items: center;
 }
 .collection-title{
  text-align: center;
 }

 .photo-grid{
  padding: 0;
  display: flex;

 }

 .container{
  max-width: 1224px;
  width: 90%;
  margin: auto;
  padding: 1rem;
 }

 .grid-card{
  display: flex;
  flex-direction: column;
 }

 
</style>