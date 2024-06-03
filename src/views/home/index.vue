<template>
	<!--	<Carousel />-->
	<div class="container">
		<a-row :gutter="20">
			<a-col :span="8" v-for="card in cardList">
				<a-card>
					<strong>{{ card.title }}</strong>
					<p>{{ card.description }}</p>
				</a-card>
			</a-col>
		</a-row>
	</div>
	<section style="background: #fff; padding: 2rem">
		<div class="container">
			<a-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }" :colGap="12" :rowGap="16" class="grid">
				<a-grid-item class="item" v-for="row in cardList">
					<Icon :name="row.icon" class="icon" />
					<div>
						<div class="title">{{ row.title }}</div>
						<div class="subtitle">{{ row.description }}</div>
					</div>
					<a-divider direction="vertical" />
				</a-grid-item>
			</a-grid>
		</div>
	</section>

	<section>
		<Tabs />
	</section>

	<ColList />
</template>
<script setup lang="ts">
import Carousel from "@/components/Carousel.vue";
import ColList from "./components/ColList.vue";

import { reactive } from "vue";
import Icon from "@/components/Icon.vue";
import Tabs from "@/views/home/components/tabs.vue";

const cardList = reactive([
	{ title: "极速的服务启动", description: "使用原生 ESM 文件，无需打包!", icon: "tos_1" },
	{ title: "轻量快速的热重载", description: "无论应用程序大小如何，都始终极快的模块热替换（HMR）", icon: "tos_2" },
	{ title: "丰富的功能", description: "对 TypeScript、JSX、CSS 等支持开箱即用。", icon: "tos_3" },
	{ title: "优化的构建", description: "可选 “多页应用” 或 “库” 模式的预配置 Rollup 构建", icon: "tos_4" },
	{ title: "通用的插件", description: "在开发和构建之间共享 Rollup-superset 插件接口。", icon: "tos_1" },
	{ title: "完全类型化的API", description: "灵活的 API 和完整的 TypeScript 类型。", icon: "tos_2" },
]);
</script>

<style lang="scss" scoped>
.grid {
	.item {
		display: flex;
	}
	.icon {
		height: 56px;
		width: 56px;
	}
	.title {
		font-weight: 500;
		margin-bottom: 4px;
		color: #020814;
		font-size: 16px;
		position: relative;
	}
	.subtitle {
		color: #41464f;
		font-size: 12px;
	}
}
.arco-card {
	padding: 24px;
	margin: 20px 0;
	border: 1px solid #f6f6f7;
	border-radius: 12px;
	height: 100%;
	background-color: #f6f6f7;
	transition:
		border-color 0.25s,
		background-color 0.25s;
}
</style>
