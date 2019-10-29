<template>
<div style="margin-top:50px">
<div id ="search" style="width:100%">
<button class="search_1" @click="search()">搜索</button>
</div>

<!--图书资讯-->
<div style="font-size:18px;color:#21212;padding:5px;margin-top:15px;" align="left">📖今日图书推介</div>

<div id="books_msg">
<table width="100%" height="96" border="0.5" v-for="(book,index) in lists.slice(0,1)" :key="index" class="book_table">
  <template>
  <tr>
    <td width="25%" rowspan="4"><div align="left"><img :src="book.img" width="100%" height="100px"></div></td>
    <td width="63%" height="36"><div align="left">
      <div>
         <router-link :to="{name:'detail',params:{id:lists[index]}}" 
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
    <td height="23"><router-link to="/more" style="color:#00796b;font-size:15px;float:right">查看更多▶</router-link></td>
  </tr>
  </template>
</table>
</div>
<hr>

<!--用户笔记-->
<div style="font-size:18px;color:#21212;padding:5px" align="left">📝笔记社区</div>
<div id="mynote">
 
  <div id="note_box" v-for="(note,i) in notes" :key="i" class="book_table">
    <router-link 
    :to="{name:'notes',params:{
      id:notes[i],
      }}" 
    style="font-size:18px;font-weight:bold;color:black">{{note.note_title}}</router-link>
    <div style="font-size:15px;color:#9b9b9ba4" >{{note.created_at | dateFmt('YYYY-MM-DD HH:mm:ss')}}</div> 
    <div style="font-size:15px;color:#00796b" >{{note.label.label_name}}</div>
    <p class="content" style="font-size:18px;color:#9b9b9ba4" v-html="note.note_content"></p>
    <div style="font-size:15px;color:#00796b" >来自：{{username}}
      <div  
      style="float:right"
      class="star" v-bind:class="note.isCollect ? 'star':'star2'"
       @click.stop="collect(i)">
       </div>
    </div>
  </div>
  
<div id="footer">
 
</div>
</div>

</div>
</template>

<script>
import { data } from 'mm';

export default {
  data() {
    return{
      user_id:this.$store.state.users.userInfo.user_id,
      email:this.$store.state.users.userInfo.email,
      lists:[],  
      notes:[],
      username:"",
    }
  },
  mounted(){
    console.log("查看home数据")
    //console.log(this);
    this.fench()
  },
  created() {
    this.$axios.get('/api/mine/checkMine',{
			params:{ user_id:this.user_id }
		}).then((res)=> {
      this.username=res.data.user[0].user_name
    }),

    //获取用户笔记数据
    this.$axios.get('/api/home/allNote',{
      params:{ 
        user_id:this.user_id
      },
      xsrfHeaderName: 'Authorization', // 请求头的名字自定义，用你们后台给你的就是
      headers :{
        // token中的默认头
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'hr ' + window.sessionStorage.getItem('token')
      },
    }).then((res)=> {  
    console.log(res);
    this.notes = res.data.allN;
    }).catch(err => console.log(err));

  },

  methods:{
    fench:function(){
      this.$store.dispatch('getUser',{
        user_id:this.user_id,
        email:this.email
      }).then((res)=>{
        console.log("首页的图书数据");
        console.log(res.data.lists);
        this.lists=res.data.lists;
        console.log("取完图书数据");
})
    },
    //收藏功能
    collect:function(i){
      let coll = !this.notes[i].isCollect;
      //当点击按钮变化时
      if(this.$set(this.notes[i],'isCollect',coll)){
        console.log('收藏的数据'+this.notes[i])
      //传数据到数据库的收藏表
      let postData = this.$qs.stringify({
        note_content:this.notes[i].note_content,
        note_title:this.notes[i].note_title,
        user_id:this.user_id,
				});
			// 请求路由
				this.$axios({
					method: 'post',
					url:'/api/collect/addCollect',
					data:postData
				}).then((res)=>{
					console.log(res.data)
				});
      }
    },
    detail:function(item){
      this.$emit('sele')
    },
    //搜索跳转
    search: function() {
      this.$router.push('/search')
    },
},
}
</script>

<style>
.star,
.star.small {
    border-color: #f7f306 transparent transparent transparent;
    border-style: solid;
    border-top-width: 9.375px;
    border-right-width: 15px;
    border-left-width: 15px;
    height: 0;
    margin-top: 9.375px;
    margin-bottom: 6.02679px;
    position: relative;
    width: 0;
}
.star:before,
.star.small:before,
.star:after,
.star.small:after {
    border-color: #f7f306 transparent transparent transparent;
    border-style: solid;
    border-top-width: 9.375px;
    border-right-width: 15px;
    border-left-width: 15px;
    content: '';
    display: block;
    height: 0;
    left: -15px;
    position: absolute;
    top: -9.375px;
    width: 0;
}
.star:before,
.star.small:before {
    transform: rotate(70deg);
}
.star:after,
.star.small:after {
    transform: rotate(-70deg);
}
.star2,
.star2.small {
    border-color: #a5a2a2 transparent transparent transparent;
    border-style: solid;
    border-top-width: 9.375px;
    border-right-width: 15px;
    border-left-width: 15px;
    height: 0;
    margin-top: 9.375px;
    margin-bottom: 6.02679px;
    position: relative;
    width: 0;
}
.star2:before,
.star2.small:before,
.star2:after,
.star2.small:after {
    border-color: #a5a2a2 transparent transparent transparent;
    border-style: solid;
    border-top-width: 9.375px;
    border-right-width: 15px;
    border-left-width: 15px;
    content: '';
    display: block;
    height: 0;
    left: -15px;
    position: absolute;
    top: -9.375px;
    width: 0;
}
.star2:before,
.star2.small:before {
    transform: rotate(70deg);
}
.star2:after,
.star2.small:after {
    transform: rotate(-70deg);
}
.search_1{
  margin: 0 auto;
  border: none;
  background-color: rgb(227, 230, 233);
  color: #a5a2a2;
  padding: 5px 40%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  }
.collect{
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
#footer{
  width: 100%;
  height: 100px;
}
#note_box{
  border-bottom: 1px rgba(165, 171, 177, 0.568) solid;
  width: 95%;
  margin: 0 auto;
  padding:10px;
  text-align: left
}
.book_table{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  margin-top: 20px;
  padding: 10px;
}.book_table:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
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





