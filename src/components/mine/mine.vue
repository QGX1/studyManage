<!--by :江健霞-->
<template>
  <div id="header">
    <div id="header">
        <span style="font-width:bold">我的</span>
  </div> 
  
  <div>
  <table style="text-align:left;width:100%;margin-top:30px;">
   <tr>
     <td>
          <img :src="userInfo.avatar" @click="head()" width="70px" height="70px" />
      </td>
      <td>
        <p> 用户名: {{username}}</p>
        <p>个性签名：{{sign}}</p>
      </td>
      <td>
        <img src="../../assets/右.png" class="send" width="35px" height="35px" style="float:right" @click="head()">
      </td>
   </tr>
 </table>
  </div>

    <div>
     <table style="margin-top:30px;width:100%;text-align:left;">
       <tr @click="gocollect()">
         <td style="font-size:20px;">
           <img src="../../assets/收藏.png" width="25px" height="25px" style="float:left">
           我的收藏
           <img src="../../assets/右.png" class="send" width="20px" height="20px" style="float:right" @click="gocollect()">
         </td>
       </tr>
       <tr>
         <td>
         
         </td>
       </tr>
       <tr @click="goabout()">
         <td style="font-size:20px">
           <img src="../../assets/about.png" width="25px" height="25px" style="float:left">
           关于我们
           <img src="../../assets/右.png" class="send" width="20px" height="20px" style="float:right" @click="goabout()">
         </td>
       </tr>
       <tr>
         <td>
         
         </td>
       </tr>
       <tr @click="logOut ()">
         <td style="font-size:20px">
           <img src="../../assets/退出.png" width="25px" height="25px" style="float:left">
           退出登录
           <img src="../../assets/右.png" class="send" width="20px" height="20px" style="float:right" @click="logOut()">
         </td>
       </tr>
     </table>
    </div>
    
</div>
</template>


<script>
import { TOKEN } from '../../store/types';

export default{
   
  data () {
    return {
      username:"",
      sign:"",
      src:'',
      email:"",
      userInfo: {
        avatar: ''
      },
      user_id:this.$store.state.users.userInfo.user_id
    }
  },
  created () {
    // 请求路由，访问数据个人信息
		this.$axios.get('/api/mine/checkMine',{
			params:{ user_id:this.user_id }
		}).then((res)=> {
      this.username=res.data.user[0].user_name
      this.sign=res.data.user[0].sign

      if(res.data.user[0].avatar==null){
        this.userInfo.avatar="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1561221918&di=79d5efd1a5aec6fe5bc66f86d98a5b26&src=http://ku.90sjimg.com/element_origin_min_pic/01/31/87/96573b585a7c9c4.jpg"
      }
      else{
        this.userInfo.avatar="http://172.16.221.13:7001/public/img/"+res.data.user[0].avatar
      }
		}).catch(err => console.log(err));
  },
  methods: {
    getUserInfo () {
      this.$store.dispatch('getUser')
    },  
    logOut () {
      this.$store.dispatch('logOut')
     this.$router.push('/login');
    },
    gocollect(){
     this.$router.push('/collect');
    },
    goabout(){
      this.$router.push('/about');
    },
    head(){
      this.$router.push('/edit');
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import 'https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
#header{
  position: fixed;
  top: 0;
  width: 100%;
}

</style>