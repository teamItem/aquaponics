<template>
  <div id="home">
    <leftvue></leftvue>
    <div id="middle">
      <div id="cesiumContainer"></div>
    </div>
    <div class="gradual-left">
      <img class="img-left" src="@/assets/img/corner.png">
    </div>
    <div class="gradual-right">
      <img class="img-right" src="@/assets/img/corner.png">
    </div>
    <rightvue></rightvue>
  </div>
</template>
 <script>

import "./home.less"
import leftvue from '../left/left'
import rightvue from '../right/right'
let viewer;
export default {
  name: 'home',
  components: {
    "leftvue": leftvue,
    "rightvue": rightvue
  },
  props: {},
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
    // 地图
    this.initMap();
  },
  methods: {
    //自定义事件集合地
    //初始化地图
    initMap() {
      const that = this;

      //url传参，一个系统动态使用不同配置
      const configfile = haoutil.system.getRequestByName(
        "config",
        "api/config2.json"
      );
      mars3d.createMap({
        id: "cesiumContainer",
        url: configfile,
        center: {
          "y": 33.113518,
          "x": 117.422223,
          "z": 223514.02,
        },
        success: (_viewer) => {
          viewer = _viewer;
          that.maskLayer();
        }
      })
    },
    // 遮罩层
    maskLayer() {
      this.wyoming = viewer.entities.add({
        name: "Wyoming",
        rectangle: {
          //  给予西南经纬度和东北经纬度坐标创建矩形
          coordinates: Cesium.Rectangle.fromDegrees(
            67.853802, -5.710765,
            150.715227, 57.157443
          ),
          material: new Cesium.Color.fromCssColorString("#051234").withAlpha(0.5),
        },
      });
    },

  },
  beforeDestroy() {
    //组件销毁之前调用，取消订阅
  }
};
 </script>