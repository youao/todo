<template>
  <div class="min-h-100vh">
    <LayoutHeader />
    <router-view></router-view>
  </div>
</template>

<script setup>
import useUserStore from "../stores/user";
import LayoutHeader from '../components/LayoutHeader.vue';

const userStore = useUserStore();
userStore.getUserInfo();
</script>
