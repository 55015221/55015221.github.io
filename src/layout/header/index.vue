<template>
  <Container>
    <div class="flex">
      <div class="logo">
        <img src="/favicon/android-chrome-192x192.png" :height="60" />
      </div>
      <a-menu mode="horizontal" :default-selected-keys="['/']" @menu-item-click="ClickHandler">
        <a-menu-item v-for="row in menuList" :key="row.link">
          {{ row.label }}
        </a-menu-item>
      </a-menu>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Container from "@/components/Container.vue";

const menuList = [
  { label: "首页", link: "/" },
  { label: "关于", link: "/about" },
  { label: "产品中心", link: "/product" },
  { label: "Tailwind CSS", link: "/tailwind" },
  { label: "Vite 官方中文文档", link: "https://cn.vitejs.dev/" },
  { label: "Arco Design", link: "https://arco.design/" },
  { label: "Vue.js", link: "https://cn.vuejs.org/" },
  { label: "Vue Router", link: "https://router.vuejs.org/zh/" },
];
const router = useRouter();

const ClickHandler = (key: string) => {
  if (key.startsWith("http")) {
    window.open(key, "_blank");
  } else {
    router.push({ path: key });
  }
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  background: #fff;
}

.arco-menu-light {
  background: unset;
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
