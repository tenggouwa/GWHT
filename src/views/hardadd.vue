<template>
	<div class="hardadd">
		<index-headerbtn></index-headerbtn>
 		<index-left></index-left>
    
    <div id="heightScroll">
      <div class="hardadd1" >
      <p>添加服务器</p>
      <div class="hardadd1for">
        <el-form ref="form" :model="form" label-width="100px" class="hardadd1form">
          <el-form-item label="服务器名称:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="外网IP:">
            <el-input v-model="form.ip_network"></el-input>
          </el-form-item>
          <el-form-item label="内网IP:">
            <el-input v-model="form.ip_inner"></el-input>
          </el-form-item>
          <el-form-item label="所属公司:">
            <el-input v-model="form.company"></el-input>
          </el-form-item>
          <el-form-item label="服务器用途:">
            <el-select class="addselect1" v-model="form.type" placeholder="数据服务">
              <el-option label="节点服务器" value="1"></el-option>
              <el-option label="备用节点服务器" value="2"></el-option>
              <el-option label="应用服务器" value="3"></el-option>
              <el-option label="备用应用服务器" value="4"></el-option>
              <el-option label="区域二数据服务器" value="5"></el-option>
              <el-option label="备用数据服务器" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据端口:">
            <el-input v-model="form.port"></el-input>
          </el-form-item>
          <el-form-item label="中文名称:">
            <el-input v-model="form.describe"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="hardaddbtn">确定</el-button>
            <el-button @click="hardaddno">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    </div>
 	</div>
</template>
<script>
import indexHeaderbtn from '../components/headerbtn.vue'
import indexLeft from '../components/left.vue'
import api from '../config/api-config.js'
import {ajax} from '../assets/js/common.js'

export default {
  // name: 'hello',
  data () {
    return {
        form: {
          name: '',      //服务器名称
          ip_network: '',//外网IP
          ip_inner: '',  //内网IP
          company: '',   //所属公司
          type: '',      //服务器用途
          describe: '',  //中文描述
          port: '',       //端口号
        }
      }
  },
  mounted(){
      this.$nextTick(()=>{
        var height=window.screen.availHeight-160+"px";
        var ele=document.getElementById('heightScroll');
        ele.style.height=height;

      })
    },
  methods:{
    // 返回按钮
    hardaddno(){
      window.history.go(-1);
    },
    // 添加服务器
   async hardaddbtn(){
      let that = this;
      // console.log(that.form);
    await  ajax(that,that.extendApi.hardadd,that.form,(res) =>{
          if (res.code == 200) {
             that.$notify({
              type: 'success',
              title: '提示',
              message: res.message,
              duration: 2000
          });
             window.history.go(-1);
          }else{
            that.$notify({
              type: 'warning',
              title: '提示',
              message: res.message,
              duration: 2000
          });
          }
      },'POST');
    }
  },
  components:{
    indexHeaderbtn,
    indexLeft
  }
}
</script>
<style scoped>
 #heightScroll{
  overflow-y: auto;
 }
  .hardadd1{
    margin: 20px 20px 0 20px;
    background: #fff;
    line-height: 84px;
    border-radius: 5px;
  }
  .hardadd1 p{
    margin: 30px 0 0 32px;
    font-size: 16px;
    color: #1f2f3d;
    font-weight: bold;
  }
  .hardadd1for{
    margin-left: 100px;
  }
  .hardadd1form{
    width: 450px;
    display: inline-block !important;
  }
  .addselect1{
    width: 350px;
  }
</style>