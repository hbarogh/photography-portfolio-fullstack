<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { NImage, NSkeleton, NCard, NGrid, NGridItem } from 'naive-ui';
const collection = ref("HomePage");
const photos = ref<{optimized_url: string, collectionLabel: string}[]>([]);
// const photos = ref<string[]>([]);
const skeleton = ref(true)

async function fetchPhotos(collection: string): Promise<void> {
  try{
    const response = await axios.get(`https://backend-3497.onrender.com/api/photos/${collection}`);
    photos.value = response.data.map((img: any) => ({
      optimized_url: img.optimized_url,
      collectionLabel: img.collectionLabel
  }));
    console.log(`response: ${response}`);
    // console.log(`photos: ${photos.value}`)
  }
  catch (error){
    alert(`Axios error: ${error}`);
    console.error('Axios error:', error);
  }
  finally{
    skeleton.value = false 
  }
}

function handleWorkCardClick(){

}

onMounted(() => {
  fetchPhotos(collection.value)
});


</script>


<template>
  <pre>{{ photos }}</pre>
  <div>
    <h1 class="home-title">Home Page</h1>
  </div>
  <n-skeleton v-if="skeleton"  :repeat="2" height="40px" width="60%" :sharp="false"/>
  <div class="hero-img">
    <n-image v-if="photos.length > 0" :src="photos[0].optimized_url" width="100%" object-fit="cover"/>
    <n-grid  cols="1 s:2 m:3 1:5" x-gap="10" y-gap="8" responsive="screen">
      <n-grid-item v-for="(photo, index) in photos" :key="index">
        <n-card :bordered="false" :hoverable="true" @click="handleWorkCardClick()">
          <n-image :src="photo.optimized_url" lazy alt="photo" width="100%" class="photo-img" object-fit="cover">
          </n-image>
          <div class="overlay-text">
            {{ photo.collectionLabel }}
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>



<style>
.home-title{
  text-align: center;
}

.hero-img{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.overlay-text {
  position: absolute;
  bottom: 10px;
  left: 12px;
  color: rgb(255, 255, 255);
  background-color: rgba(0, 0, 0, 0.6);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  z-index: 1;
}
</style>