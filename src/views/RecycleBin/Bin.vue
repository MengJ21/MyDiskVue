<template>
    <div>
      <div class="header">
        <span class="title">回收站</span>
      </div>
      <div class="middle">
        <el-button class="canclebtn" type="primary" icon="el-icon-folder-checked"
          @click="recoverFile">恢复</el-button
        >
      </div>
      <div class="line"></div>
      <div class="body">
        <el-table
          :data="tableData"
          height="550"
          stripe
          border
          style="width: 100%"
          ref="accountTable"
        >
          <el-table-column type="selection" width="150"> </el-table-column>
          <el-table-column prop="fileName" label="文件名" width="200">
          </el-table-column>
          <el-table-column prop="filePath" label="文件目录" width="400">
          </el-table-column>
          <el-table-column prop="fileSize" label="文件大小(B)" width="150">
          </el-table-column>
          <el-table-column prop="recycleTime" label="删除日期"> </el-table-column>
        </el-table>
      </div>
    </div>
  </template>

      <script>
  export default {
    data() {
      return {
        tableData: this.$global_msg.binData
      };
    },
    methods: {
        recoverFile() {
          let currentSelect = this.$refs.accountTable.selection;
          let url = 'http://localhost:8081/runyun/recoverFile/'+this.$global_msg.userId;
          this.axios.post(url, currentSelect).then((resp)=>{
                let data = resp.data;
                if (data.code == 200) {
                  this.$global_msg.binData = data.data;
                  this.tableData = data.data;
                }
            })
        }

    },
  };
  </script>

      <style lang="less" scoped>
  .header {
    background-color: #dcdfe6;
    height: 60px;
    line-height: 60px;
    display: flex;
  }
  .title {
    color: #409eff;
    float: left;
    font-size: 30px;
   // margin-left: 170px;
    margin-left: 20px;
  }
  .middle {
    height: 50px;
    line-height: 50px;
    display: flex;
  }
  .canclebtn {
    display: flex;
    //margin-left: 170px;
    height: 80%;
    margin-top: 5px;
    margin-left: 10px;
  }
  .line {
    height: 0;
    width: 100%;
    border: 1px solid #dcdfe6;
  }
  .body {
   // margin-left: 170px;
   margin: 20px 10px;
  }
  </style>
