<template>
  <div class="home">
    <!-- 顶部 -->
    <div class="header">
      <div class="logo">后台管理系统</div>

      <div class="user-info">
        🔔 消息　 👤 {{ user.username }}
        <!-- <span class="logout">退出登录</span> -->
        <span class="logout" @click="logout">退出登录</span>
      </div>
    </div>

    <!-- 主体 -->
    <div class="main">
      <!-- 左侧菜单 -->
      <div class="aside">
        <div class="menu-title">功能菜单</div>

        <div
          v-for="item in menus"
          :key="item.name"
          class="menu-item"
          :class="{ active: currentMenu === item.name }"
          @click="currentMenu = item.name"
        >
          {{ item.icon }} {{ item.name }}
        </div>
      </div>

      <!-- 右侧内容 -->
      <div class="content">
        <!-- 欢迎 -->
        <div class="welcome" :style="{ backgroundImage: `url(${homeImg})` }">
          <h2>👋 {{ user.username }}</h2>

          <p>今天也是努力学习 Vue 的一天，加油！</p>
        </div>

        <!-- 图片 -->
        <!-- <div class="banner">
          <img :src="homeImg" alt="首页图片">
        </div> -->

        <!-- 数据卡片 -->
        <div class="cards">
          <div class="card blue">
            <h3>👤 用户数量</h3>
            <span>1688</span>
          </div>

          <div class="card green">
            <h3>📦 商品数量</h3>
            <span>563</span>
          </div>

          <div class="card orange">
            <h3>💰 今日销售</h3>
            <span>￥25680</span>
          </div>

          <div class="card red">
            <h3>👀 今日访问</h3>
            <span>9521</span>
          </div>
        </div>

        <!-- 两栏 -->
        <div class="bottom">
          <!-- 最近活动 -->
          <div class="panel">
            <h3>最近活动</h3>

            <ul>
              <li>✅ 张三 登录后台</li>

              <li>📦 李四 新增商品</li>

              <li>🗑 王五 删除订单</li>

              <li>📈 {{ user.username }} 查看统计</li>

              <li>⚙ 修改系统配置</li>
            </ul>
          </div>

          <!-- 快捷入口 -->
          <div class="panel">
            <h3>快捷操作</h3>

            <div class="btns">
              <button>添加用户</button>

              <button>商品管理</button>

              <button>订单中心</button>

              <button>系统设置</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import homeImg from "../assets/images/home.png";

const currentMenu = ref("首页");
const router = useRouter();
const user = useUserStore();
const logout = () => {user.logout();
  router.push("/");
};

const menus = [
  {
    icon: "🏠",
    name: "首页",
  },
  {
    icon: "👤",
    name: "用户管理",
  },
  {
    icon: "📦",
    name: "商品管理",
  },
  {
    icon: "📊",
    name: "数据统计",
  },
  {
    icon: "📁",
    name: "订单管理",
  },
  {
    icon: "⚙",
    name: "系统设置",
  },
];
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* .banner {
  margin-bottom: 30px;
}

.banner img {
  width: 100%;
  height: 320px;
  object-fit: cover;                          填充图片
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,.15);
} */

.home {
  width: 100%;
  height: 100vh;
  background: #f5f7fa;
}

/* 顶部 */

.header {
  height: 65px;
  background: #1677ff;
  color: white;
  display: flex;
  justify-content: space-between; /* 水平两端对齐分布 */
  align-items: center; /* 交叉轴，即垂直居中 */
  padding: 0 35px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.user-info {
  font-size: 16px;
}

.logout {
  cursor: pointer;
}

.logout:hover {
  color: yellow; /* hover悬停，active点击，focus聚焦 ,checked选中,first-child第一个子元素,last-child最后一个子元素 */
}

/* 主体 */

.main {
  display: flex;
  height: calc(100vh - 65px); /*浏览器高度-顶部高度 */
}

/* 左边 */

.aside {
  width: 230px;
  background: #001529;
  color: white;
}

.menu-title {
  padding: 25px;
  text-align: center;
  font-size: 22px;
  border-bottom: 1px solid #1f2d3d;
}

.menu-item {
  padding: 18px 30px;
  cursor: pointer;
  transition: 0.3s;
}

.menu-item:hover {
  background: #5a9bf6;
}

.active {
  background: #1677ff;
}

/* 内容 */

.content {
  flex: 1; /* 宽度自动分配 */
  padding: 30px;
}

/* 欢迎 */

.welcome {
  position: relative; /* 让当前元素成为定位参考 */
  height: 220px;
  margin-bottom: 30px;
  padding: 40px;
  border-radius: 15px;
  overflow: hidden; /* 内容超出部分隐藏 */

  /* 背景图片 */
  background-size: cover; /* 铺满整个区域 */
  background-position: center; /* 图片居中 */
  background-repeat: no-repeat; /* 不重复 */

  /* 文字布局 */
  display: flex;
  flex-direction: column; /* 竖向排列 */
  justify-content: center; /* 控制主轴垂直居中 */
  align-items: center; /* 交叉轴 横向居中 */

  color: #fff;
}

.welcome::before {
  /* 伪元素 ,before之前，after之后,first-line设置第一行字，first-letter设置第一个字， */
  content: ""; /* 创建一个伪元素，必须写 */
  position: absolute; /* 绝对定位 */
  inset: 0; /* 上右下左都为0，铺满整个父元素 */
  background: rgba(0, 0, 0, 0.3); /* 背景色 */
}

.welcome h2,
.welcome p {
  position: relative; /* 绝对定位 */
  z-index: 1; /* 层级，搭配position: relative; */
  margin-top: 10px;
}

/* 卡片 */

.cards {
  display: flex; /* 宽度自动分配，使其子元素横向排列 */
  gap: 20px; /* Flex 专门提供的间距 */
  margin-bottom: 30px;
}

.card {
  flex: 1;
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-8px);
}

.card span {
  display: block;
  margin-top: 20px;
  font-size: 34px;
  font-weight: bold;
  color: #409eff;
}

.card h3 {
  color: #409eff;
}

.blue {
  border-left: 8px solid #409eff;
}

.green {
  border-left: 8px solid #67c23a;
}

.orange {
  border-left: 8px solid orange;
}

.red {
  border-left: 8px solid #f56c6c;
}

/* 下方 */

.bottom {
  display: flex;
  gap: 20px;
}

.panel {
  flex: 1;
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.panel h3 {
  margin-bottom: 20px;
}

.panel li {
  list-style: none;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  color: #409eff;
}

/* 按钮 */

.btns {
  display: grid; /* 宽度自动分配，使其子元素网格排列 */
  grid-template-columns: repeat(
    2,
    1fr
  ); /* 分成两列，每列一份,:1fr,2fr,两列。第一列一份，第二列两份 */
  gap: 20px;
}

.btns button {
  height: 55px;
  border: none;
  border-radius: 10px;
  background: #409eff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.btns button:hover {
  background: #1677ff;
  transform: scale(
    1.05
  ); /* scale(1.05)放大；rotate(30deg)旋转30度；translateX(20px)平移20px; */
}
</style>
