(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9557"],{"3xXv":function(t,e,i){},Cq7J:function(t,e,i){},EXL7:function(t,e,i){"use strict";var n=i("QbLZ"),s=i.n(n),o=i("glbJ"),a=i("L2JU"),r=i("JCNI"),c={name:"ArticleDetail",components:{Tinymce:o.a},data:function(){return{postForm:{createTime:new Date(new Date((new Date).toLocaleDateString()).getTime()).getTime(),content:""}}},computed:s()({},Object(a.b)(["name","userId","departmentId"])),methods:{submitForm:function(){var t=this;return this.postForm.createTime?this.postForm.content.trim()?void this.$confirm("确定发布?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.a.create(s()({},t.postForm,{author:t.name,userId:t.userId,departmentId:t.departmentId})).then(function(e){t.$message({type:"success",message:"发布成功"}),t.$router.push("/example/list")})}).catch(function(){t.$message({type:"info",message:"已取消"})}):(this.$message.warning("内容不能为空"),!1):(this.$message.warning("请填写日期"),!1)}}},l=(i("J8Ms"),i("KHd+")),u=Object(l.a)(c,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"createPost-container"},[i("div",{staticClass:"createPost-main-container"},[i("el-row",[i("el-col",{attrs:{span:24}},[i("div",{staticClass:"postInfo-container"},[i("el-row",[i("el-col",{attrs:{span:10}},[i("el-date-picker",{attrs:{type:"date",format:"yyyy-MM-dd",placeholder:"选择日期时间"},model:{value:t.postForm.createTime,callback:function(e){t.$set(t.postForm,"createTime",e)},expression:"postForm.createTime"}})],1)],1)],1)])],1),t._v(" "),i("div",{staticClass:"editor-container"},[i("Tinymce",{ref:"editor",attrs:{height:400},model:{value:t.postForm.content,callback:function(e){t.$set(t.postForm,"content",e)},expression:"postForm.content"}}),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.submitForm}},[t._v("发布")])],1)],1)])},[],!1,null,"7efef640",null);u.options.__file="ArticleDetail.vue";e.a=u.exports},EiMK:function(t,e,i){},J8Ms:function(t,e,i){"use strict";var n=i("Cq7J");i.n(n).a},JCNI:function(t,e,i){"use strict";i.d(e,"a",function(){return s});var n=i("HB48").a.fetch,s={create:function(t){return n("post","/articles",t)},get:function(t){return n("get","/articles",t)},getUserList:function(t){return n("post","/articles/userList",t)}}},glbJ:function(t,e,i){"use strict";var n=i("4d7F"),s=i.n(n),o=i("GQeE"),a=i.n(o),r={name:"EditorSlideUpload",props:{color:{type:String,default:"#1890ff"}},data:function(){return{dialogVisible:!1,listObj:{},fileList:[]}},methods:{checkAllSuccess:function(){var t=this;return a()(this.listObj).every(function(e){return t.listObj[e].hasSuccess})},handleSubmit:function(){var t=this,e=a()(this.listObj).map(function(e){return t.listObj[e]});this.checkAllSuccess()?(this.$emit("successCBK",e),this.listObj={},this.fileList=[],this.dialogVisible=!1):this.$message("请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！")},handleSuccess:function(t,e){for(var i=e.uid,n=a()(this.listObj),s=0,o=n.length;s<o;s++)if(this.listObj[n[s]].uid===i)return this.listObj[n[s]].url=t.files.file,void(this.listObj[n[s]].hasSuccess=!0)},handleRemove:function(t){for(var e=t.uid,i=a()(this.listObj),n=0,s=i.length;n<s;n++)if(this.listObj[i[n]].uid===e)return void delete this.listObj[i[n]]},beforeUpload:function(t){var e=this,i=window.URL||window.webkitURL,n=t.uid;return this.listObj[n]={},new s.a(function(s,o){var a=new Image;a.src=i.createObjectURL(t),a.onload=function(){e.listObj[n]={hasSuccess:!1,uid:t.uid,width:this.width,height:this.height}},s(!0)})}}},c=(i("wn0B"),i("KHd+")),l=Object(c.a)(r,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"upload-container"},[i("el-button",{style:{background:t.color,borderColor:t.color},attrs:{icon:"el-icon-upload",size:"mini",type:"primary"},on:{click:function(e){t.dialogVisible=!0}}},[t._v("上传图片\n  ")]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("el-upload",{staticClass:"editor-slide-upload",attrs:{multiple:!0,"file-list":t.fileList,"show-file-list":!0,"on-remove":t.handleRemove,"on-success":t.handleSuccess,"before-upload":t.beforeUpload,action:"https://httpbin.org/post","list-type":"picture-card"}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1),t._v(" "),i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("确 定")])],1)],1)},[],!1,null,"39480e6e",null);l.options.__file="editorImage.vue";var u=["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],d=["bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],m={name:"Tinymce",components:{editorImage:l.exports},props:{id:{type:String,default:function(){return"vue-tinymce-"+ +new Date+(1e3*Math.random()).toFixed(0)}},value:{type:String,default:""},toolbar:{type:Array,required:!1,default:function(){return[]}},menubar:{type:String,default:"file edit insert view format table"},height:{type:Number,required:!1,default:360}},data:function(){return{hasChange:!1,hasInit:!1,tinymceId:this.id,fullscreen:!1,languageTypeList:{en:"en",zh:"zh_CN"}}},computed:{language:function(){return this.languageTypeList[this.$store.getters.language]}},watch:{value:function(t){var e=this;!this.hasChange&&this.hasInit&&this.$nextTick(function(){return window.tinymce.get(e.tinymceId).setContent(t||"")})},language:function(){var t=this;this.destroyTinymce(),this.$nextTick(function(){return t.initTinymce()})}},mounted:function(){this.initTinymce()},activated:function(){this.initTinymce()},deactivated:function(){this.destroyTinymce()},destroyed:function(){this.destroyTinymce()},methods:{initTinymce:function(){var t=this,e=this;window.tinymce.init({language:this.language,selector:"#"+this.tinymceId,height:this.height,body_class:"panel-body ",object_resizing:!1,toolbar:this.toolbar.length>0?this.toolbar:d,menubar:this.menubar,plugins:u,end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["www.tinymce.com","codepen.io"],default_link_target:"_blank",link_title:!1,nonbreaking_force_tab:!0,init_instance_callback:function(i){e.value&&i.setContent(e.value),e.hasInit=!0,i.on("NodeChange Change KeyUp SetContent",function(){t.hasChange=!0,t.$emit("input",i.getContent())})},setup:function(t){t.on("FullscreenStateChanged",function(t){e.fullscreen=t.state})}})},destroyTinymce:function(){window.tinymce.get(this.tinymceId)&&window.tinymce.get(this.tinymceId).destroy()},setContent:function(t){window.tinymce.get(this.tinymceId).setContent(t)},getContent:function(){window.tinymce.get(this.tinymceId).getContent()},imageSuccessCBK:function(t){var e=this;t.forEach(function(t){window.tinymce.get(e.tinymceId).insertContent('<img class="wscnph" src="'+t.url+'" >')})}}},h=(i("lsmu"),Object(c.a)(m,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tinymce-container editor-container",class:{fullscreen:this.fullscreen}},[e("textarea",{staticClass:"tinymce-textarea",attrs:{id:this.tinymceId}}),this._v(" "),e("div",{staticClass:"editor-custom-btn-container"})])},[],!1,null,"26fa9258",null));h.options.__file="index.vue";e.a=h.exports},lsmu:function(t,e,i){"use strict";var n=i("3xXv");i.n(n).a},nOMX:function(t,e,i){"use strict";i.r(e);var n={name:"CreateForm",components:{ArticleDetail:i("EXL7").a}},s=i("KHd+"),o=Object(s.a)(n,function(){var t=this.$createElement;return(this._self._c||t)("article-detail",{attrs:{"is-edit":!1}})},[],!1,null,null,null);o.options.__file="create.vue";e.default=o.exports},wn0B:function(t,e,i){"use strict";var n=i("EiMK");i.n(n).a}}]);
//# sourceMappingURL=chunk-9557.2a19715b.js.map