<template>
    <!--此页面是【监控视频信息页面（显示） 也就是显示简略的信息-->
    <!--之后还会有一个详细的页面，显示视频的详细信息。力例如入侵次数，入侵时间，入侵地点，入侵人员等-->
    <div>
        <el-container  style="height: 700px; border: 1px solid #eee"> <!--头部标题栏-->
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

            <!--可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。-->
            <!--可以通过指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加 class，表明该行处于某种状态。-->
                <el-main>
                    <el-table
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址">
                    </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>


</script>

<style>
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
