<template>
  <Carousel />
  <Card :data="cardList" :loading="loading" />
  <GoodCard :data="cardList" :loading="loading" />
  <DividerCard />
  <Tabs />
</template>
<script setup lang="ts">
import Carousel from "@/components/Carousel.vue";
import DividerCard from "./components/DividerCard.vue";
import Tabs from "@/views/home/components/tabs.vue";
import Card from "@/views/home/components/Card.vue";
import GoodCard from "@/views/home/components/GoodCard.vue";
import { onMounted, reactive, ref } from "vue";
import { fetchData } from "@/api/goods.ts";

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
