<template>  <!--此页面提供系统进入后的页面，其中显示页面为【人员白名单】页面-->
    <div>
        <!--<el-container  style="height: 700px; border: 1px solid #eee"> 头部标题栏
            <el-header style="font-size:40px; background-color: rgb(238, 241, 246)"> SkyMu天目银行视频监测系统</el-header>
            <el-container>
                <el-aside width="230px" style="border: 1px solid #eee"> 侧边栏
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
                </el-aside>-->

                <el-main>
                    <!-- 头部表单 -->
                    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                        <el-form-item label="信任人员姓名">
                            <el-input v-model="searchForm.name" placeholder="信任人员姓名"></el-input>
                        </el-form-item>

                        <el-form-item label="性别">
                            <el-select v-model="searchForm.gender" placeholder="性别">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        
                        <el-form-item label="加入名单日期">
                            <!-- 日期选择器 -->
                            <el-date-picker
                                v-model="searchForm.entrydate"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="加入日期"
                                end-placeholder="去除日期">
                            </el-date-picker>
                        </el-form-item>
                        
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>

                    <!-- 主要部分表格 -->
                    <el-table :data="tableData" border>
                        <el-table-column prop="name" label="信任人员姓名" width="180"></el-table-column>
                        <el-table-column label="照片" width="180">
                            <template slot-scope="scope">
                                <img :src="scope.row.image" width="100px" height="70px">
                            </template>
                        </el-table-column>
                        <el-table-column label="性别" width="140">
                            <template slot-scope="scope">
                                {{scope.row.gender == 1 ? '男':'女'}}
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="job" label="职位" width="140"></el-table-column> -->
                        <el-table-column prop="entrydate" label="加入名单日期" width="180"></el-table-column>
                        <el-table-column prop="updatetime" label="最后操作时间" width="230"></el-table-column>
                        <el-table-column label="操作" >
                            <el-button type="primary" size="mini">编辑</el-button>
                            <el-button type="danger" size="mini">删除</el-button>
                        </el-table-column>
                    </el-table>

                    <br>
                    
                    <!-- 分页条 -->
                    <!-- Pagination 分页 -->
                    <el-pagination background layout="total,sizes, prev, pager, next, jumper" 
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :total="1000"></el-pagination>
                </el-main>
            <!-- </el-container>
        </el-container> -->
    </div>
</template> 

<script> 
import axios from 'axios'; 
export default {
    name:'EmpView.Index',
    data() {
        return {
            tableData: [],
            searchForm: {
               name:"",
               gender:"",
               entrydate:[]
            }
        }
    },
    methods: {   //查询方法
        onSubmit:function(){
            alert("查询数据");
        },
        handleSizeChange:function(val){
            alert("每页记录数变化" + val)
        },
        handleCurrentChange:function(val){
            alert("页码发生变化" + val)
        }
    },
    mounted () {
        //发送异步请求,获取数据
        axios.get("http://yapi.smart-xwork.cn/mock/169327/emp/list").then((result) => {  //此地址是无用的，这里的地址提供人员信息
            this.tableData = result.data.data;  
        });
    }
}
</script>

<style>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

