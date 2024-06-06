<template>
  <section>
    <Container>
      <a-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 5 }" :colGap="10" :rowGap="10">
        <a-grid-item v-for="card in cardList">
          <a-card :bordered="false">
            <template #cover>
              <a class="image" href="" :title="card.title">
                <img :alt="card.title" :src="card.thumbnail" />
              </a>
            </template>
            <a-card-meta>
              <template #title>
                <a href="">{{ card.title }}</a>
              </template>
              <template #description>
                {{ card.description }}
              </template>
            </a-card-meta>
          </a-card>
        </a-grid-item>
      </a-grid>
    </Container>
  </section>
</template>
<script setup lang="ts">
import Container from "@/components/Container.vue";
import { computed } from "vue";

defineOptions({
  name: "GoodCard",
});

interface Props {
  loading: boolean;
  data: Array<any>;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  data: () => [],
});

const cardList = computed(() => {
  return props.data.filter((_, i) => i < 8);
});
</script>

<style scoped lang="scss">
section {
  padding: 30px 0;
  background: rgba(247, 247, 247, 1);
}

.arco-card:hover {
  //box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 10px 50px;

  .image {
    transform: scale(1.12);
  }
}

:deep(.arco-card-cover) {
  padding: 0.6rem;
}

.arco-card {
  height: 100%;
  border-radius: 6px;

  .arco-card-meta-title {
    font-size: 1.2rem;
  }

  .arco-card-meta-description {
    font-size: 1rem;
  }

  .image {
    position: relative;
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
      border: 0;
      vertical-align: middle;
      max-width: 100%;
      position: absolute;
      inset: 0;
      object-fit: contain;
    }
  }
}
</style>
