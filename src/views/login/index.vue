<template>
  <div class="login">
    <h1 class="title">
      Edu-Boss 教育管理系統
    </h1>
    <el-form
     ref="form"
     :model="form"
     :rules="rules"
     label-width="80px"
     label-position="top"
     class="login-form"
    >
      <el-form-item label="手機號" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密碼" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
         type="primary"
         @click="onSubmit"
         class="login-button"
         :loading="isLoginLoading"
         >登錄</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Form } from 'element-ui';
import { login } from '@/services/user';

export default Vue.extend({
  name: 'LoginIndex',
  data() {
    return {
      form: {
        phone: '15510792995',
        password: '111111',
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
        ],
      },
      isLoginLoading: false,
    };
  },
  methods: {
    async onSubmit() {
      try {
        // 1. 表单验证
        await (this.$refs.form as Form).validate();

        // 登录按钮 loading
        this.isLoginLoading = true;

        // 2. 验证通过 -> 提交表单
        const { data } = await login(this.form);

        // 3. 处理请求结果
        //    失败：给出提示
        if (data.state !== 1) {
          this.$message.error(data.message);
        } else {
          // 1. 登录成功，记录登录状态，状态需要能够全局访问（放到 Vuex 容器中）
          this.$store.commit('setUser', data.content);
          // 2. 然后在访问需要登录的页面的时候判断有没有登录状态（路由拦截器）
          //    成功：跳转回原来页面或首页
          this.$router.push(this.$route.query.redirect as string || '/');
          // this.$router.push({
          //   name: 'home'
          // })
          this.$message.success('登录成功');
        }
      } catch (err) {
        this.$message.error(`登录失败 -- ${err}`);
      }

      // 结束登录按钮的 loading
      this.isLoginLoading = false;
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
