<template>
  <div>
    <Carousel/>
    <a-row :gutter="20">
      <a-col :span="8" v-for="row in cardList">
        <a-card>
          <strong>{{ row.title }}</strong>
          <p>{{ row.description }}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import Carousel from "@/components/Carousel.vue";
import {reactive} from "vue";


const cardList = reactive([
  {title: "极速的服务启动", description: "使用原生 ESM 文件，无需打包!", icon: ""},
  {title: "轻量快速的热重载", description: "无论应用程序大小如何，都始终极快的模块热替换（HMR）", icon: ""},
  {title: "丰富的功能", description: "对 TypeScript、JSX、CSS 等支持开箱即用。", icon: ""},
  {title: "优化的构建", description: "可选 “多页应用” 或 “库” 模式的预配置 Rollup 构建", icon: ""},
  {title: "通用的插件", description: "在开发和构建之间共享 Rollup-superset 插件接口。", icon: ""},
  {title: "完全类型化的API", description: "灵活的 API 和完整的 TypeScript 类型。", icon: ""},
])
</script>

<style lang="scss" scoped>
.arco-card {
  padding: 24px;
  margin: 20px 0;
  border: 1px solid #f6f6f7;
  border-radius: 12px;
  height: 100%;
  background-color: #f6f6f7;
  transition: border-color .25s, background-color .25s;
}
</style>
