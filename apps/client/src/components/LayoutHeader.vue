<template>
  <div class="h-10 px-5 flex items-center justify-between">
    <div>Todo</div>
    <div v-if="isLogin">
      <el-link>{{ name }}</el-link>
      <el-link class="ml-2" @click="logout">退出登录</el-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import useUserStore from "../stores/user";

const router = useRouter();

const userStore = useUserStore();
const isLogin = computed(() => !!userStore.token);
const name = computed(() => {
  const user = userStore.userInfo;
  if (!user) return "";
  const { phone, nickname } = user;
  return nickname || phone;
});

const logout = () => {
  userStore.logout();
  setTimeout(() => {
    router.push("/login");
  }, 500);
};
</script>
