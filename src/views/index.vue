<template>
  <div class="hello">
    <div class="login" v-model="login">
      <p>监控后台管理系统</p>
      <div class="username">
        <img class="user" src="../assets/img/User.png" height="24" width="23">
        <span class="user1">用户名</span>
        <input class="user2" type="text" v-model="login.username">
      </div>
      <div class="password">
        <img class="key" src="../assets/img/Key.png" height="24" width="25">
        <span class="key1">密码</span>
        <input class="key2" type="password" v-model="login.password">
      </div>
     <div class="remember">
        <el-checkbox label="记住用户名和密码" name="type" v-model="checked"></el-checkbox>
     </div>
     <div class="loginbtn">
       <el-button class="loginbtn1" type="primary" @click="loginbtn">登 录</el-button>
     </div>
    </div>
  </div>
</template>

<script>
import api from '../config/api-config.js'
import { ajax} from '../assets/js/common.js'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'index',
      login: {
        username:'',
        password:''
      },
      checked:"",
    }
  },
  created(){
  	this.rememberpassword();
  },
  methods:{
  	rememberpassword(){
  		let that = this;
	 		that.login.username = sessionStorage.getItem("username");
	  		that.login.password = sessionStorage.getItem("password");
  	},
      // 登录按钮window.history.forward(1);
  	
    loginbtn() {
      // 判断是否已经输入用户名密码
      if(this.login.username && this.login.password){
      // 登录接口
        console.log(this.extendApi.login)
        let that = this;
         ajax(that,that.extendApi.login,that.login,function(res){
           // console.log(this.extendApi.login);
           console.log(res.code);
            if (res.code == 200) {
      //存取token到cookie
              sessionStorage.setItem("token", res.data.access_token);
              sessionStorage.setItem("uid", res.data.uid);
              if(that.checked == true){
              	sessionStorage.setItem("username", that.login.username);
              	sessionStorage.setItem("password", that.login.password);
      // 页面跳转
              }
              
              that.$router.push({path:'/hard'});
            }else{
              that.$notify({
              type: 'warning',
              title: '提示',
              message: '请输入正确的用户名和密码',
              duration: 2000
          });
            }
         },'POST');
      }else{
          this.$notify({
              type: 'warning',
              title: '提示',
              message: '请输入用户名和密码',
              duration: 2000
          });
        }
      }
  }
}
</script>
<style scoped>
.hello{
  width: 100%;
  height: 100vh;
  background: url(../assets/img/background.jpg) no-repeat;
  background-size: 100% 100%; 
}
.login{
  width: 537px;
  height: 458px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -229px 0 0 -268px;
  box-shadow:  0px 0px 30px 30px rgba(80,138,248,0.3);
}
.login p{
  font-size: 24px;
  color: #20A0FF;
  text-align: center;
  margin-top: 46px;
}
.username{
  height: 50px;
  width: 450px;
  line-height: 50px;
  margin: 0 auto;
  margin-top: 70px;
  border: 1px solid #e8e8e8;
  vertical-align: middle;
}
/*.username input{
  border:none;
  outline: none;
}*/
.user{
  margin: 13px 10px 0 20px;
}
.user1{
  position: absolute;
  color: #5d5d5d;
  font-size: 16px;
}
.user2{
  border:none;
  outline: none;
  position: absolute;
  height: 50px;
  width: 300px;
  font-size: 16px;
  margin-left: 70px;
}
.password{
  height: 50px;
  width: 450px;
  line-height: 50px;
  margin: 0 auto;
  margin-top: 50px;
  border: 1px solid #e8e8e8;
}
.password input{
  border:none;
}
.key{
  margin: 13px 10px 0 20px;
}
.key1{
  position: absolute;
  color: #5d5d5d;
  font-size: 16px;  
}
.key2{
  border:none;
  outline: none;
  position: absolute;
  height: 50px;
  width: 300px;
  font-size: 16px;
  margin-left: 70px;
}
.remember{
  margin: 30px 0 0 43px;
}
.loginbtn{
  margin: 26px 0 0 43px;
}
.loginbtn1{
  width: 452px;
  height: 56px;
  font-size: 24px !important;
}
</style>
