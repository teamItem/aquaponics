<template>
  <div class="hello"></div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {

    };
  },
  mounted() {
    //页面初始化触发事件
  },
  methods: {
  },
  beforeDestroy() {
    //组件销毁之前调用，取消订阅
  },
};
</script>
