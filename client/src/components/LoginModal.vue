<template>
  <!-- 弹窗遮罩 -->
  <div class="mask" v-if="visible" @click.self="close">
    <!-- 登录框 -->
    <div class="login-card">
      <!-- 关闭按钮 -->
      <button class="close-btn" @click="close">×</button>

      <!-- 标题 -->
      <div class="title">
        <h1>
          {{ isLogin ? "登录" : "注册" }}
        </h1>

        <p>Welcome To Fortune Isle</p>
      </div>

      <!-- 用户名 -->
      <div class="input-box">
        <input v-model="username" type="text" placeholder="请输入用户名" />
      </div>

      <!-- 密码 -->
      <div class="input-box">
        <input v-model="password" type="password" placeholder="请输入密码" />
      </div>

      <!-- 注册确认密码 -->
      <div class="input-box" v-if="!isLogin">
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="请确认密码"
        />
      </div>

      <!-- 按钮 -->
      <button class="submit-btn" @click="submit">
        {{ isLogin ? "登 录" : "注 册" }}
      </button>

      <!-- 切换 -->

      <div class="switch">
        <span v-if="isLogin">
          还没有账号？

          <a @click="changeType"> 立即注册 </a>
        </span>

        <span v-else>
          已有账号？

          <a @click="changeType"> 立即登录 </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from "vue";
import request from "../utils/request";

import { useUserStore } from "../stores/user";

// 接收父组件控制显示

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

// 通知父组件
const emit = defineEmits(["close", "success"]);
// pinia
const userStore = useUserStore();
// toast
const toast = inject("toast");
// 登录还是注册
const isLogin = ref(true);
// 输入框
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

watch(
  () => props.visible,
  (val) => {
    if (!val) {
      username.value = "";
      password.value = "";
      confirmPassword.value = "";
      isLogin.value = true;
    }
  },
);

//关闭
function close() {
  emit("close");
}
//切换登录注册
function changeType() {
  isLogin.value = !isLogin.value;

  username.value = "";
  password.value = "";
  confirmPassword.value = "";
}

//提交
async function submit() {
  if (!username.value || !password.value) {
    toast.error("请输入用户名和密码");
    return;
  }
  //注册
  if (!isLogin.value) {
    if (password.value !== confirmPassword.value) {
      toast.error("两次密码不一致");
      return;
    }
    try {
      const res = await request.post("/api/register", {
        username: username.value,
        password: password.value,
      });

      if (res.data.code === 200) {
        // Pinia保存用户
        userStore.login(username.value, res.data.token);
        // 保存token
        toast.success("注册成功，已自动登录");
        //通知父组件
        emit("success");
        close();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("注册失败");
    }
    return;
  }
  //登录
  try {
    const res = await request.post("/api/login", {
      username: username.value,
      password: password.value,
    });
    if (res.data.code === 200) {
      // 保存用户
      userStore.login(username.value, res.data.token);
      toast.success("登录成功");
      //通知父组件
      emit("success");
      //关闭弹窗
      close();
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("服务器连接失败");
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.login-card {
  width: 420px;
  padding: 45px 40px;
  background: linear-gradient(145deg, #1b1b1b, #0d0d0d);
  border-radius: 20px;
  border: 1px solid rgba(255, 179, 0, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  position: relative;
  animation: show 0.3s ease;
}

@keyframes show {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close-btn {
  position: absolute;
  right: 18px;
  top: 15px;
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  background: #333;
  color: white;
  font-size: 25px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  padding: 0;
}

.close-btn:hover {
  background: #ffb300;
  color: #000;
}

.title {
  text-align: center;
  margin-bottom: 35px;
}

.title h1 {
  color: #ffb300;
  font-size: 32px;
}

.title p {
  color: #999;
  margin-top: 10px;
}

.input-box {
  margin-bottom: 20px;
}

.input-box input {
  width: 100%;
  height: 50px;
  padding: 0 18px;
  background: #222;
  border: 1px solid #444;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  box-sizing: border-box;
}

.input-box input::placeholder {
  color: #777;
}

.input-box input:focus {
  outline: none;
  border-color: #ffb300;
  box-shadow: 0 0 10px rgba(255, 179, 0, 0.3);
}

.submit-btn {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(90deg, #ffb300, #ffd666);
  color: #000;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 179, 0, 0.4);
}

.switch {
  margin-top: 25px;
  text-align: center;
  color: #aaa;
}

.switch a {
  color: #ffb300;
  cursor: pointer;
  margin-left: 5px;
}

.switch a:hover {
  text-decoration: underline;
}
</style>
