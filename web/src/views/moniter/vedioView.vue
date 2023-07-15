<!--监控组件-->
<template>
    <div class="container">
        <div class="image-container">
            <img :src="src" alt="1" class="fullscreen-image">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // videosrc: "http://rxh8bkp1a.hd-bkt.clouddn.com/video7.mp4?e=1688964653&token=8O1Cf39AS9FKQjhWkMi2sFH2pkSXgF8O38XREvzH:vSLOgJLXO7LWOVdOmTa5PHdur_Q="
            // videosrc:"http://172.20.10.8:5000/video_feed"
            // videosrc: "http://i-2.gpushare.com:21425/video_feed",
            src: "http://rxh8bkp1a.hd-bkt.clouddn.com/video7.mp4?e=1688964653&token=8O1Cf39AS9FKQjhWkMi2sFH2pkSXgF8O38XREvzH:vSLOgJLXO7LWOVdOmTa5PHdur_Q="
        }
    },
    methods: {
    },
    mounted() {

    }
}
</script>


<style>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.image-container {
    flex: 1 25% 25%;
    max-width: 25%;
    max-height: 25%;
    height: 100vh;
    overflow: hidden;
}

.fullscreen-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>