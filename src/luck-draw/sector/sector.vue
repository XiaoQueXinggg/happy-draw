<template>
  <div class="sector-box" :style="getStyle()">
    <div
      :class="'sector-item' + index"
      v-for="(sector, index) of sectors()"
      :key="sector.id"
      :style="sector"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Sector",
  props: {
    rotateInfo: {
      type: Object,
      default: {},
    },
    reward: {
      type: Object,
      default: {},
    },
  },
  methods: {
    getStyle() {
      return { transform: `rotate(${this.rotateInfo.deg}deg)` };
    },
    sectors() {
      const bgClrs = {
        "background-color": this.reward.color ? this.reward.color : "white",
      };
      if (this.rotateInfo.ratio > 90) {
        const numbers = Math.floor(this.rotateInfo.ratio / 90) + 1;
        const result = [];
        for (let i = 0; i < numbers; i++) {
          if (i === 0) {
            result.push({
              ...bgClrs,
            });
          }else if (numbers === i + 1) {
            const deg = (i + 1) * 90 - this.rotateInfo.ratio;
            result.push({
              ...bgClrs,
              transform: `rotate(-${deg}deg)`,
            });
          } else{
            result.push({
              ...bgClrs,
            });
          }
        }
        return result;
      }
      return [
        {
          ...bgClrs,
          transform: `skewY(-${this.reward.skew}deg)`,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.sector-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
  width: 50%;
  height: 50%;
  transform-origin: 0% 100%;
  .sector-item0 {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    transform-origin: 0% 100%;
  }
  .sector-item1 {
    position: absolute;
    top: 100%;
    right: 0px;
    width: 100%;
    height: 100%;
    transform-origin: 0% 0%;
  }
  .sector-item2 {
    position: absolute;
    top: 100%;
    right: 100%;
    width: 100%;
    height: 100%;
    transform-origin: 100% 0%;
  }
  .sector-item3 {
    position: absolute;
    top: 0;
    right: 100%;
    width: 100%;
    height: 100%;
    transform-origin: 100% 0%;
  }
}
</style>
