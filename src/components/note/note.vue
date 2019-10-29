<!--By：吴玉梅 功能:查看笔记，删除笔记，添加笔记-->

<template>
<div id="note">

  <div id="header">
    <span style="font-width:bold">我的笔记</span>
  </div>
 
  <div id="mynote" data-mu-loading-color="white" data-mu-loading-overlay-color="white" v-loading="loading2" class="demo-loading-wrap" style="margin-top:50px;height: 550px;" >
    <pull-to :top-load-method="refresh">
      <div v-show='this.notes_list.length==0' style="margin-top:35%">
      <img :src="require('../../assets/error.png')">
      <h3>暂无笔记</h3>
      </div>
  <div id="note_box" v-for="(note,index) in notes_list" :key="index" >
    <router-link 
    :to="{name:'notes',params:{
      id:notes_list[index],
      }}" 
    style="font-size:19px;color:#212121">{{note.note_title}}</router-link>
    <p class="content" style="font-size:18px;color:#9b9b9ba4" v-html="note.note_content"></p>
    <div style="font-size:15px;color:#9b9b9ba4" >{{note.created_at | dateFmt('YYYY-MM-DD HH:mm:ss')}}
    <mu-button flat @click="remove(index)" style="left:40%" color="#757575">
      <mu-icon right value="delete" ></mu-icon>
    </mu-button>  
    </div> 
  </div>
  </pull-to>

  <div id="send">
      <img src="../../assets/add.png" class="send" width="35px" height="35px" @click="send">
    <mu-bottom-sheet :open.sync="open">
    <table @item-click="closeBottomSheet">
      <tr>
        <td>
      <img src="../../assets/write.png"  width="60px" height="60px" style="border-radius:50%" @click="write">
        </td>
        <td>
      <img src="../../assets/todo.png" width="60px" height="60px" style="border-radius:50%" @click="todo">
        </td>
      </tr>
      <tr>
        <td>写笔记</td>
        <td>待办事项</td>
      </tr>
    </table>
  </mu-bottom-sheet>
  
  </div>

  	<div id="footer">
	</div>
  </div>
</div>  
</template>

<script>
import { clearInterval } from 'timers';
import router from '../../router';
import PullTo from 'vue-pull-to';
export default{
   components: {
      PullTo
  },
  inject:['reload'],
  data(){
    return{
      loading2: false,
      open: false,
      user_id:this.$store.state.users.userInfo.user_id,
      notes_list:[],
    }
  },
  methods:{
    //下拉刷新
    refresh(loaded) {
        setTimeout(() => {
          this.notes_list.reverse();
          this.reload();
          loaded('done');
        }, 1000);
      },
    todo:function(){this.$router.push('/todo')},
    write:function(){this.$router.push('/write')},
    closeBottomSheet () {
      this.open = false;
    },
    send () {
      this.open = true;
    },
    remove: function(index){ //点击单个删除
                console.log(index)
                //var index=index;
              this.$axios.get('/api/note/removeNote',{
                    params:{
                        user_id:this.user_id,
                        note_id:index
                    }
                }).then((res)=>{ 
                    this.notes_list.splice(index,1);       
                       console.log(res);
                       
                }).catch(err => 
					console.log(err)
				);
            },
  },
  created() {
    //loading
    this.loading2 = true;
      setTimeout(() => {
        this.loading2 = false;
      }, 1500)
// 我的笔记页面，查看我的笔记
    this.$axios.get('/api/note/checkNote',{
      params:{
        user_id:this.user_id
      }
    }).then((res)=> {
      console.log(res.data.checkN);
      console.log("查看我的笔记")
      this.notes_list = res.data.checkN;
      console.log("OK!!!!!")
    }).catch(err => console.log(err));
  }
}
  
    
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.todo{
  margin: 0 auto;
  background-color: rgb(245, 243, 240);
  color: #00796b;
  height: 60px;
  padding: 5px 40%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  border: 1px solid ;
  margin-top: 65px;
}
#note_box{
  
  width: 95%;
  margin: 0 auto;
  padding: 10px;
  text-align: left
}
.send{ 
    display: block;
    margin: 0; 
    position: fixed;
    right: 4%;
    top:85%;
}
.demo-loadmore-wrap {
  width: 100%;
  max-width: 360px;
  height: 420px;
  display: flex;
  flex-direction: column;
}
.mu-appbar {
    width: 100%;
  }
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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
<style lang="less">
.demo-loading-wrap {
  height: 300px;
  position: relative;
  .mu-button {
    margin: 6px 8px;
  }
}
</style>