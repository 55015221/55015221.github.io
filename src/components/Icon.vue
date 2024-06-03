<template>
	<svg aria-hidden="true" :width="size" :height="size">
		<use :xlink:href="getIconName" :fill="color" />
	</svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
	name: "Icon",
});

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

const getIconName = computed(() => `#icon-${props.name}`);
</script>
<style lang="scss" scoped></style>
