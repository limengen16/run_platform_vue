<template>
  <div class="topNav" :class="{'topNav1':topNav1,'topNav2':topNav2}">
    <span class="topNav_title" :class="{'topNav_title1':topNav_title1,'topNav_title2':topNav_title2}"
      @click="Home">润社区</span>

    <span class="tab" :class="{'tab1':tab1,'tab2':tab2}">首页</span>

    <span class="tab" :class="{'tab1':tab1,'tab2':tab2}">社区</span>

    <span class="tab" :class="{'tab1':tab1,'tab2':tab2}">技术栈</span>

    <span class="tab" :class="{'tab1':tab1,'tab2':tab2}">悬赏榜</span>

    <input class="search" :class="{'search1':search1,'search2':search2,'searchPlaceholder1':search2}" type="text"
      placeholder="您想看点啥呢？">

    <span class="topNav_write" :class="{'topNav_write1':topNav_write1,'topNav_write2':topNav_write2}" @click="Write">
      <i class="iconfont icon-xie icon_write" :class="{'icon_write1':icon_write1,'icon_write2':icon_write2}"></i>
      <span class="topNav_write_span"
        :class="{'topNav_write_span1':topNav_write_span1,'topNav_write_span2':topNav_write_span2}">写文章</span>
    </span>

    <div class="user" @click="Login">
      <img v-if="data_user==''" class="user_pic" :class="{'user_pic1':user_pic1,'user_pic2':user_pic2}" src="../../public/img/default.png" alt="">
      <img else class="user_pic" :class="{'user_pic1':user_pic1,'user_pic2':user_pic2}" :src="getPic(data_user.user_pic)" alt="">
      <router-link to="/Login"></router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {
    Toast,
    Notify
  } from 'vant';

  export default {
    name: "topNav",
    components: {
      [Toast.name]: Toast,
      [Notify.name]: Notify,
    },
    data() {
      return {
        topNav1: false,
        topNav_title1: false,
        tab1: false,
        search1: false,
        topNav_write1: false,
        icon_write1: false,
        topNav_write_span1: false,
        user_pic1: false,
        topNav2: true,
        topNav_title2: true,
        tab2: true,
        search2: true,
        topNav_write2: true,
        icon_write2: true,
        topNav_write_span2: true,
        user_pic2: true,
        data_user: ''
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      this.getUserData();
    },
    methods: {
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        scrollTop > 100 ? this.selectedTheme1() : this.selectedTheme2();
      },
      selectedTheme1() {
        this.topNav1 = true;
        this.topNav_title1 = true;
        this.tab1 = true;
        this.search1 = true;
        this.topNav_write1 = true;
        this.icon_write1 = true;
        this.topNav_write_span1 = true;
        this.user_pic1 = true;
        this.topNav2 = false;
        this.topNav_title2 = false;
        this.tab2 = false;
        this.search2 = false;
        this.topNav_write2 = false;
        this.icon_write2 = false;
        this.topNav_write_span2 = false;
        this.user_pic2 = false;
      },
      selectedTheme2() {
        this.topNav1 = false;
        this.topNav_title1 = false;
        this.tab1 = false;
        this.search1 = false;
        this.topNav_write1 = false;
        this.icon_write1 = false;
        this.topNav_write_span1 = false;
        this.user_pic1 = false;
        this.topNav2 = true;
        this.topNav_title2 = true;
        this.tab2 = true;
        this.search2 = true;
        this.topNav_write2 = true;
        this.icon_write2 = true;
        this.topNav_write_span2 = true;
        this.user_pic2 = true;
      },
      getUserData() {
        if (localStorage.getItem('data_user') != null)
          this.data_user = JSON.parse(localStorage.getItem('data_user'));
      },
      getPic(pic) {
        console.log('/pic/' + this.data_user.user_pic);
        console.log(this.data_user);
        return '/run/public/uploads/' + pic;
      },
      Home() {
        this.$root.$router.push("/");
        Toast.success('刷新成功');
      },
      Login() {
        this.$root.$router.push("/Login");
      },
      Write() {
        this.$root.$router.push("/Write");
      }
    }
  };
</script>

<style scoped>
  @import "../../public/css/topNav_color.css";

  .topNav {
    width: 100vw;
    height: 65px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    transition: all 1.5s ease-in;
  }

  .topNav_title {
    -webkit-background-clip: text;
    color: transparent;
    font-size: 45px;
    font-weight: 500;
    height: 65px;
    line-height: 65px;
    font-family: 'SHUFA55';
    float: left;
    margin-left: 2vw;
    cursor: pointer;
    transition: all 1.5s ease-in;
  }

  .tab {
    font-size: 20px;
    height: 65px;
    line-height: 65px;
    margin-right: 1vw;
    cursor: pointer;
    transition: all 1.5s ease-in;
  }

  span:nth-of-type(2) {
    margin-left: 10vw;
  }

  .search {
    height: 40px;
    border-radius: 20px;
    padding: 2px 2vw 2px 2vw;
    margin-left: 1vw;
    outline: none;
    transition: all 1.5s ease-in;
  }

  .user {
    width: 45px;
    height: 45px;
    float: right;
    margin-right: 2vw;
    margin-top: 10px;
    cursor: pointer;
    transition: all 1.5s ease-in;
  }

  .user_pic {
    width: 45px;
    height: 45px;
    display: block;
    border-radius: 100%;
    box-sizing: border-box;
    transition: all 1.5s ease-in;
  }

  .topNav_write {
    width: 9vw;
    height: 40px;
    line-height: 38px;
    border: none;
    border-radius: 20px;
    float: right;
    margin-right: 5vw;
    margin-top: 12.5px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    transition: all 1.5s ease-in;
  }

  .topNav_write_span {
    -webkit-background-clip: text;
    color: transparent;
    padding-left: 5px;
    transition: all 1.5s ease-in;
  }

  .icon_write {
    font-size: 22px;
    -webkit-background-clip: text;
    color: transparent;
    transition: all 1.5s ease-in;
  }
</style>