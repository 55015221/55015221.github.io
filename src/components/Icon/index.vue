<!-- 
@use
<Icon name="HomeFilled" :size="34"></Icon> // element-icon
<Icon name="fa fa-home fa-2x"></Icon> // fontawesome icon
-->
<template>
  <i v-if="name.indexOf('fa') === 0" :class="`${getIconName} fa-1x`" :style="`font-size:${size}px`"></i>
  <el-icon v-else :size="size" :color="color"><Component :is="getIconName" /></el-icon>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface IconProps {
  name?: string; //图标组件名字
  size?: number; // 大小 ==> 非必传（默认为 14）
  color?: string; // 颜色 ==> 非必传（默认为 150px）
}

const props = withDefaults(defineProps<IconProps>(), {
  name: "", // 图标组件名字
  size: 14, // 大小
  color: "#000000", // 颜色
});

const getIconName = computed(() => {
  return props.name.trim();
});
</script>

<style></style>
