<template>
    <div>
        <el-row class="button-row">
            <!-- <el-button type="primary">查看警戒区</el-button> -->
            <el-button type="primary" @click="drowArea">划定警戒区</el-button>
            <!-- <el-button type="primary" @click="resetCanvas">重置画板</el-button> -->
            <!-- <el-button type="primary" @click="sendRectangleCoordinates">提交警戒区</el-button> -->
        </el-row>

        <br>

        <el-table :data="tableData" style="overflow: auto;width:100%">
            <el-table-column label="序号" type="index" width="100"> </el-table-column>
            <el-table-column width="400px   " v-for="(column, index) in columns" :key="index" :label="column.label">
                <template slot-scope="scope">
                    <span>{{ scope.row[column.key] }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="325px">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleView(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- <div class="image-container">
            <img src="../assets/tupian.jpg" ref="image" @load="initializeCanvas" />
            <canvas ref="canvas" @mousedown="startDrawing" @mouseup="endDrawing" @mousemove="drawRectangle"></canvas>
        </div> -->

        <!-- </div> -->

        <el-dialog :data="rowInfo" :visible.sync="dialogVisible" class="dialog" height="100%">
            <div>
                <img src="../assets/moniter.jpg" ref="image" @load="initializeCanvas" style="width: 100%;" />
                <canvas ref="canvas" @mousedown="startDrawing" @mouseup="endDrawing" @mousemove="drawRectangle"></canvas>
            </div>
            <div v-if="showCanves == true">

                <el-button type="primary" @click="resetCanvas">重置画板</el-button>
                <el-button type="primary" @click="innerVisible = true">提交警戒区</el-button>
                <el-button type="info" size="medium" @click="dialogVisible = false; showCanves = false">取 消</el-button>
            </div>

            <div v-else>
                <el-button type="danger" size="medium" @click="deleteArea">删 除</el-button>
                <el-button type="info" size="medium" @click="dialogVisible = false">取 消</el-button>
            </div>

            <div>
                <el-dialog width="30%" :visible.sync="innerVisible" append-to-body>
                    <el-input placeholder="请设置区域名称" v-model="areaname" clearable>
                    </el-input>
                    <br>
                    <el-button type="primary" size="medium" @click="sendRectangleCoordinates">提交</el-button>
                </el-dialog>
            </div>
        </el-dialog>

        <!-- <el-dialog :data="rowInfo" :visible.sync="dialogVisible" class="dialog" height="100%">
            <el-row>
            <el-col :span="20" class="image-container">
                <img src="../assets/background.jpg" ref="image" @load="initializeCanvas" style="width: 100%;" />
                <canvas ref="canvas" @mousedown="startDrawing" @mouseup="endDrawing" @mousemove="drawRectangle"></canvas>
                <el-button type="danger" size="medium" @click="deleteArea">删 除</el-button>
                <el-button type="info" size="medium" @click="dialogVisible = false">取 消</el-button>
            </el-col> -->

        <!-- <el-col :span="3" class="buttonList">
                    <el-button-group direction="vertical">
                        <el-button type="primary" size="medium" @click="drowArea">划定警戒区</el-button>
                        <el-button type="primary" size="medium" @click="resetCanvas">重置画板</el-button>
                        <el-button type="primary" size="medium" @click="innerVisible = true">提交警戒区</el-button>
                        <br>
                        <el-button type="danger" size="medium" @click="deleteArea">删 除</el-button>
                        <el-button type="info" size="medium" @click="dialogVisible = false">取 消</el-button>
                    </el-button-group>

                    <el-dialog width="30%" :visible.sync="innerVisible" append-to-body>
                        <el-input placeholder="请设置区域名称" v-model="areaname" clearable>
                        </el-input>
                        <br>
                        <el-button type="primary" size="medium" @click="sendRectangleCoordinates">提交</el-button>
                    </el-dialog>
                </el-col> -->
        <!-- </el-row> -->
        <!-- </el-dialog> -->

        <!-- <el-dialog :visible.sync="dialogVisible" class="dialog" height="100%"> -->
    </div>
</template>

<script>
import playVideo from '../moniter/playVideo.vue';
import { sendWA, addArea, getAllArea, deleteArea } from '@/api/area'

export default {
    components: { playVideo },
    data() {
        return {
            //监控区图片地址
            url: '',
            dialogVisible: false,
            innerVisible: false,
            showCanves: false,

            rowInfo: {},

            columns: [
                { label: 'id', key: 'areaid' },
                { label: '区域名称', key: 'areaname' }
            ],
            tableData: [],

            canvas: null,
            ctx: null,
            drawing: false,
            areaname: '',
            start: false,
            startX: '',
            startY: '',
            endX: '',
            endY: '',
            // imageSrc: 'path/to/your/image.jpg',
        }
    },
    methods: {
        //获取所有区域
        getArea() {
            getAllArea().then(res => {
                this.tableData = res.data
                // this.$message.success("获取成功")
            }).catch(error => {
                this.$message.error("获取失败" + error)
            })
        },
        //删除选区
        deleteArea(id) {
            deleteArea({ areaid: id }).then(res => {
                this.$message.success("删除成功")
            }).catch(error => {
                this.$message.error("删除失败 " + error)
            })
        },

        //显示图片，进行操作
        handleView(row) {
            // debugger
            this.dialogVisible = true
            this.rowInfo = row
            console.log("rowInfo " + this.rowInfo)
            // const rect = this.canvas.getBoundingClientRect();
            // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.initializeCanvas()
            this.ctx.strokeRect(row.x1, row.y1, row.x2 - row.x1, row.y2 - row.y1);
        },

        //绘图
        drowArea() {
            this.dialogVisible = true
            this.start = true
            this.showCanves = true
        },
        //初始化画板
        initializeCanvas() {
            this.canvas = this.$refs.canvas;
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = this.$refs.image.clientWidth;
            this.canvas.height = this.$refs.image.clientHeight;
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#ff0000';
        },
        //重置画板
        resetCanvas() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        startDrawing(event) {
            if (this.start) {
                this.drawing = true;
            }
            const rect = this.canvas.getBoundingClientRect();
            this.startX = event.clientX - rect.left;
            this.startY = event.clientY - rect.top;
        },
        endDrawing(event) {
            if (this.drawing) {
                const rect = this.canvas.getBoundingClientRect();
                this.endX = event.clientX - rect.left;
                this.endY = event.clientY - rect.top;
                this.drawing = false;
                // this.sendRectangleCoordinates();
            }
        },
        drawRectangle(event) {
            if (!this.drawing) return;
            const rect = this.canvas.getBoundingClientRect();
            this.endX = event.clientX - rect.left;
            this.endY = event.clientY - rect.top;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.strokeRect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY);
        },
        //提交绘制
        sendRectangleCoordinates() {
            // 将对角坐标发送给后端
            const coordinates = {
                areaname: this.areaname,
                // x1: this.startX.toString(),
                x1: (this.startX / this.canvas.width * 640).toString,
                y1: (this.startY / this.canvas.height * 480).toString,
                x2: (this.endX / this.canvas.width * 640).toString,
                y2: (this.endY / this.canvas.height * 480).toString,
            };

            sendWA({
                x1: (this.startX / this.canvas.width * 640).toString,
                y1: (this.startY / this.canvas.height * 480).toString,
                x2: (this.endX / this.canvas.width * 640).toString,
                y2: (this.endY / this.canvas.height * 480).toString,
            }).then(res => {
                addArea(coordinates).then(res => {
                    this.$message.success('划定警戒区域成功')
                    this.resetCanvas()
                    this.dialogVisible = false
                }).catch(error => {
                    this.$message.error("划定警戒区域失败" + error)
                })
            }).catch(error => {
                this.$message.error("传输失败" + error)
            })
        },
    },
    mounted() {
        this.getArea()
    }

}
</script>

<style>
/* .button-row {
    display: flex;
    justify-content: space-evenly;
} */

/* .video-container {
    width: 100%;
    box-sizing: border-box;
}

.showImg {
    width: 100%;
    height: 100%;
    border: 1px solid white;
    color: white;
    text-align: center;
} */
.image-container {
    position: relative;
}

canvas {
    position: absolute;
    top: 0;
    left: 0;
}

/* 
.dialog-content {
    display: flex;
}

.image-container {
    flex: 1;
    position: relative;
}

.button-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 20px;
    /* 调整按钮与图片的间距 */
/* }

.button-list::before {
    content: '';
    flex: 1;
} */
</style>