<template>
    <div>
        <el-table :data="tableData" border style="overflow: auto">
            <el-table-column label="序号" type="index" width="200"> </el-table-column>

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

        <el-dialog :visible.sync="dialogVisible" width="70%" @closed="this.$refs.videoPlayer.pause()">
            <video :src="src" ref="videoPlayer" controls autoplay style="width: 100%; height: 100%;"></video>
        </el-dialog>
    </div>
</template>

<script>
import { getIRs, getUrl } from '@/api/vedio'
export default {
    data() {
        return {
            tableData: [],
            columns: [
                { label: '入侵时间', key: 'time' },
            ],

            src: '',
            minute: '',
            dialogVisible: false
        }
    },

    methods: {
        handleView(row) {
            // debugger
            // 在这里处理查看按钮的点击事件，可以访问相应行的数据(row)
            console.log("查看行数据:", row);
            // this.dialogVisible = true

            this.minute = row.minute

            getUrl({ path: row.video })
                .then(res => {
                    this.src = res.data
                    this.dialogVisible = true
                    // this.jumpToMinute(this.minute)

                }).catch(error => {
                    this.$message.error("获取数据失败：" + error);
                })
        },

        jumpToMinute(minute) {
            // 将分钟转换为秒
            const targetTime = minute * 60;
            // 设置视频当前时间
            this.$refs.videoPlayer.currentTime = targetTime;
        },
    },
    mounted() {
        this.minute = ''; // 设置初始值为空

        getIRs().then(res => {
            this.tableData = res.data
        }).catch(error => {
            this.$message.error("获取数据失败 " + error)
        })

        this.$refs.videoPlayer.addEventListener('loadedmetadata', () => {
            this.jumpToMinute(this.minute);
        });
    }
}
</script>