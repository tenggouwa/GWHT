/*
 * 端口域名配置
 * @type Object
 */
var apiUrl = {
    basehostUrl: 'http://121.41.33.113:9902',
}
export default {
   login:apiUrl.basehostUrl+'/v1/user/login',						//用户操作--用户登录

   useradd:apiUrl.basehostUrl+'/v1/user/add',						//用户操作--用户添加

   hardlist:apiUrl.basehostUrl+'/v1/mach/list',						//硬件监控--硬件监控列表

   serverInfo:apiUrl.basehostUrl+'/v1/mach/get-server',			//硬件监控--第一次获取进度条

   hardadd:apiUrl.basehostUrl+'/v1/mach/add',						//硬件监控--添加服务器

   fwqdelete:apiUrl.basehostUrl+'/v1/mach/delete',             //硬件监控--删除服务器

   softlist:apiUrl.basehostUrl+'/v1/project/list',					//软件监控--软件监控列表

   softaddform:apiUrl.basehostUrl+'/v1/project/add',           //软件监控--项目添加

   softdelete:apiUrl.basehostUrl+'/v1/project/delete',         //软件监控--项目删除

   mangeradmins:apiUrl.basehostUrl+'/v1/project/list-admins',  //软件监控--项目管理者

   appmonitoring:apiUrl.basehostUrl+'/v1/server/project-status',//软件监控--应用监控

   pointlist:apiUrl.basehostUrl+'/v1/mach/type-list',          //软件监控--节点下拉

   mangeradd:apiUrl.basehostUrl+'/v1/admin/add',               //软件监控--添加管理员

   adminlist:apiUrl.basehostUrl+'/v1/admin/index',             //软件监控--管理员

   mangerList:apiUrl.basehostUrl+'/v1/admin/list',             //软件监控--管理员下拉菜单

   datarecord:apiUrl.basehostUrl+'/v1/statistics/project-info',//数据统计--列表
   
   getinfoNodelist:apiUrl.basehostUrl+'/v1/project/info-node',       //项目节点信息
   
   errorcomond:apiUrl.basehostUrl+'/v1/alarm-log/list',			//异常记录--列表  v1/server/project-to-admin

   emailtoadmin:apiUrl.basehostUrl+'/v1/server/project-to-admin',       //异常发送邮件  /v1/project/info-node

   pointjiankong:apiUrl.basehostUrl+'/v1/project/info-node',       //异常发送邮件  

}
