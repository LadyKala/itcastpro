<template>
  <div class="login">
    <div class="container">
      <el-form :model="LoginForm" :rules="rules" ref="LoginForm" class="demo-ruleForm">
        <img src="../assets/109951164112800034.jpg" alt class="avatar">
        <el-form-item label prop="username">
          <el-input v-model="LoginForm.username" prefix-icon="el-icon-user-solid" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input v-model="LoginForm.password" prefix-icon="el-icon-key" placeholder="请输入密码" @keyup.enter.native="submitForm ('LoginForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitForm ('LoginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/index.js'
export default {
  data () {
    return {
      LoginForm: {
        username: '',
        password: ''
      },
      rules: {
        //   required:是否必须  message:如果不合法的提醒 trigger:什么时候触发
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.LoginForm).then(result => {
            // console.log(result)
            if (result.meta.status === 200) {
              // 将token数据储存到本地存储
              localStorage.setItem('itcastpro_token', result.data.token)
              // 要进行调转的页面
              this.$router.push({ name: 'Home' })
            } else {
              this.$message.error(result.meta.msg)
            }
          })
        } else {
          this.$message.error('数据输入不合法')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color:pink;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
