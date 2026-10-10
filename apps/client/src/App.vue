<template>
  <div>
    <div class="flex items-center">
      <Hello class="flex-1" title="Todo Client" />
      <el-button class="ml-2" type="primary" @click="openDialog()"
        >添加</el-button
      >
    </div>
    <div>
      <div v-for="item in list" :key="item.id" class="flex py-5 border-t-1">
        <div class="flex-1">{{ item.title }}</div>
        <el-button type="" size="small" @click="openDialog(item)"
          >编辑</el-button
        >
        <!-- <el-button type="success" size="small">完成</el-button> -->
        <el-button type="warning" size="small" @click="deleteItem(item.id)"
          >删除</el-button
        >
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="currentId ? '编辑任务' : '添加任务'"
    >
      <div>
        <el-input v-model="title"></el-input>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button v-if="currentId" type="primary" @click="handleCreate">
            立即提交
          </el-button>
          <el-button v-else type="primary" @click="handleCreate">
            立即添加
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Hello } from "@shared/ui";
import axios from "axios";

const list = ref([]);

const getList = () => {
  axios
    .get("/api/todo/list")
    .then((res) => res.data)
    .then((res) => {
      list.value = res.data;
    });
};

const dialogVisible = ref(false);
const title = ref("");
const currentId = ref(0);

const openDialog = (item) => {
  if (item) {
    title.value = item.title;
    currentId.value = item.id;
  } else {
    title.value = "";
    currentId.value = 0;
  }
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};

const handleCreate = () => {
  if (!title.value) return;
  if (!currentId.value) {
    axios
      .post("/api/todo/create", {
        title: title.value,
      })
      .then((res) => res.data)
      .then((res) => {
        if (res) {
          closeDialog();
          getList();
        }
      });
  } else {
    axios
      .post("/api/todo/updateTitle", {
        id: currentId.value,
        title: title.value,
      })
      .then((res) => res.data)
      .then((res) => {
        if (res) {
          closeDialog();
          getList();
        }
      });
  }
};

const deleteItem = (id) => {
  axios
    .post("/api/todo/delete", {
      id,
    })
    .then((res) => res.data)
    .then((res) => {
      if (res) {
        getList();
      }
    });
};

getList();
</script>

<style></style>
