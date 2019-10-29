<template>
  <div>
      <div id="header">
        <span @click="back()" style="float:left">◁</span>
        <span style="font-width:bold">写笔记</span>
        <span @click="send()" style="float:right">发布</span> 
  </div>
   
   <div id="editor">
<div class="tips-list">
      <span style="font-size:15px;">为你的笔记选择分类标签（只能选一个标签）：</span>
      <div>
       <span class="tags" v-for="item in subjects" :key="item.id" :class="{select: item.selected}" @click="changeCss(item)">{{ item.tagName}}
       </span>
       <img src="../../assets/add.png" class="add_tags" width="25px" height="25px" @click="add_tags()">
      </div>
    </div>
     <br> 
<div>
      <mu-radio style="margin-left: 16px" v-model="permission" value=1 label="公开" color="#212121"></mu-radio>
    <mu-radio style="margin-left: 16px" v-model="permission" value=0 label="私密" color="#212121"></mu-radio>
    </div>

      <div id="write">
        <br>
      <mu-text-field v-model="title" color="#212121" full-width  placeholder="点击输入标题"></mu-text-field>
      <vue-editor 
      v-model="content"  
      :editorToolbar="customToolbar" 
      useCustomImageHandler
      @imageAdded="handleImageAdded"
       style="height:390px;border:none;width:100%"></vue-editor>
      <div style="font-size:15px;color:#9b9b9ba4">当前系统时间：{{ date | formaDate }}</div> 
      </div>

   </div>

  </div>
</template>
 

<script>  
import { VueEditor } from 'vue2-editor'
import { MessageBox } from 'mint-ui';
//创建一个函数来增加月日时小于10在前面加0
   var padaDate = function(value){
      return value<10 ? '0'+value : value;
   };export default {
 
   components: {
      VueEditor
   },
 
   data() {
       return {
         title:"",
         permission:"",
         date:new Date(),
         content: ''  ,
         user_id:this.$store.state.users.userInfo.user_id,
         noteImg:"",
         customToolbar:[
                    ['bold'],[{'color':[]}],
                    [{'align':''},{'align':'center'},{'align':'right'}],
                    [{ 'list': 'ordered'}],
                    ['image','link'],
                    ['strike'],
                    ],
          
          subjects:[
              {tagName:"默认标签",selected: false},
          ],
          selectedItem:[{tagName:""}],
          
       }
     },
       filters:{
           //设置一个函数来进行过滤
           formaDate:function(value){
               //创建一个时间日期对象
               var date = new Date();
               var year = date.getFullYear();      //存储年
               var month = padaDate(date.getMonth()+1);    //存储月份
               var day = padaDate(date.getDate());         //存储日期
               var hours = padaDate(date.getHours());      //存储时
               var minutes = padaDate(date.getMinutes());  //存储分
               var seconds = padaDate(date.getSeconds());  //存储秒
               //返回格式化后的日期
               return year+'年'+month+'月'+day+'日'+hours+'时'+minutes+'分'+seconds+'秒';
           }
       },
     methods:{
       //上传图片到服务器
       handleImageAdded(file,Editor,cursorLocation,resetUploader){
         let formdata = new FormData();
         formdata.append('image',file);
         console.log(formdata);
         console.log("文件");
         console.log(file);
        //  this.$axios.post('/'+'images',formdata).then(function(res){
        //    let url = res.data.data;
        //    console.log(res);

        this.$axios({
					method: 'post',
					url:'/api/moni/uploadImg',
          data:formdata,       
				}).then((res)=>{
          console.log(res)
          this.noteImg="http://127.0.0.1:7001/public/note/"+res.data.data
          console.log(this.noteImg);
          console.log("上传笔记图片成功")
          // 修改个人信息返回的数据

           //上传图片操作
          //把获取到的图片url插入到鼠标所在位置，回显图片
          //插入路径
          Editor.insertEmbed(cursorLocation,'image',this.noteImg);
         },function(res){
           console.log(res)
         })
          
       },
       changeCss(item) {
      if (!item.selected && this.selectedItem.length < 2) {  //选中状态时点击
        item.selected = true    //变为不选中状态
        this.selectedItem.push(item.tagName)   //更新数组（不选中项）
      } else if (item.selected) {   //不选中状态时点击
        item.selected = false   //变为选中状态
        const i = this.selectedItem.indexOf(item.tagName)  //找到当前点击项
        this.selectedItem.splice(i, 1)   //移除一个不选中项
      }
    },
       
         back:function(){
             this.$router.go(-1)
         },

         send:function(){
           console.log("标题："+this.title);
           console.log("权限："+this.permission);
           console.log("标签："+this.selectedItem);
           console.log(this.selectedItem[1])
           console.log("时间："+this.date);
           console.log("内容："+this.content);

           let postData = this.$qs.stringify({
              title:this.title,  //标题
              content:this.content,  //内容
              //  date:this.date,  //时间
              user_id:this.user_id,
              selectedItem:this.selectedItem[1],  //标签
              permission:this.permission     //权限
            }); 
             this.$axios({
               method:"post",
               url:'/api/note/addNote',  //存到后台数据库
                data: postData
             }).then(function(data){
                 console.log("ok");
             })
             this.$router.push('/note')
         },
         add_tags:function(){
           MessageBox.prompt('请输入标签').then((tagName,action)=>{
             if(tagName!=null && tagName!=""){
               this.subjects.push({
                 tagName:tagName
               })
             }
             console.log("添加的标签："+tagName);
           })
         },

     },
     
    mounted() {
        //创建定时器更新时间
           var _this = this;
           this.timeId= setInterval(function(){
               _this.date = new Date();
           },1000);
    },
     beforeDestroy:function(){
           //实例销毁前清出定时器
           if(this.timeId){
               clearInterval(this.timeId);
           }
       }
  }
  
</script>

<style>
#header{
  position: fixed;
  top: 0;
  width: 100%;
  text-align:center; 
  font-size:20px;
  height: 45px;
  line-height: 30px;
  padding: 10px;
  background-color: rgb(253, 253, 253);
}
#editor{
    margin-top: 50px;
    padding: 5px;
}
.title{
    font-size: 20px;
    color: #a7a7a7c7;
    margin-top:5px; 
    height: 40px;
    width: 100%;
    border-bottom: 1px #212121 solid;
    border-radius: 5px;
    outline: none;
}
#title{
    padding: 10px;
}
.btn{
  margin: 0 auto;
  background-color:#00796b ; 
  border: none;
  color: #ebe8e8;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border:#00796b 1px solid ;
  border-radius: 7px;
}
#footer{
  width: 100%;
  height: 100px;
}
.select{
  width: 30px;
  height: 15px;
  background-color: rgba(12, 150, 106, 0.603);
  color:azure;
  font-size: 18px;
  border-radius:10px; 
  padding: 5px;
}
.tags{
  width: 30px;
  height: 15px;
  border:1px solid rgb(104, 109, 109);
  color:rgb(95, 95, 95);
  font-size: 16px;
  border-radius:10px; 
  padding: 3px;
  margin: 3px;
}
.add_tags{
  padding: 3px;
  margin: 3px;
}
</style>
