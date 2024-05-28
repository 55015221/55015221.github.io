<script setup lang="ts">
// import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import dayjs from "dayjs";

defineOptions({
  name: "App"
})
</script>

<template>
  <a-config-provider size="medium" :locale="zhCN">
    <a-watermark :gap="[200, 200]" :alpha="0.8" :content="['55015221.github.io', dayjs().format('YYYY-MM-DD')]">
      <router-view/>
    </a-watermark>
  </a-config-provider>
</template>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
