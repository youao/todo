<template>
  <div v-if="userInfo" class="mx-a">
    <div class="bg-white m-5 px-5 rounded">
      <div class="py-5 flex items-center justify-between">
        <span>头像</span>
        <div
          class="size-10 bg-gray-100 flex items-center justify-center"
          @click="openAvatarDialog"
        >
          <img
            v-if="userInfo.avatar"
            class="size-full"
            :src="userInfo.avatar"
            alt=""
          />
          <i v-else class="i-ep:camera"></i>
        </div>
      </div>
      <div
        class="py-5 flex items-center justify-between border-t-1 border-gray-200"
        @click="openNicknameDialog"
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
        <i class="i-ep:lock"></i>
      </div>
    </div>

    <DialogInput
      v-model="nicknameVisible"
      title="设置昵称"
      :defaultValue="nickname"
      :loading="loadingNickname"
      @confirm="handleUpdateNickname"
    />
    <DialogChooseAvatar v-model="avatarVisible" @success="onAvatarChange" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useUserStore from "../stores/user";
import { sleep } from "@shared/utils";
import DialogInput from "../components/DialogInput.vue";
import DialogChooseAvatar from "../components/DialogChooseAvatar.vue";
import { postUpdateNickname } from "../apis/user.js";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

const nicknameVisible = ref(false);
const nickname = ref("");
const loadingNickname = ref(false);

const openNicknameDialog = () => {
  nickname.value = userInfo.nickname || "";
  nicknameVisible.value = true;
};
const handleUpdateNickname = async (value) => {
  loadingNickname.value = true;
  try {
    await postUpdateNickname(value);
    await sleep(300);
    nicknameVisible.value = false;
    ElMessage.success("操作成功");
    userStore.getUserInfo(1);
  } catch (err) {}
  loadingNickname.value = false;
};

const avatarVisible = ref(false);
const openAvatarDialog = () => {
  avatarVisible.value = true;
};
const onAvatarChange = () => {
  ElMessage.success("操作成功");
  userStore.getUserInfo(1);
};
</script>
