<template>
  <el-card class="user-list">
    <div slot="header">
      <el-form :inline="true" label-position="left" :model="filterParams" ref="filter-form">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="filterParams.phone" />
        </el-form-item>
        <el-form-item label="注册时间" prop="rangeDate">
          <el-date-picker
            v-model="filterParams.rangeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholde="开始时间"
            end-placeholde="结束时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="loading"
            @click="handleReset"
          >重置</el-button>
          <el-button
            type="primary"
            :disabled="loading"
            @click="handleQuery"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="users"
      style="width:100%"
      v-loading="loading"
    >
      <el-table-column
        prop="id"
        label="用户ID"
        min-width="100"
      ></el-table-column>
      <el-table-column
        label="头像"
        min-width="80"
      >
        <template slot-scope="scope">
          <img width="30px" :src="scope.row.portrait || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间"
        min-width="120"
      ></el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleSelectRole(scope.row)"
          >分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="filterParams.currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="filterParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled="loading"
    >
    </el-pagination>

    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-select style="display:block" v-model="roleIdList" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAllocRole">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script lang="ts">
import Vue from 'vue';
import { getUserPages } from '@/services/user';
import { getAllRoles, allocateUserRoles, getUserRoles } from '@/services/role';
import { Form } from 'element-ui';

export default Vue.extend({
  name: 'UserList',
  data() {
    return {
      filterParams: {
        phone: '',
        currentPage: 1,
        pageSize: 10,
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: [],
      },
      total: 0,

      loading: false,
      users: [],
      dialogVisible: false,
      roles: [],
      currentUser: null, // 当前操作分配的角色
      roleIdList: [], // 当前已选择的角色ID集合
    };
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      this.loading = true;
      const { data } = await getUserPages(this.filterParams);
      this.users = data.data.records;
      this.total = data.data.total;
      this.loading = false;
    },
    handleReset() {
      (this.$refs['filter-form'] as Form).resetFields();
      this.loadUsers();
    },
    handleQuery() {
      this.filterParams.currentPage = 1;
      this.loadUsers();
    },
    handleSizeChange(val: number) {
      this.filterParams.pageSize = val;
      this.filterParams.currentPage = 1;
      this.loadUsers();
    },
    handleCurrentChange(val: number) {
      this.filterParams.currentPage = val;
      this.loadUsers();
    },
    // 获取可选取角色列表，以及对应 id 角色的已分配菜单
    async handleSelectRole(role: any) {
      this.currentUser = role;
      const { data } = await getAllRoles();
      this.roles = data.data;
      const { data: { data: userRoles } } = await getUserRoles((this.currentUser as any).id);
      this.roleIdList = userRoles.map((item: any) => item.id);
      this.dialogVisible = true;
    },
    async handleAllocRole() {
      const { data } = await allocateUserRoles({
        userId: (this.currentUser as any).id,
        roleIdList: this.roleIdList,
      });
      if (data.code !== '000000') {
        return this.$message.error(data.mesg);
      }
      this.$message.success('操作成功');
      this.dialogVisible = false;
    },
  },
});
</script>
<style lang="scss" scoped>
.user-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: none;
  ::v-deep .el-card__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .el-table {
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
