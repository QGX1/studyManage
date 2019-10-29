<template>
<div id="note">
  <div id="header">
    <span @click="back()" style="float:left">◁</span>
        <span style="font-width:bold">待办事项</span>
        <span @click="home()" style="float:right;">首页</span> 
  </div>
  <div id="todo_tab">
    <div id="box">
		<mu-button round color="indigo" v-on:click='fn' v-text='txt'>收起-</mu-button>  <!-- 点击的时候，改变页面中加减号 -->
		<div class="wrap" v-show='bol'>  <!-- 显示和隐藏 -->
			<form>
			<mu-col span="12" lg="4" sm="6" v>
          <mu-date-input value-format="YYYY-M-d HH:mm:ss" icon="today" v-model="created_at" value="date" label="待办日期与时间" type="dateTime" label-float full-width landscape color="#00796b" display-color="#00796b">
					</mu-date-input>
      </mu-col>
				<mu-text-field v-model="something" color="#00796b" full-width label="待办事项" label-float  icon="today"></mu-text-field><br>  
			</form>
				<mu-button name="" value="提交" color="indigo" class="input_btn" v-on:click='add()'>添加</mu-button>  
				<mu-button type="reset" name="" value="重置" class="input_btn" v-on:click='reset()'>重置 </mu-button>
		</div>
    <hr>
		<p>————我的所有待办事项————</p>
		<table>
			<thead>
				<tr>
					<th>序号</th>
					<th>日期</th>
					<th>待办事项</th>
					<th>操作</th>
				</tr>
			</thead>    
			<tbody>
				<tr v-for="(val,i) in arr" :key="val.id" >
					<td>{{ i+1 }}</td>
					<td>{{ val.created_at }}</td>
					<td>{{ val.something }}</td>
					<td><button v-on:click='remove(i)' class="del">X</button></td>
				</tr>
				<tr><td colspan='4' v-show='this.arr.length==0'>暂无事件</td></tr>  <!-- 如果是空数组 暂无事件显示 -->
				<tr><td colspan='4' v-show='this.arr.length!=0'><button class="all_del" v-on:click='removeAll'>全部删除</button></td></tr><!-- 如果数组内有数据，全部删除显示 -->  
			</tbody>
		</table>
	</div>
  </div>
	<div id="footer">

	</div>
</div>  
</template>

<script>
import axios from 'axios'
var qs = require('qs');
export default{
	data() {
      return{
			arr: [],
			bol: false,
			txt: '添加事项+',
			created_at: '',
			something: '',
			user_id:this.$store.state.users.userInfo.user_id
   		 }},
	methods: {
			fn: function(){  //点击的时候改变布尔值，通过v-text指令改变页面中'+'和'-'
				this.bol=!this.bol;
				this.txt= this.txt=='添加事项+'?'收起-':'添加事项+';
			},
			add(){  //向对应数据的数组中加入用户输入的日期和待办事项
				console.log("添加待办事项");
				console.log(this.created_at);
				console.log(this.something )
				let postData = this.$qs.stringify({
					mydata:this.created_at, 
					something:this.something ,  //数组追加用户输入的日期和待办事项
					user_id:this.$store.state.users.userInfo.user_id
				});
			// 请求路由
				this.$axios({
					method: 'post',
					url:'/api/Schedule/addSchedule',
					data:postData
				}).then((res)=>{
					console.log(res.data)
				});
			
				this.arr.push({ 
					created_at:this.created_at, 
					something:this.something 
					});  //数组追加用户输入的日期和待办事项
				this.created_at='';  //日期文本框内清零
				this.something='';  //待办事项文本框内清零
				console.log(this.created_at)
				console.log(this.something)
			},

			remove: function(i){  //点击单个删除
				//启动删除，访问后端/api/schedule/removeAllSchedule,get方法传入schedule_id
				this.$axios.get('/api/schedule/removeAllSchedule',{
						params:{ 
							schedule_id:this.schedule_id,
							user_id:this.user_id
						},	
					}).then((res)=>{
						this.arr.splice(i,1);
						console.log(res);
						swal("删除成功")
					}).catch(err => 
					console.log(err)
						);
					},
			removeAll: function(){  //点击全部删除
			// 启动全部删除，访问后端/api/schedule/removeAllSchedule，get方法传入数据schedule_id、user_id
			    this.$axios.get('/api/schedule/removeAllSchedule',{
				params:{
							user_id:this.user_id
						},
				}).then((res)=>{
				swal({
 				 title: "操作确认",
 				 text: "删除后，您将无法恢复此事项！",
 				 icon: "warning",
 				 buttons: true,
 				 dangerMode: true,
				})
				.then((willDelete) => {
 				 if (willDelete) {
					  this.arr=[]
    			swal("已被删除！", {
    		 	 icon: "success",
   			 });
 				 } else {
  		 	 swal("已取消！");
			  }
				});
				// if(isTrue){
				// 	this.arr=[]  //数组清空+
				// }
				}).catch(err=>{
					console.log(err)
				})
			},
			reset: function(){  //重置
				this.created_at='';  //日期文本框内清零
				this.something='';  //待办事项文本框内清零
			},
			 back:function(){
             this.$router.go(-1)
		 },
		     home:function(){
			this.$router.push('/home')
			 }
		},
	created() {
		this.$axios.get('/api/Schedule/checkSchedule',{
			params:{ user_id:this.user_id }
		}).then((res)=> {
			console.log("查询待办事项数据")
			console.log(res.data.checkSch);
			// this.todo = res.data.todo;
			this.arr=res.data.checkSch
		}).catch(err => console.log(err));
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
#footer{
  width: 100%;
  height: 100px;
}
	#box{
	width:100%;
	padding: 20px;
	margin: 50px auto 0;
	}
	table{
		text-align: center;
		border-collapse: collapse;
		margin: 0 auto;
		}
	p{
		line-height: 30px;
		font-size: 16px;
		}
	th,td{
		font-size: 14px;
		padding: 10px 20px;
		}
	.all_del{
		background-color: #212121;
		padding: 5px 10px;
		border: none;border: 1px #666 solid;
		color: #fff;
		font-size: 16px;
		border-radius: 10px;
		margin: 0 auto
		}
	.btn{
		font-size: 50px;
		cursor: pointer;
		display: inline;
		}
	label{
		line-height: 30px;
		font-size: 14px;
		margin-left: 5px;
		}
	.input_text{
		width: 100%;
		height: 35px;
		border-radius: 5px;
		border:1px solid #666;
		}
	.input_btn{
		padding: 5px 10px;
		border-radius: 5px;
		margin: 10px 10px;
		}
	.del{
    background-color: #6b0909;
		width: 30px;
		height:20px;
		border: none;border: 1px #666 solid;
		color: #fff;
		font-size: 10px;
		border-radius: 10px;
		}
</style>