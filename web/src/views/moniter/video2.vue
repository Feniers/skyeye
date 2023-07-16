<template>
    <div class="cell">

        <div class="cell-player">
            <div :class="cellClass(i)" v-for="i in cellCount" :key="i">
                <playVideo :video="videoInfo[i]" v-if="cellCount != 6"></playVideo>
                <playVideo :video="videoInfo[i]" v-if="cellCount == 6 && i != 2 && i != 3"></playVideo>
                <template v-if="cellCount == 6 && i == 2">
                    <div class="cell-player-6-2-cell">
                        <playVideo :video="videoInfo[i]"></playVideo>
                        <playVideo :video="videoInfo[++i]"></playVideo>
                    </div>
                </template>
            </div>
        </div>
        <!-- <div class="cell-tool">
            <div class="bk-button-group">
                <el-button @click="cellCount = 1" size="small">1</el-button>
                <el-button @click="cellCount = 4" size="small">4</el-button>
                <el-button @click="cellCount = 6" size="small">6</el-button>
                <el-button @click="cellCount = 9" size="small">9</el-button>
                <el-button @click="cellCount = 16" size="small">16</el-button>
            </div>
        </div> -->
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
            videoInfo: [
                { url: "", index: 0, name: "测试1" },
                { url: "http://127.0.0.1:80/video_feed", index: 1, name: "guard" },
                // { url: "http://192.168.56.109:80/video_feed", index: 1, name: "guard" },
                // { url: "http://hls01open.ys7.com/openlive/699a3134f0864d81a725sd84ded3180d81.m3u8", index: 2, name: "测试2" },
                // { url: "http://hls01open.ys7.com/openlive/699a3134f0864d81a7s25d84ded3180d81.m3u8", index: 3, name: "测试3" },
                // { url: "http://hls01open.ys7.com/openlive/b27fa374e9d749ddb22bs4a12e843a3131.m3u8", index: 10, name: "测试4" },
                // { url: "http://hls01open.ys7.com/openlive/699a3134f0864d81a7s2s5d84ded3180d8.m3u8", index: 4, name: "测试5" },
                // { url: "http://hls01open.ys7.com/openlive/699a3134f0864d81a725sd84ded3180d8.m3u8", index: 5, name: "测试6" },
                // { url: "http://hls01open.ys7.com/openlive/699a3134f0864d81a725sd84ded31280d8.m3u8", index: 6, name: "测试7" },
                // { url: "http://hls01open.ys7.com/openlive/699a3134f0864d81a725sd84ded33180d8.m3u8", index: 7, name: "测试8" },
                // { url: "http://hls01open.ys7.com/openlive/699a3134f0864d81a725sd84ded31480d8.m3u8", index: 8, name: "测试9" },
            ],
            cellCount: 1
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
}
</style>
  
  
  