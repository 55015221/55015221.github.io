<template>
	<section>
		<Container>
			<a-row :gutter="10">
				<a-col :xs="12" :sm="12" :md="8" :lg="6" v-for="card in cardList">
					<a-card>
						<div class="item">
							<Icon :name="card.icon" :size="60" />
							<div>
								<h2 class="title">{{ card.title }}</h2>
								<p class="description">{{ card.description }}</p>
							</div>
						</div>
					</a-card>
				</a-col>
			</a-row>
		</Container>
	</section>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import Icon from "@/components/Icon.vue";
import Container from "@/components/Container.vue";

const cardList = reactive([
	{ title: "极速的服务启动", description: "使用原生 ESM 文件，无需打包!", icon: "tos_1" },
	{ title: "轻量快速的热重载", description: "无论应用程序大小如何，都始终极快的模块热", icon: "tos_2" },
	{ title: "丰富的功能", description: "对 TypeScript、JSX、CSS 等支持开箱即用。", icon: "tos_3" },
	{ title: "优化的构建", description: "可选 “多页应用” 或 “库” 模式的预配置", icon: "tos_4" },
	{ title: "通用的插件", description: "在开发和构建之间共享 Rollup-superset。", icon: "tos_1" },
	{ title: "完全类型化的API", description: "灵活的 API 和完整的 TypeScript 类型。", icon: "tos_2" },
]);
</script>

<style scoped lang="scss">
section {
	background: #fff;
	.title {
		line-height: 24px;
		font-size: 16px;
		font-weight: 600;
	}
	.description {
		line-height: 24px;
		font-size: 14px;
		font-weight: 500;
	}

	.arco-row {
		.arco-col {
			.item {
				display: flex;
				flex-direction: column;
			}
			.icon {
				height: 56px;
				width: 56px;
			}
			.subtitle {
				color: #41464f;
				font-size: 12px;
			}
		}
	}

	.arco-card {
		padding: 24px;
		margin: 20px 0;
		border: 1px solid #f6f6f7;
		border-radius: 12px;
		height: 100%;
		background-color: #f6f6f7;
		transition: all ease-in-out 0.3s;
		&:hover {
			background: #f1f2f4;
			box-shadow: 3px 5px 15px #f4f7fc;
		}
	}
}
</style>
