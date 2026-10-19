<template>
  <div class="pt-30vh">
    <div
      class="w-4/5 max-w-400px mx-a p-5 border-1 border-solid border-gray-300 rounded box-border bg-white"
    >
      <div class="text-2xl font-600 mb-5">注册</div>
      <el-input v-model="phone" class="mb-5" placeholder="手机号"></el-input>
      <el-input
        v-model="pwd"
        class="mb-5"
        placeholder="密码"
        type="password"
      ></el-input>
      <el-button class="w-full mb-2" type="primary" @click="login"
        >注册</el-button
      >
      <div class="text-center">
        <el-link @click="tologin">已有账号？立即登录</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { postRegister } from "../apis/user";
import { ElMessage } from "element-plus";
import { sleep } from "@shared/utils";

const route = useRoute();
const router = useRouter();

const phone = ref("");
const pwd = ref("");
const loading = ref(false);

const login = async () => {
  if (!phone.value || !pwd.value || loading.value) return;
  loading.value = true;
  try {
    await postRegister(phone.value, pwd.value);
    ElMessage.success("注册成功");
    await sleep(1000);
    tologin();
  } catch (err) {}
  loading.value = false;
};

const tologin = () => {
  router.push({
    path: "/login",
    query: route.query,
  });
};
</script>
