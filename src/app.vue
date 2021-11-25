<template>
  <div>
    <div class="draw-content">
      <luck-draw :items="result" ref="drawBox" offset="-50" size="14" :delay="3">
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
        <template v-slot:fourthReward>
          <span
            ><img src="./assets/images/perfume.png" width="15px" /><span
              class="lip-reward font-bold yellow"
              >一瓶香水</span
            ></span
          >
        </template>
        <!-- <template v-slot:fifthReward>
          <span
            ><img src="./assets/images/perfume.png" width="15px" /><span
              class="lip-reward font-bold"
              >一瓶香水</span
            ></span
          >
        </template>
        <template v-slot:sixthReward>
          <span
            ><img src="./assets/images/smile.png" width="16px" /><span
              class="lip-reward font-bold black"
              >谢谢惠顾</span
            ></span
          >
        </template> -->
      </luck-draw>
    </div>
    <div class="start-draw">
     <div v-for="award in result" :key="award.id">
       <span>{{award.text}}</span>
     </div>
    </div>
    <div v-if="isShow" class="draw-result">
      恭喜您抽中{{ drawResult.text
      }}<img :src="drawResult.img" v-if="drawResult.img" width="35px" />
    </div>
  </div>
</template>

<script>
import LuckDraw from "./luck-draw/luck-draw.vue";
export default {
  name: "app",
  components: { LuckDraw },
  data() {
    return {
      result: [
        {
          text: "口红一支",
          id: 0,
          color: "rgb(255 224 224)",
          rate: 0.3,
          slots: "firstReward",
          size:18,
          name:'口红一支',
          img:'./assets/images/beauty.png'
        },
        {
          text: "一个女朋友",
          id: 1,
          color: "white",
          rate: 0.15,
          slots: "secondReward",
          img: "./assets/images/girl.png",
          size: "12",
        },
        {
          text: "机械键盘",
          id: 2,
          color: "rgb(255 224 224)",
          rate: 0.1,
          slots: "thirdReward",
        },
        {
          text: "一瓶香水",
          id: 3,
          color: "white",
          rate: 0.1,
          slots: "fourthReward",
          img: "./assets/images/perfume.png",
        },
        // {
        //   text: "四等奖",
        //   id: 4,
        //   color: "rgb(255 224 224)",
        //   rate: 0.1,
        //   slots: "fifthReward",
        //   img: "./assets/images/perfume.png",
        // },
        // {
        //   text: "谢谢惠顾",
        //   id: 5,
        //   color: "white",
        //   rate: 0.3,
        //   slots: "sixthReward",
        // },
      ],
      isShow: false,
      drawResult: {
        text: "",
        img: "",
      },
    };
  },
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
    },
  },
};
</script>

<style lang="scss">
.draw-content {
  border: 2px solid red;
  border-radius: 50%;
  width: 30%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  .lip-reward {
    color: red;
    position: relative;
    top: -7px;
    // font-size: 12px;
    margin-left: 5px;
  }
  .font-bold {
    font-weight: bold;
  }
  .black {
    color: black;
  }
  .yellow {
    color: rgb(235, 189, 92);
  }
  .draw-button {
    width: 50px;
    height: 50px;
    background: #f95e6d;
    border-radius: 50%;
    position: relative;
    z-index: 20;
    font-size: 12px;
    cursor: pointer;
    span {
      position: absolute;
      top: 15px;
      font-weight: bold;
      color: white;
    }
    &:before {
      width: 0;
      height: 0;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
      border-bottom: 50px solid #f95e6d;
      display: block;
      position: absolute;
      content: "";
      top: -55%;
    }
  }
}
.start-draw {
  width: 800px;
  background: rgba(177, 174, 174, 0.8);
  height: 50px;
  margin-top: 30px;
  border-radius: 10px;
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    width: 100px;
    height: 30px;
    border-radius: 10px;
    color: white;
    text-align: center;
    align-items: center;
    cursor: pointer;
  }
  span:first-child {
    background-color: rgb(165, 110, 110);
  }
  span:nth-child(2) {
    background-color: rgb(144, 190, 142);
  }
  span:nth-child(3) {
    background-color: rgb(154, 195, 206);
  }
}
.draw-result {
  width: 300px;
  height: 150px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  position: fixed;
  top: 30%;
  left: 50%;
  z-index: 20;
  transform: translate(-50%, -50%);
}
</style>
