<template>
    <!-- 主界面 -->
    <el-container class="home-container">

        <el-header class="header">
            <div>
                <!-- <img src="../assets/logo.png" alt="logo" style="weight=10px;height=10px">   -->
                <span class="tital">SkyEye天目银行视频监测系统</span>
            </div>
            <!-- 退出按钮 -->
            <!-- <el-button class="logout-button" type="info" @click="logout">退出</el-button> -->

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

        <el-container class="main-container">
            <!-- <div class="menu"> -->

            <el-aside class="aside" width="150px">
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b">
                    <MenuRouter v-for="item in menus" :key="item.path" :item="item" v-if!="item.hidden" />
                    <!-- <MenuRouter v-for="item in menus" :key="item.path" :item="item"  /> -->
                </el-menu>
            </el-aside>
            <!-- </div> -->

            <el-main class="main">
                <router-view></router-view> <!--用于显示content中子页面内容-->
            </el-main>

        </el-container>
    </el-container>
</template>

<script>
// import getters from '@/store/getters';
import MenuRouter from './MenuRouter.vue';
// import user from '@/store/modules/user';

// import {router} from '../router/index'
export default {
    name: 'Layout',
    components: { MenuRouter },
    data() {
        return {
            menus: []
        }
    },
    created() {
        // debugger
        // const right=user.state.right;
        // console.log(1+[...this.$router.options.routes])
        // console.log(2+this.$router.getters.right)
        // console.log(3+user.state.right)

        // this.menus = this.$store.getters.right  //得到路由信息，就是index.js文件里面的路由信息可以打看查看
        // const right=[...this.$store.state.right]
        // if(right.includes("1")){
            this.menus = [...this.$router.options.routes]  //得到路由信息，就是index.js文件里面的路由信息可以打看查看
            // console.log("管理员"+this.menus);
        // }
        // else{
            // this.menus = [...this.$router.options.routes].filter(route => route.path !== '/admin');
            // console.log("用户"+this.menus);
        // }
    }
}
</script>

<style scoped>
.home-container {
  height: 100vh; /* 设置容器的高度为视口高度 */
  width: 100%; /* 设置容器的宽度为 100% */
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 设置主轴方向为垂直方向 */
  overflow: hidden; /* 防止内容溢出时出现滚动条 */
}

.main-container {
  flex: 1; /* 占据剩余空间 */
  display: flex; /* 使用 flex 布局 */
  overflow: hidden; /* 防止内容溢出时出现滚动条 */
}

.main {
  flex: 1; /* 占据剩余空间 */
  overflow: hidden; /* 内容溢出时显示滚动条 */
}

.header {
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
    position: relative;
    /* width: 100%; */
    /* height: 40px; */
}

.aside {
    height: 100%;
    width: 40px;
    overflow: hidden;
}

.menu {
    height: 100%;
    /* width:240px; */
    overflow: hidden;
}

.el-menu-vertical-demo {
    height: 100%;
}

/* 设置左边导航栏和顶部菜单不对齐的方法 */
.el-menu {
    border-right-width: 0;
}


span {
    margin-left: 4px;
}
</style>

