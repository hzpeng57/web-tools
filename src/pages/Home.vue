<script setup>
import { RouteNames } from '../router/RouteName'
</script>

<template>
  <div class="d-flex flex-column align-center py-16">
    <h1 class="text-h3">
      在线小工具
    </h1>
    <div class="card-wrap mt-10 d-flex ga-5 flex-wrap px-5">
      <v-card class="card-item d-flex align-center justify-center">
        <router-link :to="{ name: RouteNames.GenImage }">
          图片生成器
        </router-link>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.card-wrap {
  max-width: 900px;
  width: 100%;
}
.card-item {
  width: calc((100% - 40px) / 3);
  height: 200px;
}
</style>
