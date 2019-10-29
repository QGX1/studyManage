<template>
  <div id="item">
    <div style="margin-top:100px;">
      <img src="../../assets/头像3.png" width="100px" height="100px"><br>
      <mu-text-field v-model="username" label="请输入用户名" label-float help-text="用户名不超10字符" :max-length="10" color="#212121">
      </mu-text-field><br/>
      <mu-text-field v-model="password" label="请输入密码" type='password' label-float help-text="请输入密码" color="#212121">
      </mu-text-field><br/>
      <mu-text-field v-model="repassword" v-if="type === 'register'" type='password' label="请确认密码" label-float help-text="请确认密码" color="#212121">
      </mu-text-field><br/>
      <mu-text-field v-model="email" v-if="type === 'register'" label="请输入邮箱" label-float help-text="请输入邮箱" color="#212121">
      </mu-text-field><br/>
      <mu-button v-if="type === 'register'" @click="signup()">注册
      </mu-button>
      <mu-button v-else @click="login()">登录</mu-button>
      <p>
        <mu-button flat class="demo-button" @click="prompt()">忘记密码</mu-button>
      </p>
      <mu-button flat router-link to="/login" v-if="type === 'register'" tag="p">已有账号，去登录</mu-button>
      <mu-button flat router-link to="/register" v-else tag="p">没有账号？去注册</mu-button>
    </div>
  </div>
</template>


<script>
import MuseUI from 'muse-ui';
import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        username: '',
        password: '',
        repassword: '',
        email: "",
        sayhub_token: '',
      }
    },
    props: {
      type: {
        type: String
      }
    },
    methods: {
      // 注册（江建霞写，丘桂娴改）
      signup() {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if (this.username && this.password && this.email === '') {
          swal("请填写完整")
        } else if (this.password !== this.repassword) {
          swal("密码不一致，请重新填写")
        }else if(!reg.test(this.email)){
          swal("邮箱格式错误，请重新填写")
        } else {
          // 路由请求注册，传递数据
          this.$store.dispatch('toRegister', { // dispatch toLogin action
            registerUser: this.username,
            registerPassword: this.password,
            registerEmail: this.email
          }).then((res) => {
            console.log(res)
            if(res.data.tips1){
               swal("邮箱已存在，请登录")
            }else if(res.data.tips2){
              swal("用户名已存在，请更换用户名")
            }else{
              let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/login')
              // 注册成功跳转到登录页面
               swal("注册成功")
              this.$router.push({
                path: redirectUrl
              })
            }
      
          }).catch((error) => {
            console.log(error.response.data.message)
          })
        }
      },
 // 登陆
    login() {
      if (this.username === "") {
        swal("用户名不能为空");
      } else if (this.password === "") {
        swal("密码不能为空");
      } else {
        this.$store
          .dispatch("toLogin", {
            // dispatch toLogin action
            loginUser: this.username,
            loginPassword: this.password
          })
          .then(res => {
            if (res.data.code == 0) {
              swal(res.data.err);
              this.username = "";
              this.password = "";
            }

            if (res.data.user[0].role_id !== 3) {
              //登录者身份判断，非普通用户不能登陆手机端页面（黄昌壹）
              let redirectUrl = decodeURIComponent(
                this.$route.query.redirect || "/"
              );
              // 跳转到指定的路由
              this.$router.push({
                path: redirectUrl
              });
              swal("该用户没有登录权限");
              this.username = "";
              this.password = "";
              throw new error(11);
            }
            this.$store
              .dispatch("getUser", {
                lists: res.data.lists,
                user_id: res.data.user_id,
                email: res.data.email
                // dispatch getUserInfo action
              })
              .then(res => {
                let redirectUrl = decodeURIComponent(
                  this.$route.query.redirect || "/home"
                );
                // 跳转到指定的路由
                this.$router.push({
                  path: redirectUrl
                });
              }); // dispatch getUserInfo action
          })
          .catch(error => {
            // console.log(error.response.data.message);
          });
      }
    },
    //邮箱判断(江健霞写 丘桂娴修改)
    prompt() {
       MessageBox.prompt('请输入邮箱' ,  {
          confirmButtonText: '确定',
          cancelButtonText: '取消', 
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({
          value
        }) => {
          console.log(value + "邮箱数据");
          this.$store.dispatch('tocheckEmail', { // dispatch toLogin action
            checkEmail: value
          }).then((res) => {
            //  res后端返回的数据，调用tocheckEmail得到    
            // 注意这里要添加一个数据加载效果
            console.log(res.data.message);
            if (res.data.message == "发送成功") {
              this.$message({
                type: 'success',
                message: '你的邮箱是: ' + value + ",验证是本站用户，将密码发送到邮箱"
              });
            } else {
              swal("用户不存在")
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        })
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-style {
    border: 1px solid #fff;
    text-align: center;
    padding: 20px;
    line-height: 50px;
    background: #fff;
    width: 300px;
    box-shadow: 0 1px 3px 0 rgba(66, 94, 129, 0.5);
  }
  p {
    font-size: 12px;
    cursor: pointer;
  }
</style>