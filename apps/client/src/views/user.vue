<template>
  <div v-if="userInfo" class="mx-a">
    <div class="bg-white m-5 px-5 rounded">
      <div class="py-5 flex items-center justify-between">
        <span>头像</span>
        <div class="size-10 bg-gray-100 flex items-center justify-center">
          <i class="i-ep:camera"></i>
        </div>
      </div>
      <div
        class="py-5 flex items-center justify-between border-t-1 border-gray-200"
      >
        <span>昵称</span>
        <span>{{ userInfo.nickname }}</span>
      </div>
    </div>
    <div class="bg-white m-5 px-5 rounded">
      <div class="py-5 flex items-center justify-between">
        <span>手机号</span>
        <div>
          <span class="mr-1">{{ userInfo.phone }}</span>
          <i class="i-ep:lock"></i>
        </div>
      </div>
      <div
        class="py-5 flex items-center justify-between border-t-1 border-gray-200"
      >
        <span>密码</span>
        <!-- <span>{{ userInfo.pwd }}</span> -->
        <i class="i-ep:lock"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useUserStore from "../stores/user";
import { sleep } from "@shared/utils";

const userStore = useUserStore();
const userInfo = ref();

onMounted(async () => {
  if (userStore.userInfo) {
    console.log("aaa");
    userInfo.value = userStore.userInfo;
  } else {
    console.log("bbb");

    await sleep(300);
    userInfo.value = await userStore.getUserInfo();
  }
});
</script>
