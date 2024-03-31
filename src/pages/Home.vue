<script setup>
import { RouteNames } from '../router/RouteName'
</script>

<template>
  <div class="flex flex-col items-center py-40">
    <h1 style="font-size: 46px;">
      home
    </h1>
    <router-link :to="{ name: RouteNames.GenImage }">
      Gen IMage
    </router-link>
  </div>
</template>
