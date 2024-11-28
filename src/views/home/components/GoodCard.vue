<template>
  <div class="bg-light">
    <div class="container">
      <section class="row g-2 row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5">
        <div class="col" v-for="(card, index) in cardList">
          <article class="card border-0 rounded-0 shadow-sm">
            <div class="card-media">
              <div :id="`carouselExampleIndicators-${index}`" class="carousel slide" v-if="card.images.length > 1">
                <div class="carousel-indicators">
                  <button
                    :data-bs-target="`#carouselExampleIndicators-${index}`"
                    :data-bs-slide-to="i"
                    :aria-label="image.title"
                    :class="`${i === 0 ? 'active' : ''}`"
                    v-for="(image, i) in card.images"
                    type="button"
                    aria-current="true"
                  ></button>
                </div>
                <div class="carousel-inner">
                  <div :class="`carousel-item ${i === 0 ? 'active' : ''}`" v-for="(image, i) in card.images">
                    <div class="ratio" style="--bs-aspect-ratio: 75%">
                      <img :src="image.url" class="object-fit-cover rounded" alt="..." />
                    </div>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" :data-bs-target="`#carouselExampleIndicators-${index}`" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" :data-bs-target="`#carouselExampleIndicators-${index}`" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <div v-else class="ratio" style="--bs-aspect-ratio: 75%">
                <img class="object-fit-cover rounded" :alt="card.title" :src="card.images[0].url" />
              </div>
            </div>
            <div class="card-body">
              <div class="card-subtitle">{{ card.subtitle }}</div>
              <h3 class="card-title">
                <a href="">{{ card.title }}</a>
              </h3>
              <p class="card-text">{{ card.description }}</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";

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
  return props.data.filter((_, i) => i < 5);
});
</script>

<style scoped lang="scss">
section {
  padding: 30px 0;

  .card {
    .card-body {
      .card-subtitle {
        font-size: 0.8rem;
      }

      .card-title {
        font-size: 1.25rem;

        a {
          text-decoration: none;
          color: #222;
        }
      }

      .card-text {
      }
    }
  }
}
</style>
