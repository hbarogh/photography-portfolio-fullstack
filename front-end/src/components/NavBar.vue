<script setup lang="ts">
import { NMenu } from "naive-ui";
import { useRouter } from "vue-router";
import { menuOptions } from "../constants/menu-options";
import { ref, onMounted, onBeforeUnmount } from "vue";
// import { mobileMenuOptions } from "../constants/mobile-menu-options";
const router = useRouter();
const isMobile = ref(false);

function handleMenuSelect(key: string) {
  if (key === "Home") {
    router.push({ name: "Home" });
  } else if (key === "AboutPage") {
    router.push({ name: "AboutPage" });
  } else if (key === "ContactPage") {
    router.push({ name: "ContactPage" });
  } else if (key === "InstagramPage"){
    console.log("instagram icon clicked");
  } 
  else {
    // Anything else is assumed to be a collection
    router.push({ name: "PhotoCollectionPage", params: { collection: key } });
  }
}

function checkSize(): void {
  isMobile.value = window.innerWidth <= 500;
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
  <div class="nav-links" v-if="!isMobile">
    <n-menu
      class="nav-bar"
      mode="horizontal"
      :options="menuOptions"
      @update:value="handleMenuSelect"
    />
  </div>
  <!-- <div class="mobile-menu" v-else>
    <n-menu
      class="mobileMenu"
      :options="mobileMenuOptions"
      mode="vertical"
      @update:value="handleMenuSelect"
    />
  </div> -->
</template>

<style>
.nav-bar {
  display: flex;
  align-items: center; /* Centers items vertically */
  justify-content: space-between;
  flex-wrap: wrap;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 18px 0 18px;
}

</style>
