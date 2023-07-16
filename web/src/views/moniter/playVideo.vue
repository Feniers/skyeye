<template>
    <div class="player">
        <div>{{ video.name }}</div>
        <!-- <video :id='"A" + video.index' autoplay style="width: 100%;" class="video-js vjs-default-skin vjs-big-play-centered  ">
        </video> -->
        <img :src="video.url" style="width: 100%;" />
    </div>
</template>
    
<script>
export default {
    name: "playVideo",
    props: {
        video: {
            url: "",
            index: 0,
        }
    },
    data() { return {} },
    mounted() {
        // this.initVideoPlayer();
    },
    methods: {
        // initVideoPlayer() {
        //     var that = this;
        //     var id = "#A" + this.video.index;
        //     const currentInstance = that.$video(document.querySelector(id), {
        //         autoplay: true,
        //         controls: true
        //     }).src({
        //         src: that.video.url,
        //         // type: 'application/x-mpegURL',
        //     })

        //     Replace the above code with the following
        //     const img = new Image();
        //      = this.video.url;
        //     Perform any additional configuration or handling if necessary
        // },
    }
}
</script>

<style scoped>
.player {
    background-color: black;
    width: 100%;
    height: 100%;
    border: 1px solid white;
    color: white;
    text-align: center;
}
</style>
    