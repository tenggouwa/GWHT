<template>
	<div class="datarecord">
		<index-header></index-header>
 		<index-left></index-left>
    <div class="scroll">
      <div v-for="item in datarecord" v-model="datarecord">
      <div class="datarecord1">
        <div class="datarecord1-tit">{{item.name}}<hr class="hr-1"></div>
        <div class="datarecord1-con">
          <span class="datarecord1-sp1">项目描述:</span>
          <span class="datarecord1-sp2">{{item.describe}}</span>
          <span class="datarecord1-sp1">用户注册量:</span>
          <span class="datarecord1-sp3">{{item.user_num}}</span>
           <el-tooltip placement="top"  effect="light">
            <div slot="content">
              <span class="czname">操作名</span><span class="cnum">操作数量</span>
              <div v-for="actiones in item.actions">
               <span class="czname"> {{actiones.actionid}}</span>
               <span class="cnum"> {{actiones.count}}</span>
                <br/>
              </div>
            </div>
            <span class="datarecord1-sp0">用户操作量<i class="el-icon-caret-bottom"></i></span>
          </el-tooltip>
          <!-- <span class="datarecord1-sp2">{{item.user_num}}</span>       -->
        </div>
      </div>
      <!-- <el-tooltip placement="top">
        <div slot="content">多行信息<br/>第二行信息</div>
        <el-button>Top center</el-button>
      </el-tooltip> -->
    </div>   
    </div>
 	</div>
</template>
<script scoped>
import indexHeader from '../components/header.vue'
import indexLeft from '../components/left.vue'
import api from '../config/api-config.js'
import {ajax} from '../assets/js/common.js'
export default {
  // name: 'hello',
  data () {
    return {
      input:'',
      datarecord:[],
      }
  },
  created(){
        this.request();
    },
  methods:{
        request(){
          let _this = this;
          console.log()
          ajax(_this,_this.extendApi.datarecord,'',function(res){
              if (res.code == 200) {
                console.log(res.data);
                _this.datarecord = res.data;
              }else{
                console.log(2);
              }
          },'POST')
        }
  },
  components:{
    indexHeader,
    indexLeft
  }
}
</script>
<style>
/*  body{
    overflow: hidden;
  }
  .scroll{
    overflow-y: auto;
  }*/
  .czname{
    display: inline-block;
    line-height: 24px;
    width: 90px;

  }
  .cnum{
    display: inline-block;
    width: 90px;
    line-height: 24px;
  }
  .datarecord1{
    margin: 20px 20px 0 260px;
    background: #fff;
    height: 84px;
    line-height: 84px;
    border-radius: 5px;
  }
  .datarecord1{
    height: 120px;
    background: #fff;
    margin: 20px 20px 0 260px;
    border-radius: 5px;
  }
  .datarecord1-tit{
    margin: 0 20px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    font-weight: bold;
  }
  .datarecord1-con{
    margin:0 20px;
     height: 60px;
    line-height: 60px;
  }
  .datarecord1-sp1{
    color: #bfcbd9;
    text-align: center;
  }
  .datarecord1-sp2{
    color: #1f2f3d;
    width: 40%;
    display: inline-block;
  }
  .datarecord1-sp0{
    color: #bfcbd9;
    margin-right: 20px;
    float: right;
  }
</style>
