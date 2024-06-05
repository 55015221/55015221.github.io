<template>
  <section>
    <Container>
      <div class="dynamic-text">
        <h1>
          404
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#ff22ff" class="bi bi-cloud-rain-heavy-fill" viewBox="0 0 16 16">
            <path
              d="M4.176 11.032a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm.229-7.005a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973z"
            />
          </svg>
        </h1>

        page not found
      </div>
    </Container>
  </section>
</template>
<script setup lang="ts">
import Container from "@/components/Container.vue";
</script>
<style scoped lang="scss">
section {
  padding: 5rem;
  font-size: 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.02);

  h1 {
    font-size: 10rem;
    font-family: "Arial Rounded MT Bold", serif;
  }
}
</style>
