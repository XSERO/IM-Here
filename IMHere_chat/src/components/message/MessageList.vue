<template>
<el-container class="container">
  <el-aside class="message_box">
    <el-row class="left_header">
      <el-input
    placeholder="请输入内容"
    v-model="input" prefix-icon="el-icon-search" size="mini"
    clearable>
      </el-input>
    </el-row>
    <el-row>
      <el-col class="avatar_box"><img src="../../assets/logo.png" ></el-col>
      <el-col class="avatar_box"><img src="../../assets/logo.png" ></el-col>
      <el-col><div>xcvx</div></el-col>
      <el-col><div>xcvx</div></el-col>
    </el-row>
      <!-- <el-row justify>
        <el-col class="avatar_box">
        <img src="../../assets/logo.png" >
        </el-col
        <el-col>
          <div class="grid-content bg-purple">cvcx</div>
        </el-col>
      </el-row> -->
  </el-aside>
  <el-main>
  </el-main>
</el-container>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.container{
  height: 100%;
  width: 100%;
  background-color: #7e2e2e;
}
.el-aside{
  background-color: #7e2e2e;
}
.left_header{
  padding: 15px;
  border-bottom: solid 1px #dddddd ;
}
.left_list{
  padding: 15px;
  background-color: burlywood;
  .el-row{
    background-color: chartreuse;
    .el-col{
      width: 5px;
    }
  }
}
.el-main{
  height: 100%;
  width: 100%;
  background-color: #2e7e5f;
}
.avatar_box {
  width: 40px;
  height: 40px;
  border-radius: 10%;
  box-shadow: 0 0 1px #ddd;
  margin: 30px 0;
  img {
    width: 40px;
    height: 40px;
    border-radius: 10%;
    background-color: rgb(241, 231, 231);
  }
}
</style>
