(window.webpackJsonp=window.webpackJsonp||[]).push([["Mcfq"],{Mcfq:function(t,e,a){"use strict";a.r(e);var n=a("HB48").a.fetch,s=function(t){return n("get","/socket/statusList",t)},l=function(t){return n("get","/socket/updateMap",t)},i={name:"SchoolList",data:function(){return{listLoading:!1,dataList:[],inter:null}},created:function(){clearInterval(this.inter),this.getList(),this.setInter()},beforeDestroy:function(){clearInterval(this.inter)},methods:{getList:function(){var t=this;this.listLoading=!0,s().then(function(e){t.dataList=e.data,t.listLoading=!1})},setInter:function(){var t=this;this.inter=setInterval(function(){t.getList()},5e3)},updateData:function(){var t=this;l().then(function(e){t.$message({message:"更新成功",type:"success"})})}}},r=a("KHd+"),o=Object(r.a)(i,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-refresh"},on:{click:t.updateData}},[t._v("更新学校")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.dataList,stripe:!0,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"学校名称",prop:"schoolName",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"学校地址",prop:"address",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"是否在线",prop:"status",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.status?a("el-tag",{attrs:{type:"success"}},[t._v("在线")]):a("el-tag",{attrs:{type:"danger"}},[t._v("不在线")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"IP地址",prop:"ip",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"最后上报时间",prop:"lastTime",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"最后上报时间(毫秒)",prop:"lastTimeMillis",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"mac地址",prop:"mac",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:"info"}},[t._v(t._s(e.row.mac))])]}}])})],1)],1)},[],!1,null,null,null);o.options.__file="schoolList.vue";e.default=o.exports}}]);
//# sourceMappingURL=Mcfq.71544359.js.map