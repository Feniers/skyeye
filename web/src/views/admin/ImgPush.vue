<template>
  <div class="container">
    <div class="upload-container">
      <el-upload class="upload-demo" ref="upload" action="#" :on-preview="handlePreview" :on-remove="handleRemove"
        :file-list="fileList" :auto-upload="false" :http-request="handleFileUpload">
        <div class="button-container">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-input placeholder="请输入姓名" v-model="name" clearable style="width: 200px;"></el-input>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload"
            :loading="loading">上传到服务器</el-button>
        </div>

        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>



<script>
import { uploadUrl } from '@/api/vedio';

export default {
  data() {
    return {
      name: '啊',
      dialogVisible: false,
      dialogImageUrl: '',

      loading: false,
      fileList: []
    };
  },
  methods: {
    submitUpload() { this.$refs.upload.submit(); },


    handleFileUpload(file) {

      console.log("上传", file)
      this.loading = true;
      //调用后端服务器的接口
      const form = {
        localpath: file.file.name,
        path: this.name + file.file.name,
      }
      uploadUrl(form).then(res => {
        this.$message.success('上传成功');
        this.clearFiles();
        this.name = null;
        this.loading = false
      })
        .catch(error => {
          this.$message.error('上传失败' + error);
        });
    },

    clearFiles() {
      this.fileList = [];
    },

    handleRemove(file, fileList) {
      console.log("移除", file, fileList);
    },

    handlePreview(file) {
      console.log("预览", file);
      this.dialogImageUrl = file.name
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.upload-container {
  text-align: center;

  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.button-container {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 300px;
  /* 调整宽度以适应布局 */
}
</style>