<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { NImage, NSkeleton, NCard, NGrid, NGridItem } from 'naive-ui';
const collection = ref("HomePage");
const photos = ref<string[]>([]);
const skeleton = ref(true)

async function fetchPhotos(collection: string): Promise<void> {
  try{
    const response = await axios.get(`https://backend-3497.onrender.com/api/photos/${collection}`);
    photos.value = response.data.map((img: any) => img.optimized_url);
    console.log(`response: ${response}`);
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
  fetchPhotos(collection.value)
});


</script>


<template>
  <div>
    <h1 class="home-title">Home Page</h1>
  </div>
  <n-skeleton v-if="skeleton"  :repeat="2" height="40px" width="60%" :sharp="false"/>
  <div class="hero-img">
    <n-image :src="photos[0]" width="100%" object-fit="cover"/>
    <n-grid  cols="1 s:2 m:3 1:5" x-gap="10" y-gap="8" responsive="screen">
      <n-grid-item v-for="(url, index) in photos" :key="index">
        <n-card >
          <n-image :src=url>
            
          </n-image>
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

</style>