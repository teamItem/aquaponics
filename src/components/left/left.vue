<template>
  <div id="left">
    <!-- 传感器数据 -->
    <div class="datum">
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
          <el-carousel-item v-for="(val,item) in [2,2,2,2,2]" :key="item">
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
    <!-- 控制器状态 -->
    <div class="status">
      <div class="title">
        <i class="iconfont icon-method-draw-image"></i>
        <span>控制器状态</span>
      </div>
      <div class="webkit">
        <div class="state-border" :style="{width:statusData.length*1520+'px'}">
          <div class="state-list" v-for="(data,key) in statusData" :key="key">
            <div class="status-data" v-for="(data,num) in data" :key="num">
              <span class="hint" :style="{background: data.statu?'#1FF1C7':'#FA6236'}"></span>
              <span class="inner">{{data.name}}</span>
              <div :class="['switch',data.statu?'on':'off']">{{data.statu?"打开":"关闭"}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="status-page  pagination">
        <el-pagination small layout="prev, pager, next" :page-size="6" :total="7" @current-change="stateDataChange"></el-pagination>
      </div>
    </div>
    <!-- 数据报表 -->
    <div class="report">
      <div class="title">
        <i class="iconfont icon-method-draw-image"></i>
        <span>数据报表</span>
      </div>
      <div class="report-btn">
        <div v-for="(val,key) in returnBtn" :key="key" class="report-div" @click="reportBtnShow(key)">
          {{val}}
        </div>
      </div>
      <div class="report-fild">
        <div v-for="(val,key) in returnFild" :key="key" class="fild-div" :style="{color:fildNum==key?'#EDF6FF':'#7D97BB'}" @click="fildShow(key)">
          {{val}}
        </div>
      </div>
      <el-select v-model="seletVal" placeholder="请选择" @change="elOptionChange">
        <el-option v-for="item in leftBtn" :key="item.value" :label="item" :value="item">
        </el-option>
      </el-select>
      <div class="echarts">
        <div id="reportEcharts" style="width: 100%;height: 100%"></div>
      </div>
    </div>
  </div>
</template>
 <script>

import echarts from "echarts"
import "./left.less"
export default {
  name: '',
  props: {
  },
  data() {
    return {
      //绑定的数据
      echartsXAxis: [],
      echartsData: [],
      seletVal: '系统2水质',
      className: ['systemTwo', 'inspection', 'outside', 'rotating', 'electrical'],
      leftBtn: ["系统2水质", "日常检测", "棚外大气", "棚内大气", "电气"],
      btnShowNum: 0,
      systemTwo: [
        { name: "溶氧值", value: 2.23, util: 'mg/L', maxVal: 10, percent: (2.23 / 10) * 100 },
        { name: "水温", value: 32.3, util: '℃', maxVal: 100, percent: (32.3 / 100) * 100 },
        { name: "PH", value: 7.66, util: '', maxVal: 14, percent: (7.66 / 14) * 100 },
        { name: "EC", value: 0, util: '', maxVal: 100, percent: (0 / 100) * 100 },
        { name: "ORP", value: 0, util: '', maxVal: 100, percent: (0 / 100) * 100 },
        { name: "水位", value: 1.2, util: 'm', maxVal: 100, maxVal: 2, percent: (1.2 / 100) * 100 },
        { name: "EC", value: 0, util: '', maxVal: 100, percent: (0 / 100) * 100 },
      ],
      carousel: [],
      statusData: [
        { name: "风机1", statu: false },
        { name: "风机2", statu: true },
        { name: "风机3", statu: false },
        { name: "内微循环风机", statu: true },
        { name: "湿帘水泵1", statu: true },
        { name: "湿帘水泵2", statu: false },
        { name: "湿帘卷膜", statu: true },
        { name: "侧卷膜", statu: false },
        { name: "侧通风", statu: true },
        { name: "顶卷膜", statu: false },
        { name: "顶通风", statu: false },
      ],
      returnBtn: ['近24小时', '近7天', '近一月', '近一年'],
      returnFild: ['空气温度', '湿度', 'CO2', 'PM2.5', '大气压强'],
      btnNum: 0,
      fildNum: 0,
    };
  },
  mounted() {
    //页面初始化触发事件
    this.btnShow(0);
    this.reportBtnShow(0);
    this.reportEcharts();
    this.systemTwo = this.packetData(this.systemTwo, 6)
    this.statusData = this.packetData(this.statusData, 10)
    this.carousel = Array(5).fill(this.systemTwo)
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
    //数据报表--按钮事件
    reportBtnShow(key) {
      let btn = document.getElementsByClassName("report-div")
      btn.forEach((itme, index) => {
        if (key == index) {
          itme.classList.add("report-show")
        } else {
          itme.classList.remove("report-show");
        }
      });
      this.btnNum = key;

      this.echartsChangeData()
    },

    //数据报表--字段事件
    fildShow(key) {
      this.fildNum = key;
      this.echartsChangeData()
    },
    // 下拉框
    elOptionChange(val) {
      console.log(val);
    },
    //传感器数据--fanye
    handleCurrentChange(val) {
      let sys = document.getElementsByClassName(this.className[this.btnShowNum])[0];
      let medium = sys.getElementsByClassName("carousel-data");
      medium.forEach(item => {
        item.style.transform = `translateX(-${1520 * (val - 1)}px)`
      })
    },
    // 控制器状态-fenye
    stateDataChange(val) {
      let sys = document.getElementsByClassName('status')[0];
      let medium = sys.getElementsByClassName("state-list");
      medium.forEach(item => {
        item.style.transform = `translateX(-${1520 * (val - 1)}px)`
      })
    },
    // 数据分组
    packetData(arr, num) {
      const packet = Math.ceil(arr.length / num);
      arr = Array(packet).fill().map((map, index) => {
        let link = [];
        for (let i = ((index + 1) * num - num); ((index + 1) * num - num) <= i && i < (index + 1) * num; i++) {
          if (arr[i]) link.push(arr[i])
        }
        return link
      })
      return arr;
    },
    //数据报表--echarts图
    reportEcharts() {
      let myChart = this.echarts.init(document.getElementById("reportEcharts"));
      let option = {
        grid: {
          top: 20,
          bottom: 58,
          left: 80,
          right: 10
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [{
          type: 'category',
          data: this.echartsXAxis,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 11,
            textStyle: {
              color: '#CCCCCC',
              fontSize: 24
            },
            margin: 30
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              opacity: 0.2
            }
          },
          boundaryGap: false
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            margin: 40,
            textStyle: {
              color: '#CCCCCC',
              fontSize: 24
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              opacity: 0.2
            }
          },
        }],
        series: [{
          type: 'line',
          data: [13, 10, 3, 12, 15, 30, 7],
          symbolSize: 0,
          symbol: 'circle',
          smooth: true,
          lineStyle: {
            color: '#529AFF'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(74, 146, 251,1)'
            },
            {
              offset: 1,
              color: 'rgba(74, 146, 251,0)'
            }
            ])
          },
        }]
      };
      myChart.setOption(option);
    },
    //数据报表--echarts图新数据梳理
    echartsChangeData() {
      console.log(this.fildNum, this.btnNum);
      let xAxis = [];
      switch (this.btnNum) {
        // 近24小时
        case 0:
          const minute = ['00', '10', '20', '30', '40', '50'];
          let link = Array(24).fill().map((mps, index) => {
            let hour = index;
            if (index < 10) {
              hour = '0' + index;
            }
            return minute.map((time, num) => {
              return hour + ":" + time
            })
          });
          link.forEach((itme, index) => { xAxis = xAxis.concat(itme) });
          break;
        //  近7天
        case 1:
          break;
        //近一月
        case 2:
          break;
        //近一年
        case 3:
          break;
      }
      this.echartsXAxis = xAxis
      
      this.reportEcharts();
    },
  },
  beforeDestroy() {
    //组件销毁之前调用，取消订阅
  }
};
 </script>