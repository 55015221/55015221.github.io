<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <div :key="$route.path">
          <Component :is="Component"/>
        </div>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">
</script>
