<template>
  <div class="circle-box">
    <div class="circle-content" :style="circleStyles">
      <div class="reward-content" v-for="reward in items" :key="reward.id">
        <!-- <div class="reward-list" :style="formatStyle(reward, items)"></div> -->
        <Sector :rotateInfo="getRotateInfo(reward, items)" :reward="reward"></Sector>
        <div class="text-content" :style="formatTextStyle(reward, items)">
          <div
            v-if="reward.slots"
            :style="{
              top: getOffset(reward),
              'font-size': getSize(reward),
            }"
          >
            <slot :name="reward.slots"></slot>
          </div>
          <div v-else :style="{ 'font-size': getSize(reward) }">
            {{ reward.text }}
          </div>
        </div>
      </div>
    </div>
    <div class="arrow-box">
      <slot name="arrow"></slot>
    </div>
  </div>
</template>

<script>
import Sector from "./sector/sector.vue";
export const circleDeg = 360;
export const maxDeg = 0.25;
export const half = 0.5;
export default {
  name: "luck-draw",
  components: { Sector },
  props: {
    items: {
      type: Array,
      default: [],
    },
    interval: {
      type: Number,
      default: 800,
    },
    offset: {
      type: String,
      default: 0,
    },
    size: {
      type: String,
      default: 12,
    },
    delay: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      maxRate: 0,
      rotateCnt: 0,
      endPosition: undefined,
      startTimer: 0,
      isEnded: false,
      circleStyles: {},
      endDeg: 0,
      drawCnt: 0,
      isStart: false,
    };
  },
  watch: {
    rotateCnt: function () {
      if (this.endPosition === undefined) {
        this.circleStyles = {
          transition: `all ${this.interval}ms linear`,
          transform: `rotate(${this.rotateCnt * circleDeg + this.endDeg}deg)`,
        };
      } else if (this.isEnded && this.endPosition !== undefined) {
        const endRatio = this.getSlowTime();
        this.endDeg =
          this.endDeg === 0
            ? (endRatio / this.maxRate) * circleDeg
            : (endRatio / this.maxRate) * circleDeg + this.drawCnt * circleDeg;
        this.circleStyles = {
          transition: `all ${this.delay * this.interval}ms ease-out`,
          transform: `rotate(${this.rotateCnt * circleDeg + this.endDeg}deg)`,
        };
        this.drawCnt += 1;
      }
    },
  },
  methods: {
    getSize(reward) {
      const size = reward.size || this.size;
      return `${size}px`;
    },
    getRotateInfo(reward, items) {
      this.getMaxRate(items);
      const { ratio, currentRatio } = this.getRatio(reward, this.maxRate);
      reward.deg = ratio * circleDeg;
      reward.skew = ((maxDeg - ratio) / maxDeg) * 90;
      return {
        deg: currentRatio * circleDeg,
        skew: reward.skew,
        ratio: ratio * circleDeg,
        maxRate: this.maxRate,
      };
    },
    formatTextStyle(reward, items) {
      this.getMaxRate(items);
      const { ratio, currentRatio } = this.getRatio(reward, this.maxRate);
      return {
        transform: `rotate(${(currentRatio + half * ratio) * circleDeg}deg)`,
      };
    },
    getMaxRate(items) {
      if (!this.maxRate) {
        this.maxRate = items.reduce((total, item) => {
          if (typeof item.rate !== "number") {
            throw new Error("The attribute of rate must be number type.");
          }
          item.currentRate = total;
          return (total = total + item.rate);
        }, 0);
      }
    },
    getSlowTime() {
      const ratio = this.endPosition.rate / this.maxRate;
      const endRatio =
        this.maxRate - ratio * half - this.endPosition.currentRate;
      return endRatio;
    },
    getRatio(reward, maxRate) {
      const ratio = reward.rate / maxRate;
      const currentRatio = reward.currentRate / maxRate;
      return { ratio, currentRatio };
    },
    getOffset(reward) {
      return reward.offset
        ? `${reward.offset}px`
        : this.offset
        ? `${this.offset}px`
        : "none";
    },
    startRotate() {
      if (!this.isStart) {
        this.isStart = true;
      } else {
        return;
      }
      this.startTimer = new Date().getTime();
      this.rotateCnt = this.rotateCnt === 0 ? 1 : this.rotateCnt + 1;
      const timer = setInterval(() => {
        this.rotateCnt += 1;
        if (this.endPosition !== undefined) {
          this.isEnded = true;
          clearInterval(timer);
        }
      }, this.interval);
    },
    endRotate(type, order) {
      if (type === "index") {
        this.endPosition = this.items[order];
      } else {
        this.items.forEach((item) => {
          if (item[type] === order) {
            this.endPosition = { ...item };
          }
        });
      }
      const endTimer = new Date().getTime();
      const diffTimer = endTimer - this.startTimer;

      const endRatio = this.getSlowTime();
      const slowTime =
        this.delay * (1 + endRatio / this.maxRate) * this.interval;
      const timeout = this.interval - (diffTimer % 1000) + slowTime;

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.endPosition) {
            resolve(this.endPosition);
            this.endPosition = undefined;
            this.isStart = false;
          } else {
            this.isStart = false;
            reject(new Error("奖品不存在"));
          }
        }, timeout);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.circle-box {
  background-color: rgb(212, 184, 184);
  width: 100%;
  padding-top: 100%;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  .circle-content {
    position: absolute;
    top: 0px;
    width: 100%;
    bottom: 0px;
  }
  .reward-list {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 50%;
    height: 50%;
    transform-origin: 0% 100%;
    // border:1px solid black;
    span {
      position: absolute;
      top: 60%;
      left: 20px;
      transform: rotate(-36deg);
    }
  }
  .text-content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    right: 0px;
    width: 50%;
    height: 50%;
    transform-origin: 0% 100%;
    z-index: 20;
    div {
      transform: translateX(-50%);
      text-align: center;
      width: 100%;
      position: relative;
    }
  }
  .arrow-box {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 30;
    transform: translate(-50%, -50%);
  }
}
</style>
