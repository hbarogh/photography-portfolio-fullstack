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

      <!-- <n-grid v-else cols="3" x-gap="10" y-gap="8" class="photo-grid" responsive="screen">
        <n-grid-item v-for="(url, index) in photos" :key="index" >
          <n-card :bordered="false" :hoverable="true" class="grid-card">
            <n-image :src="url" lazy alt="photo" width="100%" height="100%" class="photo-img" object-fit="cover" />
          </n-card>
        </n-grid-item>
      </n-grid> -->
      
      <div v-else class="photo-gallery-masonry">
        <div v-for="(url, index) in photos" :key="index" class="masonry-item">
          <n-card :bordered="false" :hoverable="false" class="grid-card">
            <n-image :src="url" lazy width="100%" height="100%" alt="photo" class="photo-img" object-fit="cover"/>
          </n-card>
        </div>
      </div>
      
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



 .container{
  max-width: 1224px;
  width: 90%;
  margin: auto;
  padding: 1rem;
 }

 .photo-gallery-masonry{
  column-count: 1;
  column-gap: 0.25rem;
  align-items: center;

  @media (min-width: 640px){
    column-count: 2;
  }

  @media (min-width: 1024px){
    column-count: 3;
  }
 }

 .masonry-item{
  break-inside: avoid;
  margin-bottom: 0.5rem;
 }

 
</style>