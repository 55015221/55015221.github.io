<template>
  <section>
    <Container>
      <ul class="product-list">
        <li class="collection-product-card" v-for="item in dataList" :key="item.id">
          <div class="card">
            <div class="media">
              <img :src="item.thumbnail" alt="" />
            </div>
            {{ item.title }}
          </div>
        </li>
      </ul>
    </Container>
  </section>
</template>

<style scoped lang="scss">
section {
  background: rgba(247, 247, 247, 1);
  padding: 30px 0;

  .product-list {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: repeat(4, 1fr);

    .collection-product-card {
      position: relative;
      list-style: none;
      transition: 0.25s;
      overflow: hidden;
    }

    .card {
      position: relative;
      display: block;
      height: 100%;
      text-decoration: none;
      background-color: #fff;
      border-radius: 0.6rem;
      overflow: hidden;

      .media {
        overflow: hidden;

        img {
          object-fit: cover;
        }
      }

      .link-overlay {
        text-decoration: none;
        color: rgb(4, 4, 4);
        background-color: transparent;
        z-index: 1;
        cursor: pointer;
        border: none;
        text-underline-offset: 0.3rem;
        font-size: 1.5rem;

        &:empty {
          display: block;
          max-width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
</style>
<script setup lang="ts">
import Container from "@/components/Container.vue";
import { onMounted, reactive } from "vue";
import { fetchData } from "@/api/goods.ts";

const dataList = reactive([]);

onMounted(async () => {
  fetchData().then((response) => {
    Object.assign(dataList, response.data.data);
  });
});
</script>
