<template>
	<div class="hard">
		<index-header></index-header>
 		<index-left></index-left>
    <div class="container">
      <div>
        <router-link class="softaddrouter" to='/softadd'>
          <el-button class="hard-add" type="primary" icon="plus">添加项目信息</el-button>
        </router-link>
      </div>
      <div class="hard-tab" v-for="">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="id"
            label="项目编号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="项目名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="describe"
            label="中文描述">
          </el-table-column>
          <el-table-column
            prop="company"
            label="所属公司">
          </el-table-column>
          <el-table-column
            prop="version"
            label="版本信息"
            :formatter="formatversion">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="创建时间"
            width="110">
          </el-table-column>
          <el-table-column
            prop="updated_at"
            label="更新时间"
            width="110">
          </el-table-column>
          <el-table-column
            prop="jiedian"
            label="节点监控"
            width="100">
            <template scope="scope">
              <el-button @click="softjiedian(scope.row.id)" type="text">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="异常通知"
            width="100"
            >
            <template scope="scope" v-if="reminding">
              <el-button
                 @click="dialogFormVisible = true;funalert(scope.row.id);"
                type="text" v-if="scope.row.status!=9">
                提醒
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="controler"
            label="管理者"
            width="100">
            <template scope="scope">
              <el-button @click="softmanger(scope.row.id)" type="text">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="app"
            label="应用监控"
            width="100">
            <template scope="scope">
              <el-button @click="softyyjk(scope.row.id)" type="text">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            :formatter="formatstatus">
          </el-table-column>
           <el-table-column
              prop="delete"
              label="删除"
              width="100">
              <template scope="scope">
                <el-button @click="deletesoft(scope.row.id)" type="button">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="hard-page">
        <span class="hard-page1">共{{tableData.length}}条信息</span>
       <!--  <el-pagination
          small
          layout="prev, pager, next"
          :total="50" 
          class="hard-page2">
        </el-pagination> -->
        <el-pagination  
          class="hard-page2"
          small
          layout="prev, pager, next" 
          :page-size="pagesize.size" 
          :total="format(sumTotol)"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <!-- 弹出框 -->
      <div>
        <el-dialog title="提醒" :visible.sync="dialogFormVisible"  class="softalert">
          <el-form ref="form" :model="form" label-width="100px" class="softalert1">
            <el-form-item>
              <template>
              <el-select v-model="value5" multiple placeholder="请选择" class="softselect">
                <el-option
                  v-for="item in options"
                 
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </template>
            </el-form-item>
            <el-checkbox label="邮件提醒" name="type" v-model="emailtypes" ></el-checkbox>
            <el-checkbox label="短信提醒" name="type" disabled></el-checkbox>
            <!-- <el-checkbox-group v-model="form.type">
              <el-checkbox label="邮件提醒" name="type"></el-checkbox>
              <el-checkbox label="短信提醒" name="type"></el-checkbox>
            </el-checkbox-group> -->
            </el-form-item>
          </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false;funcdias()">确 定</el-button>
            </div>
          </el-dialog>
      </div>
    </div>
 	</div>
</template>
<script>
import indexHeader from '../components/header.vue'
import indexLeft from '../components/left.vue'
import api from '../config/api-config.js'
import {ajax,getcookie} from '../assets/js/common.js'
export default {
  // name: 'hello',
  data () {
    return {
      input:'',
      sumTotol:0,
      pagesize:{
        page:1,
        size:5
      },
      paramemail:{
        project_id:0,
        admin_ids:'',
        sendtype:1,
      },
      tableData: [{}],
      dialogTableVisible: false,
      dialogFormVisible: false,
      emailtypes:true,
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: 1,
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        options: [],
        deleteproject:{
          id:'',
        },
        value5: [],
        mangername:{
        id:'',
      },
    }
  },
  components:{
    indexHeader,
    indexLeft
  },
  created(){
        this.softlist();
    },
  methods: {
      softjiedian(id) {
        console.log(id)
        let path="/softpoint?id="+id;
        this.$router.push({path:path})
        // alert(this.tableData.id);
      },
      funcdias(){
        if(this.value5.length>0){
          for(let i=0 ;i<this.value5.length;i++){
            if(i==this.value5.length-1){
              this.paramemail.admin_ids=this.paramemail.admin_ids+this.value5[i];
            }else{
              this.paramemail.admin_ids=this.paramemail.admin_ids+this.value5[i]+',';
            }
          }
        }
        ajax(this,this.extendApi.emailtoadmin,this.paramemail,(res)=>{
          if(res.code==200){
            this.$notify({
              type: 'success',
              title: '提示',
              message: '发送成功',
              duration: 2000
          });
            dialogFormVisible = false;
            this.softlist();
          }else{
            this.$notify({
              type: 'warning',
              title: '提示',
              message: res.message,
              duration: 2000
          });
          }
        },'POST')

        // console.log();
      },
      softmanger(id) {
        console.log(id)
        let path="/softmanger?id="+id;
        this.$router.push({path:path})
      },
      softyyjk(id) {
        console.log(id)
        let path="/softyyjk?id="+id;
        this.$router.push({path:path})
      },
      // 项目列表
      softlist(){
        let that = this;
        ajax(that,that.extendApi.softlist,that.pagesize,function(res){
            if(res.code == 200){
              that.sumTotol = Number(res.data.count);
              that.tableData = res.data.rows;
              // that.table = res.data
              console.log(that.tableData)
            }else{
              console.log(shibeng);
            }
        },'POST');
      },
      handleCurrentChange(currentPage) {
          var _this = this;
          _this.pagesize.page = currentPage;
          _this.softlist();
        },
        format(e){
          return Number(e);
        },
      // 删除按钮
      deletesoft(id){     
        let _this = this;
        _this.deleteproject.id = id;
        console.log(_this.deleteproject);
          
          ajax(_this,_this.extendApi.softdelete,_this.deleteproject,(param)=>{
              if (param.code == 200) {
                _this.softlist();
                _this.$notify({
                    type: 'success',
                    title: '提示',
                    message: param.message,
                    duration: 2000
                });
              }else{
                 _this.$notify({
                    type: 'warnings',
                    title: '提示',
                    message: param.message,
                    duration: 2000
                });
              }
          },'POST');

      },  
      // 判断状态
      formatversion(row,column,cellValue){
        console.log(2222);
        if(Number(row.version) == 1){
          return "内测版"

        }
        if(Number(row.version) == 2){
          return "公测版"

        }
        if(Number(row.version) == 3){
          return "正式版"

        }
      },
      formatstatus(row,column,cellValue){
        if(Number(row.status) == -1){
          return "异常"

        }
        if(Number(row.status) == -2){
          return "应用异常"

        }
        if(Number(row.status) == 0){
          return "警告"

        }
        if(Number(row.status) ==9 ){
          return "正常"

        }
      },
      changeStaus(row,column,cellValue){
        console.log(1231232123);
        console.log(row);
        if (Number(row.status) == -1) {
          return "提醒"
        }
        if (Number(row.status) == 0) {
          return "提醒"
        }
        if(Number(row.status) == 9){
          reminding = false;
          return "正常"

        }
      },
       manager(){
          let that = this;
          ajax(that,that.extendApi.mangeradmins,that.mangername,(res) => {
              if (res.code == 200) {
                 console.log(11111);
                console.log(res.data)
                that.options = res.data;
              }else{
                alert("是崩了");
              }
          },'POST');
        },
      funalert(id){
        this.mangername.id=id;
        this.paramemail.project_id=id;
        this.manager();
        console.log(id);
      }
    },
}
</script>
<style scoped>
  .container{
    margin: 20px 20px 0 260px;
    background: #fff;
    border-radius: 5px;
  }
  .hard-add{
    float: right;
    width: 130px;
    height: 36px;
    margin: 30px 20px 30px 0 !important;
  }
  .hard-tab{
    margin: 20px 20px 0 20px
  }
  .hard-page{
    margin-top: 50px;
    display: inline-block;
    padding-bottom: 80px; 
  }
  .hard-page1{
    float: left;
    margin-left: 40px;

  }
  .hard-page2{
    position: absolute;
    left: 50%;
    margin-left: 80px;
  }
  .softselect{
    margin-left: -100px;
    width: 350px;
  }
  .softalert{
    width: 820px;
    height: 580px;
    overflow: hidden !important;
    margin: 200px 0 0 550px !important;
  }
  .softalert1{
    width: 450px;
  }
  .softaddrouter{
    text-decoration: none;
    color: #fff;
  }
</style>