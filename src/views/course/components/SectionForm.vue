<template>
    <div class="secForm">
      <el-form ref="section-form" :model="section" label-width="70px">
        <el-form-item label="课程名称">
          <el-input
          :value="courseName"
          autocomplete="off"
          disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="章节名称" prop="sectionName">
          <el-input v-model="section.sectionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节描述" prop="description">
          <el-input v-model="section.description" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节排序" prop="orderNum">
          <el-input-number v-model="section.orderNum"></el-input-number>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isAddSectionShow = false">取 消</el-button>
      <el-button type="primary" @click="handleAddSection">确 定</el-button>
    </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'


export default Vue.extend({
    name: "SectionForm",
    props: {
        section: {
            required: true,
        },
        courseName: {
            required: true,
            type: String
        },
        isShow: {
            required: true,
            default: false,
        }
    },
    methods: {
        handleAddSection () {

        }
    }
})
</script>