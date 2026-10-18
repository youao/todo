<template>
  <div class="h-layout-content flex flex-col overflow-hidden">
    <div class="px-5">
      <el-tabs v-model="tabIsCompleted" @tab-change="handleTab">
        <el-tab-pane label="未完成" name="0" />
        <el-tab-pane label="已完成" name="1" />
        <el-tab-pane label="全部" name="" />
      </el-tabs>
    </div>
    <el-scrollbar class="flex-1 overflow-hidden px-5">
      <div
        v-for="item in list"
        :key="item.id"
        class="flex items-baseline py-4 border-b-1 border-b-gray-200"
      >
        <el-checkbox
          v-model="item.is_completed"
          :true-value="1"
          :false-value="0"
          size="large"
          @change="handleCompleted(item)"
        />
        <div
          class="flex-1 pl-4"
          :class="item.is_completed === 1 ? 'text-gray line-through' : ''"
        >
          {{ item.title }}
        </div>
        <div v-if="item.is_deleted === 1" class="ml-5">
          <el-button
            type="warning"
            size="small"
            @click="setDeleteItem(item.id, 0)"
            >还原</el-button
          >
        </div>
        <div v-else class="ml-5">
          <el-button type="" size="small" @click="openDialog(item)"
            >编辑</el-button
          >
          <el-button
            type="warning"
            size="small"
            @click="setDeleteItem(item.id, 1)"
            >删除</el-button
          >
        </div>
      </div>

      <el-empty v-if="!list.length" description="暂无数据~" />
    </el-scrollbar>
    <div class="flex items-center mx-5 py-4 border-t-1 border-t-gray-300">
      <div class="flex-1">
        <el-checkbox
          v-model="isDeleted"
          label="回收站"
          :true-value="1"
          :false-value="0"
          border
          @change="switchIsDeleted"
        />
        <el-button class="mx-2" type="primary" @click="openDialog()"
          >添加</el-button
        >
      </div>
      <el-pagination
        v-model:current-page="page"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        @change="getList"
      />
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
import {
  getTodoList,
  postTodoCreate,
  postTodoUpdateTitle,
  postTodoCompleted,
  postTodoDeleted,
} from "../apis/todo";
import { ElMessage, ElMessageBox } from "element-plus";

const tabIsCompleted = ref("0");
const isDeleted = ref(0);
const list = ref([]);
const page = ref(1);
const pageSize = 10;
const total = ref(0);

const getList = () => {
  getTodoList({
    page: page.value,
    page_size: pageSize,
    is_deleted: isDeleted.value,
    is_completed: tabIsCompleted.value,
  }).then((res) => {
    list.value = res.data.list;
    total.value = res.data.total;
  });
};

const switchIsDeleted = () => {
  page.value = 1;
  getList();
};

const handleTab = () => {
  page.value = 1;
  getList();
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

const handleCreate = async () => {
  if (!title.value) return;
  if (!currentId.value) {
    await postTodoCreate(title.value);
    ElMessage.success("添加成功");
  } else {
    await postTodoUpdateTitle(currentId.value, title.value);
    ElMessage.success("操作成功");
  }
  closeDialog();
  getList();
};

const handleCompleted = (item) => {
  const { id, is_completed } = item;
  postTodoCompleted(id, is_completed).then(() => getList());
};

const setDeleteItem = (id, is_deleted) => {
  if (is_deleted === 1) {
    ElMessageBox.confirm("删除后可前往回收站恢复", "确认删除吗？", {
      confirmButtonText: "确认删除",
      type: "warning",
    }).then(() => {
      postTodoDeleted(id, is_deleted).then(() => getList());
    });
  } else {
    postTodoDeleted(id, 0).then(() => getList());
  }
};

getList();
</script>
