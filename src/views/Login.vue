<template>
<body id="poster">
    <el-form class="login-container" label-position="left" label-width="0px">
        <h1 class="login_title">
            个人网盘
        </h1>

        <el-form-item label="" class="cup">
            <i class="el-icon-coffee-cup">登录页面</i>
        </el-form-item>
        <el-form-item label="">
            <el-input type="text"  v-model="loginForm.email" autocomplete="off" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>

      <el-form-item>
        <el-checkbox v-model="checked" class="button1">记住我</el-checkbox>
      </el-form-item>
      <el-form-item style="display: flex">
        <el-button type="success" v-on:click="Login()" icon="el-icon-lollipop">登录</el-button>
        <el-button type="primary" @click="toRegister()" icon="el-icon-right">注册</el-button>
      </el-form-item>
    </el-form>
</body>
  </template>

  <script>

  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          email: '',
          password: '123456'
        },
        checked: false
      }
    },
    methods: {
      Login() {
        //console.log('submit!',this.loginForm);
        this.axios.post('http://localhost:8081/runyun/login',this.loginForm).then((resp)=>{
            let data = resp.data;
            if(data.code == 200){
                this.loginForm={};
                this.$message({
                      message: '成功登录，欢迎来到云盘系统',
                      type: 'success'
                });
                this.$global_msg.email = data.data.email
                this.$global_msg.userId = data.data.userId
                this.$global_msg.username = data.data.userName
                this.$router.push({path:'/Layout'})
            } else if (data.code == 400) {
                this.$message({
                      message: data.msg,
                      type: 'error'
                });
            }
        })
      },
      toRegister(){
        this.$router.push({path:'/Register'})
      }
    }
  }
  </script>

  <style>
    #poster{
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    body{
        margin: 0px;
        padding: 0px;
    }
    .login-container{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login_title{
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .cup{
        float: left;
        color: green;
        width: 80px;
    }
    .button1{
        float: left;
    }
  </style>
