<script setup lang="ts">
import ContactForm from '../components/ContactForm.vue';
import {onMounted, ref} from 'vue';
import axios from 'axios';
import { NCarousel, NCarouselItem, } from 'naive-ui';

const collection = ref("ContactPage");
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
  <div class="contact-page-wrapper">
    <h1 class="page-title">Contact Page</h1>
    <div class="contact-form-wrapper">
      <ContactForm/>
    </div>
  </div>
  <n-skeleton v-if="skeleton"  :repeat="2" height="40px" width="60%" :sharp="false"/>
  <div v-else class="contact-carousel" >
    <n-carousel
    effect="card"
    prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
    next-slide-style="transform: translateX(50%) translateZ(-800px);"
    style="height: 90vh;"
    :show-dots="false"
    >
      <n-carousel-item v-for="(url, index) in photos" :key="index" class="carousel-item">
        <img
        class="carousel-img"
        :src="url"
        >
      </n-carousel-item>
    </n-carousel>
  </div>
</template>



<style>
.contact-page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.page-title {
  text-align: center;
}

.contact-form-wrapper {
  width: 100%;
  max-width: 600px;
}

.contact-carousel {
  width: 100vw; 
  padding-top: 5rem;
  overflow-x: hidden; /* Prevent horizontal scrollbars */
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
}

</style>