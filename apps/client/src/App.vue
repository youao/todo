<template>
  <div>
    <Hello title="Client" />
    <img :src="ImgVue" alt="" />
  </div>
</template>

<script setup>
import ImgVue from "@shared/assets/images/vue.svg";
import { Hello } from "@shared/ui";
</script>

<style>
body {
  margin: 0;
}
</style>
