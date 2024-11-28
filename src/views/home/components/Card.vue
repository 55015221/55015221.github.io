<template>
  <section style="background: radial-gradient(25.5% 108.68% at 55.73% 49.9%, #f9fae6 0, rgba(230, 250, 235, 0) 100%), linear-gradient(98.04deg, #faf9f2 12.27%, #f5f7fa 75.86%)">
    <div class="container">
      <div class="row" :gutter="10">
        <div class="col" v-for="card in cardList">
          <div>
            <div class="item">
              <Icon :name="card.icon" :size="60" />
              <div>
                <h5 class="title">{{ card.title }}</h5>
                <p class="description">{{ card.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import {reactive} from "vue";
import Icon from "@/components/Icon.vue";

const cardList = reactive([
  {title: "极速的服务启动", description: "使用原生 ESM 文件，无需打包!", icon: "tos_1"},
  {title: "轻量快速的热重载", description: "无论应用程序大小如何，都始终极快的模块热", icon: "tos_2"},
  {title: "丰富的功能", description: "对 TypeScript、JSX、CSS 等支持开箱即用。", icon: "tos_3"},
  {title: "优化的构建", description: "可选 “多页应用” 或 “库” 模式的预配置", icon: "tos_4"},
  {title: "通用的插件", description: "在开发和构建之间共享 Rollup-superset。", icon: "tos_1"},
  {title: "完全类型化的API", description: "灵活的 API 和完整的 TypeScript 类型。", icon: "tos_2"},
]);
</script>

<style scoped lang="scss">
section {
  background: #fff;
}
</style>
