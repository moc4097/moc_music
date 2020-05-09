<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
            @touchstart.prevent="progressTouchStart"
            @touchmove.prevent="progressTouchMove"
            @touchend="progresTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {prefixStyle} from 'common/js/dom'

  // 小球的长度
  const progressBtnWidth = 16
  const transform = prefixStyle('transform')

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    computed: {
      // 避免因style的display设为none导致的clientWidth不准确
      progressBarWidth() {
        return this.$refs.progressBar.clientWidth === 0 ? this.progressBarWidth : this.$refs.progressBar.clientWidth
      }
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        // 横向偏移量
        const deltaX = e.touches[0].pageX - this.touch.startX
        // 进度条偏移量
        const offsetWidth = Math.min(Math.max(0, this.touch.left + deltaX),
          this.$refs.progressBar.clientWidth - progressBtnWidth)
        this._offset(offsetWidth)
      },
      progresTouchEnd(e) {
        this.touch.initiated = false
        this._triggerPercent()
      },
      progressClick(e) {
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        // 这里当我们点击progressBtn的，e.offsetX获取不对(我这里是可以的)
        // this._offset(e.offsetX)
        this._triggerPercent()
      },
      _triggerPercent() {
        // 进度条总长度
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        // 将percent数据通过事件派发出去
        this.$emit('percentChange', percent)
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          // 进度条总长度
          const barWidth = this.progressBarWidth - progressBtnWidth
          // 偏移长度
          const offsetWidth = newPercent * barWidth
          // 开始偏移
          this._offset(offsetWidth)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .progress-bar
    height: 30px

    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)

      .progress
        position: absolute
        height: 100%
        background: $color-theme

      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px

        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
