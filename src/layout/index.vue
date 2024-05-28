<script setup lang="ts">
import Header from "@/layout/header/index.vue"
import Main from "@/layout/main/index.vue"
import Footer from "@/layout/footer/index.vue"

defineOptions({
  name: "App"
})
</script>

<template>
  <a-layout>
    <Header/>
    <Main/>
    <Footer/>
  </a-layout>
</template>

<style scoped>

</style>
