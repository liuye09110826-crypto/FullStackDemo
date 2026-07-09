<!-- <script setup>
import HelloWorld from './views/Login.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template> -->

<!-- <style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->


<template>
  <router-view />

  <CookieBanner />
  <!-- ⭐全局Toast -->
  <Toast ref="toastRef" />
</template>

<script setup>
import { ref, provide } from "vue";
import Toast from "./components/Toast.vue";
import CookieBanner from "./components/CookieBanner.vue";

const toastRef = ref(null);

// ⭐封装全局方法
const toast = {
  success(msg) {
    toastRef.value.show(msg, "success");
  },
  error(msg) {
    toastRef.value.show(msg, "error");
  },
  warning(msg) {
    toastRef.value.show(msg, "warning");
  }
};

// ⭐提供给全局
provide("toast", toast);
</script>

<style scoped>
</style>