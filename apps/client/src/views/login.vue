<template>
  <div class="pt-30vh">
    <div
      class="w-4/5 max-w-400px mx-a p-5 border-1 border-solid border-gray-300 rounded box-border"
    >
      <div class="text-2xl font-600 mb-5">登录</div>
      <el-input v-model="phone" class="mb-5" placeholder="手机号"></el-input>
      <el-input
        v-model="pwd"
        class="mb-5"
        placeholder="密码"
        type="password"
      ></el-input>
      <el-button class="w-full mb-2" type="primary" @click="login"
        >登录</el-button
      >
      <div class="text-center">
        <el-link @click="toRegister">没有账号？立即注册</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { postLogin } from "../apis/user";
import useUserStore from "../stores/user";
import { ElMessage } from "element-plus";
import { sleep } from "@shared/utils";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const phone = ref("");
const pwd = ref("");
const loading = ref(false);

const login = async () => {
  if (!phone.value || !pwd.value || loading.value) return;
  loading.value = true;
  try {
    const res = await postLogin(phone.value, pwd.value);
    const { token } = res.data;
    await userStore.login(token);
    ElMessage.success("登录成功");
    await sleep(1000);
    const { redirect = "/" } = route.query;
    router.push(decodeURIComponent(redirect));
  } catch (err) {}
  loading.value = false;
};

const toRegister = () => {
  router.push({
    path: "/register",
    query: route.query,
  });
};
</script>
