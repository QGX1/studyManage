<template>
  <div id="app"  v-if="isRouterAlive">
    <router-view name="home" />
    <router-view name="tab" />
    <router-view name="todo" />
    <router-view v-if="isRouterAlive" name="note" />
    <router-view name="mine" />
    <router-view name="login" />
    <router-view name="register" />
    <router-view name="header" />
    <router-view name="search" />
    <router-view name="mine" />
    <router-view name="more" />
    <router-view name="detail" />
    <router-view name="write" />
    <router-view name="notes" />
    <router-view name="collect" />
    <router-view name="about" />
    <router-view name="mydetail" />
    <router-view name="edit" />
    <router-view name="admin"/>
    <router-view name="adminlogin"/>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
