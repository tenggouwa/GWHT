<template>
	<div class="errorcomond">
		<index-header></index-header>
 		<index-left></index-left>
    <div class="errorcomond1">
      <div class="error-tab">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="log_id"
            label="记录号"
            width="">
          </el-table-column>
          <el-table-column
            prop="project_id"
            label="项目编号"
            width="">
          </el-table-column>
          <el-table-column
            prop="mach_id"
            label="机器编号">
          </el-table-column>
          <el-table-column
            prop="type"
            label="异常信息">
          </el-table-column>
          <el-table-column
            prop="status"
            label="处理状态">
          </el-table-column>
          <el-table-column
            prop="created_time"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="updated_time"
            label="更新时间">
          </el-table-column>
        </el-table>
      </div>
      <div class="error-page">
        <el-pagination  
          class="error-page2"
          small
          layout="prev, pager, next" 
          :page-size="pagesize.size" 
          :total="format(sumTotol)"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
 	</div>
</template>
<script>
import indexHeader from '../components/header.vue'
import indexLeft from '../components/left.vue'
import api from '../config/api-config.js'
import {ajax} from '../assets/js/common.js'
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
      tableData: [],
      // count:10,
      }
    },
  created(){
        this.request();
    },
  methods:{
        // 异常信息列表加载
        request(){
          let that = this;
          ajax(that,that.extendApi.errorcomond,that.pagesize,function(res){
              if (res.code == 200) {
                that.sumTotol = Number(res.data.count);
                that.tableData = res.data.rows;
              }else{
                console.log('失败');
              }
          },'POST')
        },
        // 分页
        handleCurrentChange(currentPage) {
          var _this = this;
          _this.pagesize.page = currentPage;
          _this.request();
        },
        format(e){
          return Number(e);
        },
  },
  components:{
    indexHeader,
    indexLeft
  }
}
</script>
<style scoped>
  .errorcomond1{
    margin: 20px 20px 0 260px;
    background: #fff;
    border-radius: 5px;
  }
  .error-tab{
    margin: 0 20px;
    padding-top: 40px;
  }
  .error-page{
    background: #090;
    margin-top: 50px;
    display: inline-block;
    padding-bottom: 80px; 
  }
  .error-page2{
    position: absolute;
    left: 50%;
    /*margin-left: -70px;*/
  }
</style>