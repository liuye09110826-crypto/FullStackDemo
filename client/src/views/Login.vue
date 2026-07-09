<template>
  <div class="login-page">
    <div class="login-card">
      <div class="logo">
        <h1>后台管理系统</h1>
        <p>Welcome Back</p>
      </div>

      <div class="input-box">
        <input type="text" v-model="username" placeholder="请输入用户名" />
      </div>

      <div class="input-box">
        <input type="password" v-model="password" placeholder="请输入密码" />
      </div>

      <button @click="login">登 录</button>

      <div class="footer">
        <span>还没有账号？</span>
        <span @click="register" class="register"> 立即注册 </span>
      </div>
    </div>
    <!-- <div v-if="showToast" class="toast">
      {{ toastMsg }}
    </div> -->
  </div>
</template>

<script setup>
//请求服务器
import request from "../utils/request";
import { ref } from "vue";
//导入路由 跳页面
import { useRouter } from "vue-router";
//共享变量
import { useUserStore } from "../stores/user";
//拿到父组件提供的数据
import { inject } from "vue";

//创建变量 初始为空
const username = ref("");
const password = ref("");

const toast = inject("toast");

const router = useRouter();
const user = useUserStore();

const login = async () => {
  if (!username.value || !password.value) {
    alert("请输入用户名和密码");
    return;
  }
  try {
    const res = await request.post("http://localhost:3000/api/login", {
      username: username.value,
      password: password.value,
    });

    if (res.data.code === 200) {
      user.login(username.value);
      toast.success(res.data.message);
      // 保存token（后面会用）
      localStorage.setItem("token", res.data.token);

      // router.push("/home");
      router.push("/games");
    } else {
      // alert(res.data.message);
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error("登录失败，请检查网络或服务器状态");
    console.error(error);
  }
};

// const login = async() => {
//   if (!username.value || !password.value) {
//     alert("请输入用户名和密码");
//     return;
//   }

//   user.login(username.value);
//   router.push("/home");
//   alert(`欢迎 ${username.value}`);
// };
</script>

<!-- 
scoped:只对当前vue文件有效
*：通配选择器，即选择页面上的所有元素
-->
<style scoped>
* {
  margin: 0; /* 清除所有元素默认外边距 */
  padding: 0; /* 清除所有元素默认内边距 */
  box-sizing: border-box; /* 宽高包含 padding 和 border，方便布局 */
}

.login-page {
  width: 100%; /* 宽度占父元素的 100%。 */
  height: 100vh; /* 高度占视口高度。0-100vh */
  background: linear-gradient(
    135deg,
    #4f8cff,
    #6dd5ed
  ); /* 渐变背景 135度 颜色1 颜色2*/
  display: flex; /* 弹性布局  用一种新的方式摆放子元素。*/
  justify-content: center; /* 水平居中 flex-start 居左 flex-end 居右 center 居中 */
  align-items: center; /* 垂直居中 flex-start 居上 flex-end 居下 center 居中 */
}

.login-card {
  width: 400px; /* 宽度 */
  background: white;
  border-radius: 18px; /* 圆角 */
  padding: 40px; /* 内边距 */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18); /* 阴影 水平偏移0 垂直向下偏移20 模糊程度30~60px最佳 透明度0.18*/
}

.logo {
  text-align: center; /* 水平居中 */
  margin-bottom: 35px; /* Logo 和下面输入框之间的间距 */
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
  border: 1px solid #ddd; /* 输入框的边框： 粗细 边框样式（实线、虚线、点线）颜色 */
  border-radius: 10px; /* 圆角 */
  padding: 0 15px; /* 输入框内文字与输入框边界之间的间距 上下0 左右15px */
  font-size: 16px;
  transition: 0.3s;
}

.input-box input:focus {
  /* 聚焦时样式 */
  outline: none; /* 聚焦时无边框 */
  border-color: #409eff; /* 聚焦时边框颜色 */
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
  cursor: pointer; /* 鼠标悬停时光标变为手型,pointer,text*/
  transition: 0.3s;
}

button:hover {
  /* 鼠标悬停时按钮颜色改变 */
  background: #337ecc;
}

.footer {
  margin-top: 20px;
  text-align: center;
  color: #666;
}

.footer a {
  color: #409eff;
  text-decoration: none;
  margin-left: 5px;
}
</style>
