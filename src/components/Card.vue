<template>
  <article class="card h-100">
    <!-- Label -->
    <div class="card-label">
      <span :class="`badge ${index === 0 ? 'text-bg-danger' : 'text-bg-success'}`" v-for="(badge, index) in data.badge" :key="index">{{ badge }}</span>
    </div>
    <!-- Action -->
    <div class="card-action">
      <button class="animate-pulse"><i class="bi bi-heart animate-target"></i></button>
      <button><i class="bi bi-brightness-high"></i></button>
    </div>
    <!-- Media -->
    <a href="" title="">
      <figure class="card-media">
        <Swiper :modules="[Navigation, Pagination, EffectFade, A11y, Controller]" :slides-per-view="1" :pagination="{clickable: true}" @swiper="onSwiper" @slideChange="onSlideChange">
          <SwiperSlide v-for="(image, _) in data.images" :key="image.id">
            <div class="ratio" style="--bs-aspect-ratio: 100%">
              <img class="object-fit-cover rounded" :alt="image.title" :src="image.url" />
            </div>
          </SwiperSlide>
        </Swiper>
      </figure>
    </a>

    <!-- Body -->
    <div class="card-body">
      <div class="subtitle text-muted">{{ data.subtitle }}</div>
      <h3 class="title">
        <a class="" href="">{{ data.title }}</a>
      </h3>
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

const props = defineProps({
  data: {
    type: Object as () => Card,
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
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.25);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.25);
  }
  70% {
    transform: scale(1);
  }
}

.animate-pulse {
  &:hover,
  &:focus-visible {
    .animate-target {
      animation: pulse 0.9s;
    }
  }

  .animate-target::after {
    display: none;
  }
}

.card {
  border: 0;
  position: relative;

  &:hover {
    box-shadow: var(--bs-box-shadow);

    .card-action {
      display: flex;
    }
  }
  .card-label,
  .card-action {
    position: absolute;
    top: 10px;
    display: flex;
    gap: 5px;
    z-index: 100;
  }

  .card-label {
    left: 10px;

    .badge {
      font-size: 0.75rem;
      border-radius: 0.33rem;
      line-height: 1;
      display: inline-block;
      font-weight: 500;
      text-align: center;
      vertical-align: baseline;
      white-space: nowrap;
      padding: 0.35rem 0.65rem;
    }
  }

  .card-action {
    right: 10px;
    flex-direction: column;
    display: none;

    button {
      padding: 0;
      width: 2.5rem;
      height: 2.5rem;
      cursor: pointer;
      align-content: center;
      justify-content: center;
      border-radius: 0.5rem;

      i {
        transition: all 0.25s ease-in-out;
      }
    }
  }

  .card-media {
    margin: 0;
    //padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
  }

  .card-body {
    .title {
      font-size: 1.15rem;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-box-orient: vertical; /* 必须设置为竖直方向 */
      -webkit-line-clamp: 2; /* 限制为最多两行 */
      -ms-line-clamp: 2;
      overflow: hidden; /* 超出部分隐藏 */
      text-overflow: ellipsis; /* 超出部分用省略号显示 */

      .subtitle {
        font-size: 0.85rem;
      }

      a {
        text-decoration: none;
        color: var(--bs-gray-700);
      }
    }
  }
}
</style>
