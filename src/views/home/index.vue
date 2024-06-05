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
import axios from "axios";
import { onMounted, reactive, ref } from "vue";

const loading = ref(false);
const cardList = reactive([]);

onMounted(async () => {
  await axios.get("/api/goods").then((response) => {
    console.log(response.data.data);
    Object.assign(cardList, response.data.data.data);
  });
});
</script>

<style lang="scss" scoped></style>
