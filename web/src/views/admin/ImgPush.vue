<template>
  <div class="ft-plant-upload-button">
    <input type="text" v-model="name">
    <Button type="ghost" icon="ios-cloud-upload-outline" @click="zh_uploadFile">选择文件</Button>
    <!-- <input type="file" ref="evfile" @change="zh_uploadFile_change" > -->
    <input type="file" ref="evfile" @change="zh_uploadFile_change" multiple style="display:none">
  </div>
</template>


<script>
//七牛上传插件
import * as qiniu from 'qiniu-js';
import { getToken, setPhoto } from '@/api/area'
import { getUrl } from '@/api/vedio';

export default {
  data() {
    return {
      name: "",
      index: 1,
      num: 4,
      urls: []
    }
  },
  methods: {
    //选择上传文件
    zh_uploadFile() {
      this.$refs.evfile.click();
    },

    //选择文件后触发的事件
    zh_uploadFile_change(evfile) {
      //后端获取token
      getToken().then(res => {
        var uptoken = res.data.token
        var file = evfile.target.files[0] //Blob 对象，上传的文件
        var key = this.name + '/' + file.name  // 上传后文件资源名以设置的 key 为主，如果 key 为 null 或者 undefined，则文件资源名会以 hash 值作为资源名。

        let config = {
          useCdnDomain: true,   //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
          // region: qiniu.region.z2     // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
        };

        let putExtra = {
          fname: "",  //文件原文件名
          params: {}, //用来放置自定义变量
          mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
        };
        var observable = qiniu.upload(file, key, uptoken, putExtra, config);
        observable.subscribe({
          next: (result) => {
            // 主要用来展示进度
            // console.log(result)
          },
          error: (errResult) => {
            // 失败报错信息
            console.log(errResult)
          },
          complete: (result) => {
            // 接收成功后返回的信息
            this.urls.push(result.key)
            console.log("urls", this.urls.length, this.urls)

            // console.log("index", this.index)
            this.index = this.index + 1
            if (this.urls.length >= this.num) {
              // if (this.url(this.name+'/') >= this.num) {
              // this.sendMessage()
              this.sendUrls()
            }

          }
        })
      })
    },

    // sendUrls() {
    //   const photos={
    //     name:this.name,
    //     photo1:this.url(this.urls[0]),
    //     photo2:this.url(this.urls[1]),
    //     // photo3:this.url(this.urls[2]),
    //     // photo4:this.url(this.urls[3]),
    //   }

    //   setPhoto(photos).then(res => {
    //     console.log("传输成功")
    //     this.urls = []
    //     this.index = 0
    //     this.name = ''
    //   }).catch(error => {
    //     console.log("传输失败")
    //   })
    // },

    // sendUrls() {
    //   const promises = this.urls.map((url) => this.url(url))

    //   Promise.all(promises)
    //     .then((results) => {
    //       const photos = {
    //         name: this.name,
    //         photo1: results[0],
    //         photo2: results[1],
    //         photo3: results[2],
    //         photo4: results[3]
    //       }
    //       console.log(photos)
    //       return setPhoto(photos)
    //     })

    //     .then(() => {
    //       console.log("传输成功")
    //       this.urls = []
    //       this.index = 0
    //       this.name = ''
    //     })
    //     .catch((error) => {
    //       console.log("传输失败")
    //     })
    // },

    // url(path) {
    //   getUrl({ path: path }).then(res => {
    //     return res.data
    //     console.log(res.data)
    //   }).catch(error => {
    //     console.log("获取url失败", path)
    //   })
    // }

    async sendUrls() {
      try {
        const photos = {
          name: this.name,
          photo1: await this.url(this.urls[0]),
          photo2: await this.url(this.urls[1]),
          photo3: await this.url(this.urls[2]),
          photo4: await this.url(this.urls[3]),
        }

        await setPhoto(photos)
        console.log("传输成功")
        this.urls = []
        this.index = 0
        this.name = ''
      } catch (error) {
        console.log("传输失败")
      }
    },

    async url(path) {
      try {
        const res = await getUrl({ path: path })
        console.log(res.data)
        return res.data
      } catch (error) {
        console.log("获取url失败", path)
        throw error
      }
    }

  }
}
</script>

<style scoped>
.ft-plant-upload-button {
  position: fixed;
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>