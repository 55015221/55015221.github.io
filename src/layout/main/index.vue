<template>
  <div class="arco-main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <Component :is="Component" class="w100"/>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss" >
.arco-main{
  height: calc(100vh - 240px) !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
<script setup lang="ts">
</script>
