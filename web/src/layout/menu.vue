<template>
    <div class="menu">
        <el-aside class="aside" width="240px">
            <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b">
                <!-- <MenuRouter v-for="item in menus" :key="item.path" :item="item" v-if="!item.hidden" /> -->
                <MenuRouter v-for="item in menus" :key="item.path" :item="item"  />
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
import MenuRouter from './MenuRouter.vue';
// import {router} from '../router/index'
export default {
    components: { MenuRouter },
    data() {
        return {
            menus: []
        }
    },
    created() {
        debugger
        this.menus = [...this.$router.options.routes]  //得到路由信息，就是index.js文件里面的路由信息可以打看查看
        // this.menus=
        console.log(this.menus);
    }
}
</script>

<style scoped>
.menu {
    height: 100%;
    /* width:240px; */
    overflow: hidden;
}

.aside {
    height: 100%;
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