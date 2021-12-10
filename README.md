# happy-draw
### 1,简介：快速实现圆盘抽奖的插件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`中文`| [English](www.baidu.com)
### 2,支持版本：vue2+
### 3,这个插件做了并支持什么 
>##### 随意参数，自动分割扇形，0~360°
>##### 提供圆盘转动动画，支持连续抽奖
>##### 自定义圆盘按钮，奖品文案
>##### 随意组合圆盘样式，非常轻量化
`demo`: https://www.soubangbang.com/draw/<br>
### Example
    `<happy-draw :items="result" ref="drawBox" offset="-50" size="14" :delay="3">
        <template v-slot:arrow>
          <div class="draw-button" @click="startRotate()">
            <span>开始抽奖</span>
          </div>
        </template>
        <template v-slot:firstReward>
          <span
            ><img src="./assets/images/beauty.png" width="15px" /><span
              class="lip-reward font-bold"
              >口红一支</span
            ></span
          >
        </template>
        <template v-slot:secondReward>
          <span
            ><img src="./assets/images/girl.png" width="40px" /><span
              class="lip-reward font-bold"
              >一个女朋友</span
            ></span
          >
        </template>
        <template v-slot:thirdReward>
          <span
            ><img src="./assets/images/keyboard.png" width="15px" /><span
              class="lip-reward font-bold black"
              >机械键盘</span
            ></span
          >
        </template>
      </happy-draw>
 
    <script>
    import HappyDraw from "./happy-draw/happy-draw.vue";
    export default {
      name: "app",
      components: { HappyDraw },
      data() {
        return {
          result: [  ]
       }
      methods: {
        startRotate() {
          this.$refs.drawBox.startRotate();
        },
        endRotate(type, order) {
          this.$refs.drawBox.endRotate(type, order).then((item) => {
            this.isShow = true;
            this.drawResult = { ...item };
            const timer = setTimeout(() => {
              this.isShow = false;
              clearTimeout(timer);
            }, 2000);
          });
    }
    </script>`
### API
>`slots`<font color=green >\<String\></font>自定义奖品内容，默认值为空。<br>
>`color`<String>该处奖品的背景颜色，默认值为空。<br>
>`text`<String>奖品文案,默认值为空。<br>
>`offset`<Number>奖品上下移动的距离,默认值为0。<br>
>`interval`<Number>圆盘每转一圈所需时间,默认值为800,单位ms<br>
>`offset`<Number>奖品上下移动的距离,默认值0 <br>
>`size`<Number>奖品字体大小,默认值14<br>
>`delay`<Number>停止抽奖后圆盘的延迟转动时间,默认值3，单位s<br>
>`items`<Array>奖品列表，默认值为[]<br>
>>`rate`<Number>扇形分割的比例，happy-draw会算出该奖品占总和的比例,默认值0。<br>
      
有用请Star
