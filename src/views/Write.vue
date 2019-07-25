<template>
  <div class="Write">
    <input type="text" placeholder="标题是什么呢？">
    <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px" />
    <button @click="submit">提交</button>
    <p>保存成功：{{response}}</p>
  </div>
</template>

<script>
  import {
    mavonEditor
  } from 'mavon-editor';
  import 'mavon-editor/dist/css/index.css';


  export default {
    name: "Write",
    // 注册
    components: {
      mavonEditor,
    },
    data() {
      return {
        content: '', // 输入的markdown
        html: '', // 及时转的html
        configs: {},
        data: '',
        response:''
      }
    },
    mounted() {

    },
    methods: {
      $imgAdd(pos, $file) { // 将图片上传到服务器，返回地址替换到md中
        let formdata = new FormData();

        // this.$upload.post('/上传接口地址', formdata).then(res => {
        //   console.log(res.data);
        //   this.$refs.md.$img2Url(pos, res.data);
        // }).catch(err => {
        //   console.log(err)
        // })

      },
      change(value, render) { // 所有操作都会被解析重新渲染
        this.html = render; // render 为 markdown 解析后的结果[html]
      },
      submit: function () { // 提交
        console.log(this.content);
        console.log(this.html);

        this.data = this.$base64.encode(this.content);
        console.log(this.data);
        var params = {
          content: this.data
        };

        var url = '/run/addArticle';

        this.$axios.post(url, this.$qs.stringify(params), {
          headers: {
            'x-csrf-token': this.$cookies.get('csrfToken')
          }
        }).then((res) => {
          this.response = this.$base64.decode(res.data.articleData.content);
          console.log('1'+this.response);
        }).catch(err => {
          alert(err);
        });

      }
    }

  };
</script>

<style scoped>

</style>