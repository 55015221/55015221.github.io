<template>
	<section>
		<div class="container">
			<a-row :gutter="20">
				<a-col :span="6" v-for="card in cardList">
					<div class="item">
						<Icon class="icon" :name="card.icon" :size="50" />
						<div>
							<div class="title">{{ card.title }}</div>
							<div class="subtitle">{{ card.description }}</div>
						</div>
					</div>
				</a-col>
			</a-row>
		</div>
	</section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Icon from "@/components/Icon.vue";

const cardList = reactive([
	// { title: "极速的服务启动", description: "使用原生 ESM 文件，无需打包!", icon: "tos_1" },
	{ title: "轻量快速的热重载", description: "无论应用程序大小如何，都始终极快的模块热替换（HMR）", icon: "tos_2" },
	{ title: "丰富的功能", description: "对 TypeScript、JSX、CSS 等支持开箱即用。", icon: "tos_3" },
	{ title: "优化的构建", description: "可选 “多页应用” 或 “库” 模式的预配置 Rollup 构建", icon: "tos_4" },
	{ title: "通用的插件", description: "在开发和构建之间共享 Rollup-superset 插件接口。", icon: "tos_1" },
	// { title: "完全类型化的API", description: "灵活的 API 和完整的 TypeScript 类型。", icon: "tos_2" },
]);
</script>

<style scoped lang="scss">
section {
	padding: 10px;
	background: #fff;
	.arco-row {
		.arco-col:not(:first-child) .item:after {
			content: "";
			position: absolute;
			width: 1px;
			display: block;
			height: 48px;
			left: -10px;
			top: 50%;
			transform: translateY(-50%);
			background: rgba(158, 165, 184, 0.2);
		}

		.arco-col {
			.item {
				position: relative;
				background: #fff;
				padding: 10px;
				display: flex;

				.icon {
					margin-right: 10px;
				}

				.title {
					font-size: 16px;
					font-weight: 500;
					color: #020814;
					margin-bottom: 4px;
				}

				.subtitle {
					color: #41464f;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
