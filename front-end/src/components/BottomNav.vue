<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue';
import { NMenu } from 'naive-ui';
import {useRouter} from 'vue-router';
import { bottomNavOptions } from '../constants/bottom-nav-options';
const router = useRouter();
const isMobile = ref(false);

function checkSize(): void {
  isMobile.value = window.innerWidth <= 500;
}


function handleMenuSelect(key: string) {
  if (key === "Home") {
    router.push({ name: "Home" });
  } else if (key === "AboutPage") {
    router.push({ name: "AboutPage" });
  } else if (key === "ContactPage") {
    router.push({ name: "ContactPage" });
  } else {
    // Anything else is assumed to be a collection
    router.push({ name: "PhotoCollectionPage", params: { collection: key } });
  }
}

onMounted(() => {
  checkSize();
  window.addEventListener("IsMobile", checkSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("IsMobile", checkSize);
});


</script>


<template>
<div class="bottom-nav">
  <n-menu
      class="nav-bar"
      mode="horizontal"
      :options="bottomNavOptions"
      @update:value="handleMenuSelect"
      :theme-overrides="{
        itemTextColor: 'white',
        itemTextColorHover: '#cccccc',
        itemTextColorActive: '#ffffff'
      }"
    />
</div>
</template>


<style>
.bottom-nav {
  display: flex;
  align-items: center; /* Centers items vertically */
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
  background-color: rgb(21, 21, 21);
  position: fixed;
  bottom: 0;
}

</style>