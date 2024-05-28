<script setup lang="ts">
import Header from "@/layout/header/index.vue"
import Main from "@/layout/main/index.vue"
import Footer from "@/layout/footer/index.vue"

defineOptions({
  name: "App"
})
</script>

<template>
  <a-layout>
    <a-layout-header>
      <Header/>
    </a-layout-header>
    <a-layout-content>
      <Main/>
    </a-layout-content>
    <a-layout-footer>
      <Footer/>
    </a-layout-footer>
  </a-layout>
</template>

<style lang="scss">

.arco-layout {
  .arco-layout-header, .arco-layout-content, arco-layout-footer {
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
