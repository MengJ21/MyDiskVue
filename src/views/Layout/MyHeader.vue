<template>
    <div>
        <div class="header">
            <span class="title">个人网盘</span>
            <i v-if="!isCollapse"  @click="changeMenu" id="left1" >
              <div style="margin-left: 0;margin-top: 15px">
                <svg t="1673060533192" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3281" width="2rem" height="2rem"><path d="M512 185.6c129.792 0 238.0288 94.5152 256.64 218.5472l0.3072 2.176c95.232 23.3472 165.1456 107.008 168.1408 206.1824l0.1024 6.656c0 118.144-94.5664 214.8096-213.4016 219.0592a32 32 0 1 1-2.304-63.9488c84.608-3.0208 151.7056-71.6288 151.7056-155.136 0-76.3648-56.3968-140.928-131.7888-153.088l-5.9904-0.8704-27.008-3.328-1.0752-27.1872C703.3344 331.6224 617.216 249.6 512 249.6c-103.0144 0-187.7504 78.6944-194.9952 178.7392l-0.3328 6.272-1.0752 27.1872-26.9824 3.328c-78.4128 9.6768-137.8048 75.6224-137.8048 154.0096 0 83.7888 67.5328 152.5248 151.4496 155.264l265.2928-0.1024a32 32 0 1 1 0.0256 64l-266.3424 0.1024c-119.296-3.8656-214.4256-100.736-214.4256-219.264 0-99.7376 67.6864-184.96 161.4592-211.0464l6.784-1.792 0.3072-2.2016c18.3296-121.728 122.88-214.9888 249.4464-218.3936L512 185.6z" fill="#FB553C" p-id="3282"></path><path d="M550.784 555.8528h61.3376a21.376 21.376 0 0 0 15.3344-36.2752l-91.8528-94.208a21.376 21.376 0 0 0-30.592 0l-91.8528 94.208a21.376 21.376 0 0 0 15.36 36.352h61.2608v82.9952a30.5152 30.5152 0 0 0 61.0048 0v-83.072z" fill="#FB553C" p-id="3283"></path></svg>
              </div>
            </i>
            <i v-else @click="changeMenu" class="el-icon-s-unfold" id="right1"></i>
            <div class="header-right">
              <div class="user"> 欢迎&nbsp;{{this.$global_msg.username}}:&nbsp;&nbsp;</div>
              <div style="margin: auto">
                <svg t="1673060448911" @click="userInformation()" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2799" width="200" height="200"><path d="M513 733.23a233.63 233.63 0 1 1 165.21-68.42A232.14 232.14 0 0 1 513 733.23zM513 326c-95.75 0-173.65 77.88-173.65 173.62S417.25 673.23 513 673.23s173.65-77.88 173.65-173.61S608.75 326 513 326z" fill="#0368CD" p-id="2800"></path><path d="M795.82 850.77a29.91 29.91 0 0 1-22-9.59c-64.29-69.25-159.36-109-260.82-109-99.79 0-193.85 38.65-258.06 106a30 30 0 0 1-43.44-41.39C287 717.64 396.88 672.21 513 672.21c118.09 0 229.19 46.71 304.79 128.15a30 30 0 0 1-22 50.41z" fill="#0368CD" p-id="2801"></path><path d="M512 962a448.11 448.11 0 0 1-174.39-860.78 448.11 448.11 0 0 1 348.78 825.56A445.19 445.19 0 0 1 512 962z m0-836c-213.94 0-388 174.06-388 388s174.06 388 388 388 388-174.06 388-388-174.06-388-388-388z" fill="#0368CD" p-id="2802"></path></svg>
              </div>
              <div>
                &nbsp;&nbsp;
              </div>
            </div>
          <template>
            <div class="items-center">
              <el-button  @click="userInformation()">编辑</el-button>
              <el-button type="warning" class="ml-2" @click="loginout">退出</el-button>
            </div>
          </template>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/Breadcrumb'
    export default {
        props:['isCollapse'],
        components:{
            Breadcrumb
        },
        methods:{
            changeMenu(){
                // 点击切换按钮的时候,修改父组件的数据 isCollapse
                this.$emit('changeCollapse')
            },
             loginout(){
                 this.$router.push({path:'/'})
             },
             userInformation(){
                let url = 'http://localhost:8081/runyun/getUser/'+this.$global_msg.userId;
                this.axios.get(url).then((resp)=>{
                    let data = resp.data;
                    if (data.code == 200) {
                        this.$global_msg.userInfo = data;
                        this.$router.push({path:'/PersonalInfo'})
                    }
                })
             }
        }
    }
</script>
<style lang="less" scoped>
.header{
    // display: flex;
    height: 60px;
    background-color:#FFFFFF;
    // width: 100%;
    line-height: 60px;
    color: #000000;
    display: flex;
}
.title{
  width: 200px;
  color: whitesmoke;
  background-color: #2c3e50;
;
  font-size: 35px;
  font-family: 楷体;
  float: left;
    }

#left1,#right1{
  display: flex;
  height: 60px;
  width: 60px;
  margin: auto;
  line-height: 60px;
  flex: 1;
  font-size: 30px;
}
.header-right{
    float: right;
    // padding-right: 20px;
    display: flex;
    font-size: 20px;
    .user{
        margin-left: 20px;
        // font-size: 20px;
    };
#return{
        display: flex;
        height: 60px;
        width: 60px;
        line-height: 60px;
        font-size: 30px;
    }

.icon {
  width: 1.5rem;
  height: 1.5em;
  line-height: 1.5rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
}

</style>
