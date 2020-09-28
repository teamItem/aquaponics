<template>
  <div class="hello">
    <!-- <img src="~@/assets/logo.png" style="display:block;margin:auto"> -->
    <!-- <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style="height: 500px;border:1px red solid">
      <Paths viewBox='0 0 500 500' :address="address" path="100 350 100 200 300 200"></Paths>
    </svg> -->
    <!-- <Rects></Rects> -->
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
// import paths from '../model/paths'
// import rect from '../model/rect'
export default {
  name: "HelloWorld",
  // components: {
  //   'Paths': paths,
  //   'Rects': rect
  // },
  props: {
    msg: String,
  }, data() {
    return {
      //绑定的数据
      address: "ceshishujv"
    };
  },
  mounted() {
    //页面初始化触发事件
    this.initMap();
  },
  methods: {
    //自定义事件集合地
    initMap() {
      const that = this;
      let viewer;
      //url传参，一个系统动态使用不同配置
      const configfile = haoutil.system.getRequestByName(
        "config",
        "api/config2.json"
      );
      mars3d.createMap({
        id: "cesiumContainer",
        url: configfile,
        center: { "y": 32.908204, "x": 117.343498, "z": 36.07, "heading": 143.8, "pitch": -1.1, "roll": 0.1 },
        success: (_viewer, jsondata) => {
          //地图成功加载完成后执行
          viewer = _viewer;
          mars3d.layer.createLayer({
            "name": "模型",
            "type": "3dtiles",
            "url": "api/南山郦都/AC/tileset.json",
            "maximumScreenSpaceError": 1,
            "maximumMemoryUsage": 1024,
            "offset": {
              "z": 129
            },
            "visible": true
          }, viewer);
          mars3d.layer.createLayer({
            "name": "模型",
            "type": "3dtiles",
            "url": "api/南山郦都/B/tileset.json",
            "maximumScreenSpaceError": 1,
            "maximumMemoryUsage": 1024,
            "offset": { x: 117.346099, y: 32.908606, z: 83.6 },
            "visible": true
          }, viewer);
          mars3d.layer.createLayer({
            "name": "模型",
            "type": "3dtiles",
            "url": "api/南山郦都/D/tileset.json",
            "maximumScreenSpaceError": 1,
            "maximumMemoryUsage": 1024,
            "offset": { z: 31 },
            "visible": true
          }, viewer);
        },
      });
    },
  },
  beforeDestroy() {
    //组件销毁之前调用，取消订阅
  }
};
</script>
