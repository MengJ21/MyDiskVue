<template>
    <div id="poster">
        <el-form :model="ruleForm"  label-position="left" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="register-container">
            <h3 class="register_title" style="color:purple">
            <i class="el-icon-service"></i>
            注册用户
            </h3>


        <el-form-item label="" prop="loginName">
           <el-input type="text" v-model="ruleForm.email" placeholder="邮箱" prefix-icon="el-icon-message"></el-input>
        </el-form-item>
        <el-form-item label="" prop="name">
           <el-input type="text" v-model="ruleForm.username" prefix-icon="el-icon-user-solid" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
           <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item label="" prop="checkPass">
           <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="重复密码"></el-input>
        </el-form-item>

        <el-form-item>
        <el-button type="primary"  @click="submitForm('ruleForm')" icon="el-icon-right">注册</el-button>
        </el-form-item>
        <el-form-item >
            <el-button type="success"  v-on:click="toLogin()" icon="el-icon-back">回到登录</el-button>
        </el-form-item>
    </el-form>
    </div>
  </template>

  <script>

  export default {
    name: 'Register',
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          email: '',
          password: '',
          username: '',
          checkPass:""
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(ruleForm) {
        this.axios.post('http://localhost:8081/runyun/register',this.ruleForm).then((resp)=>{
            let data = resp.data;
            if(data.code == 200){
                this.ruleForm={};
                this.$message({
                    message: '注册成功',
                    type: 'success'
                });
                this.$router.push({path:'/'})
            } else if (data.code == 400){
                this.$message({
                    message: data.msg,
                    type: 'error'
                });
            }
        })

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      toLogin(){
        this.$router.push({path:'/'})
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
        margin: 0px;
        padding: 0px;
    }

    .register-container{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .register_title{
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .button1{
        float:left ;
    }
    .button2{
        float: right;
        width: 200px;
    }
  </style>
