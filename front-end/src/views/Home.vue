<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
import { NImage, NSkeleton, NCard, NGrid, NGridItem } from 'naive-ui';
import ContactForm from '../components/ContactForm.vue';
const collection:string = "HomePage";
const photos = ref<{optimized_url: string, collectionLabel: string}[]>([]);
const skeleton = ref(true);
const router = useRouter();
const isMobile =ref(false);
async function fetchPhotos(collection: string): Promise<void> {
  try{
    const response = await axios.get(`https://backend-3497.onrender.com/api/photos/${collection}`);
    photos.value = response.data.map((img: any) => ({
      optimized_url: img.optimized_url,
      collectionLabel: img.collectionLabel
  }));
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
  <n-skeleton v-if="skeleton"  :repeat="2" height="40px" width="60%" :sharp="false" class="skeleton-loading"/>
  <div v-else class="home-page">
    <div class="hero-img-container">
      <img v-if="!isMobile" :src="photos[8].optimized_url" class="hero-img" />  
      <n-image v-if="isMobile" :src="photos[2].optimized_url" width="100%" height="100%" object-fit="cover" :preview-disabled="true"/> 
    </div>

    <n-grid  cols="1 s:2 m:3 1:5" x-gap="10" y-gap="8" responsive="screen" class="collection-grid">
      <n-grid-item v-for="(photo, index) in photos.filter((_, i) => i !==2)" :key="index">
        <n-card :bordered="false" :hoverable="true" @click="handleWorkCardClick(photo.collectionLabel)">
          <n-image :src="photo.optimized_url" lazy alt="photo" width="100%" class="photo-img" object-fit="cover" :preview-disabled="true"/>
          <div class="overlay-text">
            {{ photo.collectionLabel }}
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
    <div class="contact-form">
      <contact-form/>
    </div>
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

.hero-img-container{
  width:100%;
  overflow: hidden;
}

.hero-img{
  width: 100%;
  height: 95.5vh;
  object-fit: cover;
  display: block;
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

.collection-grid {
  max-width: 100vw;
}

.contact-form{
  margin-top: 1rem;
}
</style>