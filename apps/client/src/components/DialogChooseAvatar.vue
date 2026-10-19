<template>
  <el-dialog v-model="visible" title="选择头像" width="80%">
    <el-scrollbar height="250px">
      <div class="flex flex-wrap gap-2">
        <div
          v-for="(item, index) in avatarUrls"
          :key="index"
          class="size-15 border-2 rounded-5 overflow-hidden"
          :class="index === chooseIndex ? 'border-blue' : 'border-gray-300'"
          @click="chooseIndex = index"
        >
          <img :src="baseUrl + item" alt="" class="size-full" />
        </div>
      </div>
    </el-scrollbar>
    <template #footer>
      <div class="mt-5">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" :loading="loading" @click="confirm"
          >确认选择</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import { postUpdateAvatar } from "../apis/user";
import { sleep } from "@shared/utils";
import { ElMessage } from "element-plus";

const { VITE_HTTP_HOST } = import.meta.env;
const baseUrl = VITE_HTTP_HOST + "/uploads/";
const avatarUrls = [
  "yuanshen (1).jpeg",
  "yuanshen (1).jpg",
  "yuanshen (1).png",
  "yuanshen (1).webp",
  "yuanshen (2).jpeg",
  "yuanshen (2).jpg",
  "yuanshen (2).webp",
  "yuanshen (3).jpeg",
  "yuanshen (3).jpg",
  "yuanshen (3).webp",
  "yuanshen (4).jpeg",
  "yuanshen (4).jpg",
  "yuanshen (4).webp",
  "yuanshen (5).jpeg",
  "yuanshen (5).jpg",
  "yuanshen (5).webp",
  "yuanshen (6).jpeg",
  "yuanshen (6).jpg",
  "yuanshen (6).webp",
  "yuanshen (7).jpeg",
  "yuanshen (7).jpg",
  "yuanshen (7).webp",
  "yuanshen (8).jpg",
  "yuanshen (8).webp",
  "yuanshen (9).webp",
  "yuanshen (10).webp",
];

const visible = defineModel({
  type: Boolean,
  default: false,
});
const emits = defineEmits(["success"]);

const loading = ref(false);
const chooseIndex = ref();

const cancel = () => {
  visible.value = false;
};

const confirm = async () => {
  if (loading.value) return;
  const avatar = avatarUrls[chooseIndex.value];
  if (!avatar) {
    return ElMessage.warning("请先选择头像");
  }
  loading.value = true;
  try {
    await postUpdateAvatar(baseUrl + avatar);
    await sleep(300);
    visible.value = false;
    emits("success");
  } catch (err) {}
  loading.value = false;
};
</script>
