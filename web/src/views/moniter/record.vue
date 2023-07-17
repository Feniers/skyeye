<template>
    <div>
        <el-main>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="日期">
                    <el-select v-model="formInline.date" placeholder="日期">
                        <el-option v-for="option in options" :label="option.label" :value="option.value"
                            :key="option.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formInline.state" placeholder="状态">
                        <el-option label="正常" value="shanghai"></el-option>
                        <el-option label="异常" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>

            <br>

            <!-- 面包屑 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item.path">
                    <span @click="getDirectory(item.path)">{{ item.label }}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>

            <br>

            <el-table :data="tableData" border style="overflow: auto">
                <el-table-column width="900px   " v-for="(column, index) in columns" :key="index" :label="column.label">
                    <template slot-scope="scope">
                        <span>{{ scope.row[column.key] }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleView(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog :visible.sync="dialogVisible" width="50%" @closed="handleDialogClosed">
                <video :src="src" ref="videoPlayer" controls autoplay style="width: 100%; height: 100%;"></video>
                <!-- <span>{{ src }}</span> -->
            </el-dialog>

        </el-main>
    </div>
</template>

<script>
import { directory, getUrl } from '@/api/vedio'
export default {
    name: 'recordIndex',
    data() {
        return {
            src: '',
            dialogVisible: false,

            formInline: {
                date: '',
                state: ''
            },
            options: [ // 初始的选项数组
                { label: '7/9', value: '7_9' },
                { label: '7/10', value: '7_10' }
            ],

            tableData: [],
            dirList: [],
            columns: [
                { label: '日期', key: 'key' },
                // { label: '状态', key: 'type' },
                // { label: '列3', key: 'md5' }
            ], // 列配置数组

            breadcrumbItems: [
                { label: 'all', path: '' },
            ]
        }
    },
    methods: {
        onSubmit() {

        },

        // getDirectory(dir) {
        //     directory({ prefix: dir }).then(res => {
        //         // debugger
        //         // this.dirList=res.data
        //         // this.tableData = res.data
        //         // console.log('dirlist:' + this.tableData.length)

        //         // this.getDirectory();
        //         // console.log('init dirlist:' + this.dirList.length)
        //         const data = res.data
        //         const regex = /^\d+_\d+\/$/;
        //         const filteredData = [];

        //         for (const item of data) {
        //             // if (typeof item.key === 'string' && regex.test(item.key)) {
        //             //     filteredData.push(item);
        //             // }
        //             if (item.key.endsWith('.mp4')) {
        //                 continue
        //             } else {
        //                 filteredData.push(item);
        //             }
        //         }

        //         // debugger
        //         this.tableData = filteredData;

        //     }).catch(error => {
        //         this.$message.error("获取数据失败：" + error);
        //     })
        // },
        getDirectory(dir) {
            debugger
            directory({ prefix: dir })
                .then(res => {
                    const data = res.data;
                    const filteredData = [];

                    for (const item of data) {
                        // Check if the item key ends with ".mp4" or not in the form of "数字_数字/"
                        if (/^\d+_\d+\//.test(item.key)) {
                            filteredData.push(item);
                        }
                    }

                    this.tableData = filteredData;
                })
                .catch(error => {
                    this.$message.error("获取数据失败：" + error);
                });
        },

        handleView(row) {
            // 在这里处理查看按钮的点击事件，可以访问相应行的数据(row)
            // console.log("查看行数据:", row);
            if (row.key.endsWith('.mp4')) {
                getUrl({ path: row.key })
                    .then(res => {
                        this.src = res.data
                        this.dialogVisible = true

                    }).catch(error => {
                        this.$message.error("获取数据失败：" + error);
                    })
            }
            else {
                // this.getDirectory(row.key)
                directory({ prefix: row.key }).then(res => {
                    //面包屑
                    this.breadcrumbItems.push({ label: row.key, path: row.key })

                    const data = res.data;

                    const filteredData = [];

                    for (const item of data) {
                        if (item.key.endsWith('.mp4')) {
                            filteredData.push(item);
                        }
                    }
                    // debugger
                    this.tableData = filteredData;
                }).catch(error => {
                    this.$message.error("获取数据失败：" + error);
                })
            }

        },
        handleDialogClosed() {
            // 停止视频播放
            this.$refs.videoPlayer.pause();
        },

        initDir() {
            // debugger
            // this.getDirectory();
            console.log('init dirlist:' + this.dirList.length)
            const data = this.dirList;
            const regex = /^\d+_\d+\//;
            const filteredData = [];

            for (const item of data) {
                if (typeof item.key === 'string' && regex.test(item.key)) {
                    filteredData.push(item);
                }
            }

            // debugger
            this.tableData = filteredData;
        },
        getVideoList(dir) {
            const data = this.getDate;
            const regex = /^\d+_\d+\/$/;
            const filteredData = [];

            for (const item of data) {
                if (typeof item.key === 'string' && regex.test(item.key)) {
                    filteredData.push(item);
                }
            }

            // debugger
            this.tableData = filteredData;
        }
    },
    mounted() {
        this.getDirectory();
        // this.initDir();
    }
}
</script>
