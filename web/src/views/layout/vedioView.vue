<!--监控组件-->
<template>
    <div>
        <el-main>
            <!-- <el-table :data="tableData" border>
                <el-table-column width="100%" v-for="(column, index) in tableData" :key="index">
                    <template slot-scope="scope">
                        <img :src="scope.row[index]" style="width: 100%; height: 100%;" />
                    </template>
                </el-table-column>
            </el-table> -->
            <div class="video-container">
                <video :src="videosrc" class="video" controls></video>
            </div>

            <!-- <img src="../assets/tupian.jpg"> -->

            <!-- 176:144 -->
            <!-- ["http://172.20.10.8:5000/video_feed"] -->
        </el-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            videosrc: "http://rxh8bkp1a.hd-bkt.clouddn.com/video7.mp4?e=1688964653&token=8O1Cf39AS9FKQjhWkMi2sFH2pkSXgF8O38XREvzH:vSLOgJLXO7LWOVdOmTa5PHdur_Q="
        }
    },
    methods: {
    },
    mounted() {

    }
}
</script>

<style scoped>
.video-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.video {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
</style>