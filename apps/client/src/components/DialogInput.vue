<template>
  <el-dialog v-model="visible" :title="title">
    <div>
      <el-input v-model="inputValue"></el-input>
    </div>
    <template #footer>
      <div>
        <el-button v-if="cancelText" @click="cancel">{{
          cancelText
        }}</el-button>
        <el-button type="primary" :loading="loading" @click="confirm">{{ confirmText }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const visible = defineModel({
  type: Boolean,
  default: false,
});

const props = defineProps({
  title: String,
  defaultValue: String,
  cancelText: {
    type: String,
    default: "取消",
  },
  confirmText: {
    type: String,
    default: "立即提交",
  },
  customCancel: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["cancel", "confirm"]);

const inputValue = ref("");

watch(
  () => visible.value,
  (value) => {
    if (value) {
      inputValue.value = props.defaultValue;
    }
  },
);

const cancel = () => {
  if (props.customCancel) return emits("cancel");
  visible.value = false;
};

const confirm = () => {
  emits("confirm", inputValue.value);
};
</script>
