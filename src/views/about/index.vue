<template>
  <div class="container">

    <div class="main">
      <div class="content">
        下一代的前端工具链
      </div>
      <div class="image">
        <div class="image-box"></div>
        <a-image :src="logoWithShadow" width="320"/>
      </div>
    </div>


    <p>
      Vue Router 是 Vue 官方的客户端路由解决方案。

      客户端路由的作用是在单页应用 (SPA) 中将浏览器的 URL 和用户看到的内容绑定起来。当用户在应用中浏览不同页面时，URL
      会随之更新，但页面不需要从服务器重新加载。

      Vue Router 基于 Vue 的组件系统构建，你可以通过配置路由来告诉 Vue Router 为每个 URL 路径显示哪些组件。
    </p>
    <p>
      Vite（法语意为 "快速的"，发音 /vit/，发音同 "veet"）是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：

      一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。

      一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

      Vite 是一种具有明确建议的工具，具备合理的默认设置。您可以在 功能指南 中了解 Vite 的各种可能性。通过 插件，Vite
      支持与其他框架或工具的集成。如有需要，您可以通过 配置部分 自定义适应你的项目。

      Vite 还提供了强大的扩展性，可通过其 插件 API 和 JavaScript API 进行扩展，并提供完整的类型支持。

      你可以在 为什么选 Vite 部分深入了解该项目的设计理念。
    </p>
    <p>
      在开发阶段，Vite 将 esnext 作为转换目标，因为我们假设使用的是现代浏览器，它支持所有最新的 JavaScript 和 CSS
      特性。这样可以防止语法降级，让 Vite 尽可能地接近原始源代码。

      对于生产构建，默认情况下 Vite 的目标浏览器支持 原生 ES 模块、原生 ESM 动态导入 和 import.meta。旧版浏览器可以通过官方的
      @vitejs/plugin-legacy。查看 构建生产环境 了解更多细节。
    </p>
    <p>
      你可能已经注意到，在一个 Vite 项目中，index.html 在项目最外层而不是在 public 文件夹内。这是有意而为之的：在开发期间
      Vite 是一个服务器，而 index.html 是该 Vite 项目的入口文件。

      Vite 将 index.html 视为源码和模块图的一部分。Vite 解析 ，这个标签指向你的 JavaScript 源码。甚至内联引入 JavaScript 的
      和引用 CSS 的 也能利用 Vite 特有的功能被解析。另外，index.html 中的 URL 将被自动转换，因此不再需要 %PUBLIC_URL% 占位符了。

      与静态 HTTP 服务器类似，Vite 也有 “根目录” 的概念，即服务文件的位置，在接下来的文档中你将看到它会以 代称。源码中的绝对
      URL 路径将以项目的 “根” 作为基础来解析，因此你可以像在普通的静态文件服务器上一样编写代码（并且功能更强大！）。Vite
      还能够处理依赖关系，解析处于根目录外的文件位置，这使得它即使在基于 monorepo 的方案中也十分有用。

      Vite 也支持多个 .html 作入口点的 多页面应用模式。
    </p>
  </div>
</template>
<script setup lang="ts">
import logoWithShadow from '@/assets/img/logo-with-shadow.png'
</script>

<style lang="scss" scoped>

.main {
  display: flex;
  flex-direction: row;
  height: 350px;
  .content{
    font-size: 36px;
    font-weight: bold;
    width: 80%;
  }
  .image{
    position: relative;
    .image-box {
      width: 320px;
      height: 320px;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
      filter: blur(72px);
      transform: translate(-50%, -50%);
    }

    .arco-image {
      width: 320px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

}

</style>
