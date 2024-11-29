<template>
  <Carousel />
  <Card :data="cardList" :loading="loading" />
  <div class="bg-light">
    <div class="container">
      <section class="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-4">
        <div class="col" v-for="(card, index) in cardList" :key="index">
          <Card :data="card"></Card>
        </div>
      </section>
    </div>
  </div>
  <DividerCard />
  <Tabs />
</template>
<script setup lang="ts">
import Carousel from "@/components/Carousel.vue";
import DividerCard from "./components/DividerCard.vue";
import Tabs from "@/views/home/components/tabs.vue";
import Card from "@/components/Card.vue";
import {onMounted, reactive, ref} from "vue";
import {fetchData} from "@/api/goods.ts";

interface CardDataType {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  thumbnail: string;
  icon: string;
  created_at: string;
}

const loading = ref(false);
const cardList = reactive(<Array<CardDataType>>[]);

onMounted(async () => {
  await fetchData().then((response) => {
    Object.assign(cardList, response.data.data);
  });
});
</script>

<style lang="scss" scoped></style>
