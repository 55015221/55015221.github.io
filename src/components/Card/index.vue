<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<h3>{{ title }}</h3>
				<slot name="header" />
			</div>
		</template>
		<el-space direction="vertical" alignment="flex-end" class="content-space" prefix-cls="content-space" size="large">
			<slot></slot>
		</el-space>
	</el-card>
</template>

<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		default: () => '',
	},
});
</script>

<style lang="scss" scoped>
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.content-space {
	display: flex;
	:deep(.content-space__item) {
		width: 100%;
	}
}
</style>
