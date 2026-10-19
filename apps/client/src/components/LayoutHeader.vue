<template>
  <div class="h-10 px-5 flex items-center justify-between bg-white">
    <router-link to="/">
      <el-link>Todo</el-link>
    </router-link>
    <div v-if="isLogin">
      <router-link to="/user">
        <el-link>{{ name }}</el-link>
      </router-link>
      <el-link class="ml-2" @click="logout">退出登录</el-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import useUserStore from "../stores/user";
import { ElMessageBox } from "element-plus";

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
  ElMessageBox.confirm("确认退出登录吗？", "退出登录", {
    type: "warning",
  }).then(() => {
    userStore.logout();
    setTimeout(() => {
      router.push("/login");
    }, 500);
  });
};
</script>
