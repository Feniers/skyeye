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
            <div>
                <el-dropdown>
                    <span class="avatar-dropdown">
                        <!-- <img class="avatar" :src="userfaceSrc" alt="avatar"> -->
                        <!-- <img class="avatar" src="../assets/background/registerbg.jpg" alt="avatar"> -->
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <router-link to="/person">
                            <el-dropdown-item>个人信息</el-dropdown-item>
                        </router-link>

                        <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>


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
import MenuRouter from './MenuRouter.vue';
import { logout } from '@/api/user';
import { removeToken } from '@/utils/auth';

export default {
    name: 'Layout',
    components: { MenuRouter },
    data() {
        return {
            menus: []
        }
    },
    methods: {
        logout() {
            // alert('点击注销按钮')
            console.log('点击注销按钮')
            // debugger
            // this.$store.dispatch('user/logout').then(() => {
            //     this.$router.push('/login');
            //     alert("注销成功")
            // }).catch(() => {
            //     this.$message.error('注销失败');
            // })
            logout().then(()=>{
                // removeToken()
                this.$router.push('/login');
                this.$message.success('注销成功')
            }).catch(error=>{
                this.$message.error("注销失败"+error)
            })
        },
    },

    created() {
        // debugger
        const right = this.$store.state.user.right;

        const user=this.$store.state.user
        console.log("user "+user)
        const routeList = [...this.$router.options.routes]  //得到路由信息，就是index.js文件里面的路由信息可以打看查看
        // console.log("routeList "+routeList)

        //如果不包含管理员权限
        if (right.includes("0")) {
            this.menus = routeList
        } else {
            this.menus = routeList.filter(route => route.path!=='/admin');
        }
        // console.log("menus "+this.menus)
    }
}


</script>

<style scoped>
.home-container {
    height: 98vh;
    /* 设置容器的高度为视口高度 */
    width: 100%;
    /* 设置容器的宽度为 100% */
    display: flex;
    /* 使用 flex 布局 */
    flex-direction: column;
    /* 设置主轴方向为垂直方向 */
    overflow: hidden;
    /* 防止内容溢出时出现滚动条 */
}

.main-container {
    flex: 1;
    /* 占据剩余空间 */
    display: flex;
    /* 使用 flex 布局 */
    overflow: hidden;
    /* 防止内容溢出时出现滚动条 */
}

.main {
    /* flex: 1; */
    height: 100%;
    /* 占据剩余空间 */
    /* overflow: hidden; */
    overflow: auto;
    /* 内容溢出时显示滚动条 */
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
    width: 100%;
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

.router-link-active {
    text-decoration: none;
    color: rgb(236, 137, 9);
}

a {
    text-decoration: none;
    color: white;
}
</style>

