<template>
  <article class="card">
    <!-- Label -->
    <div class="card-label">
      <span :class="`badge ${index === 0 ? 'text-bg-danger' : 'text-bg-success'}`" v-for="(badge, index) in data.badge" :key="index">{{ badge }}</span>
    </div>

    <!-- Action -->
    <div class="card-action">
      <button><i class="bi bi-heart"></i></button>
      <button><i class="bi bi-brightness-high"></i></button>
    </div>
    <!-- Media -->
    <figure class="card-media">
      <Swiper :modules="[Navigation, Pagination, EffectFade, A11y, Controller]" :slides-per-view="1" :pagination="{clickable: true}" @swiper="onSwiper" @slideChange="onSlideChange">
        <SwiperSlide v-for="(image, _) in data.images" :key="image.id">
          <div class="ratio" style="--bs-aspect-ratio: 100%">
            <img class="object-fit-cover rounded" :alt="image.title" :src="image.url" />
          </div>
        </SwiperSlide>
      </Swiper>
    </figure>

    <!-- Body -->
    <div class="card-body">
      <div class="subtitle">{{ data.subtitle }}</div>
      <a class="stretched-link1" href="">
        <h3 class="title animate-underline">{{ data.title }}{{ data.description }}</h3>
      </a>
    </div>
  </article>
</template>
<script setup lang="ts">
import {Swiper, SwiperSlide} from "swiper/vue";
import {Navigation, Pagination, EffectFade, Controller, A11y} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import {SwiperContainer} from "swiper/element";

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
  badge: Array<string>;
}

const props = defineProps({
  data: {
    type: Object as () => CardModel,
    default: () => {},
  },
});

const onSwiper = (swiper: SwiperContainer) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};

console.log("Props", props.data);
</script>

<style scoped lang="scss">
.card {
  border: 0;
  position: relative;

  &:hover {
    box-shadow: var(--bs-box-shadow);
  }

  .card-label {
    position: absolute;
    top: 15px;
    left: 15px;
    display: flex;
    gap: 5px;

    .badge {
      font-size: 0.75em;
      border-radius: 0.33em;
      line-height: 1;
      display: inline-block;
      font-weight: 500;
      text-align: center;
      vertical-align: baseline;
      white-space: nowrap;
      padding: 0.35em 0.65em;
    }
  }

  .card-action {
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    gap: 5px;

    button {
      padding: 0;
      width: 2.5rem;
      height: 2.5rem;
      cursor: pointer;
      align-content: center;
      justify-content: center;
      border-radius: 0.5rem;
    }
  }

  .card-media {
    padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
  }

  .card-body {
    .subtitle {
      font-size: 1rem;
    }

    .title {
      font-size: 1.25rem;
      display: -webkit-box;
      --webkit-line-clamp: 2; /* 限制为最多两行 */
      --webkit-box-orient: vertical; /* 必须设置为竖直方向 */
      overflow: hidden; /* 超出部分隐藏 */
      text-overflow: ellipsis; /* 超出部分用省略号显示 */

      a {
        text-decoration: none;
        color: #222;
      }
    }
  }
}
</style>
