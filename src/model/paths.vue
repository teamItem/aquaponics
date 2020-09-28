<template>
  <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg" style="height: 500px;border:1px red solid">
    <path :d="'M ' +path" stroke="#cccccc" stroke-width="5" fill="transparent"></path>
    <path :d="'M ' +path" stroke="blue" stroke-width="5" fill="transparent" class="line"></path>
  </svg>
</template>
<script>
export default {
  name: "",
  props: {
    address: String,
    path:String,
    viewBox:String
  },
  data() {
    return {
      //绑定的数据
    };
  },
  mounted() {
    //页面初始化触发事件
    console.log(this.address);
  },
  methods: {
    //自定义事件集合地
  },
  beforeDestroy() {
    //组件销毁之前调用，取消订阅
  }
};
</script>
	<style>
.line {
  stroke-dasharray: 350;
  stroke-dashoffset: 350;
  animation: offset 1.5s linear infinite;
}
@keyframes offset {
  from {
    stroke-dashoffset: 350;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>