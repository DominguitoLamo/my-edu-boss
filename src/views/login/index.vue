<template>
  <div class="login">
    <h1 class="title">
      Edu-Boss 教育管理系統
    </h1>
    <el-form
     ref="form"
     :model="form"
     label-width="80px"
     label-position="top"
     class="login-form"
    >
      <el-form-item label="手機號">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密碼">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="login-button">登錄</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LoginIndex',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
  },
});
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title {
    margin: 1.5em;
  }

  .login-form {
    width: 300px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
  }

  .login-button {
    width: 300px;
  }
}
</style>
