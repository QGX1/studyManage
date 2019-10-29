<!-- by:江健霞-->
<template>
<div>
   <div id="header">
        <span @click="back()" style="float:left">◁</span>
        <span style="font-width:bold">我的收藏</span>
        <span @click="home()" style="float:right">首页</span> 
  </div>
   <div id="mynote" style="margin-top:80px" data-mu-loading-color="white" data-mu-loading-overlay-color="white" v-loading="loading2" class="demo-loading-wrap">
       <div v-show='this.notes.length==0' style="margin-top:35%">
      <img :src="require('../../assets/collect.png')">
      <h3>暂无收藏</h3>
      </div>
<div id="note_box" v-for="(note,index) in notes" :key="index" class="book_table">
    <router-link 
    :to="{name:'notes',params:{id:notes[index]}}" 
    style="font-size:18px;font-weight:bold;color:black">
    {{note.note_title}}
    </router-link>
    
    <p class="content" style="font-size:20px;color:#9b9b9ba4" v-html="note.note_content"></p>
    <div style="font-size:17px;color:#9b9b9ba4">
        {{note.created_at | dateFmt('YYYY-MM-DD HH:mm:ss')}}
        <mu-button flat color="indigo400" @click="remove(index)" style="float:right;">
      <mu-icon left value="grade"></mu-icon>
      取消收藏
    </mu-button>
    </div> 


</div> 
   </div>
   </div>  
</template>


<script>
export default {
    data(){
        return{
            loading2: false,
            notes:[],
            txt:'取消收藏',
            user_id:this.$store.state.users.userInfo.user_id
        }
    },
    methods: {
            remove: function(index){ //点击单个删除
                console.log(index+1)
              this.$axios.get('/api/collect/removeCollect',{
                    params:{
                        user_id:this.user_id,
                        collect_id:index+1
                    }
                }).then((res)=>{ 
                    this.notes.splice(index,1);       
                       console.log(res);
                       
                }).catch(err => 
					console.log(err)
				);
            },
            back:function(){
             this.$router.go(-1)
		    },
		     home:function(){
			this.$router.push('/home')
			}
},
created(){
    //loading
    this.loading2 = true;
      setTimeout(() => {
        this.loading2 = false;
      }, 1500)
    this.$axios.get('/api/collect/checkCollect',{
        params:{
            user_id:this.user_id
        }
    }).then((res)=>{
        console.log(res);
       this.notes = res.data.checkCo;
    })
}
}
</script>
<style>
#header{
  position: fixed;
  top: 0;
  width: 100%;
}
.book_table{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
 
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