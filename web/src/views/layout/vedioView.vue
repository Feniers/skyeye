<!--监控组件-->
<div class="video-see" v-if="monitorHide">
    <div class="add-table modInOutLay7">
        <div class="add-header">
            <p>视频监控</p>
            <i class="fa fa-close cursor" @click="dismonitorHide"></i>
        </div>

        <div class="add-main modInOutMain7">
            <div class="" style="float: left;">
                <monitorWindow v-bind:videoUrl=" "http://rxh8bkp1a.hd-bkt.clouddn.com/video7.mp4?e=1688964653&token=8O1Cf39AS9FKQjhWkMi2sFH2pkSXgF8O38XREvzH:vSLOgJLXO7LWOVdOmTa5PHdur_Q=""></monitorWindow>
            </div>
            <div class="" style="float: left;">
                <monitorWindow v-bind:videoUrl="videoUrlOut"></monitorWindow>
            </div>
        </div>
    </div>
</div>

