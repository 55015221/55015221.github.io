<template>
  <div>
    <swiper
      v-if="false"
      :modules="[Navigation, Pagination, EffectFade, A11y, Autoplay, Controller]"
      :slides-per-view="1"
      :space-between="20"
      loop
      autoplay
      navigation
      :pagination="{ clickable: true }"
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

    <section v-if="false">
      <Container>
        <swiper
          :modules="[Navigation, Pagination, EffectFade, A11y, Autoplay, Controller]"
          :slides-per-view="4"
          :space-between="10"
          :navigation="{}"
          :pagination="{ clickable: true }"
          loop
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="(item, index) in dataList" :key="item.id" style="height: 40rem">
            <Card :modelValue="item" />
          </swiper-slide>
        </swiper>
      </Container>
    </section>
    <section>
      <Container>
        <div class="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5">
          <div class="col" v-for="(item, index) in dataList" :key="item.id">
            <Card :modelValue="item"></Card>
          </div>
        </div>
      </Container>
    </section>
  </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, EffectFade, Controller, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import Container from "@/components/Container.vue";
import { onMounted, reactive } from "vue";
import { fetchData } from "@/api/goods.ts";
import Card from "@/components/Card.vue";

interface CardType {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  thumbnail: string;
  icon: string;
  created_at: string;
  image: Array<any>;
}

const dataList = reactive<Array<CardType>>([]);

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};

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
section {
  //background: #f4f3f3;
  padding: 30px 0;
}
</style>
