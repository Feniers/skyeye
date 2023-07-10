<template> 
    <!--此页面是【用户信息管理页面】-->
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
  
  
            <el-header style="text-align: right; font-size: 12px">
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>此处是选中用户名</span>  <!--这里根据实际选中的用户名进行自动调整-->
            </el-header>
    
            <el-main>
            <el-table :data="tableData"> <!--这里到时候根据gxc数据库用户信息表进行管理-->
                <el-table-column prop="date" label="注册日期" width="140">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
            </el-table>
            </el-main>
     </el-container>
    </el-container>
    </div>
</template>

<script>   //杨dh part
export default{
    name:'UserManageIndex'
}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>