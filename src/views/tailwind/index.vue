<template>
  <section>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div class="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          <template v-for="row in dataList" :key="row.id">
            <div class="group relative shadow-lg overflow-hidden rounded-md">
              <div class="overflow-hidden">
                <div class="aspect-square w-full rounded-md bg-gray-200 lg:aspect-none group-hover:scale-110 lg:h-100">
                  <img
                    :src="row.thumbnail"
                    class="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    alt="Front of men&#039;s Basic Tee in black."
                  />
                </div>
              </div>
              <div class="p-3 flex justify-between">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" class="absolute inset-0"></span>
                      {{ row.title }}
                    </a>
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">{{ row.subtitle }}</p>
                </div>
                <p class="text-sm font-medium text-gray-900">$35</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.aspect-square {
  background: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100px%22%20height%3D%22100px%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22xMidYMid%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M24.3%2C30C11.4%2C30%2C5%2C43.3%2C5%2C50s6.4%2C20%2C19.3%2C20c19.3%2C0%2C32.1-40%2C51.4-40%20C88.6%2C30%2C95%2C43.3%2C95%2C50s-6.4%2C20-19.3%2C20C56.4%2C70%2C43.6%2C30%2C24.3%2C30z%22%20stroke%3D%22%2356cfe1%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%22205.271142578125%2051.317785644531256%22%3E%3Canimate%20attributeName%3D%22stroke-dashoffset%22%20calcMode%3D%22linear%22%20values%3D%220%3B256.58892822265625%22%20keyTimes%3D%220%3B1%22%20dur%3D%221%22%20begin%3D%220s%22%20repeatCount%3D%22indefinite%22%2F%3E%3C%2Fpath%3E%3C%2Fsvg%3E")
    center no-repeat;
  background-size: 20% 20%;
}
</style>
<script setup lang="ts">
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
      response.data.data.filter((x, i) => i < 4)
    );
  });
});
</script>
