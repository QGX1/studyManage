<!--By：吴玉梅 功能：关键字搜索-->

<template>
<div id="searh" style="margin-top:70px">
  <div id="header">
    
        <span @click="back()" style="float:left">◁</span>
        <span style="font-width:bold">搜索</span>
        <span @click="home()" style="float:right;">首页</span> 
  
  </div>

<div id="search">
    <input type="text" placeholder="请输入您需要查询的内容" v-model="search" class="search_item">
    <h3>———— 热门推荐 ————</h3>
<transition name="slide-fade">
    <div id="note_box" v-for="(item,index) in searchList" :key="index">
    <router-link 
    :to="{name:'notes',params:{
      id:searchList[index]}}" 
    style="font-size:18px;font-weight:bold;color:black">{{item.note_title}}</router-link>
    <div style="font-size:15px;color:#9b9b9ba4" >{{item.created_at}}</div> 
    <div style="font-size:15px;color:#00796b" >{{item.label_name}}</div>
    <p class="content" style="font-size:18px;color:#9b9b9ba4" v-html="item.note_content"></p>
    <div style="font-size:15px;color:#9b9b9ba4" >来自：{{item.username}}</div>
  </div>
</transition>
</div>

</div>
</template>

<script>

export default {
  data(){
    return{
      search: "",
      allN: [],  //存放全部笔记数据
      user_id:this.$store.state.users.userInfo.user_id
    }
  },
  methods:{
   back:function(){
    this.$router.go(-1)
	},
	 home:function(){
		this.$router.push('/home')
  },
  
  },
  computed: {
    searchList: function(){
        var searchArr = this.allN,
            search = this.search;

        if(!search){
            return searchArr;     
        }
        search = search.trim().toLowerCase();
        searchArr = searchArr.filter(function(item){
          if(item.note_title.toLowerCase().indexOf(search) != -1){
            return item;
          }
        })
        return searchArr;
    }
  },
  created(){
    this.$axios.get('/api/home/allNote',{
      params:{
        user_id:this.user_id
      },
      xsrfHeaderName: 'Authorization', // 请求头的名字自定义，用你们后台给你的就是
      headers :{
        // token中的默认头
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'hr ' + window.sessionStorage.getItem('token')
      }
    }).then((res)=> {  
    console.log(res);
    console.log("搜索结果")
    this.allN = res.data.allN;
   // this.listSearch = res.data.allN;
    }).catch(err => console.log(err));
  }
}
</script>
<style>
#footer{
  width: 100%;
  height: 100px;
}
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
.search{
  margin: 0 auto;
  border: none;
  background-color: rgb(227, 230, 233);
  color: #a5a2a2;
  padding: 5px 20%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.search_item{
  margin: 0 auto;
  border: none;
  background-color: rgb(227, 230, 233);
  color: #a5a2a2;
  padding: 5px 20%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}.search_1 :hover{
  border: #a5a2a2 1px solid
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .10s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<style scoped>
.content >>> img{
  width: 33%;
  margin: 0 auto;
  padding: 5px;
  height: 35%;
}
</style>