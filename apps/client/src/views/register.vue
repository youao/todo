<template>
  <div class="pt-30vh">
    <div
      class="w-4/5 max-w-400px mx-a p-5 border-1 border-solid border-gray-300 rounded box-border"
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
        >登录</el-button
      >
      <div class="text-center">
        <router-link to="/login">
          <el-link>已有账号？立即登录</el-link>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { postRegister } from "../apis/user";
import useUserStore from "../stores/user";

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
    await postRegister(phone.value, pwd.value);
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (err) {}
  loading.value = false;
};
</script>
