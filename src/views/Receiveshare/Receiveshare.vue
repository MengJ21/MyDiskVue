<template>
    <div>
      <div class="header">
        <span class="title">收到分享</span>
      </div>
      <div class="middle">
        <el-button type="info" round icon="el-icon-star-off"
          @click="saveShare">收藏</el-button
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
          <el-table-column prop="fileName" label="分享文件" width="150">
          </el-table-column>
          <el-table-column prop="fileType" label="文件类型" width="300">
          </el-table-column>
          <el-table-column prop="shareName" label="分享人" width="150">
          </el-table-column>
          <el-table-column prop="shareTime" label="分享日期"> </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button type="success" @click="downloadFile(scope.row.fileName)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        tableData: this.$global_msg.shared
      };
    },
    methods: {
      saveShare() {
        let currentSelect = this.$refs.accountTable.selection;
        let url = 'http://localhost:8081/runyun/saveShares/'+this.$global_msg.userId;
        this.axios.post(url, currentSelect).then((resp)=>{
              let data = resp.data;
              if (data.code == 200) {
                this.$global_msg.shared = data.data;
                this.tableData = data.data;
              }
          })
      },
      downloadFile(filePath) {
        console.log("下载路径：" + filePath)
        let url = 'http://localhost:8081/runyun/download/'+this.$global_msg.username;
        this.axios.get(url, {
          params: {
            path: filePath
          },
          headers: {
            //和后端设置的一样
            'Content-Type': 'application/octet-stream;charset=UTF-8'
          },
          responseType: 'blob'
        }).then((res) => {
          console.log('文件下载成功');
          console.log(res.data)
          const blob = new Blob([res.data]);
          console.log(blob)
          const fileName = "VID_20200120_203552.png";


          //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
          //IE10以上支持blob，但是依然不支持download
          if ('download' in document.createElement('a')) {
            //支持a标签download的浏览器
            const link = document.createElement('a');//创建a标签
            link.download = fileName;//a标签添加属性
            link.style.display = 'none';
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();//执行下载
            URL.revokeObjectURL(link.href); //释放url
            document.body.removeChild(link);//释放标签
          } else {
            navigator.msSaveBlob(blob, fileName);
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
    margin-left: 20px;
  }
  .middle {
    height: 50px;
    line-height: 50px;
    display: flex;
  }
  .receivebtn {
    display: flex;
    margin-left: 10px;
    height: 80%;
    margin-top: 5px;
  }
  .line {
    height: 0;
    width: 100%;
    border: 1px solid #dcdfe6;
  }
  .body {
    margin: 20px 10px;
  }
  </style>
