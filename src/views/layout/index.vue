<!-- 此页面是登录后的初始界面 -->
<template>
    <div>
        <el-container style="height: 700px; border: 1px solid #eee"> <!--头部标题栏-->
            <el-header style="font-size:40px; background-color: rgb(238, 241, 246)"> SkyMu天目银行视频监测系统</el-header>
            <el-container>
                <el-aside width="230px" style="border: 1px solid #eee"> <!--侧边栏-->
                    <el-menu :default-openeds="['1', '3']">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>通用界面</template>
                            <el-menu-item index="1-1">实时视频监控</el-menu-item>
                            <el-menu-item index="1-2">报警信息查看</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-message"></i>管理员界面</template>
                            <el-menu-item index="2-1">用户权限管理</el-menu-item>
                            <el-menu-item index="2-2">人员白名单</el-menu-item>
                            <el-menu-item index="2-3">人员黑名单</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>


                <el-main>
                    <!-- 主要部分表格 -->
                    <el-table :data="tableData" border>

                    </el-table>

                    <br>

                    <!-- 分页条 -->
                    <!-- Pagination 分页 -->
                    <!-- <el-pagination background layout="total,sizes, prev, pager, next, jumper"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="1000"></el-pagination> -->

                </el-main>
            </el-container>
        </el-container>
    </div>
</template> 

<script>
import axios from 'axios'; //<!--注意！npm没有装好，导致现在没法用继承终端开启axios，需要尽快找淘宝人员解决！！！-->

export default {
    name: 'LayoutIndex',
    data() {
        return {
            tableData: []
        }
    },
    methods: {   //查询方法
    },
    mounted() {
        //发送异步请求,获取数据
        axios.get("http://yapi.smart-xwork.cn/mock/169327/emp/list").then((result) => {  //此地址是无用的，这里的地址提供人员信息
            this.tableData = result.data.data;
        });
    }
}
</script>

<style></style>

