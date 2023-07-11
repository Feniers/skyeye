<!--此页面是主页面，显示内容为固定的头部栏和左侧菜单栏。其右下主要显示页面会变化-->
<template>
  <div>

    <el-container>
      <el-header style="font-size:40px; background-color: rgb(238, 241, 246)"> SkyEye天目银行视频监测系统</el-header>
      <el-container>
        
        <el-aside width="200px">
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>通用界面</template>
              <el-menu-item index="1-1">实时视频监控</el-menu-item>
              <el-menu-item index="1-2">报警信息查看</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-message"></i>管理员界面</template>
              <el-menu-item index="2-1"><router-link to="/usermag">用户权限管理</router-link> </el-menu-item>
              <el-menu-item index="2-2"><router-link to="/tlist">人员白名单</router-link></el-menu-item>
              <el-menu-item index="2-3">人员黑名单</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main style="height: 700px; border: 1px solid #eee">
          <router-view></router-view> <!--用于显示content中子页面内容-->
        </el-main>
      </el-container>
    </el-container>


  </div>
</template>

<script> //ydh part
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

.el-container {
  height: 100%;
}


.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
  line-height: 100%;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

/* body>.el-container {
  margin-bottom: 40px;
} */

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>