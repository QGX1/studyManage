<template>
    <div id="more" style="margin-top:50px">
      <div id="header">
          <span @click="back()" style="float:left">◁</span>
              <span style="font-width:bold">更多内容</span>
              <span @click="home()" style="float:right;">首页</span> 
        </div>
      <div>
      <table width="100%" height="96" border="0.5" v-for="(book,index) in lists" :key="index" class="lists">
        <tr>
          <td width="25%" rowspan="4"><div align="left"><img :src="book.img" width="100%" height="100px"></div></td>
          <td width="63%" height="36"><div align="left">
            <div>
              <router-link 
          :to="{name:'detail',params:{id:lists[index]}}" 
          style="font-size:18px;font-weight:bold;color:#212121" >{{book.title}}</router-link>
            </div>
          </div></td>
        </tr>
        <tr>
          <td><div align="left">本书标签：{{book.tags}}</div></td>
        </tr>
        <tr>
          <td height="23"><div align="left">简介:{{book.sub1}}</div></td>
        </tr>
        <tr>
          <td height="23"></td>
        </tr>
      </table>
      </div>

  </div>
</template>
<script>
export default {
    data() {
        return {
           lists:[],
           user_id:this.$store.state.users.userInfo.user_id
        }
    },
    mounted(){
    this.getData();
  },
    methods:{
     getData:function(){
      this.$store.dispatch('getUser',{
        user_id:this.user_id,
       
      }).then((res)=>{
        console.log(res.data.lists)
       this.lists=res.data.lists;
      console.log("取完图书数据");
})
  },
  back:function(){
      this.$router.go(-1)
		},
	home:function(){
			this.$router.push('/home')
    },
  detail:function(lists){
    this.$router.push({path:'/detail',query: {id:lists[index]}})
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
.clect{
  margin: 0 auto;
  background-color:#00796b ; 
  border: none;
  color: #ebe8e8;
  padding: 2px 7px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border:#00796b 1px solid ;
}
/* #footer{
  width: 100%;
  height: 100px;
} */
.lists{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  margin-top: 20px;
}.lists:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>
