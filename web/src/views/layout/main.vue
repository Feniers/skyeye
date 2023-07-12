<!--此页面是主页面，显示内容为固定的头部栏和左侧菜单栏。其右下主要显示页面会变化-->
<template>
  <el-container class="home-container">
    <!-- <el-header style="font-size:40px; background-color: rgb(45, 142, 152)">  -->

    <el-header>
      <div>
        <!-- <img src="../assets/logo.png" alt="logo" style="weight=10px;height=10px">   -->
        <span class="tital">SkyEye天目银行视频监测系统</span>
      </div>
      <!-- 退出按钮 -->
      <el-button class="logout-button" type="info" @click="logout">退出</el-button>

      <!-- <el-dropdown>
        <span class="avatar-dropdown">
          <img class="avatar" :src="userfaceSrc" alt="avatar">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="goToProfile">个人信息</el-dropdown-item>
          <el-dropdown-item @click="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </el-header>

    <el-container class="all-container">

      <el-aside width="230px" style="border: 1px solid #eee">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>通用界面</template>
            <el-menu-item index="1-1"><router-link to="/moniter">实时视频监控</router-link></el-menu-item>
            <el-menu-item index="1-2"><router-link to="/record">报警信息查看</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>管理员界面</template>
            <el-menu-item index="2-1"><router-link to="/usermag">用户权限管理</router-link> </el-menu-item>
            <!-- <el-menu-item index="2-2"><router-link to="/tlist">人员白名单</router-link></el-menu-item> -->
            <el-menu-item index="2-3"><router-link to="/blist">人员黑名单</router-link></el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main class="main-container">
        <router-view></router-view> <!--用于显示content中子页面内容-->
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
//ydh part
// import { logout } from '@/api/user'
export default {
  data(){
    return{
      userfaceSrc:"../assets/tupian.jpg"
    }
  },
  methods: {
    logout() {
      // alert('点击注销按钮')
      console.log('点击注销按钮')
      debugger
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/');
        alert("注销成功")
      }).catch(() => {
        this.$message.error('注销失败');
      })
    },
    goToProfile(){
      console.log('点击个人信息按钮')
    }
  }
}
</script>

<style scoped >
/* // 标签的名字就是类的名字 */
.home-container {
  /* display: flex; */
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.all-container {
  height: 100vh;
  overflow: hidden;
}

.main-container {
  width: 100vw;
  height: 100vh;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.router-link-active {
  text-decoration: none;
  color: rgb(206, 114, 8);
}

a {
  text-decoration: none;
  color: rgb(3, 0, 0);
}


.el-header {
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  /* //  居中 */
  align-items: center;
  /* //  文本颜色 */
  color: #fff;
  /* // 文字大小 */
  font-size: 20px;
}

.el-header .logo {
  display: flex;
  align-items: center;
}

.el-header .logo img {
  height: 40px;
  /* 根据需求调整 Logo 图片高度大小 */
  margin-right: 10px;
  /* 根据需求调整 Logo 图片与标题之间的间距 */
}

.el-header .title {
  font-weight: bold;
  /* 可调整标题文字的字重 */
}

.el-header .logout-button {
  margin-left: 10px;
  /* 根据需求调整退出按钮与标题之间的间距 */
}

.el-aside {
  /* display: flex; */
  height: 100%;
  background-color: #333744;
}

.el-main {
  /* display: flex; */
  height: 100vh;
  background-color: #EAEDF1;
}
</style>