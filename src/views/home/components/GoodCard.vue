<template>
  <div class="bg-light">
    <div class="container">
      <section class="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-4">
        <div class="col" v-for="(card, index) in cardList" :key="index">
          <article class="card">
            <div class="card-media">
              <Swiper :modules="[EffectFade, Navigation, Pagination, Controller]" :pagination="{clickable: true}">
                <SwiperSlide v-for="image in card.images" :key="image.id">
                  <div class="ratio" style="--bs-aspect-ratio: 100%">
                    <img class="object-fit-cover rounded" :alt="card.title" :src="image.url" />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div class="card-body">
              <div class="card-subtitle">{{ card.subtitle }}</div>
              <h3 class="card-title">
                <a href="">{{ card.description }}</a>
              </h3>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";
import {EffectFade, Pagination, Controller, Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

defineOptions({
  name: "GoodCard",
});

interface Props {
  loading: boolean;
  data: Array<any>;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  data: () => [],
});

const cardList = computed(() => {
  return props.data.filter((_, i) => i < 5);
});
</script>

<style scoped lang="scss">
section {
  padding: 30px 0;

  .card {
    border: 0;

    &:hover {
      box-shadow: var(--bs-box-shadow);
    }

    .card-media {
      padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
    }

    .card-body {
      .card-subtitle {
        font-size: 0.8rem;
      }

      .card-title {
        font-size: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 限制为最多两行 */
        -webkit-box-orient: vertical; /* 必须设置为竖直方向 */
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis; /* 超出部分用省略号显示 */

        a {
          text-decoration: none;
          color: #222;
        }
      }

      .card-text {
      }
    }
  }
}
</style>
