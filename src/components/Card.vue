<template>
  <div class="card">
    <div class="card-image p-3">
      <div class="card-label">
        <span class="badge text-bg-danger">热门</span>
        <span class="badge text-bg-success">流行</span>
      </div>
      <div class="card-action">
        <button><i class="bi bi-heart"></i></button>
        <button><i class="bi bi-brightness-high"></i></button>
      </div>
      <div class="card-media-top">
        <img v-for="image in images" :src="image.url" :alt="image.title" />
      </div>
    </div>
    <div class="card-body p-0">
      <div class="subtitle">{{ subtitle }}</div>
      <h3 class="title animate-underline">
        <a class="stretched-link" href=""> {{ title }}{{ title }} </a>
      </h3>
      <p>{{ description }}{{ description }}</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.animate-underline {
  position: relative;
  text-decoration: none;

  &::after {
    background-color: currentcolor;
    content: "";
    bottom: 0;
    left: 0;
    height: 1px;
    position: absolute;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
    width: 100%;
  }

  &:hover {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
}

@mixin line-ellipsis($line: 1) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  // 使用传入的行数作为 -webkit-line-clamp 的值
  -webkit-line-clamp: $line;
}

.card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.02);
  cursor: pointer;
  border: none;
  overflow: hidden;
  border-radius: 0;

  a {
    color: #313132;
    text-decoration: none;
  }

  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);

    .card-action {
      opacity: 1;
    }

    :deep(img):not(:last-child) {
      opacity: 0 !important;
    }

    :deep(img):last-child {
      opacity: 1 !important;
    }

    .title {
      &:after {
        transform: scaleX(1) !important;
        transform-origin: bottom left !important;
      }
    }
  }

  .card-action {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 2;
    background: none;
    opacity: 0;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      flex-shrink: 0;
      height: 2.5rem;
      line-height: 2.5rem;
      padding: 0;
      width: 2.5rem;
      background-color: #eef1f6;
      border: 1px solid #eef1f6;
      border-radius: 0.5rem;

      .bi {
        font-size: 1rem;
        color: #000;
      }

      &:hover {
        background-color: #e0e5eb;
        border-color: #e0e5eb;
        color: #181d25;
      }
    }
  }

  .card-label {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    z-index: 2;

    .badge {
      --bs-badge-border-radius: 0.25rem;
    }
  }

  .card-image {
    position: relative;
    overflow: hidden;
    display: block;
    width: 100%;
    height: auto;

    .card-media-top {
      background: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100px%22%20height%3D%22100px%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22xMidYMid%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M24.3%2C30C11.4%2C30%2C5%2C43.3%2C5%2C50s6.4%2C20%2C19.3%2C20c19.3%2C0%2C32.1-40%2C51.4-40%20C88.6%2C30%2C95%2C43.3%2C95%2C50s-6.4%2C20-19.3%2C20C56.4%2C70%2C43.6%2C30%2C24.3%2C30z%22%20stroke%3D%22%2356cfe1%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%22205.271142578125%2051.317785644531256%22%3E%3Canimate%20attributeName%3D%22stroke-dashoffset%22%20calcMode%3D%22linear%22%20values%3D%220%3B256.58892822265625%22%20keyTimes%3D%220%3B1%22%20dur%3D%221%22%20begin%3D%220s%22%20repeatCount%3D%22indefinite%22%2F%3E%3C%2Fpath%3E%3C%2Fsvg%3E")
        0 0 /20% no-repeat;

      &:before {
        padding-top: 100%;
        content: "";
        display: block;
      }

      :deep(img) {
        position: absolute; /* 相对于包含padding的a元素定位 */
        inset: 0;
        width: 100%; /* 宽度100%以填充包含padding的a元素 */
        height: 100%; /* 保持图片的原始纵横比 */
        object-fit: cover; /* 确保图片覆盖整个空间，但可能会被裁剪 */
        background-color: #ffffff;
        transition: opacity 0.35s ease-in-out; /* 可选：添加透明度过渡效果 */
        vertical-align: middle;
        border: 0;
        max-width: 100%;

        &:not(:first-child) {
          opacity: 0;
        }

        &:first-child {
          opacity: 1;
        }
      }
    }
  }

  .card-body {
    padding: 10px;

    .title {
      font-size: 0.9rem;
      font-weight: bold;
      padding-bottom: 0.2rem;
      margin-bottom: 0.2rem;

      > a {
        @include line-ellipsis;
        color: inherit;
        text-decoration: none;
      }
    }

    .subtitle {
      opacity: 0.6;
      font-size: 0.8rem;
    }

    p {
      font-size: 0.8rem;
      opacity: 0.8;
      @include line-ellipsis(2);
    }
  }
}
</style>

<script setup lang="ts">
import { toRefs, computed } from "vue";

defineOptions({
  name: "Card",
});

interface ImageModel {
  id: number;
  title: string;
  url: string;
}

interface CardModel {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  thumbnail: string;
  icon: string;
  created_at: string;
  images: Array<ImageModel>;
}

const props = defineProps({
  data: {
    type: Object as () => CardModel,
    default: () => {},
  },
});

console.log("Props", props.data);

const { title, subtitle, description } = toRefs(props.data);
const images = computed(() => {
  return props.data.images.filter((_, i: number) => i < 1);
});
</script>
