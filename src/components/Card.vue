<template>
  <div class="card">
    <div class="label">
      <span class="badge text-bg-danger">热门</span>
      <span class="badge text-bg-success">流行</span>
    </div>
    <div class="action">
      <button><i class="bi bi-heart"></i></button>
      <button><i class="bi bi-brightness-high"></i></button>
    </div>
    <div class="card-media-top">
      <swiper :modules="[Navigation, Pagination, EffectFade, A11y, Autoplay, Controller]" :slides-per-view="1" :space-between="20" loop autoplay navigation :pagination="{clickable: true}" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide v-for="(image, _) in images" :key="image.id">
          <img class="card-img-top" :src="image.url" :alt="image.title" />
        </swiper-slide>
      </swiper>
    </div>

    <div class="card-body">
      <div class="subtitle">{{ subtitle }}</div>
      <h3 class="title animate-underline">
        <a class="stretched-link1" href=""> {{ title }}{{ title }} </a>
      </h3>
      <p class="text">{{ description }}{{ description }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import {toRefs, computed} from "vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import {Navigation, Pagination, EffectFade, Controller, A11y, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

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

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};

console.log("Props", props.data);

const {title, subtitle, images, description} = toRefs(props.data);
</script>

<style scoped lang="scss">
.card {
  position: relative;
  .label,
  .action {
    z-index: 100;
    position: absolute;
  }
  .label {
    top: 10px;
    left: 10px;
  }
  .action {
    display: flex;
    flex-direction: column;
    top: 10px;
    right: 10px;
  }

  .card-media-top {
    .swiper-slide {
      background: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100px%22%20height%3D%22100px%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22xMidYMid%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M24.3%2C30C11.4%2C30%2C5%2C43.3%2C5%2C50s6.4%2C20%2C19.3%2C20c19.3%2C0%2C32.1-40%2C51.4-40%20C88.6%2C30%2C95%2C43.3%2C95%2C50s-6.4%2C20-19.3%2C20C56.4%2C70%2C43.6%2C30%2C24.3%2C30z%22%20stroke%3D%22%2356cfe1%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%22205.271142578125%2051.317785644531256%22%3E%3Canimate%20attributeName%3D%22stroke-dashoffset%22%20calcMode%3D%22linear%22%20values%3D%220%3B256.58892822265625%22%20keyTimes%3D%220%3B1%22%20dur%3D%221%22%20begin%3D%220s%22%20repeatCount%3D%22indefinite%22%2F%3E%3C%2Fpath%3E%3C%2Fsvg%3E")
        0 0 /20% no-repeat;
      &:before {
        padding-top: 100%;
        content: "";
        display: block;
      }
      .card-img-top {
        position: absolute;
        margin: auto;
        inset: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  .card-body {
    .title {
      font-size: 1.02rem;

      a {
        color: #222;
        text-decoration: none;
      }
    }
    .text {
      color: #666;
      font-size: 0.9rem;
      overflow: hidden;
      display: block;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-clamp: 2;
    }
  }
}
</style>
