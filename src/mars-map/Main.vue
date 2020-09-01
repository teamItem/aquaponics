<template>
  <div
    :id="`marsgis-container${mapKey ? '-' + mapKey : ''}`"
    :class="['mars3d-container', customClass, { 'mars3d-container-compare-rh' : compare }]"
  ></div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

export default {
  name: "CesiumViewer",

  props: {
    // 初始化配置参数
    url: String,
    widgetUrl: String,

    // 地图唯一性标识
    mapKey: {
      type: String,
      default: "",
    },

    // 自定义参数
    options: Object,

    // 是否分屏显示
    compare: {
      type: Boolean,
      default: false,
    },

    // 是否插入到body元素上
    appendToBody: {
      type: Boolean,
      default: false,
    },

    // 自定义css类名
    customClass: {
      type: String,
      default: "",
    },
  },

  mounted() {},
  methods: {
    mars() {
      return mars3d;
    },
  },
};
</script>
