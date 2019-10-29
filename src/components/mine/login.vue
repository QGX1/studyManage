<template>
  <div>
     <div id="header">
      登录
    </div>
    
    <mu-container>
    <Item :type="'login'"/>
    </mu-container>
  </div>
</template>

<script>
import Item from './item'
export default{
  data () {
    return {
    }
  },
  components: {
    Item
  },
  methods: {
    
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header{
 position: fixed;
  top: 0;
  width: 100%;
  text-align:center; 
  font-size:20px;
  height: 45px;
  line-height: 30px;
  padding: 10px;
  background-color: rgba(253, 253, 253, 0.808);
}
</style>