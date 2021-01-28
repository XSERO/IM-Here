<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="20px"
        class="login_form"
      >
        <h1 class="tittle">欢迎登录IMHere</h1>
        <!-- 用户名 -->
        <el-form-item prop="username" label=" ">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user" placeholder="用户名 | Username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label=" ">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima" placeholder="密码 | Password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <!-- <el-form-item prop="verificationcode">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item> -->
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-row>
            <el-button class="btn" type="primary" @click="login" v-noMoreClick
              >登录</el-button
            >
          </el-row>
          <el-row>
            <router-link to="/register" class="registlink" >没有账号，立即注册</router-link>
          </el-row>
          <!-- <el-row>
            <el-button
              class="btn"
              type="primary"
              @click="register"
              v-noMoreClick
              >没有账号，立即注册</el-button
            >
          </el-row> -->
          <!-- <el-button class="btn" type="info" @click="resetLoginForm">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="bg-bubbles">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.post('/login', this.loginForm)
        console.log(res)
        if (res.model.errno === 0) this.$message.success('登陆成功')
        if (res.model.errno !== 0) this.$message.error('登陆失败')

        // 1、将登录成功之后的 token 保存到客户端的 sessionStorage中
        // 1.1 项目中除了登录之外的其他api接口，必须在登录之后才能访问
        // 1.1 token之在当前网站打开期间生效，所以将 token 保存在 sessionStorage中
        window.sessionStorage.setItem('token', res.token)
        // 2、通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    },
    register() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.post('/register', this.loginForm)
        console.log(res)
        if (res.model.errno === 0) this.$message.success('注册成功')
        if (res.model.errno !== 0) this.$message.error('注册失败')

        // 2、通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
