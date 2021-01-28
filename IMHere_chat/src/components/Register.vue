<template>
  <div class="register_container">
    <div class="register_box">
      <!-- 登录表单区域 -->
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerFormRules"
        label-width="20px"
        class="register_form"
      >
        <h1 class="tittle">欢迎注册IMHere</h1>
        <!-- 用户名 -->
        <el-form-item prop="username" label=" ">
          <el-input
            v-model="registerForm.username"
            prefix-icon="iconfont icon-user"
            placeholder="用户名 | Username"
          ></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item prop="mobile" label=" ">
          <el-input
            v-model="registerForm.mobile"
            prefix-icon="iconfont icon-3702mima"
            placeholder="手机 | Mobile"
          ></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email" label=" ">
          <el-input
            v-model="registerForm.email"
            prefix-icon="iconfont icon-3702mima"
            placeholder="邮箱 | Emeil"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label=" ">
          <el-input
            v-model="registerForm.password"
            prefix-icon="iconfont icon-3702mima"
            placeholder="密码 | Password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="password" label=" ">
          <el-input
            v-model="authpassword"
            prefix-icon="iconfont icon-3702mima"
            placeholder="确认密码 | AuthPassword"
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
            <el-button class="btn" type="primary" @click="register"
              >立即注册</el-button
            >
          </el-row>
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
    // 验证邮箱的校验规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (value) {
        if (regEmail.test(value)) {
          // 合法的邮箱
          return cb()
        } else {
          cb(new Error('请输入合法的邮箱'))
        }
      } else {
        return cb()
      }
    }
    // 验证手机的校验规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (value) {
        if (regMobile.test(value)) {
          // 合法的邮箱
          return cb()
        } else {
          cb(new Error('请输入合法的手机号'))
        }
      } else {
        return cb()
      }
    }
    return {
      // 这是登录表单的数据绑定对象
      registerForm: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      // 再次输入密码，确认密码
      authpassword: '',
      // 这是表单的验证规则对象
      registerFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        mobile: [
          { validator: checkMobile, trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetRegisterForm() {
      this.$refs.registerFormRef.resetFields()
    },
    register() {
      this.$refs.registerFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) {
          return
        }
        if (this.registerForm.password !== this.authpassword) {
          this.$message.error('两次输入的密码不一样，请确认密码')
          this.authpassword = ''
        }
        const { data: res } = await this.$http.post(
          '/register',
          this.registerForm
        )
        if (res.model.errno === 0) this.$message.success('注册成功,请登录')
        if (res.model.errno !== 0) this.$message.error('注册失败')

        // 2、通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
