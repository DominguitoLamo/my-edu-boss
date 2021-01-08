<template>
  <div class="resource-list">
    <el-card>
      <div slot="header">
        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select v-model="form.categoryId" placeholder="资源分类" clearable>
              <el-option
                v-for="item in resourceCategories"
                :label="item.name"
                :value="item.id"
                :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="card-body-wrapper" style="display:flex;flex-direction:column">
        <el-table
          :data="resources"
          v-loading="isLoading"
          style="width: 100%;margin-bottom:20px;flex:1;overflow-y:auto;">
          <el-table-column
            type="index"
            label="编号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="资源名称"
            width="280">
          </el-table-column>
          <el-table-column
            prop="url"
            label="资源路径"
            min-width="280"
            >
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            width="180">
          </el-table-column>
          <el-table-column
            prop="createdTime"
            label="添加时间"
            width="180">
          </el-table-column>
          <el-table-column label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.current"
          :page-sizes="[5, 10, 20]"
          :page-size="form.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          :disabled="isLoading"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { getResourcePages } from '@/services/resource';
import { getResourceCategories } from '@/services/resource-category';
import { Form } from 'element-ui';

export default Vue.extend({
  name: 'ResourceList',
  data() {
    return {
      resources: [],
      form: {
        name: '',
        url: '',
        categoryId: null,
        current: 1, // 当前哪页
        size: 10, // 每页大小
      },
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: false,
    };
  },
  created() {
    this.loadResources();
    this.loadResourceCategories();
  },
  methods: {
    async loadResources() {
      this.isLoading = true;
      const { data } = await getResourcePages({
        ...this.form,
        // 查询条件
        current: this.form.current, // 请求页码
        size: this.form.size,
      });
      this.resources = data.data.records;
      this.totalCount = data.data.total;
      this.isLoading = false;
    },
    async loadResourceCategories() {
      const { data } = await getResourceCategories();
      this.resourceCategories = data.data;
    },
    onSubmit() {
      this.form.current = 1; // 筛选查询从第一页开始
      this.loadResources();
    },
    onReset() {
      (this.$refs.form as Form).resetFields();
    },
    handleSizeChange(val: number) {
      // 改变页大小 获取对应页数的第一页
      this.form.size = val;
      this.form.current = 1; // 重新查询第一页
      this.loadResources();
    },
    handleCurrentChange(val: number) {
      // 请求获取对应页码的数据
      this.form.current = val; // 修改查询页码
      this.loadResources();
    },
  },
});
</script>
<style lang="scss" scoped>

</style>
