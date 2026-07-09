<!-- 进入网页提示接受 -->
<template>
  <transition name="slide-down" appear>
    <div v-if="show" class="cookie-banner">
      <div class="text">
        🍪 We use cookies to improve your experience on our website.
      </div>

      <button @click="accept">Accept</button>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";
// const show = ref(true);
const show = ref(!localStorage.getItem("cookieAccepted"));

const accept = () => {
  localStorage.setItem("cookieAccepted", "true");
  show.value = false;
};
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0; /* 紧贴浏览器底部 */
  padding: 18px 40px;
  background: rgba(20, 20, 20, 0.96);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
}

.text {
  font-size: 30px;
}

button {
  background: #ffb300;
  border: none;
  padding: 10px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

button:hover {
  background: #ffc933;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.8s ease;
}

.slide-down-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
