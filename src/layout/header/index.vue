<template>
  <section class="shadow-lg pb-5">
    <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="/favicon/android-chrome-192x192.png" alt="Logo" height="50" class="d-inline-block align-text-top" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-for="(item, index) in menuList" :key="index">
              <a :class="`nav-link ${index === 0 ? 'active' : ''}`" aria-current="page" @click="ClickHandler(item)">{{ item.title }}</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </section>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

interface MenuItem {
  title: string;
  icon?: string;
  url: string;
}

const menuList: Array<MenuItem> = [
  {title: "首页", url: "/"},
  {title: "关于", url: "/about"},
  {title: "产品中心", url: "/product"},
  {title: "Tailwind CSS", url: "/tailwind"},
  {title: "Vite 官方中文文档", url: "https://cn.vitejs.dev/"},
  {title: "Arco Design", url: "https://arco.design/"},
  {title: "Vue.js", url: "https://cn.vuejs.org/"},
  {title: "Vue Router", url: "https://router.vuejs.org/zh/"},
];
const router = useRouter();

const ClickHandler = (item: MenuItem) => {
  if (item.url.startsWith("http")) {
    window.open(item.url, "_blank");
  } else {
    router.push({path: item.url});
  }
};
</script>
<style lang="scss" scoped>
section {
  background-color: #f4f7fc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.logo {
  width: 120px;
  padding: 10px 0;
  text-align: center;
}

.logo img {
  z-index: 100;
  will-change: filter;
  transition: filter 300ms;
  cursor: pointer;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
