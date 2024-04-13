<script setup>
import { RouteNames } from '../router/RouteName'
</script>

<template>
  <div class="d-flex flex-column align-center py-16">
    <h1 class="text-h3">
      在线小工具
    </h1>
    <v-card>
      <router-link :to="{ name: RouteNames.GenImage }">
        图片生成器
      </router-link>
    </v-card>
  </div>
</template>
