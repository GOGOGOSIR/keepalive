<template>
  <div class="page">
     我是子页面： {{str}}
     <div @click='$router.go(-1)'>back</div>
     <div class="box">
         <cube-scroll :data="list">
             <div class="i" v-for="item in list">{{item}}</div>
         </cube-scroll>
     </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
     str: '',
     list: []
    }
  },
  created () {
    this.str = this.$route.query.a
    setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.list.push('page' + i);
        }
      }, 200);
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  padding: 0;
  margin: 0;
}
.page{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  font-size: 28px;
  color: #fff;
}
.box{
    width: 100%;
    height: 600px;
}
.i{
    height: 80px;
}
</style>
