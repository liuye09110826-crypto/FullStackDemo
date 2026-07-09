<template>
  <div class="games-page">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="logo">Fortune Isle</div>

      <nav>
        <span>首页</span>
        <span class="active"> 游戏 </span>
        <span>关于我们</span>
        <span>联系我们</span>
      </nav>
      <div class="user-box">
        <span v-if="!userStore.isLogin" @click="showLogin = true"> 登录 </span>
        <div v-else class="user-info">
          <span @click="showMenu = !showMenu">
            {{ userStore.username }} ▼
          </span>
          <div v-if="showMenu" class="user-menu">
            <div @click="logout">退出登录</div>
          </div>
        </div>
      </div>
    </header>
    <!-- Banner -->
    <section class="banner" @mouseenter="stopBanner" @mouseleave="startBanner">
      <!-- 图片 -->
      <div
        v-for="(item, index) in banners"
        :key="index"
        class="banner-item"
        :class="{ active: index === currentBanner }"
        :style="{
          backgroundImage: `
        linear-gradient(
        rgba(0,0,0,.4),
        rgba(0,0,0,.7)
        ),
        url(${item})`,
        }"
      ></div>

      <!-- 文字 -->
      <div class="banner-content">
        <h1>游戏大厅</h1>
        <p>Explore Our Amazing Games</p>
      </div>

      <!-- 左右按钮 -->
      <button class="banner-btn left" @click="prevBanner">❮</button>

      <button class="banner-btn right" @click="nextBanner">❯</button>

      <!-- 小圆点 -->
      <div class="dots">
        <span
          v-for="(item, index) in banners"
          :key="index"
          :class="{ active: index === currentBanner }"
          @click="currentBanner = index"
        ></span>
      </div>
    </section>

    <!-- 分类 -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="{ active: currentTab === tab.value }"
        @click="currentTab = tab.value"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- 游戏列表 -->

    <div class="game-list">
      <div class="game-card" v-for="game in showGames" :key="game.name">
        <div class="img-box">
          <img :src="game.img" />
        </div>
        <div class="info">
          <h3>
            {{ game.name }}
          </h3>
          <p>
            RTP:
            {{ game.rtp }}
          </p>
          <p>
            Payline:
            {{ game.line }}
          </p>
          <p>
            Max Win:
            {{ game.win }}
          </p>
        </div>

        <!-- 遮罩 -->
        <div class="overlay">
          <button class="play-btn" @click="openGame(game)">▶ 开始游戏</button>

          <button class="demo-btn">更多</button>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="footer-logo">Fortune Isle</div>

      <div class="footer-links">
        <span>首页</span>
        <span>游戏</span>
        <span>关于我们</span>
        <span>联系我们</span>
      </div>

      <p class="copyright">© 2026 Fortune Isle. All Rights Reserved.</p>

      <p class="tips">
        This website is for entertainment purposes only. Please play
        responsibly.
      </p>
    </footer>

    <GameModal :visible="showGame" :game="currentGame" @close="closeGame" />
    <LoginModal
      :visible="showLogin"
      @close="showLogin = false"
      @success="loginSuccess"
    />
  </div>
</template>

<script setup>
// 响应式 计算 页面加载完成执行 销毁执行
import { ref, computed, onMounted, onUnmounted, inject } from "vue";
import { useUserStore } from "../stores/user";

import tabs from "../data/tabs";
import games from "../data/games";
import banners from "../data/banners";
import GameModal from "../components/GameModal.vue";
import LoginModal from "../components/LoginModal.vue";

const userStore = useUserStore();

const currentBanner = ref(0);
const currentTab = ref("All");
const showGame = ref(false);
const currentGame = ref(null);

const toast = inject("toast");

const showMenu = ref(false);
const showLogin = ref(false);

function logout() {
  userStore.logout();
  showMenu.value = false;
  toast.success("退出登录成功");
}

function openGame(game) {
  if (!userStore.isLogin) {
    toast.warning("请先登录");
    showLogin.value = true;
    return;
  }
  currentGame.value = game;
  showGame.value = true;
}
function closeGame() {
  showGame.value = false;
  currentGame.value = null;
}

function loginSuccess() {
  showLogin.value = false;
}

let bannerTimer = null;

const nextBanner = () => {
  currentBanner.value = (currentBanner.value + 1) % banners.length;
};

const prevBanner = () => {
  currentBanner.value =
    (currentBanner.value - 1 + banners.length) % banners.length;
};

const startBanner = () => {
  bannerTimer = setInterval(() => {
    nextBanner();
  }, 3000);
};

const stopBanner = () => {
  clearInterval(bannerTimer);
};

onMounted(() => {
  startBanner();
});

onUnmounted(() => {
  stopBanner();
});

// 自动分类计算哪些游戏显示
const showGames = computed(() => {
  if (currentTab.value === "All") {
    return games;
  }
  return games.filter((game) => game.type === currentTab.value);
});
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.games-page {
  background: #dfdede;
  min-height: 100vh;
  color: white;
}

/* 导航 */
.header {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  background: #111;
  position: relative;
  z-index: 100;
}

.logo {
  font-size: 30px;
  font-weight: bold;
  color: #ffb300;
  margin-right: 80px;
}

nav {
  display: flex;
  gap: 40px;
  flex: 1;
}

nav span {
  margin-left: 0px;
  cursor: pointer;
}

nav .active {
  color: #ffb300;
}

/* banner */
.banner {
  position: relative;
  height: 350px;
  overflow: hidden;
}

.banner-item {
  position: absolute;
  inset: 0;

  background-size: cover;
  background-position: center;

  opacity: 0;
  transition: opacity 0.8s;
}

.banner-content {
  position: relative;
  z-index: 2;

  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.banner-content h1 {
  font-size: 50px;
}

.banner-content p {
  margin-top: 20px;
  font-size: 22px;
}

.banner-item.active {
  opacity: 1;
}

.banner-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  width: 45px;
  height: 45px;

  border: none;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.25);
  color: white;
  font-size: 24px;

  cursor: pointer;

  z-index: 3;

  transition: 0.3s;
}

.banner-btn:hover {
  background: #ffb300;
  color: #000;
}

.dots {
  position: absolute;
  bottom: 25px;

  left: 50%;
  transform: translateX(-50%);

  display: flex;
  gap: 12px;

  z-index: 3;
}

.dots span {
  width: 12px;
  height: 12px;

  border-radius: 50%;

  background: white;

  cursor: pointer;

  opacity: 0.5;

  transition: 0.3s;
}

.dots span.active {
  background: #ffb300;
  opacity: 1;
  transform: scale(1.3);
}

.left {
  left: 25px;
}

.right {
  right: 25px;
}

/* 分类 */
.tabs {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 40px 0;
}

.tabs button {
  padding: 12px 40px;
  border-radius: 30px;
  border: none;
  background: #222;
  color: white;
  cursor: pointer;
}

.tabs .active {
  background: #ffb300;
  color: black;
}

/* 游戏列表 */
.game-list {
  width: 1200px;
  max-width: 90%;
  margin: 40px auto;
  display: grid;
  /* grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); */
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.game-card {
  position: relative;
  background: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  transition: 0.3s;
}

/* .game-card:hover{
  transform:translateY(-10px);
} */

.game-card:hover img {
  transform: scale(1.08);
}

.img-box {
  /* position: relative; */
  overflow: hidden;
  border-radius: 12px;
}

.img-box img {
  width: 100%;
  height: 100%;
  /* padding: 8px; */
  object-fit: cover;
  /* border: 6px solid #8d8d8d; */
  border-radius: 12px;
  display: block;
  transition: 0.5s;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  opacity: 0;
  transition: 0.35s;
}

.game-card:hover .overlay {
  opacity: 1;
}

.play-btn {
  width: 150px;
  height: 46px;
  border: none;
  border-radius: 30px;
  background: #ffb300;
  color: #000;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.play-btn:hover {
  transform: scale(1.08);
}

.demo-btn {
  width: 150px;
  height: 46px;
  border: 2px solid white;
  background: transparent;
  color: white;
  border-radius: 30px;
  cursor: pointer;
}

.info {
  padding: 20px;
}

.info h3 {
  margin-bottom: 15px;
  color: #ffb300;
}

.info p {
  color: #000000;
  margin-top: 8px;
}

@media (max-width: 900px) {
  .game-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 500px) {
  .game-list {
    grid-template-columns: 1fr;
  }
}

/* =======================
   Footer
======================= */

.footer {
  margin-top: 80px;
  padding: 60px 20px;
  background: #111;
  text-align: center;
  color: #999;
}

.footer-logo {
  font-size: 30px;
  font-weight: bold;
  color: #ffb300;
  margin-bottom: 25px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 25px;
}

.footer-links span {
  cursor: pointer;
  transition: 0.3s;
}

.footer-links span:hover {
  color: #ffb300;
}

.copyright {
  margin-bottom: 10px;
  font-size: 14px;
}

.tips {
  font-size: 13px;
  color: #666;
}

.user-box {
  position: relative;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  margin-left: auto;
}

.user-info {
  position: relative;
}

.user-menu {
  position: absolute;
  top: 45px;
  right: 0;
  width: 120px;
  background: #222;
  border-radius: 8px;
  overflow: hidden;
  z-index: 999;
}

.user-menu div {
  padding: 12px;
  text-align: center;
}

.user-menu div:hover {
  background: #ffb300;
  color: #000;
}
</style>
