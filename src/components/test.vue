<template>
  <div id="cesiumContainer"></div>
</template>
 <script>
import axios from "axios";
export default {
  name: "Test",
  data() {
    return {
      //绑定的数据
    };
  },
  mounted() {
    //页面初始化触发事件
    if (!mars3d.util.webglreport()) {
      alert("系统检测到您使用的浏览器不支持WebGL功能");
      layer.open({
        type: 1,
        title: "当前浏览器不支持WebGL功能",
        closeBtn: 0,
        shadeClose: false,
        resize: false,
        area: ["600px", "200px"], //宽高
        content:
          '<div style="margin: 20px;"><h3>系统检测到您使用的浏览器不支持WebGL功能！</h3>  <p>1、请您检查浏览器版本，安装使用最新版chrome、火狐或IE11以上浏览器！</p> <p>2、WebGL支持取决于GPU支持，请保证客户端电脑已安装显卡驱动程序！</p></div>',
      });
    }
    this.initMap();
    // console.log("@/utils/config");
  },
  methods: {
    //自定义事件集合地
    //初始化地图
    initMap() {
      let viewer;
      //url传参，一个系统动态使用不同配置
      const configfile = haoutil.system.getRequestByName(
        "config",
        "api/config.json"
      );
      mars3d.createMap({
        id: "cesiumContainer",
        url: configfile,
        homeButton: true, //视角复位按钮
        sceneModePicker: false, //二三维切换按钮
        navigationHelpButton: false, //帮助按钮
        infoBox: false, //消息框
        vrButton: false, //VR模式按钮
        fullscreenButton: false, //全屏按钮
        baseLayerPicker: false, //是否显示图层选择控件
        geocoder: false, //查询按钮
        infoBox: false,
        center: {
          y: 31.18458,
          x: 121.087436,
          z: 202.93,
          heading: 90,
          pitch: -20.9,
          roll: 0,
        },
        success: (_viewer, jsondata) => {
          //地图成功加载完成后执行
          viewer = _viewer;
          // setTimeout(removeMask, 3000);
          // this.initWork(viewer);
        },
      });
    },
    initWork(viewer) {
      // const layerWork = mars3d.layer.createLayer(
      //   {
      //     name: "model",
      //     type: "3dtiles",
      //     url: "http://localhost:80/3DTiles/tileset.json",
      //     maximumScreenSpaceError: 1,
      //     maximumMemoryUsage: 1024,
      //     offset: {
      //       z: 0,
      //     },
      //     visible: true,
      //   },
      //   viewer
      // );
    },
  },
  beforeDestroy() {
    //组件销毁之前调用，取消订阅
  },
};
</script>
 <style lang="less">
</style>