<template>
  <div class="Login">

    <div class="box">

      <!-- 3D效果——祖先元素card -->
      <div class="card">
        <!-- 3D效果——第二层元素cardSon -->
        <div class="cardSon" :class="{'turn':isTurn}">
          <!-- 3D效果——最内层元素 正面卡片loginBox -->
          <div class="loginBox">
            <i class="iconfont icon-erweimajiaobiao iconStyle" @click="getQR"></i>
            <input type="text" class="inputStyle" v-model="user_account" placeholder="账号">
            <input type="password" class="inputStyle" v-model="user_password" placeholder="密码">

            <div class="functionBox">
              <span>忘记密码</span>
              <span> | </span>
              <span @click="getRegister">注册</span>
            </div>

            <span class="loginButton" @click="login">
              <span>登录</span>
            </span>

          </div>

          <!-- 3D效果——最内层元素 背面卡片registerBox -->
          <div class="registerBox" :class="{'registerBoxMove':isMove}">

            <i class="iconfont icon-guanbijiaobiao rightCorner" @click="getLogin"></i>

            <div class="registerCheckBox">
              <input type="text" class="inputStyle Placeholder" v-model="register_acc" placeholder="请给我一个8~12位的账号~">
              <input type="password" v-model="register_pas" class="inputStyle Placeholder" placeholder="请给我一个8~12位的密码~">
              <input type="password" v-model="register_pas1" class="inputStyle Placeholder" placeholder="请再给我一遍  蟹蟹~">
            </div>

            <div class="registerCheckBox">
              <input type="text" class="inputStyle Placeholder" v-model="register_name" placeholder="请给我一个长度7为以内的名字~">
              <div class="registerGender">
                <span class="genderTitle">你是小哥哥还是小姐姐呢？</span>
                <input type="radio" class="" name="sex" :value="man" v-model="register_gender" checked />男
                <input type="radio" class="" name="sex" :value="woman" v-model="register_gender" />女
              </div>

            </div>

            <div class="registerCheckBox">
              <input type="text" class="inputStyle Placeholder" v-model="register_email" placeholder="请给我一个正确的邮箱~">
              <input type="password" class="inputStyle Placeholder" v-model="register_info" placeholder="请给我一小段自我介绍~">
            </div>

            <span class="registerButton" @click="register">
              <span>注册</span>
            </span>

          </div>

        </div>
      </div>

    </div>

    <span class="bottom">Copyright &copy; 华润（集团）有限公司 京ICP备05045648号 技术支持：华润集团智能与信息化部</span>

  </div>
</template>

<script>
  import {
    Toast,
    Notify
  } from 'vant';

  export default {
    name: "Login",
    components: {
      [Toast.name]: Toast,
      [Notify.name]: Notify,
    },
    data() {
      return {
        isTurn: false,
        isMove: false,
        register_acc:'',
        register_pas:'',
        register_pas1:'',
        register_name:'',
        register_gender: '',
        register_email:'',
        register_info:'',
        user_account: '',
        user_password: '',
        man: 1,
        woman: 0,
        data: '',
        _csrf: '',
      }
    },
    methods: {
      getQR() {
        //切换二维码登录界面
        alert("暂未开放...");
      },
      getRegister() {
        //切换注册界面
        this.isTurn = true;
        this.isMove = true;
      },
      getLogin() {
        //切换登录界面
        this.isTurn = false;
        this.isMove = false;
      },
      login() {
        var p1 = /^[A-Za-z0-9]{8,12}$/;
        if (this.user_account == "" || this.user_password == "")
          Toast.fail('账号密码不得为空');
        else if (p1.test(this.user_account) == false) {
          Toast.fail('请输入8-12位账号');
        } else {
          var url = '/run/login?user_account=' + this.user_account + '&user_password=' + this.user_password;
          console.log(url);

          this.$axios.get(url).then(res => {
            console.log(res.data);

            if (res.data.code == 1) {
              this.data = res.data.data[0];
              localStorage.removeItem('data_user');
              localStorage.setItem('data_user', JSON.stringify(this.data));
              Toast.success("登录成功");
              this.$root.$router.push("/");
            } else {
              Toast.fail(res.data.msg);
            }

          }).catch(err => {
            alert(err);
          })
          // POST方式
          // var url = '/run/login';
          // console.log(url);
          // this._csrf=this.$cookies.get('csrfToken');
          // console.log(this._csrf);
          // this.$axios.post(url,{
          //   user_account:this.user_account,
          //   user_password:this.user_password
          // }).then(res => {
          //   console.log(res.data);
          //   if (res.data.code == 1) {
          //     this.data = res.data.data[0];
          //     localStorage.setItem('data_user',JSON.stringify(this.data));
          //     Toast.success("登录成功")
          //     this.$root.$router.push("/");
          //   }else{
          //     Toast.fail(res.data.msg);
          //   }
          // }).catch(err => {
          //   alert(err);
          // })
        }
      },
      register() {
        if (this.register_acc == "" || this.register_pas == "" || this.register_pas1 == "" || this.register_name == "" || this.register_gender == "" || this.register_email == "" || this.register_info == ""){
          Toast.fail("请全部填写")
        }else if(this.register_pas != this.register_pas1){
          Toast.fail("两次密码填写不一致")
        }else {
          var url = '/run/register?user_account='+this.register_acc+'&user_password='+this.register_pas+'&user_name='+this.register_name+'&user_gender='+this.register_gender+'&user_email='+this.register_email+'&user_introduction='+this.register_info;
          console.log(url);

          this.$axios.get(url).then(res => {
            console.log(res.data);

            if (res.data.code == 1) {
              Toast.success("注册成功")
              this.getLogin();
            } else {
              Toast.fail(res.data.msg);
            }

          }).catch(err => {
            alert(err);
          })
        }
      }
    }
  };
</script>

<style scoped>
  .Login {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 15vh 0;
    text-align: center;
  }

  .box {
    width: 100vw;
    height: 70vh;
    background-image: url("http://winfo.crc.com.cn/column/images/rec-banner.jpg");
    background-size: 100% 100%;
    padding: 5vh 0;
    box-sizing: border-box;
    overflow: hidden;
  }

  .card {
    float: right;
    margin-right: 8vw;
    width: 25vw;
    height: 60vh;
    perspective: 1000;
    transform-style: preserve-3d;
  }

  .cardSon {
    width: 25vw;
    height: 60vh;
    position: relative;
    transition: 0.6s;
    transform-style: preserve-3d;
  }

  .loginBox {
    width: 25vw;
    height: 60vh;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 1px 1px 15px 1px rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
    padding-top: 10vh;
    position: absolute;
    top: 0px;
    right: 0px;
    backface-visibility: hidden;
    z-index: 2;
  }

  .registerBox {
    width: 25vw;
    height: 60vh;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 1px 1px 15px 1px rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    backface-visibility: hidden;
    transform: rotateY(-180deg);
    transition: all 0.5s ease-in;
  }

  /* 反转开关 */
  .turn {
    transform: rotateY(180deg);
  }

  /* 移动开关 */
  .registerBoxMove {
    width: 80vw;
    height: 50vh;
    top: 5.5vh;
    left: 2vw;
    z-index: 100;
  }

  .iconStyle {
    font-size: 70px;
    position: absolute;
    top: 0;
    right: 0;
    vertical-align: none;
    border-top-right-radius: 8px;
    cursor: pointer;
  }

  .functionBox>span {
    height: 6vh;
    line-height: 6vh;
    font-size: 15px;
    color: white;
    cursor: pointer;
  }

  .inputStyle {
    width: 20vw;
    height: 7vh;
    color: white;
    border-radius: 12px;
    margin-top: 6vh;
    padding: 2px 2vw 2px 2vw;
    border: 1px solid #fafafa;
    outline: none;
    transition: all 0.5s ease-in;
    box-sizing: border-box;
  }

  .inputStyle:focus {
    border: 1px solid rgb(255, 180, 3);
  }

  .Placeholder::-webkit-input-placeholder {
    color: white;
  }

  .Placeholder::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: white;
  }

  .Placeholder:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: white;
  }

  .Placeholder:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: white;
  }

  .loginButton {
    width: 15vw;
    height: 40px;
    line-height: 38px;
    display: block;
    border: none;
    border-radius: 12px;
    margin: 4vh auto 0;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    transition: all 1.5s ease-in;
    background-image: linear-gradient(45deg, rgb(74, 140, 254), rgb(75, 218, 255));
    box-sizing: border-box;
  }

  .loginButton>span {
    background-image: linear-gradient(45deg, rgb(240, 240, 240), rgb(255, 255, 255));
    -webkit-background-clip: text;
    color: transparent;
    text-align: center;
    transition: all 1.5s ease-in;
  }

  .rightCorner {
    font-size: 45px;
    color: white;
    position: absolute;
    top: 0;
    right: 0;
  }

  .registerCheckBox {
    width: 22vw;
    float: left;
    margin-left: 3.5vw;
  }

  .registerGender {
    width: 20vw;
    height: 7vh;
    color: white;
    border-radius: 12px;
    margin: 0 auto;
    margin-top: 6vh;
    padding: 2px 1vw 2px 1vw;
    border: 1px solid #fafafa;
    outline: none;
    transition: all 0.5s ease-in;
    box-sizing: border-box;
  }

  .genderTitle {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    color: #fafafa;
    font-size: 13px;
  }

  .registerButton {
    position: absolute;
    left: 32.5vw;
    bottom: 4vh;
    width: 15vw;
    height: 40px;
    line-height: 38px;
    display: block;
    border: none;
    border-radius: 12px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    transition: all 1.5s ease-in;
    background-image: linear-gradient(45deg, rgb(74, 140, 254), rgb(75, 218, 255));
    box-sizing: border-box;
  }

  .registerButton>span {
    background-image: linear-gradient(45deg, rgb(240, 240, 240), rgb(255, 255, 255));
    -webkit-background-clip: text;
    color: transparent;
    text-align: center;
    transition: all 1.5s ease-in;
  }

  .bottom {
    height: 15vh;
    line-height: 15vh;
    color: #afafaf;
  }
</style>