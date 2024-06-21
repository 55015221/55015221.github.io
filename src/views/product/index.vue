<template>
  <div>
    <swiper
      v-show="false"
      :modules="[Navigation, Pagination, EffectFade, Autoplay, Controller, Scrollbar]"
      :slides-per-view="1"
      :space-between="50"
      navigation
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide>
        <div style="height: 25rem; background-size: 100% 100%; background-image: url(&quot;/img/tos_1.jpg&quot;)"></div>
      </swiper-slide>
      <swiper-slide>
        <div style="height: 25rem; background-size: 100% 100%; background-image: url(&quot;/img/tos_2.jpg&quot;)"></div>
      </swiper-slide>
      <swiper-slide>
        <div style="height: 25rem; background-size: 100% 100%; background-image: url(&quot;/img/tos_3.jpg&quot;)"></div>
      </swiper-slide>
    </swiper>
    <section>
      <Container>
        <div class="row g-2 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5">
          <div class="col" v-for="(item, index) in dataList" :key="item.id">
            <div class="card">
              <div class="card-label">
                <span class="badge text-bg-danger">热门</span>
                <span class="badge text-bg-success">流行</span>
              </div>
              <div class="card-action">
                <button><i class="bi bi-heart"></i></button>
                <button><i class="bi bi-brightness-high"></i></button>
              </div>
              <div class="card-image">
                <a class="card-media-top" href="">
                  <img :src="`/img/png/0${index}.png`" alt="..." />
                  <img :src="`/img/png/0${index + 1}.png`" alt="..." />
                </a>
              </div>
              <div class="card-body">
                <div class="subtitle">{{ item.subtitle }}</div>
                <h3 class="title animate-underline">
                  <a class="" href=""> {{ item.title }}{{ item.title }} </a>
                </h3>
                <p>{{ item.description }}{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, EffectFade, Controller, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import Container from "@/components/Container.vue";
import { onMounted, reactive } from "vue";
import { fetchData } from "@/api/goods.ts";

interface CardType {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  thumbnail: string;
  icon: string;
  created_at: string;
}

const dataList = reactive<Array<CardType>>([]);

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};

const imageList = [
  "03-Chairs-hover.webp",
  "01-CabinetsShelves-Color-02.webp",
  "01-Chairs-Color-02.webp",
  "01-Printers-hover.webp",
  "08-Printers-hover.webp",
];

onMounted(async () => {
  fetchData().then((response) => {
    Object.assign(
      dataList,
      response.data.data.filter((_, i: number) => i < 10)
    );
  });
});
</script>
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

section {
  //background: #f4f3f3;
  padding: 30px 0;

  .card {
    position: relative;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    background-color: #fff;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
    overflow: hidden;

    &:hover {
      .card-action {
        opacity: 1;
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
      top: 6px;
      right: 6px;
      z-index: 3;
      background: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
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
      top: 1rem;
      left: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      z-index: 3;

      .badge {
        --bs-badge-border-radius: 0.25rem;
      }
    }

    .card-image {
      position: relative;
      overflow: hidden;
      transition: all ease-in-out 0.5s;

      .card-media-top {
        width: 100%;
        position: relative;
        overflow: hidden;

        img {
          position: absolute; /* 相对于包含padding的a元素定位 */
          top: 0;
          left: 0;
          width: 100%; /* 宽度100%以填充包含padding的a元素 */
          height: auto; /* 保持图片的原始纵横比 */
          object-fit: cover; /* 确保图片覆盖整个空间，但可能会被裁剪 */
          background: #ffffff;
        }

        &:before {
          padding-top: 100%;
          content: "";
          display: block;
          background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100px%22%20height%3D%22100px%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22xMidYMid%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M24.3%2C30C11.4%2C30%2C5%2C43.3%2C5%2C50s6.4%2C20%2C19.3%2C20c19.3%2C0%2C32.1-40%2C51.4-40%20C88.6%2C30%2C95%2C43.3%2C95%2C50s-6.4%2C20-19.3%2C20C56.4%2C70%2C43.6%2C30%2C24.3%2C30z%22%20stroke%3D%22%2356cfe1%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%22205.271142578125%2051.317785644531256%22%3E%3Canimate%20attributeName%3D%22stroke-dashoffset%22%20calcMode%3D%22linear%22%20values%3D%220%3B256.58892822265625%22%20keyTimes%3D%220%3B1%22%20dur%3D%221%22%20begin%3D%220s%22%20repeatCount%3D%22indefinite%22%2F%3E%3C%2Fpath%3E%3C%2Fsvg%3E");
          background-position: center;
          background-repeat: no-repeat;
          background-size: 20% 20%;
        }
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%; /* 宽度100%以填充包含padding的a元素 */
        height: auto; /* 保持图片的原始纵横比 */
        object-fit: cover; /* 确保图片覆盖整个空间，但可能会被裁剪 */
        transition: opacity 0.2s ease-in-out; /* 可选：添加透明度过渡效果 */
      }

      img:nth-child(odd) {
        opacity: 1;
      }

      img:nth-child(even) {
        opacity: 0;
      }

      &:hover {
        img:nth-child(even) {
          opacity: 1 !important;
        }

        img:nth-child(odd) {
          opacity: 0 !important;
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
        @include line-ellipsis;

        > a {
          color: #000;
          text-decoration: none;
        }
      }

      .subtitle {
        font-size: 0.8rem;
      }

      p {
        font-size: 0.8rem;
        @include line-ellipsis(2);
      }
    }
  }
}
</style>
