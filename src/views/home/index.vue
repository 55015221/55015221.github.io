<template>
  <Carousel />
  <div style="background-color: #fafafa">
    <div class="container">
      <section class="row g-4 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-5">
        <div class="col" v-for="(card, index) in cardList" :key="index">
          <template v-if="index < 6">
            <Card :data="card"></Card>
          </template>
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

const loading = ref(false);
const cardList = reactive(<Array<Card>>[]);

onMounted(async () => {
  await fetchData().then((response) => {
    Object.assign(cardList, response.data.data);
  });
});
</script>

<style lang="scss" scoped></style>
