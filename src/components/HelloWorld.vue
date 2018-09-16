<template>
  <div class="hello">
      <cube-scroll
        ref="scrolls"
        :data='list'
        :options="options"
        @pulling-up="onPullingUp">
        <div class="item" v-for="item in list" @click='go(item)'>{{item}}</div>
      </cube-scroll>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      list: [],
      options: {
        pullUpLoad: true
      }
    };
  },
  created() {
    console.log("created");
    this.getdata();
  },
  activated() {
    console.log("activeted");
    console.log(this.beforeTop)
    this.$refs.scrolls.scrollTo(0,this.beforeTop)
  },
   beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
	// 可以访问组件实例 `this`
	
	
	next()
  },
  methods: {
    getdata() {
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.list.push(i + 1);
        }
      }, 200);
    },
    go(a) {
      this.beforeTop = this.$refs.scrolls.scroll.startY;
      console.log(this.beforeTop, '记录位置')
      this.$router.push({
        path: "/page",
        query: {
          a: a
        }
      });
    },
    onPullingUp() {
      console.log(1111);
      setTimeout(() => {
        let arr = [];
        for (
          let i = this.list[this.list.length - 1];
          i < this.list[this.list.length - 1] + 20;
          i++
        ) {
          arr.push(i + 1);
        }
        console.log(arr)
        this.list = this.list.concat(arr);
        // this.$refs.scroll.forceUpdate()
      }, 200);
      // 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.hello {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.item {
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: #fff;
  margin-bottom: 20px;
  font-size: 28px;
  color: #999;
  text-align: center;
}
.item:last-of-type {
  margin-bottom: 0;
}
</style>
