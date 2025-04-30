<script setup lang="ts">
import { NCard, NImage } from 'naive-ui';
// import { useRoute } from 'vue-router';
import {ref, onMounted} from 'vue';
import axios from 'axios';

// const route = useRoute()
const collection = ref("AboutPage");
const photos = ref<string[]>([]);

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
}

onMounted(() => {
  fetchPhotos(collection.value);
})



</script>


<template>
<div class="about-container">
    <h1>About Page</h1>
    <n-card :bordered="true" :hoverable="true" class="about-card">
      <n-image :src="photos[0]" alt="photo" width="100%" height="100%" object-fit="cover">

      </n-image>
    </n-card>
    <div class="about-text">
      <p>
        I'm Hayden Barogh, a passionate photographer from Dallas-Fort Worth (DFW). With an innate love for photography and an unyielding desire to capture the moment. I specialize in portrait, street, and product photography. My approach to photography is deeply rooted in a commitment to authenticity. I believe that the most captivating images are those that tell a story, and allow people to connect with the image. Thank you for stopping by and feel free to contact me below.
      </p>
    </div>
</div>
</template>



<style>
.about-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.about-card{
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.about-text {
  max-width: 50vw;
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>