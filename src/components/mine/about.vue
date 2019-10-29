<template>
<div>
  <div id="header">
      <span @click="back()" style="float:left">◁</span>
      <span style="font-width:bold">关于我们</span>
      <span @click="home()" style="float:right">首页</span> 
  </div>
    <mu-container style="width:70%;margin-top:200px;line-height:50px;">
      <h5>关于我们
      <p>
        学习管理系统，一个可以记笔记分享笔记的大学生必备app,为学生提供更高效更便捷的学习方式。
      </p>
      </h5>
      </mu-container>
</div>
</template>
<script>
export default {
  methods:{
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
#header{
}
</style>
