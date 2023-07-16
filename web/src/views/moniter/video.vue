<template>
    <div class="cell">

        <div class="cell-player">
            <div :class="cellClass(i)" v-for="i in cellCount" :key="i">
                <playVideo :video="videoInfo[i]" v-if="cellCount != 6"></playVideo>
                <!-- <playVideo :video="videoInfo[i]" v-if="cellCount == 6 && i != 2 && i != 3"></playVideo>
                <template v-if="cellCount == 6 && i == 2">
                    <div class="cell-player-6-2-cell">
                        <playVideo :video="videoInfo[i]"></playVideo>
                        <playVideo :video="videoInfo[++i]"></playVideo>
                    </div>
                </template> -->
            </div>
        </div>
        
        <div class="cell-tool">
            <div class="bk-button-group">
                <el-button @click="cellCount = 1" size="small">1</el-button>
                <el-button @click="cellCount = 4" size="small">4</el-button>
                <!-- <el-button @click="cellCount = 6" size="small">6</el-button>
                <el-button @click="cellCount = 9" size="small">9</el-button>
                <el-button @click="cellCount = 16" size="small">16</el-button> -->
            </div>
        </div>
    </div>
</template>

<script>
import playVideo from '@/views/moniter/playVideo.vue'

export default {
    components: {
        playVideo
    },
    data() {
        return {
            // src: "http://rxh8bkp1a.hd-bkt.clouddn.com/video7.mp4?e=1688964653&token=8O1Cf39AS9FKQjhWkMi2sFH2pkSXgF8O38XREvzH:vSLOgJLXO7LWOVdOmTa5PHdur_Q=",
            videoInfo: [
                { url: "", index: 0, name: "测试1" },
                { url: "http://i-2.gpushare.com:25314/video_feed", index: 1, name: "reid1" },
                { url: "http://i-1.gpushare.com:52553//video_feed", index: 2, name: "reid2" },
                { url: "http://192.168.43.216:80/video_feed", index: 3, name: "reid3" },
                { url: "http://192.168.43.232:80/video_feed", index: 10, name: "reid4" },
            ],
            cellCount: 4
        }
    },
    methods: {},
    computed: {
        cellClass() {
            return function (index) {
                switch (this.cellCount) {
                    case 1:
                        return ['cell-player-1']
                    case 4:
                        return ['cell-player-4']
                    case 6:
                        if (index == 1)
                            return ['cell-player-6-1']
                        if (index == 2)
                            return ['cell-player-6-2']
                        if (index == 3)
                            return ['cell-player-6-none']
                        return ['cell-player-6']
                    case 9:
                        return ['cell-player-9']
                    case 16:
                        return ['cell-player-16']
                    default:
                        break;
                }
            }
        },
    },
}
</script>
<style>
.cell-tool {
    height: 40px;
    line-height: 30px;
    padding: 0 7px;
}

.cell-player {
    flex: 1;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.cell-player-4 {
    width: 50%;
    height: 50% !important;
    box-sizing: border-box;
}

.cell-player-1 {
    width: 100%;
    box-sizing: border-box;
}

.cell-player-6-1 {
    width: 66.66%;
    height: 66.66% !important;
    box-sizing: border-box;
}

.cell-player-6-2 {
    width: 33.33%;
    height: 66.66% !important;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.cell-player-6-none {
    display: none;
}

.cell-player-6-2-cell {
    width: 100%;
    height: 50% !important;
    box-sizing: border-box;
}

.cell-player-6 {
    width: 33.33%;
    height: 33.33% !important;
    box-sizing: border-box;
}

.cell-player-9 {
    width: 33.33%;
    height: 33.33% !important;
    box-sizing: border-box;
}

.cell-player-16 {
    width: 25%;
    height: 25% !important;
    box-sizing: border-box;
}

.cell {
    display: flex;
    flex-direction: column;
    height: 100%;
    /* overflow: hidden; */
}
</style>
  
  
  