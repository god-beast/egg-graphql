(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-325b"],{"4v6A":function(e,t,a){"use strict";a.d(t,"a",function(){return i});var r=a("HB48"),s=r.a.fetch,i={addVersion:{url:"/api/v1/installNavAll",baseUrl:r.a.baseURL},deleteVersion:function(e){return s("delete","/api/v1/deleteNavAll",e)},changeVersion:{url:"/api/v1/updateNavAll",baseUrl:r.a.baseURL},getVersion:function(e){return s("get","/api/v1/selectNavAll",e)},versionBack:function(e){return s("get","/api/v1/servers/back",e)},versionUpload:function(e){return s("get","/api/v1/servers/upload",e)},serviceDelete:function(e){return s("delete","/api/v1/servers/delete",e)},serviceInstall:function(e){return s("post","/api/v1/servers/install",e)},serviceGet:function(e){return s("get","/api/v1/servers/select/all",e)},serviceUpdate:function(e){return s("post","/api/v1/servers/update",e)}}},"7uCY":function(e,t,a){"use strict";var r=a("LmNt");a.n(r).a},LmNt:function(e,t,a){},pBGA:function(e,t,a){"use strict";a.r(t);var r=a("QbLZ"),s=a.n(r),i=a("4v6A"),l={name:"version",data:function(){return{addShow:!1,editData:{serverName:"",serverIP:"",serverHost:"",userName:"",passWord:"",serverFilePath:"",remark:""},listLoading:!1,dataList:[],currentId:"",rules:{serverName:[{required:!0,message:"请输入主机名",trigger:"change"}],serverIP:[{required:!0,message:"请输入地址",trigger:"change"}],serverHost:[{required:!0,message:"请输入端口号",trigger:"change"}],userName:[{required:!0,message:"请输入用户名",trigger:"change"}],passWord:[{required:!0,message:"请输入密码",trigger:"change"}],serverFilePath:[{required:!0,message:"请输入文件路径",trigger:"change"}]}}},created:function(){this.getList(),this.baseUrl=i.a.addVersion.baseUrl},methods:{getList:function(){var e=this;this.listLoading=!0,i.a.serviceGet().then(function(t){e.dataList=t.data,e.listLoading=!1})},updateData:function(e){this.currentId=e.id||null,this.addShow=!0,this.editData={serverName:e.serverName,serverIP:e.serverIP,serverHost:e.serverHost,userName:e.userName,passWord:e.passWord,serverFilePath:e.serverFilePath,remark:e.remark}},submitUpload:function(){var e=this;this.$refs.ruleForm.validate(function(t){if(!t)return!1;e.editData.serverHost-=0,e.currentId?i.a.serviceUpdate(s()({id:e.currentId},e.editData)).then(function(t){e.$message({type:"success",message:"成功更新"}),e.getList(),e.addShow=!1}):i.a.serviceInstall(e.editData).then(function(t){e.$message({type:"success",message:"成功新增"}),e.getList(),e.addShow=!1})})},cancelUpload:function(){this.addShow=!1},deleteData:function(e){var t=this;this.$confirm("确定删除该主机?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.a.serviceDelete({id:e}).then(function(e){t.$message({type:"success",message:"成功删除"}),t.getList()})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})}}},n=(a("7uCY"),a("KHd+")),o=Object(n.a)(l,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-dialog",{attrs:{title:"主机管理",visible:e.addShow,width:"500px","close-on-click-modal":!1},on:{"update:visible":function(t){e.addShow=t}}},[a("el-form",{ref:"ruleForm",attrs:{model:e.editData,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"主机名",prop:"serverName"}},[a("el-input",{staticClass:"dialog_pram",attrs:{clearable:"",placeholder:"请输入主机名"},model:{value:e.editData.serverName,callback:function(t){e.$set(e.editData,"serverName",t)},expression:"editData.serverName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"地址",prop:"serverIP"}},[a("el-input",{staticClass:"dialog_pram",attrs:{clearable:"",placeholder:"请输入地址"},model:{value:e.editData.serverIP,callback:function(t){e.$set(e.editData,"serverIP",t)},expression:"editData.serverIP"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"端口号",prop:"serverHost"}},[a("el-input",{staticClass:"dialog_pram",attrs:{clearable:"",placeholder:"请输入端口号"},model:{value:e.editData.serverHost,callback:function(t){e.$set(e.editData,"serverHost",t)},expression:"editData.serverHost"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"用户名",prop:"userName"}},[a("el-input",{staticClass:"dialog_pram",attrs:{clearable:"",placeholder:"请输入用户名"},model:{value:e.editData.userName,callback:function(t){e.$set(e.editData,"userName",t)},expression:"editData.userName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码",prop:"passWord"}},[a("el-input",{staticClass:"dialog_pram",attrs:{clearable:"",placeholder:"请输入密码"},model:{value:e.editData.passWord,callback:function(t){e.$set(e.editData,"passWord",t)},expression:"editData.passWord"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"文件路径",prop:"serverFilePath"}},[a("el-input",{staticClass:"dialog_pram",attrs:{clearable:"",placeholder:"请输入文件路径"},model:{value:e.editData.serverFilePath,callback:function(t){e.$set(e.editData,"serverFilePath",t)},expression:"editData.serverFilePath"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{staticClass:"dialog_pram",attrs:{type:"textarea",rows:3,clearable:"",placeholder:"请输入备注"},model:{value:e.editData.remark,callback:function(t){e.$set(e.editData,"remark",t)},expression:"editData.remark"}})],1)],1),e._v(" "),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.submitUpload}},[e._v("确定")]),e._v(" "),a("el-button",{attrs:{type:""},on:{click:e.cancelUpload}},[e._v("取消")])],1)],1),e._v(" "),a("div",{staticClass:"filter-container"},[a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-edit"},on:{click:function(t){e.updateData({})}}},[e._v("新增主机")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.dataList,stripe:!0,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{width:"150",label:"主机名",prop:"serverName",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"地址",prop:"serverIP",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:"info"}},[e._v(e._s(t.row.serverIP))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"100",label:"端口号",prop:"serverHost",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"用户名",prop:"userName",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"密码",prop:"passWord",align:"center"}}),e._v(">\n    "),a("el-table-column",{attrs:{width:"150",label:"操作",prop:"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.updateData(t.row)}}},[e._v("修改")]),e._v(" "),a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(a){e.deleteData(t.row.id)}}},[e._v("删除")])]}}])})],1)],1)},[],!1,null,"25b30b47",null);o.options.__file="computer.vue";t.default=o.exports}}]);
//# sourceMappingURL=chunk-325b.53868b7c.js.map