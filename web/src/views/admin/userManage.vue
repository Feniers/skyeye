<template>
    <!--此页面是【用户信息管理页面】-->
    <div>
        <!-- <el-container  style="height: 700px; border: 1px solid #eee"> 头部标题栏
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
                </el-aside> -->


        <!-- <el-header style="text-align: right; font-size: 12px">
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>此处是选中用户名</span> 
        </el-header> -->



        <el-main>

            <el-form :inline="true" :model="searchText" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="searchText.name" placeholder="name"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-select v-model="searchText.right" placeholder="right">
                        <el-option label="高级" value="0"></el-option>
                        <el-option label="中级" value="1"></el-option>
                        <el-option label="低级" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryTable">查询</el-button>
                </el-form-item>
            </el-form>


            <!-- 主要部分表格 -->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="序号" type="index" width="100"> </el-table-column>
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="name" label="用户名" width="300"></el-table-column>
                <el-table-column prop="nickname" label="昵称" width="180">
                    <!-- <template slot-scope="scope">
                        <img :src="scope.row.image" width="100px" height="70px">
                    </template> -->
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="140">
                    <!-- <template slot-scope="scope">
                        {{ scope.row.gender == 1 ? '男' : '女' }}
                    </template> -->
                </el-table-column>
                <!-- <el-table-column prop="job" label="职位" width="140"></el-table-column> -->
                <!-- <el-table-column prop="right" label="权限"></el-table-column> -->
                <!-- <el-table-column prop="updatetime" label="最后操作时间" width="230"></el-table-column> -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handleClick(scope.row)" size="mini">编辑</el-button>
                        <el-button type="danger" @click="deleteUser" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <br>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="page.page_no" :page-sizes="[5, 10, 15, 20]" :page-size="page.page_size"
                layout="total, sizes, prev, pager, next, jumper" :total="page.table">
            </el-pagination>

            <el-dialog title="修改用户信息" :visible.sync="dialogChangeVisible">
                <el-form :model="form">
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" :label-width="formLabelWidth">
                        <el-input v-model="form.nickname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="权限" :label-width="formLabelWidth">
                        <el-select v-model="form.right" placeholder="请选择权限">
                            <el-option label="管理员" value="0"></el-option>
                            <el-option label="员工" value="1"></el-option>
                            <el-option label="浏览人员" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changeUser">确 定</el-button>
                </div>
            </el-dialog>

        </el-main>

    </div>
</template>

<script>
import { index, getInfoById, changeUser ,deleteUser} from '@/api/user'

export default {
    name: 'UserManageIndex',
    data() {
        return {

            form: [],
            searchText: [{
                name: '',
                nickname: '',
                email: '',
                id: '',
                right: ''
            }], // 搜索关键字
            tableData: [], // 表格数据
            page: [{
                page_no: 1, // 当前页码
                page_size: 5, // 每页显示的条数
                total: 0, // 总条目数
            }]
        }
    },
    methods: {
        queryTable() {
            const searchData = {
                // keyword: this.searchText,
                name: this.searchText.name,
                nickname: this.searchText.nickname,
                email: this.searchText.email,
                id: this.searchText.id,
                page: this.page.page_no,
                page_size: this.page.page_size,
            };

            index(searchData)
                .then(response => {
                    this.tableData = response.data.list;
                    this.page = response.data.page;
                    console.log(this.tableData)
                })
                .catch(error => {
                    this.$message.error("获取数据失败：" + error);
                });
        },

        getUserInfo(id) {
            getInfoById(id)
                .then(response => {
                    this.form = response.data;
                    console.log(this.form);
                })
                .catch(error => {
                    this.$message.error("获取数据失败：" + error);
                })
        },

        handleClick(row) {
            debugger
            const id = row.id;
            console.log(id);
            getUserInfo(id);

            dialogChangeVisible = true;
        },
        changeUser() {
            changeUser(this.form)
                .then(res => {
                    this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    })
                })
                .catch(error => {
                    this.$message.error("修改失败：" + error);
                })
        },

        deleteUser() {
            const id = row.id;
            deleteUser(id)
            .then(res => {
                    this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    })
                })
                .catch(error => {
                    this.$message.error("删除失败：" + error);
                })
         },

        search() {
            this.page.page_no = 1; // 搜索后回到第一页
            this.queryTable();
        },
        handleSizeChange(size) {
            this.page.page_size = size;
            this.queryTable();
        },
        handleCurrentChange(page) {
            this.page.page_no = page;
            this.queryTable();
        },

    },
    mounted() {
        this.queryTable();
    }
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