<template>
  <section>
    <Container>
      <ul class="wrapper">
        <li class="item" v-for="item in dataList" :key="item.id">
          <div class="card">
            <div class="media">
              <img :src="item.thumbnail" alt="" />
            </div>
            <div class="card-body">
              <h2 class="title">{{ item.title }}</h2>
              <div class="subtitle">{{ item.subtitle }}</div>
            </div>
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

  .wrapper {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: repeat(4, 1fr);

    .item {
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
        position: relative;
        overflow: hidden;
        background: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100px%22%20height%3D%22100px%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22xMidYMid%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M24.3%2C30C11.4%2C30%2C5%2C43.3%2C5%2C50s6.4%2C20%2C19.3%2C20c19.3%2C0%2C32.1-40%2C51.4-40%20C88.6%2C30%2C95%2C43.3%2C95%2C50s-6.4%2C20-19.3%2C20C56.4%2C70%2C43.6%2C30%2C24.3%2C30z%22%20stroke%3D%22%2356cfe1%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%22205.271142578125%2051.317785644531256%22%3E%3Canimate%20attributeName%3D%22stroke-dashoffset%22%20calcMode%3D%22linear%22%20values%3D%220%3B256.58892822265625%22%20keyTimes%3D%220%3B1%22%20dur%3D%221%22%20begin%3D%220s%22%20repeatCount%3D%22indefinite%22%2F%3E%3C%2Fpath%3E%3C%2Fsvg%3E")
          center no-repeat;
        background-size: 20% 20%;
        transition: all ease-in-out 0.5s;

        &:before {
          padding-top: 100%;
          content: "";
          display: block;
        }

        img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: auto;
          vertical-align: middle;
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
