<!-- 点击开始游戏出现的游戏 -->
<template>
  <div class="game-modal" v-if="visible">
    <div class="game-container">
      <!-- 关闭按钮 -->
      <button class="close-btn" @click="close">×</button>

      <!-- 游戏名称 -->
      <h2>
        {{ game?.name }}
      </h2>

      <!-- 游戏窗口 -->
      <iframe :src="game?.url" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  game: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}
</script>

<style scoped>
.game-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.game-container {
  width: 900px;
  height: 600px;
  background: #111;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}

.game-container h2 {
  height: 35px;
  line-height: 35px;
  font-size: 18px;
  margin: 0;
}

.game-container iframe {
  width: 100%;
  height: calc(100% - 50px);
}

.close-btn {
  position: absolute;
  right: 15px;
  top: 5px;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: #ffb300;
  font-size: 25px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
}
</style>
