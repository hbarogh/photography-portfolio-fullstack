<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
import { NImage, NSkeleton, NCard, NGrid, NGridItem } from 'naive-ui';
import ContactForm from '../components/ContactForm.vue';
const collection:string = "HomePage";
const photos = ref<{optimized_url: string, collectionLabel: string}[]>([]);
// const photos = ref<string[]>([]);
const skeleton = ref(true);
const router = useRouter();
const isMobile =ref(false);
async function fetchPhotos(collection: string): Promise<void> {
  try{
    const response = await axios.get(`https://backend-3497.onrender.com/api/photos/${collection}`);
    // const response = await axios.get(`http://localhost:5000/api/photos/${collection}`);
    photos.value = response.data.map((img: any) => ({
      optimized_url: img.optimized_url,
      collectionLabel: img.collectionLabel
  }));
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

function handleWorkCardClick(key: string){
  router.push({ name: "PhotoCollectionPage", params: { collection: key } });
}  

function checkSize(): void {
  isMobile.value = window.innerWidth <= 500;
}


onMounted(() => {
  fetchPhotos(collection);
  checkSize();
  window.addEventListener("IsMobile", checkSize);
});  

onBeforeUnmount(() => {
  window.removeEventListener("IsMobile", checkSize);
});
</script>


<template>
  <div>
    <!-- <h1 class="home-title">Home Page</h1> -->
  </div>
  <n-skeleton v-if="skeleton"  :repeat="2" height="40px" width="60%" :sharp="false" class="skeleton-loading"/>
  <div v-else class="home-page">
    <div class="hero-img">
      <n-image v-if="!isMobile" :src="photos[3].optimized_url" width="100%" height="100%" object-fit="cover"/>  
      <n-image v-if="isMobile" :src="photos[2].optimized_url" width="100%" height="100%" object-fit="cover"/> 
    </div>
    <!-- <div class="contact-carousel" v-else>
      <n-carousel
      effect="card"
      prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
      next-slide-style="transform: translateX(50%) translateZ(-800px);"
      style="height: 85dvh;"
      :show-dots="false"
      >
        <n-carousel-item v-for="(url, index) in photos" :key="index" class="carousel-item">
          <img
          class="carousel-img"
          :src="url.optimized_url"
          >
        </n-carousel-item>
      </n-carousel>
    </div>
     -->
    <n-grid  cols="1 s:2 m:3 1:5" x-gap="10" y-gap="8" responsive="screen">
      <n-grid-item v-for="(photo, index) in photos.filter((_, i) => i !==2)" :key="index">
        <n-card :bordered="false" :hoverable="true" @click="handleWorkCardClick(photo.collectionLabel)">
          <n-image :src="photo.optimized_url" lazy alt="photo" width="100%" class="photo-img" object-fit="cover">
          </n-image>
          <div class="overlay-text">
            {{ photo.collectionLabel }}
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
    <contact-form/>
  </div>
</template>



<style>
.home-title{
  text-align: center;
}

.home-page{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: calc(80px + env(safe-area-inset-bottom));
}

.hero-img{
  width: 100%;
  height: auto;
  overflow: hidden;
}

@media (max-width: 640px) {
  .hero-img{
    height: auto;
  }
}

.skeleton-loading{
  align-items: center;
  justify-content: center;
}

.overlay-text {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgb(255, 255, 255);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  z-index: 1;
}

/* .contact-carousel {
  width: 100dvw; 
  overflow-x: hidden;  Prevent horizontal scrollbars 
  display: flex;
  flex-direction: row;
  align-items: center;
}

.carousel-item{
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 900px;
  width: 100%;
}

.carousel-img {
  width: 100%;
  height: auto;
  object-fit: cover;
} */
</style>