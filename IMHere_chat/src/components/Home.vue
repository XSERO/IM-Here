<template>
  <el-container class="home-container">
    <!-- 一级侧边栏 -->
    <el-aside class="aside-box " width="60px">
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <div class="func_box"><i class="iconfont icon-xiaoxi"></i></div>
      <div class="func_box">
        <i class="iconfont icon-biaodankongjianlianxiren"></i>
      </div>
      <div class="func_box"><i class="iconfont icon-liaotian"></i></div>
    </el-aside>
    <!-- 右侧内容区 -->
    <el-main>
        <!-- 路由占位符 -->
        <router-view>
        </router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      success: '',
      message: '',
      input: '',
      websock: ''
    }
  },
  methods: {
    connect() {
      const wsuri = 'ws://127.0.0.1:8000'
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
      this.$message.success('socket连接成功')
    },
    websocketonerror() {
      console.log('连接错误')
    },
    websocketonmessage(msg) {
      this.message += msg.data
    },
    sendMessage() {
      if (this.websock.readyState === 1) {
        this.websock.send(this.input)
        this.message += this.input + '--->'
        this.input = ''
      } else this.$message.error('请先连接')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-aside {
  background-color: #f5f5f5;
}
.el-main {
  background-color: #ffffff;
  padding: 0;
}
.aside-box {
  height: 100%;
  width: 64px;
  background-color: #fff;
  display: flex;
  flex-direction: column; //修改主轴方向
  flex-wrap: wrap; //开启自动换行
  align-items: center;
  border-right: 1px solid #F4F4F4;
}
.avatar_box {
  width: 40px;
  height: 40px;
  border-radius: 10%;
  box-shadow: 0 0 1px #ddd;
  margin: 30px 0;
  img {
    height: 100%;
    width: 100%;
    border-radius: 10%;
    background-color: rgb(241, 231, 231);
  }
}
.func_box {
  i {
    font-size: 30px;
  }
  margin-bottom: 20px;
}
</style>
