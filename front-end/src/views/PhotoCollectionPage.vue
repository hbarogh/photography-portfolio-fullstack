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
    <h1>{{ collection }} Collection</h1>
    <div>
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
            <n-image :src="url" lazy alt="photo" width="100%" class="photo-img" object-fit="cover" />
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
    <!-- <n-carousel
    effect="card"
    prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
    next-slide-style="transform: translateX(50%) translateZ(-800px);"
    style="height: 90vh"
    :show-dots="false"
    >
      <n-carousel-item v-for="(url, index) in photos" :key="index" :style="{ width: '60%' }">
        <img
          class="carousel-img"
          :src="url"
        >
      </n-carousel-item>
    </n-carousel> -->
  </div>

</template>



<style>
/* .carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

 .skeleton-grid{
  width: 100%;
  max-width: 1000px;
 }
 /* .grid-card{
  max-width: 600px;
 }
 .photo-img{
  height: 300px;
  object-fit: cover;
 } */
</style>