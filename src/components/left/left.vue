<template>
  <div id="left">
    <div class="top">
      <div class="title">
        <i class="iconfont icon-method-draw-image"></i>
        <span>传感器数据</span>
      </div>
      <div class="title-btn">
        <div v-for="(val,key) in leftBtn" :key="key" class="btn-div" @click="btnShow(key)">
          {{val}}
        </div>
      </div>
      <div class="carousel">
        <el-carousel direction="horizontal" :autoplay="false" :loop="false">
          <el-carousel-item v-for="(val,item) in [2,2,2,2,2,]" :key="item">
            <div :class="['medium',className[item]]" :style="{width:val*1520+'px'}">
              <div :class="[className[item]+'-data' ,'carousel-data']" v-for="(sys,num) in carousel[item]" :key="num">
                <div v-for="(val,key) in sys" :key="key" :class="['medium-data',key>2? 'behind':'' ]">
                  <span class="name">{{val.name}}</span>
                  <span class="value">{{val.value}}</span>
                  <span class="util">{{val.util}}</span>
                  <el-progress class="progress" :stroke-width="12" :percentage="val.percent" :show-text="false"></el-progress>
                </div>
              </div>
              <div class="medium-bottom pagination">
                <el-pagination small layout="prev, pager, next" :page-size="6" :total="7" @current-change="handleCurrentChange"></el-pagination>
              </div>
              <div class="state">
                <div v-for="(val,key) in ['在线','供电']" :key="key" style="margin-right:100px">
                  <span class="hint" style="background: #1FF1C7;"></span>
                  <span class="inner">{{val}}</span>
                </div>
              </div>
              <div class="time">2020-08-31 15:48:23</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>
 <script>
import "./left.less"
export default {
  name: '',
  props: {
  },
  data() {
    return {
      //绑定的数据
      className: ['systemTwo', 'inspection', 'outside', 'rotating', 'electrical'],
      leftBtn: ["系统2水质", "日常检测", "棚外大气", "棚内大气", "电气"],
      btnShowNum: 0,
      carousel: [this.systemTwo, this.systemTwo, this.systemTwo, this.systemTwo, this.systemTwo],
      systemTwo: [
        { name: "溶氧值", value: 2.23, util: 'mg/L', maxVal: 10, percent: (2.23 / 10) * 100 },
        { name: "水温", value: 32.3, util: '℃', maxVal: 100, percent: (32.3 / 100) * 100 },
        { name: "PH", value: 7.66, util: '', maxVal: 14, percent: (7.66 / 14) * 100 },
        { name: "EC", value: 0, util: '', maxVal: 100, percent: (0 / 100) * 100 },
        { name: "ORP", value: 0, util: '', maxVal: 100, percent: (0 / 100) * 100 },
        { name: "水位", value: 1.2, util: 'm', maxVal: 100, maxVal: 2, percent: (1.2 / 100) * 100 },
        { name: "EC", value: 0, util: '', maxVal: 100, percent: (0 / 100) * 100 },
      ],

    };
  },
  mounted() {
    console.log(this.carousel);
    //页面初始化触发事件
    this.btnShow(0);
    const packet = Math.round(this.systemTwo.length / 6 + 1);
    this.systemTwo = Array(packet).fill().map((map, index) => {
      let link = [];
      for (let i = ((index + 1) * 6 - 6); ((index + 1) * 6 - 6) <= i && i < (index + 1) * 6; i++) {
        if (this.systemTwo[i]) link.push(this.systemTwo[i])
      }
      return link
    })
  },
  methods: {
    //自定义事件集合地
    // 传感器数据--按钮事件
    btnShow(key) {
      let btn = document.getElementsByClassName("btn-div")
      btn.forEach((itme, index) => {
        if (key == index) {
          itme.classList.add("btn-show")
        } else {
          itme.classList.remove("btn-show");
        }
      });
      let carousel = document.getElementsByClassName("carousel")[0];
      let li = carousel.getElementsByClassName("el-carousel__indicator")
      if (li.length != 0) li[key].click()
      this.btnShowNum = key
      this.handleCurrentChange(1)
    },
    //传感器数据--fanye
    handleCurrentChange(val) {
      let sys = document.getElementsByClassName(this.className[this.btnShowNum])[0];
      let medium = sys.getElementsByClassName("carousel-data");
      medium.forEach(item => {
        item.style.transform = `translateX(-${1520 * (val - 1)}px)`
      })
    }
    // 数组分组

  },
  beforeDestroy() {
    //组件销毁之前调用，取消订阅
  }
};
 </script>