<template>
  <div v-if="visible" :class="['toast', type, { leave: leaving }]">
    {{ message }}
  </div>
</template>

<script setup>
import { ref } from "vue";

const message = ref("");
const type = ref("success");
const visible = ref(false);
const leaving = ref(false); // 新增：控制渐隐

// 暴露方法给外部调用
const show = (msg, t = "success") => {
  message.value = msg;
  type.value = t;
  visible.value = true;
  leaving.value = false;

  setTimeout(() => {
    leaving.value = true; // 开始渐隐

    setTimeout(() => {
      visible.value = false; // 真正移除
      leaving.value = false;
    }, 500); // 渐隐时间
  }, 1500); // 显示时间
};

defineExpose({
  show,
});
</script>

<style scoped>
.toast {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 20px;
  border-radius: 8px;
  color: #fff;
  z-index: 99999;
  opacity: 1;
  transition: all 0.5s ease; /* 所有动画持续0.5s */
}

.toast.leave {
  opacity: 0;
  transform: translate(
    -50%,
    -20px
  ); /*-50%对应transform: translateX(-50%)保持水平居中，-20px表示向上移动20px */
}

/* 成功 */
.success {
  background: #67c23a;
}

/* 错误 */
.error {
  background: #f56c6c;
}

/* 警告 */
.warning {
  background: #e6a23c;
}
</style>
