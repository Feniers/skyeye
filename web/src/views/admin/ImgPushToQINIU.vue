<template>
  <div>
    <el-upload ref="upload" action="#" :before-upload="beforeUpload" :on-success="handleUploadSuccess"
      :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"  :http-request="httpRequest">
      <el-button slot="trigger" size="small" type="primary">
        选取文件
      </el-button>
    </el-upload>
    <button @click="handleSubmit">上传</button>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js';
import { setPhoto, getToken } from '@/api/area'

export default {
  data() {
    return {
      QINIU_BUCKET_DOMAIN: 'rxh8bkpla.hd-bkt.clouddn.com',
      fileList: [],
      sendFiles: []
    }
  },

  methods: {
    handleSubmit(){
      this.$refs.upload.submit();
      // console.log("submit",fileList)
    },

    beforeUpload(file,fileList) {
      console.log("beforeUpload",file)
      // this.sendFiles.push(file)
      // console.log("sendfiles",this.sendFiles)
      // this.upload()
      return false; // 取消自动上传
    },

    handleUploadSuccess(response) {
      const imageUrl = this.QINIU_BUCKET_DOMAIN + '/' + response.key;
      this.fileList.push({ name: response.name, url: imageUrl });
      console.log('图片URL:', imageUrl);
      console.log('fileList:', this.fileList);
    },

    handleRemove(file, fileList) {
      console.log("remove ",file,fileList)
    },

    handlePreview(file, fileList) {
      console.log("预览", file, fileList);
    },

    httpRequest(data){
      console.log("http ",data)
    },

    upload(params) {
      console.log("upload params ",params)
      debugger
      getToken()
        .then((res) => {
          const uploadPromises = params.file.map((file) => {
            const key = Date.now() + '_' + file.name;
            const uploadToken = res.data.token;
            const config = { useCdnDomain: true };

            const observable = qiniu.upload(file.url, key, uploadToken, {}, config);

            return new Promise((resolve, reject) => {
              observable.subscribe({
                next: (response) => {
                  console.log('上传进度:', response.total.percent.toFixed(2));
                },
                error: (error) => {
                  console.error('上传错误:', error);
                  reject(error);
                },
                complete: (response) => {
                  console.log('上传成功:', response);
                  resolve(response);
                },
              });
            });
          });

          Promise.all(uploadPromises)
            .then((responses) => {
              const photoUrls = this.fileList.map((file, index) => {
                return {
                  name: file.name,
                  url: this.QINIU_BUCKET_DOMAIN + '/' + responses[index].key,
                };
              });

              setPhoto(photoUrls)
                .then((response) => {
                  console.log('传回后端成功！');
                  console.log(response);
                  this.$message.success('上传成功！');
                })
                .catch((error) => {
                  console.error('传回后端失败:', error);
                  this.$message.error('传回后端失败', error);
                });
            })
            .catch((error) => {
              console.error('上传失败:', error);
              this.$message.error('上传失败');
            });
        })
        .catch((error) => {
          console.error('未获得token:', error);
          this.$message.error('未获得token');
        });
    },
  },
};
</script>