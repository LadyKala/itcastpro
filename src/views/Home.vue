<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <img class="logo">
        <el-menu
          :router="true"
          :unique-opened="true"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="rgba(0,0,0,0.1)"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-lollipop"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/user">
                <i class="el-icon-potato-strips"></i>
                <span>用户列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-milk-tea"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/roles">
                <i class="el-icon-cherry"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-menu-item index="/home/rights">
                <i class="el-icon-cherry"></i>
                <span>权限列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn"></span>
          <span class="system-title">电商后台管理系统</span>
          <div class="welcome">
            <span>你好：admin</span>
            <a href="javascript:;">退出</a>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleOpen () {},
    handleClose () {}
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background: url("../assets/fafa.jpg");
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: url("../assets/fafa.jpg");
  }
  .logo {
    height: 60px;
    width: 100%;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: rgb(62, 145, 106);
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: rgb(62, 145, 106);
  }
  .welcome {
    color: rgb(62, 145, 106);
  }
}
</style>
