<!--By：吴玉梅 功能:查看图书详情-->
<template>
    <div id="detail">
    <div id="header">
    <span @click="back" style="float:left">◁</span>
        <span style="font-width:bold">详情页</span>
        <span @click="home" style="float:right;">首页</span> 
  </div>

    <div id="book_detail" style="margin-top:40px;padding:20px;">
    <table width="100%" height="100" border="0.5" class="table">
  <tr>
    <td width="25%" rowspan="4"><div align="left"><img :src="img" width="100%" height="100px"></div></td>
    <td width="63%" height="36">
        <div align="left" style="font-weight:bold;font-size:20px">
        {{title}}
    </div></td>
  </tr>
  <tr>
    <td><div align="left">本书标签：{{tags}}</div></td>
  </tr>
  <tr>
    <td height="23"><div align="left">已有【{{reading}}】过这本书</div></td>
  </tr>
 
</table>

<h1>长篇书评</h1>
<br>
<br>
<div class="sub2" v-html="sub2">
    
</div>
    </div>
    </div>
</template>
<script>
import home from "./home.vue";
import more from "./more.vue";

export default {

    data(){
        return{
            
                title:this.$route.params.id.title,
                tags:this.$route.params.id.tags,
                sub2:this.$route.params.id.sub2,
                reading:this.$route.params.id.reading,
                img:this.$route.params.id.img,
                user_id:this.$store.state.users.userInfo.user_id
            
            
        }
    },
   created(){
        this.id = this.$route.params.id;  //获取id
        this.$store.dispatch('getUser',{
        id:this.id,
        user_id:this.user_id, 
        props:{
                "id":String
            }
      }).then((res)=>{
       
      console.log("取完图书详情页数据");
})
    },
   mounted() {
      
   },
    methods:{
        back:function(){
            this.$router.go(-1)
        },
        home:function(){
            this.$router.push('/home')
        },
    },
}
</script>

<style>
.table{
    border-radius:20px;
    background-color: rgba(219, 219, 212, 0.356);
    padding: 30px;
}
.sub2{
    border: 2px dotted #888484;
    padding: 10px;
    margin: 5px;
    line-height:30px;
    font-size:16px;
    letter-spacing:2px; 
    border-radius: 10px;
}
h1{
    float:left;
    padding:10px;
    color: rgba(228, 113, 46, 0.658);
}
</style>
