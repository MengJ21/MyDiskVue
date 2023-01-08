<template>
<div style="background-color: #2c3e50;color: whitesmoke">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
           class="el-menu-vertical-demo"
           router
           :collapse="isCollapse">
           <el-menu-item index="1">
             <i class="el-icon-s-home"></i>
             <span>首页</span>
           </el-menu-item>
          <el-menu-item>
                    <i class="el-icon-upload"></i>
                    <span slot="title" @click="myDisk">我的文件</span>
          </el-menu-item>
          <el-menu-item>
                  <i class="el-icon-document-remove"></i>
                  <span slot="title" @click="myShare">共享文件</span>
          </el-menu-item>
          <el-menu-item>
                  <i class="el-icon-document-add"></i>
                  <span slot="title" @click="shared">他人分享</span>
          </el-menu-item>
          <el-menu-item>
                  <i class="el-icon-delete"></i>
                  <span slot="title" @click="myBin">回收站</span>
          </el-menu-item>
    </el-menu>
  </el-col>
</el-row>

    </div>
</template>

<script>
    export default {
        props:['isCollapse'],
        data() {
            return {
            }
        },
        methods: {
          myDisk() {
            // alert("hello");
            let url = 'http://localhost:8081/runyun/getFiles/'+this.$global_msg.userId;
              this.axios.get(url).then((resp)=>{
              let data = resp.data;
              if (data.code == 200) {
                this.$global_msg.disk = data.data;
                this.$router.push({path:'/Mydisk'})
              }
            })
          },
          myShare(){
            // alert("hello");
              let url = 'http://localhost:8081/runyun/getShares/'+this.$global_msg.userId;
              this.axios.get(url).then((resp)=>{
              let data = resp.data;
              if (data.code == 200) {
                this.$global_msg.share = data.data;
                this.$router.push({path:'/Share'})
              }
            })
          },
          shared() {
            // alert("hello");
              let url = 'http://localhost:8081/runyun/getShareds/'+this.$global_msg.userId;
              this.axios.get(url).then((resp)=>{
              let data = resp.data;
              if (data.code == 200) {
                this.$global_msg.shared = data.data;
                this.$router.push({path:'/Receiveshare'})
              }
            })
          },
          myBin () {
            // alert("hello");
            let url = 'http://localhost:8081/runyun/getRecycles/'+this.$global_msg.userId;
              this.axios.get(url).then((resp)=>{
              let data = resp.data;
              if (data.code == 200) {
                this.$global_msg.binData = data.data;
                this.$router.push({path:'/RecycleBin'})
              }
            })
          },
      },
    }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 400px;
    text-align: center;
    color: white;
    background-color: #2c3e50
  }
  .el-menu-item{
    color: white;
  }
</style>
