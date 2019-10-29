<!-- by:江健霞-->
<template>
<div>
    <div id="header">
      <span @click="back()" style="float:left">◁</span>
      <span style="font-width:bold">个人信息</span>
      <span @click="home()" style="float:right">首页</span> 
  </div>
	<div v-if="flag === 1">
		<div class="usercenter">
			<div class="user-style">
				<div class="userimg-style" >
					<img :src="userInfo.avatar"/>
				</div>
				<div class="username-plus">
					<span>{{username}}</span>
				</div>
				<div class="btn-update">
					<span v-on:click="flag = 2">修改</span>
				</div>
			</div>
			<div class="mymess">
				<i class="fa fa-mars-stroke" aria-hidden="true"></i>
				&nbsp;&nbsp;性别<span>{{sex}}</span>
			</div>
            <div class="mymess">
				<i class="fa fa-envelope-o" aria-hidden="true"></i>
				&nbsp;&nbsp;签名<span>{{sign}}</span>
			</div>
			<div class="mymess">
				<i class="fa fa-envelope-o" aria-hidden="true"></i>
				&nbsp;&nbsp;邮箱<span>{{this.$store.state.users.userInfo.email}}</span>
			</div>
		</div>
	</div>
   	<div v-else-if="flag === 2" class="form">
		<div class="usercenter">
			<div class="user-style">
				<div class="userimg-style" @click.stop="uploadHeadImg">
					<img :src="userInfo.avatar"/>
                 <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
				</div>
				<div class="username-plus"><span>{{username}}</span></div>
				<div class="btn-update"><span v-on:click="flag = 1">取消</span></div>
			</div>
		</div>
		<div class="input-control" style="margin-top:80px">
      		<input type="text" name="username" v-model="username" placeholder="用户名" />
    	</div>
        <div class="input-control">
      		<input type="text" name="sign" v-model="sign" placeholder="签名" />
    	</div>
        <div>
        <span class="setleft" style="float:left;margin-left:40px;">性别:&nbsp;&nbsp;</span>
            <div class=" posirelative select-out-div">
            <select class="m-wrap  "  style="width:260px; padding: 2px;" v-model="sex">
            <option value="男">男</option>
            <option value="女">女</option>
            </select>
            <span class="select-hide-span" >
            <b class="select-show-b"  ></b></span>
            </div>
        </div>
    	<div class="button-control">
      	<input type="button" name="submit" value="提交" v-on:click="submit"  />
    </div>
</div>
	</div>
</template>

<script>
	export default {
		name: 'usercenter',
		data () {
            
			return {
				flag: 1,
				username: '',
				sex: '',
				sign: '',
        email: '',
        user_id:this.$store.state.users.userInfo.user_id,
        myImg:"",
        userInfo: {
        avatar: ''}
      
      }
		},

     created () {
    // 查看个人信息
      this.$axios.get('/api/mine/checkMine',{
        params:{ user_id:this.user_id }
      }).then((res)=> {
        this.username=res.data.user[0].user_name
        this.sex=res.data.user[0].sex
        this.sign=res.data.user[0].sign    
        
        if(res.data.user[0].avatar==null){
          this.userInfo.avatar="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1561221918&di=79d5efd1a5aec6fe5bc66f86d98a5b26&src=http://ku.90sjimg.com/element_origin_min_pic/01/31/87/96573b585a7c9c4.jpg"
        }else{
          this.userInfo.avatar="http://172.16.221.13:7001/public/img/"+res.data.user[0].avatar
        }
      }).catch(err => console.log(err));
    },

		methods: {
            // 打开图片上传
      uploadHeadImg: function () {
        this.$el.querySelector('.hiddenInput').click()
      },
      // 将头像显示
      handleFile: function (e) {
        let $target = e.target || e.srcElement
        let file = $target.files[0]
        var reader = new FileReader()
        reader.onload = (data) => {
          let res = data.target || data.srcElement
          this.userInfo.avatar = res.result
        }
        reader.readAsDataURL(file)

        // 将图片上传到后台（丘桂娴）
        this.file = event.target.files[0]; //获取input的图片file值
        let param = new FormData(); // 创建form对象
        param.append('imgFile', this.file);//对应后台接收图片名
        var user_id=this.$store.state.users.userInfo.user_id;
        param.append('user_id',user_id);

        this.$axios({
          method: 'post',
          url:'/api/moni/check',
          data:param,
				}).then((res)=>{
          this.myImg="http://172.16.221.13:7001/public/img/"+res.data.data
          // 修改个人信息返回的数据
        });
      },
    
  // 修改我的个人信息数据，江健霞写、丘桂娴改
			submit: function (){
        // 更改用户信息传递的数据
        let postData= this.$qs.stringify({
					user_name: this.username,
					sex: this.sex,
					sign: this.sign,
          user_id:this.$store.state.users.userInfo.user_id
        });
        // 请求路由
				this.$axios({
					method: 'post',
					url:'/api/mine/editInfo',
          data:postData,
				}).then((res)=>{
          if(res.data.tipes3=="修改成功"){
            swal('修改成功', '','success');
            this.flag = 1;
          }else if(res.data.tipes3=="用户名已被使用，请更换"){
            swal('用户名已被使用', '请更换用户名','error');
            this.flag = 2;
          }
				});
      },
        back:function(){
          this.$router.go(-1)
        },
		    home:function(){
          this.$router.push('/home')
        }
      }
    }
</script>

<style>
.item_bock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height:94px;
  width: 300px;
  padding:0px 24px 0px 38px;
  border-bottom: 1px solid #f7f7f7;
  background: #fff;
}
.head_p {
  height:132px;
}
.head_img{
  height: 90px;
}
.head_img img{
  width:90px;
  height:90px;
  border-radius:50px
}
.setting_right{
  display: flex;
  height: 37px;
  justify-content: flex-end;
  align-items: center;
}
.hiddenInput{
  display: none;
}
.caption {
  color: #8F8F8F;
  font-size: 26px;
  height: 37px;
}
.posirelative {
    position: relative;
}
.select-out-div {
    width: 160px;
    overflow: hidden;
}
select.m-wrap {

    background-color: #ffffff;
    background-image: none !important;
    filter: none !important;
    border: 1px solid #e5e5e5;
    outline: none;
    height: 25px !important;
    line-height: 25px;
}
.select-hide-span {
    height: 25px;
    position: absolute;
    top: 0;
    border-right: 1px solid #e5e5e5;
    right: 0;
    width: 20px!important;
    z-index: 999;
}
.select-show-b {
    border-color: #888 transparent transparent transparent;
    border-style: solid;
    border-width: 5px 4px 0 4px;
    margin-left: -4px;
    margin-top: 10px;
    position: absolute;
}
.usercenter{
	position: relative;
	top:60px;
	width: 100%;
}

.usercenter a{
	text-decoration: none;
	color: #2c3e50;
}

.user-style{
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	width: 90%;
	align-items: center;
	padding: 10px 5%;
	/* box-shadow: 10px 0 10px #ccc; */
	cursor: pointer;
    margin-left: 20px;
}

.userimg-style{
	width:30%;
}

.userimg-style img{
	width:70px;
	height: 70px;
	border-radius: 50%;
}

.username-plus{
	width:60%;
}

.btn-update{
	width: 50px;
}

.btn-update span{
	width: 100%;
	display: block;
	background-color: rgba(240, 245, 242, 0.699);
	padding: 5px;
	border-radius: 5px;
	text-align: center;
	color: #212121;
  border: rgb(107, 107, 107);
}

.mymess{
	width: 100%;
	margin-top:30px;
	padding: 10px 5%;
	text-align: left;
	cursor: pointer;
  font-size: 17px;
  
}
 
.mymess img{
	width: 50px;
	height: 50px;
	border-radius: 50%;
}

.mymess span{
	margin-left:30%;
}

.mymess i{
	font-size: 1.2rem;
}

.input-control{
  margin: 10px auto;
  width: 90%;
  height: 50px;
}

.input-control input{
  width: 90%;
  padding: 5px;
  outline:none;
  border:2px #f4f4f4 solid;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
   height: 45px;
   border-radius: 5px;
   background-color: transparent;
} 

.input-control input:focus{
  border-bottom:2px rgb(101, 104, 102) solid;
  border-radius: 5px;
}

input:-webkit-autofill{
  -webkit-box-shadow : 0 0 0px 1000px white inset ;
}

.button-control{
  margin:40px;
  width: 80%;
  height: 50px;
}

.button-control input{
  height: 30px;
  width: 100%;
  outline:none;
  border:0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   color: #212121;
   background-color: rgba(201, 201, 201, 0.801);
   border-radius: 5px;
   height: 40px;
}
.mu-transition-row {
  margin-top: 16px;
  min-height: 100px;
}
.mu-transition-box {
  min-width: 200px;
  height: 100px;
  margin-right: 16px;
  border-radius: 4px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

