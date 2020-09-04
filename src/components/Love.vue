<template>
  <div class="wedding-invitation" :class="{ 'invitation-bounce':canOpen }">
    <div class="invitation-container" :class="{ 'invitation-down':isOpening }">
      <div class="invitation-cover">
        <div class="cover-content" :class="{'invitation-up':isOpening}">
          <div class="content-inside">
            <div class="loveHeart" ref="loveHeart">
              <canvas class="garden" ref="garden"></canvas>
              <div class="words" ref="words">
                <div class="messages" ref="messages">
                  亲爱的，祝你七夕节快乐哦！
                  <div class="elapseClock" ref="elapseClock"></div>
                </div>
                <div class="loveu" ref="loveu">
                  爱你直到永永远远...<br/>
                  <div class="signature">- 海刚子</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cover-inside-left" :class="{'opening':isOpening}"></div>
        <div class="cover-inside-right" :class="{'opening':isOpening}"></div>
        <div class="cover-inside-bottom" :class="{'opening':isOpening}" @click="closeInvitation">关闭</div>
        <img class="cover-inside-seal" src="../images/seal.png" @click="openInvitation" :class="{'invitation-flight':isOpening}">
      </div>
    </div>
  </div>
</template>

<script>
import { Garden } from '../assets/js/graden.js';
// require('../assets/js/love.js');

export default {
  props: ['canOpen'],
  data() {
    return {
      isOpening: false,
      year: moment('2012-04-03').toNow(true),
      offsetX: 0,
      offsetY: 0,
      garden: {},
    }
  },
  mounted() {
    var gardenCanvas = this.$refs.garden;
    gardenCanvas.width = $(this.$refs.loveHeart).width();
    gardenCanvas.height = $(this.$refs.loveHeart).height();
    console.log(gardenCanvas.width, gardenCanvas.height, 'gardenCanvas.height')
    var gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    var garden = new Garden(gardenCtx, gardenCanvas);
    var self = this;
    setInterval(function () {
      garden.render();
      self.garden = garden;
    }, Garden.options.growSpeed);
   
  },
  methods: {
    // 打开邀请函
    openInvitation(){
      this.isOpening = true;
      this.begainRender();
    },
    closeInvitation () {
      this.isOpening = false
      setTimeout(() => {
        this.$emit('onClose')
      }, 660)
    },
    begainRender() {
      this.offsetX = $(this.$refs.loveHeart).width() / 2,
      this.offsetY = $(this.$refs.loveHeart).height() / 2 - 55,
      console.log(this.offsetX , this.offsetY)
      this.startHeartAnimation();
    },
    getHeartPoint(angle) {
      var t = angle / Math.PI;
      var x = 18 * (6 * Math.pow(Math.sin(t), 3));
      var y = - 20 * (8 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return new Array(this.offsetX + x, this.offsetY + y);
    },
    startHeartAnimation() {
      var interval = 50;
      var angle = 10;
      var heart = new Array();
      var self = this;
      var animationTimer = setInterval(function () {
        var bloom = self.getHeartPoint(angle);
        var draw = true;
        for (var i = 0; i < heart.length; i++) {
          var p = heart[i];
          var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
          if (distance < Garden.options.bloomRadius.max * 1.3) {
            draw = false;
            break;
          }
        }
        if (draw) {
          heart.push(bloom);
          self.garden.createRandomBloom(bloom[0], bloom[1]);
        }
        if (angle >= 30) {
          clearInterval(animationTimer);
          self.showMessages();
        } else {
          angle += 0.2;
        }
      }, interval);
    },
    showMessages() {
      var self = this;
      $(this.$refs.messages).show(5000, function () {
        self.showLoveU();
      });
    },
    showLoveU() {
      $(this.$refs.loveu).show(3000);
    }
  }
}
</script>

<style lang="less">
  .wedding-invitation{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 30px 20px;
    padding-top: 60px;
    z-index: 4;
    transform: scale(0.05);
    -webkit-transform: scale(0.05);
    opacity: 0;
    transition: transform 0.8s cubic-bezier(.26,1.84,.39,.61), opacity 0.5s linear;
    -webkit-transition: -webkit-transform 0.8s cubic-bezier(.26,1.84,.39,.61), opacity 0.5s linear;
    background-size: 100%;
    overflow: hidden;
    &.invitation-bounce{
      opacity: 1;
      transform: scale(1);
      -webkit-transform: scale(1);
    }
    .invitation-container{
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
      -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0, 1, 1);
      &.invitation-down{
        transform: translateY(20px);
        -webkit-transform: translateY(20px);
      }
      .invitation-cover{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #D65047;
        border-radius: 10px;
        perspective: 500px;
        box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.15);
        .cover-content{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 10px 20px;
          transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
          -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0, 1, 1);
          &.invitation-up{
            transform: translateY(-60px);
            -webkit-transform: translateY(-60px);
          }
          .content-inside{
            height: 100%;
            padding: 20px;
            color: #a9895d;
            background-image: url('../images/photo.jpg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            text-align: center;
            overflow: auto;
            
          }
        }
        .cover-inside-left{
          position: absolute;
          left: 0;
          top: 0;
          width: 70%;
          height: 100%;
          border-radius: 10px;
          background-color: #D65047;
          box-shadow: 5px 0 10px rgba(0,0,0,0.2);
          z-index: 6;
          transition: transform 0.5s;
          -webkit-transition: -webkit-transform 0.5s;
          transform-origin: 0 50%;
          -webkit-transform-origin: 0 50%;
          &.opening{
            transform: rotate3d(0,1,0,-140deg);
            -webkit-transform: rotate3d(0,1,0,-140deg);
          }
        }
        .cover-inside-right{
          position: absolute;
          right: 0;
          top: 0;
          width: 40%;
          height: 100%;
          border-radius: 10px;
          background-color: #D65047;
          box-shadow: -5px 0 10px rgba(0,0,0,0.2);
          z-index: 5;
          transition: transform 0.5s;
          -webkit-transition: -webkit-transform 0.5s;
          transform-origin: 100% 50%;
          -webkit-transform-origin: 100% 50%;
          &.opening{
            transform: rotate3d(0,1,0,140deg);
            -webkit-transform: rotate3d(0,1,0,140deg);
          }
        }
        .cover-inside-bottom{
          position: absolute;
          right: 0;
          bottom: 14px;
          width: 100%;
          color: #a9895d;
          text-align: center;
          font-size: 16px;
        }
        .cover-inside-seal{
          position: absolute;
          left: 70%;
          bottom: 100px;
          width: 80px;
          height: 80px;
          margin-left: -40px;
          z-index: 7;
          transform-origin: 50% 50%;
          -webkit-transform-origin: 50% 50%;
          transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
          -webkit-transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
          &.invitation-flight{
            opacity: 0;
          }
        }
      }
    }
  }

  .loveHeart {
    float: left;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .garden {
    width: 100%;
    height: 46%;
    position: relative;
    top: 72px;
  }

  .elapseClock {
    text-align: right;
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 10px
  }

  .words {
    font-family: "sans-serif";
    width: 100%;
    font-size: 22px;
    color: #a9895d;
    position: relative;
    top: 70px;
  }

  .messages {
    display: none;
    text-align: left;
  }

  .invitation-container .digit {
    font-family: "digit";
    font-size: 36px
  }

  .loveu {
    padding: 5px;
    font-size: 22px;
    text-align: left;
    display: none
  }

  .loveu .signature {
    margin-top: 10px;
    font-size: 20px;
    font-style: italic
  }

  .clickSound {
    display: none
  }

  .code {
    float: left;
    width: 440px;
    color: #333;
    font-family: "Consolas", "Monaco", "Bitstream Vera Sans Mono", "Courier New", "sans-serif";
    font-size: 12px
  }

  .code .string {
    color: #2a36ff
  }

  .code .keyword {
    color: #7f0055;
    font-weight: bold
  }

  .code .placeholder {
    margin-left: 15px
  }

  .code .space {
    margin-left: 7px
  }

  .code .comments {
    color: #3f7f5f
  }

  .copyright {
    margin-top: 10px;
    text-align: center;
    width: 100%;
    color: #666
  }

  .errorMsg {
    width: 100%;
    text-align: center;
    font-size: 24px;
    position: absolute;
    top: 100px;
    left: 0
  }

  .copyright a {
    color: #666
  }
</style>
