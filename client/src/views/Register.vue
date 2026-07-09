<template>
  <div class="register-page">
    <div class="register-card">
      <div class="logo">
        <h1>用户注册</h1>
        <p>Create Account</p>
      </div>

      <div class="input-box">
        <input type="text" v-model="username" placeholder="请输入用户名" />
      </div>

      <div class="input-box">
        <input type="password" v-model="password" placeholder="请输入密码" />
      </div>

      <!-- 确认密码 -->
      <div class="input-box">
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="请确认密码"
        />
      </div>

      <button @click="register">注 册</button>

      <div class="footer">
        <span>已有账号？</span>
        <router-link to="/"> 返回登录 </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, inject } from "vue";
import request from "../utils/request";
import { ref } from "vue";
import { useRouter } from "vue-router";
// import { useUserStore } from "../stores/user";
import { inject } from "vue";

const username = ref("");
const password = ref("");
const confirmPassword = ref("");

// const toastMsg = ref("");
// const showToast = ref(false);

const toast = inject("toast");

const router = useRouter();
// const user = useUserStore();

const register = async () => {
  if (!username.value || !password.value || !confirmPassword.value) {
    toast.warning("请填写完整信息");
    return;
  }
  if (password.value !== confirmPassword.value) {
    toast.error("两次输入的密码不一致");
    return;
  }
  try {
    const res = await request.post("http://localhost:3000/api/register", {
      username: username.value,
      password: password.value,
    });

    if (res.data.code === 200) {
      toast.success(res.data.message);

      setTimeout(() => {
        // router.push("/home");
        router.push("/games");
      }, 1000);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error("注册失败，请检查网络或服务器");
    console.error(error);
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.register-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #4f8cff, #6dd5ed);
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-card {
  width: 420px;
  background: white;
  border-radius: 18px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
}

.logo {
  text-align: center;
  margin-bottom: 35px;
}

.logo h1 {
  color: #333;
  font-size: 30px;
}

.logo p {
  color: #888;
  margin-top: 8px;
}

.input-box {
  margin-bottom: 20px;
}

.input-box input {
  width: 100%;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 0 15px;
  font-size: 16px;
  transition: 0.3s;
}

.input-box input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 8px rgba(64, 158, 255, 0.3);
}

button {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  background: #409eff;
  color: white;
  font-size: 17px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #337ecc;
}

.footer {
  margin-top: 20px;
  text-align: center;
  color: #666;
}

.footer a {
  margin-left: 5px;
  color: #409eff;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
