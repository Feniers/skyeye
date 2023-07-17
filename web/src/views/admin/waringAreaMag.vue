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


        <el-dialog :data="rowInfo" :visible.sync="dialogVisible" class="dialog" height="100%">
            <div class="canvas-container" ref="shot">
                <img src="http://127.0.0.1:80/video_feed" ref="image" @load="initializeCanvas" style="width: 100%;" />
                <!-- <canvas class="canvas-overlay" ref="canvas" @mousedown="startDrawing" @mouseup="endDrawing"
                    @mousemove="drawRectangle"></canvas> -->
                <canvas class="canvas-overlay" ref="canvas" @mousedown="handleMouseDown"></canvas>
            </div>
            <div v-if="showCanves == true">
                <el-button type="primary" @click="resetCanvas">重置画板</el-button>
                <el-button type="primary" @click="innerVisible = true">提交警戒区</el-button>
                <!-- <el-button type="info" size="medium" @click="dialogVisible = false;">取 消</el-button> -->
                <el-button type="info" size="medium" @click="quxiao">取 消</el-button>
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

            // canvas: null,
            // ctx: null,
            drawing: false,
            areaname: '',
            // start: false,
            // startX: '',
            // startY: '',
            // // endX: '',
            // // endY: '',
            // currentX: 0,
            // currentY: 0,

            canvas: null,
            context: null,
            points: [],
            sendPoints: []
            // imageSrc: 'path/to/your/image.jpg',
        }
    },
    methods: {
        quxiao(){
            debugger
            this.dialogVisible=false
            this.resetCanvas()
        },

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
            // this.initializeCanvas()
            this.ctx.strokeRect(row.x1, row.y1, row.x2 - row.x1, row.y2 - row.y1);
        },

        //绘图
        drowArea() {
            this.dialogVisible = true
            this.start = true
            this.showCanves = true
            this.initializeCanvas();
            // this.drawing = true
        },

        resetCanvas() {
            // debugger
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.points = []
        },

        initializeCanvas() {
            this.canvas = this.$refs.canvas;
            this.context = this.canvas.getContext('2d');
            this.canvas.width = this.$refs.image.clientWidth;
            this.canvas.height = this.$refs.image.clientHeight;
        },

        handleMouseDown(event) {
            // debugger
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            const point = { x: mouseX, y: mouseY };

            // if (this.drawing === true) {
            this.points.push(point);
            // }


            if (this.points.length >= 2) {
                const lastPoint = this.points[this.points.length - 2];
                this.drawLine(lastPoint, point);
            }

            if (this.points.length === 4) {
                const firstPoint = this.points[0];
                const lastPoint = this.points[this.points.length - 1];
                this.drawLine(lastPoint, firstPoint);
                this.drawing = false;

                console.log("not send ", this.points)
                this.resizePs()
                console.log("send ", this.sendPoints)

                console.log(this.points)
            }
        },

        drawLine(point1, point2) {
            this.context.beginPath();
            this.context.moveTo(point1.x, point1.y);
            this.context.lineTo(point2.x, point2.y);
            this.context.strokeStyle = 'red'; // 设置线条颜色为红色
            this.context.stroke();
        },

        sendRectangleCoordinates() {
            // debugger

            if (this.areaname == null) {
                this.$message.error('请输入区域名称')
            }
            else {
                const coordinates = {
                    areaname: this.areaname,
                    x1: this.sendPoints[0].x,
                    y1: this.sendPoints[0].y,
                    x2: this.sendPoints[1].x,
                    y2: this.sendPoints[1].y,
                    x3: this.sendPoints[2].x,
                    y3: this.sendPoints[2].y,
                    x4: this.sendPoints[3].x,
                    y4: this.sendPoints[3].y,
                };
                // debugger


                sendWA({
                    x1: this.sendPoints[0].x,
                    y1: this.sendPoints[0].y,
                    x2: this.sendPoints[1].x,
                    y2: this.sendPoints[1].y,
                    x3: this.sendPoints[2].x,
                    y3: this.sendPoints[2].y,
                    x4: this.sendPoints[3].x,
                    y4: this.sendPoints[3].y,
                }).then(res => {
                    addArea(coordinates).then(res => {
                        this.$message.success('划定警戒区域成功')
                        this.resetCanvas()
                        this.innerVisible = false
                        this.dialogVisible = false
                    }).catch(error => {
                        this.$message.error("划定警戒区域失败" + error)
                    })
                }).catch(error => {
                    this.$message.error("传输失败" + error)
                })
            }

        },

        resizePs() {
            console.log("resize")
            const point = { x: '', y: '' }
            for (const point of this.points) {
                const resizedPoint = {
                    x: (point.x / this.canvas.width * 640).toString(),
                    y: (point.y / this.canvas.height * 480).toString(),
                };
                console.log("resized point", resizedPoint);
                this.sendPoints.push(resizedPoint);
            }
            // this.points.array.forEach(element => {
            //     point.x = (element.x / this.canvas.width * 640).toString();
            //     point.y = (element.y / this.canvas.height * 480).toString();
            //     console.log("resize point",point)
            //     this.sendPoints.push(point)
            // });
            // for ()
        }
    },
    mounted() {
        this.getArea()
    }

}
</script>

<style>
/* .image-container {
    position: relative;
}

canvas {
    position: absolute;
    top: 0;
    left: 0;
} */
.canvas-container {
    position: relative;
}

.canvas-overlay {
    position: absolute;
    top: 0;
    left: 0;
}
</style>