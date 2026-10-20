<template>
  <div class="h-100vh overflow-hidden flex">
    <div class="w-40 h-full overflow-hidden flex flex-col">
      <div class="h-15 flex items-center pl-5">
        <span class="text-2xl font-600">Todo</span>
      </div>
      <el-menu
        router
        :default-active="defaultActive"
        class="flex-1 overflow-hidden"
      >
        <el-scrollbar class="h-full">
          <el-menu-item
            v-for="item in menus"
            :key="item.path"
            :index="item.path"
          >
            <span>{{ item.title }}</span>
          </el-menu-item>
        </el-scrollbar>
      </el-menu>
    </div>

    <div class="flex-1 flex flex-col overflow-hidden">
      <div
        class="h-15 px-5 flex items-center justify-right border-b-1 border-gray-200"
      >
        <el-link>138****0001</el-link>
        <router-link to="/login">
          <el-link>退出</el-link>
        </router-link>
      </div>
      <div class="flex-1 overflow-hidden">
        <el-scrollbar class="h-full p-5">
          <router-view></router-view>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const menus = [
  {
    path: "/home",
    title: "欢迎",
  },
  {
    path: "/todo",
    title: "任务",
  },
  {
    path: "/user",
    title: "会员",
  },
];

const route = useRoute();

const defaultActive = ref("");

defaultActive.value = route.path;
</script>
