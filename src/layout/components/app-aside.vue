<template>
  <div class="aside">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
        <el-submenu index="/role">
        <template slot="title">
            <i class="el-icon-location"></i>
            <span>權限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/role">
              <i class="el-icon-setting"></i>
              角色管理
          </el-menu-item>
          <el-menu-item index="/menu">
              <i class="el-icon-setting"></i>
              菜單管理
          </el-menu-item>
          <el-menu-item index="/resource">
              <i class="el-icon-setting"></i>
              資源管理
          </el-menu-item>
        </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/course">
        <i class="el-icon-menu"></i>
        <span slot="title">課程管理</span>
        </el-menu-item>
        <el-menu-item index="/user">
        <i class="el-icon-document"></i>
        <span slot="title">用戶管理</span>
        </el-menu-item>
        <el-submenu index="4">
        <template slot="title">
            <i class="el-icon-location"></i>
            <span>廣告管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/advert">
              <i class="el-icon-setting"></i>
              廣告列表
          </el-menu-item>
          <el-menu-item index="/advert-space">
              <i class="el-icon-setting"></i>
              廣告位列表
          </el-menu-item>
        </el-menu-item-group>
        </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AsideMenu',
  methods: {
    handleOpen(key: string, keyPath: string): void {
      console.log(key, keyPath);
    },
    handleClose(key: string, keyPath: string): void {
      console.log(key, keyPath);
    },
  },
});
</script>

<style lang="scss" scoped>
.aside {
    .el-menu {
        min-height: 100vh;
    }
}
</style>
