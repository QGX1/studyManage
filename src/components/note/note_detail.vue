<template>
<div>
    <div id="header">
    <span @click="back" style="float:left">◁</span>
        <span style="font-width:bold">笔记详情页</span>
        <span @click="home" style="float:right;">首页</span> 
  </div>

    <div class="detail_content">
        <h2>{{this.$route.params.id.note_title}}</h2>  
         <h5 style="font-size:12px">创作于[{{this.$route.params.id.created_at | dateFmt('YYYY-MM-DD HH:mm:ss')}}]</h5>
        <div v-html="this.$route.params.id.note_content" class="content_1"></div>
        <hr>
        
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            user_id:this.$store.state.users.userInfo.user_id
        }
    },
    methods:{
        back:function(){
             this.$router.go(-1)
		 },
		     home:function(){
			this.$router.push('/home')
			 }
    },
}
</script>
<style>
.detail_content{
margin-top:30px; 
padding: 10px;
}
.content_1{
    padding: 10px;
    margin: 5px;
    line-height:30px;
    font-size:16px;
    letter-spacing:2px; 
    border-radius: 10px;
}
</style>

<style scoped>
.content_1 >>> img{
   width: 100%;
   margin: 0 auto;
   padding: 5px;
   height: 35%;
}
</style>