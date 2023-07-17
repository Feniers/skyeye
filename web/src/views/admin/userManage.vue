<template>
    <!--此页面是【用户信息管理页面】-->
    <div class="main-container">
        <!-- <el-main > -->
        <!-- <el-main > -->
        <div class="form">
            <el-form :inline="true" :model="searchText" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="searchText.name" placeholder="name"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="searchText.nickname" placeholder="nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="searchText.email" placeholder="email"></el-input>
                </el-form-item>
                <!-- <el-form-item label="权限">
                    <el-select v-model="searchText.right" placeholder="right">
                        <el-option label="管理员" value=[0]></el-option>
                        <el-option label="工作人员" value=[1]></el-option>
                        <el-option label="浏览人员" value=[2]></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="queryTable(searchText)">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleClickAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </div>


        <!-- 主要部分表格 -->
        <div class="table">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="序号" type="index" width="100"> </el-table-column>
                <el-table-column prop="id" label="id" width="150"></el-table-column>
                <el-table-column prop="name" label="用户名" width="200"></el-table-column>
                <el-table-column prop="nickname" label="昵称" width="180">

                    <!-- <template slot-scope="scope">
                        <img :src="scope.row.image" width="100px" height="70px">
                    </template> -->
                </el-table-column>
                <!-- <el-table-column label="权限" width="180">
                    
                    改了这里
                    <template slot-scope="scope">
                        <div v-if="scope.row.right.includes(0)">管理员</div>
                        <div v-else-if="scope.row.right.includes(1)">工作人员</div>
                    </template>
                </el-table-column> -->
                <el-table-column prop="email" label="邮箱" width="500">
                    <!-- <el-table-column prop="phone" label="" width="500"></el-table-column> -->
                </el-table-column>
                <!-- <el-table-column prop="job" label="职位" width="140"></el-table-column> -->
                <!-- <el-table-column prop="right" label="权限"></el-table-column> -->
                <!-- <el-table-column prop="updatetime" label="最后操作时间" width="230"></el-table-column> -->
                <el-table-column label="操作" flex-direction:row>
                    <template slot-scope="scope" class="button-container">
                        <el-button type="primary" @click="handleClick(scope.row)" size="mini">编辑</el-button>
                        <el-button type="danger" @click="deleteUser(scope.row)" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <br>

        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="page.page_no" :page-sizes="[5, 10, 15, 20]" :page-size="page.page_size"
                layout="total, sizes, prev, pager, next, jumper" :total="page.table">
            </el-pagination>
        </div>


        <el-dialog title="修改用户信息" :visible.sync="dialogChangeVisible">
            <el-form :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" :label-width="formLabelWidth">
                    <el-input v-model="form.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="权限" :label-width="formLabelWidth">
                    改了这里
                    <el-select v-model="form.right" placeholder="请选择权限">
                        <el-option label="管理员" value=[0]></el-option>
                        <el-option label="员工" value=[0]></el-option>
                        <el-option label="浏览人员" value=[0]></el-option>
                    </el-select>

                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogChangeVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeUser">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="新增用户" :visible.sync="dialogAddVisible" class="addDialog">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" autocomplete="off"
                :hide-required-asterisk="true" size="medium" class="form">
                <div style="padding-top: 10px">
                    <el-form-item label="昵称" prop="nickname">
                        <el-col :span="18">
                            <el-input v-model="ruleForm.nickname" placeholder="请输入昵称" />
                        </el-col>
                    </el-form-item>

                    <el-form-item label="姓名" prop="name">
                        <el-col :span="18">
                            <el-input v-model="ruleForm.name" placeholder="请输入姓名" />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-col :span="18">
                            <el-input v-model="ruleForm.password" placeholder="请输入密码" />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-col :span="18">
                            <el-input v-model="ruleForm.email" placeholder="请输入邮箱" />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-col :span="18">
                            <el-input v-model="ruleForm.phone" placeholder="请输入电话" />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="权限" prop="right">
                        <el-col :span="18">
                            <el-input v-model="ruleForm.right" placeholder="请设置权限" />
                        </el-col>
                    </el-form-item>
                </div>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
        </el-dialog>

        <!-- </el-main> -->

    </div>
</template>

<script>
import { index, getInfoById, changeUser, deleteUser } from '@/api/user'
import { addUser } from '@/api/register';
export default {
    name: 'UserManageIndex',
    data() {
        return {
            dialogChangeVisible: false,
            formLabelWidth: '100px',

            dialogAddVisible: false,

            ruleForm: {
                name: '',
                nickname: '',
                email: '',
                password: '',
                right: '',
                phone: ''
            },
            rules: {
                email: [{
                    required: true,
                    type: 'email',
                    message: '请输入邮箱',
                    trigger: 'blur'
                }],
                name: [{
                    required: true,
                    type: 'string',
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                nickname: [{
                    required: true,
                    type: 'string',
                    message: '请输入昵称',
                    trigger: 'blur'
                }],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
                        message: '密码必须同时包含数字与字母,且长度为 6-20位'
                    }],
            },

            form: {
                // username:'',
                // nickname:'',
                // email: '',
                // id: '',
                // right: '',
                // phone:'',
                // user_role:'',
                // userface:'',
            },
            searchText: {
                name: '',
                nickname: '',
                email: '',
                id: '',
                right: ''
            }, // 搜索关键字
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

        getUserInfo(userId) {
            getInfoById({ id: userId })
                .then(response => {
                    this.form = response.data;
                    console.log(this.form);
                })
                .catch(error => {
                    this.$message.error("获取数据失败：" + error);
                })
        },

        handleClick(row) {
            // debugger
            const id = row.id;
            console.log(id);
            this.getUserInfo(id);

            this.dialogChangeVisible = true;
        },
        changeUser() {
            const sendChangeUser={
                name:this.form.userName,
                nickname:this.form.nickname,
                email: this.form.email,
                id: this.form.userId,
                // right: '',
                // phone:'',
                // user_role:'',
                // userface:'',
            }
            changeUser(sendChangeUser)
                .then(res => {
                    this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    })
                    this.dialogChangeVisible = false
                    this.queryTable();
                })
                .catch(error => {
                    this.$message.error("修改失败：" + error);
                })
        },

        deleteUser(row) {
            const id = row.id;
            deleteUser({ id: id })
                .then(res => {
                    this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    })
                    this.queryTable();
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

        handleClickAdd() {
            this.dialogAddVisible = true
        },
        addUser() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    addUser(this.ruleForm).then(res => {
                        this.$message.success('新增成功')
                        this.dialogAddVisible = false
                        this.queryTable();
                    }).catch(error => {
                        this.$message.error("新增失败" + error)
                    })
                }
                else {
                    this.$message.error('请正确填写信息')
                }

            })
        }

    },
    mounted() {
        this.queryTable();
    }
}
</script>

<style lang="scss" scoped>
.addDialog {
    height: 100vh;
}

.main-container {
    // width: 100vw;
    height: 100%;
    display: flex;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    /* 将子元素垂直排列 */
    // align-items: center;
    /* 在交叉轴上居中对齐 */

}

.button-container {
    display: flex;
    justify-content: space-between;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>