<template>
  <div class="container">
    <a-menu mode="horizontal" :default-selected-keys="['/']" @menu-item-click="ClickHandler">
      <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
        <div class="logo">
        </div>
      </a-menu-item>
      <a-menu-item v-for="(row) in menuList" :key="row.link">
        {{ row.label }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const menuList = [
  {label: "首页", link: "/"},
  {label: "关于", link: "/about"},
  {label: "Vite 官方中文文档", link: "https://cn.vitejs.dev/"},
  {label: "Arco Design", link: "https://arco.design/"},
  {label: "Vue.js", link: "https://arco.design/"},
  {label: "Vue Router", link: "https://router.vuejs.org/zh/"},
]
const router = useRouter();

const ClickHandler = (key: string) => {
  if (key.startsWith('http')) {
    window.open(key, '_blank')
  } else {
    router.push({path: key})
  }
}
</script>
<style lang="scss" scoped>
.logo {
  will-change: filter;
  transition: filter 300ms;
  background: #2e2e32;
  cursor: pointer;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
