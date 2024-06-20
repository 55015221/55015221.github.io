<template>
  <section>
    <Container>
      <div class="row g-2 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5">
        <div class="col" v-for="(item, index) in dataList" :key="item.id">
          <div class="card">
            <div class="card-label">
              <span class="badge text-bg-primary">New</span>
              <span class="badge text-bg-success">Hot</span>
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
              <h3 class="title">
                <a href=""> {{ item.title }}{{ item.title }} </a>
              </h3>
              <p>{{ item.description }}{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
<script setup lang="ts">
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
@mixin line-ellipsis($line: 1) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  // 使用传入的行数作为 -webkit-line-clamp 的值
  -webkit-line-clamp: $line;
}

section {
  background: #f4f3f3;
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
      .title {
        &:after {
          transform: scaleX(1) !important;
          transform-origin: bottom left !important;
        }
      }

      img:first-child {
        opacity: 0 !important;
      }

      img:last-child {
        opacity: 1 !important;
        transform: scale(1.25);
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
      top: 6px;
      left: 6px;
      font-size: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      z-index: 3;

      .badge {
        margin: 2px;
      }
    }

    .card-image {
      position: relative;
      overflow: hidden;
      transition: all ease-in-out 0.5s;

      .card-media-top {
        position: relative;
        overflow: hidden;

        &:after {
          padding-top: 100%;
          content: "";
          display: block;
          background: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100px%22%20height%3D%22100px%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22xMidYMid%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M24.3%2C30C11.4%2C30%2C5%2C43.3%2C5%2C50s6.4%2C20%2C19.3%2C20c19.3%2C0%2C32.1-40%2C51.4-40%20C88.6%2C30%2C95%2C43.3%2C95%2C50s-6.4%2C20-19.3%2C20C56.4%2C70%2C43.6%2C30%2C24.3%2C30z%22%20stroke%3D%22%2356cfe1%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%22205.271142578125%2051.317785644531256%22%3E%3Canimate%20attributeName%3D%22stroke-dashoffset%22%20calcMode%3D%22linear%22%20values%3D%220%3B256.58892822265625%22%20keyTimes%3D%220%3B1%22%20dur%3D%221%22%20begin%3D%220s%22%20repeatCount%3D%22indefinite%22%2F%3E%3C%2Fpath%3E%3C%2Fsvg%3E")
            center no-repeat;
          background-size: 20% 20%;
        }
      }

      img:first-child {
        opacity: 1;
      }

      img:last-child {
        opacity: 0;
      }

      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: auto;
        vertical-align: middle;
        object-fit: cover;
        transition: all ease-in-out 0.3s;
      }
    }

    .card-body {
      padding: 10px;

      .title {
        font-size: 0.9rem;
        font-weight: bold;
        position: relative;
        padding-bottom: 0.2rem;
        margin-bottom: 0.2rem;
        @include line-ellipsis;

        &:after {
          position: absolute;
          content: "";
          transition: transform 0.3s ease-out;
          background-color: currentcolor;
          bottom: 0;
          left: 0;
          height: 1px;
          top: auto;
          transform: scaleX(0);
          transform-origin: bottom right;
          width: calc(100% - 1.425em - 1.125rem * 2);
        }

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
