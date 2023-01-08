<template>
    <div class="mydisk">
      <form style="heigth: 80px">
        <input type="file" class="input1_" @change="getFile($event)">
        <el-button type="success" plain @click="submitForm($event)">提交</el-button>
      </form>
        <div class="header">
          <div>
            <el-button ttype="primary" round @click="createDir" style="margin-left: 30px">创建文件夹</el-button>
            <el-button  type="danger" round @click="deleteFile">删除</el-button>
          </div>
          <div>
            <el-button type="info" plain @click="shareFiles">分享</el-button>
            <el-button  type="success" plain @click="copyFile">复制</el-button>
            <el-button  type="success" plain @click="moveFile">移动</el-button>
          </div>
        </div>
        <!-- 表格区域展示视图数据 -->
        <div class="wrapper">
            <el-table :data="tableData" border ref="accountTable" style="width:100%">
                <el-table-column type="selection" width="100"> </el-table-column>
                <el-table-column prop="fileName" label="文件名" width="200"></el-table-column>
                <el-table-column prop="fileSize" label="大小(B)" width="200"></el-table-column>
                <el-table-column prop="zTime" label="修改日期" width="200"> </el-table-column>
                <el-table-column label="操作" width="300">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit_(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
    </div>
</template>

<script>
    export default {
        data() {
            return{
                tableData: this.$global_msg.disk,
                fileList: []
            };

        },
      _methods: {
        // 编辑操作
        handleEdit_(row) {
          // alert("修改文件名 " + row.fileName);
          let oldname=row.fileName.substring(row.fileName.lastIndexOf('\\')+1, row.fileName.lastIndexOf('.'));
          let pre=row.fileName.substring(0, row.fileName.lastIndexOf('\\'));
          let pro=row.fileName.substring(row.fileName.lastIndexOf('.'));
          // alert("文件前缀" + pre + "文件后缀 " + pro);
          this.$prompt('修改文件名', '提示', {
            inputValue: oldname,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            let url='http://localhost:8081/runyun/updateFileName/'+this.$global_msg.userId;
            let data_={};
            data_.oldName=row.fileName;
            data_.newName=pre+"\\"+value+pro;
            this.axios.post(url, data_).then((resp) => {
              let data=resp.data;
              if(data.code==200) {
                row.fileName=pre+"\\"+value+pro;
                this.$message({
                  type: 'success',
                  message: data.msg
                });
              } else if(data.code==400) {
                this.$message({
                  type: 'info',
                  message: data.msg
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        },
        // 删除操作
        handleDelete() { },
        submitUpload() {
          this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },

        copyFile() {

        },

        moveFile() {
          // alert("移动文件");
          let currentSelect=this.$refs.accountTable.selection;
          if(currentSelect.length==0) {
            this.$message({
              type: 'info',
              message: '没有选择文件'
            });
          } else {
            this.$prompt('输入要移动的路径', '移动到', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({ value }) => {
              let url='http://localhost:8081/runyun/moveFile/'+this.$global_msg.username;
              let data_={};
              data_.value=value;
              let tableData='';
              console.log(data_);
              for(let i=0;i<currentSelect.length;i++) {
                tableData+='-----'+currentSelect[i].fileName;
              }
              data_.tableData=tableData;
              console.log("传输的数据：" + data_)
              this.axios.post(url, data_).then((resp) => {
                let data=resp.data;
                if(data.code==200) {
                  this.$global_msg.disk=data.data;
                  this.tableData=this.$global_msg.disk;
                  this.$message({
                    type: 'success',
                    message: data.msg
                  });
                } else if(data.code==400) {
                  this.$message({
                    type: 'info',
                    message: data.msg
                  });
                }
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });
            });
          }

        },

        shareFiles() {
          let currentSelect=this.$refs.accountTable.selection;
          if(currentSelect.length==0) {
            this.$message({
              type: 'info',
              message: '没有选择分享文件'
            });
          } else {
            this.$prompt('输入要分享用户昵称(多个用户用;分割)', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({ value }) => {
              let url='http://localhost:8081/runyun/shareFiles/'+this.$global_msg.userId;
              let data_={};
              data_.value=value;
              let tableData='';
              console.log(data_);
              for(let i=0;i<currentSelect.length;i++) {
                tableData+='-----'+currentSelect[i].fileName;
              }
              data_.tableData=tableData;
              this.axios.post(url, data_).then((resp) => {
                let data=resp.data;
                if(data.code==200) {
                  this.tableData=this.$global_msg.disk;
                  this.$message({
                    type: 'success',
                    message: data.msg
                  });
                } else if(data.code==400) {
                  this.$message({
                    type: 'info',
                    message: data.msg
                  });
                }
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });
            });
          }

        },

        createDir() {
          // alert("createDir");
          this.$prompt('输入文件夹目录', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            let url='http://localhost:8081/runyun/createDir/'+this.$global_msg.userId;
            this.axios.post(url, value).then((resp) => {
              let data=resp.data;
              if(data.code==200) {
                this.tableData=this.$global_msg.disk;
                this.$message({
                  type: 'success',
                  message: data.msg
                });
              } else if(data.code==400) {
                this.$message({
                  type: 'info',
                  message: data.msg
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        },

        deleteFile() {
          let currentSelect=this.$refs.accountTable.selection;
          if(confirm("是否删除！")) {
            let url='http://localhost:8081/runyun/deleteFiles/'+this.$global_msg.userId;
            this.axios.post(url, currentSelect).then((resp) => {
              let data=resp.data;
              if(data.code==200) {
                this.$global_msg.disk=data.data;
                this.tableData=data.data;
              }
            });
          }
        },
        getFile(event) {
          this.file=event.target.files[0];
          console.log(this.file);
        },
        submitForm(event) {
          console.log("开始上传文件：")
          event.preventDefault();
          let formData=new FormData();
          formData.append('multipartFile', this.file);

          let config={
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };

          let url='http://localhost:8081/runyun/upload/'+this.$global_msg.userId;
          let vm = this;
          this.$http.post(url, formData, config).then(function(resp) {
            let data=resp.data;
            if(data.code===200) {
              console.log("获取数据：")
              console.log(data.data)
              vm.$message({
                message: '上传成功',
                type: 'success'
              });
              vm.tableData=data.data;
              vm.$global_msg.disk=data.data;
            } else if(data.code==400) {
              this.$message({
                type: 'error',
                message: data.msg
              });
            }
          });
        },
      },
        get methods() {
          return this._methods;
        },
        set methods(value) {
          this._methods=value;
        },
    }
</script>

<style lang="less" scoped>
.mydisk{
    margin-left: 0px;
}
.header{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 10px;
}
.wrapper{
    margin: 20px 10px;
    margin-right: 50px;
    // width: 1000px;
}

.input1_ {
  width: 150px;
  background-color: cornflowerblue;
}
.btn1_ {
    background-color: #409EFF;
    border: 0px;
    height: 30px;
    border-radius: 8px;
    color: white;
    width: 50px;
}

</style>
