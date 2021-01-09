<template>
    <div class="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown>
        <span class="el-dropdown-link">
            <el-avatar
              shape="square"
              :size="30"
              src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png">
            </el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
            <el-dropdown-item divided
             @click.native="handleLogout"
             >
             退出
             </el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getUserInfo } from '@/services/user';

export default Vue.extend({
    name: 'AppHeader',
    data() {
        return {
            userInfo: {},
        };
    },

    created() {
        this.loadUserInfo();
    },
    methods: {
        async loadUserInfo() {
            const { data } = await getUserInfo();
            this.userInfo = data.content;
        },
        handleLogout() {
            this.$confirm ('确认退出吗？', '退出提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.$store.commit('setUser', null);
                this.$router.push({name: 'login'});
            }).catch(() => {
                this.$message('取消退出');
            });
        },
    },
});
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    flex: 1;
    height: 100%;
}

.el-dropdown {
    margin-left: auto;
}

.el-dropdown-link {
    display: flex;
    align-items: center;
}
</style>