<template>
  <a-layout-header>
    <a-menu mode="horizontal" :default-selected-keys="['/']" @menu-item-click="ClickHandler">
      <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
        <div class="logo"
             :style="{
            width: '80px',
            height: '30px',
            borderRadius: '2px',
            background: 'var(--color-fill-3)',
            cursor: 'text',
          }">logo
        </div>
      </a-menu-item>
      <a-menu-item v-for="(row) in menuList" :key="row.link">
        {{ row.label }}
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script setup lang="ts">
const menuList = [
  {label: "首页", link: "/"},
  {label: "Arco Design", link: "https://arco.design/"},
  {label: "Vue.js", link: "https://arco.design/"},
  {label: "Vue Router", link: "https://router.vuejs.org/zh/"},
]

const ClickHandler = (key: any) => {
  window.open(key, '_blank')
}
</script>
<style scoped>
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
