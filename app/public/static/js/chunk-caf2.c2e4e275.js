(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-caf2"],{Fth2:function(t,e,n){"use strict";var i=n("QbLZ"),o=n.n(i),r=n("P2sY"),a=n.n(r),s=(n("p77/"),n("RPjj"),n("puD4"),n("VH6O")),c=n.n(s),u={minHeight:"200px",previewStyle:"vertical",useCommandShortcut:!0,useDefaultHTMLSanitizer:!0,usageStatistics:!1,hideModeSwitch:!1,toolbarItems:["heading","bold","italic","strike","divider","hr","quote","divider","ul","ol","task","indent","outdent","divider","table","image","link","divider","code","codeblock"]},d={name:"MarddownEditor",props:{value:{type:String,default:""},id:{type:String,required:!1,default:function(){return"markdown-editor-"+ +new Date+(1e3*Math.random()).toFixed(0)}},options:{type:Object,default:function(){return u}},mode:{type:String,default:"markdown"},height:{type:String,required:!1,default:"300px"},language:{type:String,required:!1,default:"en_US"}},data:function(){return{editor:null}},computed:{editorOptions:function(){var t=a()({},u,this.options);return t.initialEditType=this.mode,t.height=this.height,t.language=this.language,t}},watch:{value:function(t,e){t!==e&&t!==this.editor.getValue()&&this.editor.setValue(t)},language:function(t){this.destroyEditor(),this.initEditor()},height:function(t){this.editor.height(t)},mode:function(t){this.editor.changeMode(t)}},mounted:function(){this.initEditor()},destroyed:function(){this.destroyEditor()},methods:{initEditor:function(){var t=this;this.editor=new c.a(o()({el:document.getElementById(this.id)},this.editorOptions)),this.value&&this.editor.setValue(this.value),this.editor.on("change",function(){t.$emit("input",t.editor.getValue())})},destroyEditor:function(){this.editor&&(this.editor.off("change"),this.editor.remove())},setValue:function(t){this.editor.setValue(t)},getValue:function(){return this.editor.getValue()},setHtml:function(t){this.editor.setHtml(t)},getHtml:function(){return this.editor.getHtml()}}},l=n("KHd+"),m=Object(l.a)(d,function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:this.id}})},[],!1,null,null,null);m.options.__file="index.vue";e.a=m.exports},GzWl:function(t,e,n){"use strict";var i=n("ma33");n.n(i).a},JNL0:function(t,e,n){"use strict";n.d(e,"a",function(){return o});var i=n("HB48").a.fetch,o={createMetting:function(t){return i("post","/createMetting",t)},getMetting:function(t){return i("get","/mettingList",t)},createDemand:function(t){return i("post","/createDemand",t)},getDemand:function(t){return i("get","/demandList",t)},getProject:function(t){return i("get","/project",t)},createProject:function(t){return i("post","/project",t)},updateProject:function(t){return i("put","/project",t)},deleteProject:function(t){return i("delete","/project",t)}}},"jT+1":function(t,e,n){"use strict";n.r(e);var i=n("gDS+"),o=n.n(i),r=n("FyfS"),a=n.n(r),s=n("QbLZ"),c=n.n(s),u=n("Fth2"),d=n("L2JU"),l=n("JNL0"),m={name:"createDemand",components:{MarkdownEditor:u.a},data:function(){return{postForm:{createTime:new Date(new Date((new Date).toLocaleDateString()).getTime()).getTime(),tag:[],type:"0",content:""},tagList:[]}},computed:c()({},Object(d.c)(["name","userId"])),created:function(){if(this.$route.query.change){var t=JSON.parse(localStorage.getItem("demand"));this.postForm.tag=[t.projectName,t.tag],this.postForm.content=t.markdown,this.postForm.type="1"}this.getTag()},methods:{markdown2Html:function(){var t=this;n.e("M55E").then(n.t.bind(null,"M55E",7)).then(function(e){return(new e.Converter).makeHtml(t.content)})},getTag:function(){var t=this;l.a.getProject({limit:1e3,page:1}).then(function(e){e.data.forEach(function(t){if(t.label=t.projectName,t.value=t.projectName,t.tagList.length>0){t.children=t.tagList;var e=!0,n=!1,i=void 0;try{for(var o,r=a()(t.children);!(e=(o=r.next()).done);e=!0){var s=o.value;s.label=s.tagName,s.value=s.tagName}}catch(t){n=!0,i=t}finally{try{!e&&r.return&&r.return()}finally{if(n)throw i}}}}),t.tagList=e.data})},submitForm:function(){var t=this;return this.postForm.createTime?0==this.postForm.tag.length?(this.$message.warning("请选择具体项目和版本"),!1):this.postForm.content.trim()?void this.$confirm("确定发布?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e=JSON.parse(o()(t.postForm)),n=e.content;e.content=t.$refs.markdownEditor.getHtml(),l.a.createDemand({markdown:n,author:t.name,type:e.type,createTime:e.createTime,projectName:e.tag[0],tag:e.tag[1],content:e.content,userId:t.userId}).then(function(e){t.$message({type:"success",message:"发布成功"}),t.$router.push("/project/demandList")})}).catch(function(){t.$message({type:"info",message:"已取消"})}):(this.$message.warning("内容不能为空"),!1):(this.$message.warning("请填写日期"),!1)}}},p=(n("GzWl"),n("KHd+")),h=Object(p.a)(m,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"createPost-container"},[n("div",{staticClass:"createPost-main-container"},[n("div",{staticClass:"filter-container"},[n("el-date-picker",{staticClass:"filter-item",attrs:{disabled:"",type:"date",format:"yyyy-MM-dd",placeholder:"选择日期时间"},model:{value:t.postForm.createTime,callback:function(e){t.$set(t.postForm,"createTime",e)},expression:"postForm.createTime"}}),t._v(" "),n("el-cascader",{staticClass:"filter-item",staticStyle:{width:"300px"},attrs:{placeholder:"请选择项目和版本",options:t.tagList},model:{value:t.postForm.tag,callback:function(e){t.$set(t.postForm,"tag",e)},expression:"postForm.tag"}}),t._v(" "),n("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择需求类型"},model:{value:t.postForm.type,callback:function(e){t.$set(t.postForm,"type",e)},expression:"postForm.type"}},[n("el-option",{attrs:{label:"正式需求",value:"0"}}),t._v(" "),n("el-option",{attrs:{label:"需求变更",value:"1"}}),t._v(" "),n("el-option",{attrs:{label:"临时需求",value:"2"}})],1)],1),t._v(" "),n("div",{staticClass:"editor-container"},[n("markdown-editor",{ref:"markdownEditor",attrs:{id:"contentEditor",height:"500px",language:"zh_CN"},model:{value:t.postForm.content,callback:function(e){t.$set(t.postForm,"content",e)},expression:"postForm.content"}}),t._v(" "),n("el-button",{staticStyle:{"margin-top":"10px"},attrs:{type:"primary"},on:{click:t.submitForm}},[t._v("发布")])],1)])])},[],!1,null,"36109f0f",null);h.options.__file="createDemand.vue";e.default=h.exports},ma33:function(t,e,n){}}]);