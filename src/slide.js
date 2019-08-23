export default class {
  /**
   *  sticky：默认为 true，滑动的时候会跟随手指
   *  swipe：默认为 true，touchend 时会翻到下一页或返回上一页
   */
  constructor(options = {}) {
    if (!(options.el instanceof Element)) {
      return
    }
    this._calcCssPrefix()
    this._setupConst()
    this._setupProps(options)
    this._setupSizes()
    this._setupIndex()
    this._setupStyle()
    this._setupTouchEvents()
    return this
  }

  prev(custom = true) {
    if (this.moving || (this.activeIndex === 0 && !this.continuous)) {
      return
    }
    if (this.activeIndex === 0 && this.continuous) {
      this._continuousAnimation(false)
      return
    }
    if (custom) {
      this.activeIndex--
    } else {
      if (this._isValidSlide()) {
        this._calcActiveIndex(false)
        this._animation()
        return
      }
      this._animation(false)
    }
  }

  next(custom = true) {
    if (
      this.moving ||
      (this.activeIndex === this.slideCount - 1 && !this.continuous)
    ) {
      return
    }
    if (this.activeIndex === this.slideCount - 1 && this.continuous) {
      this._continuousAnimation(true)
      return
    }
    if (custom) {
      this.activeIndex++
    } else {
      if (this._isValidSlide()) {
        this._calcActiveIndex(true)
        this._animation()
        return
      }
      this._animation(false)
    }
  }

  slide(index) {
    if (
      this.moving ||
      index === this.activeIndex ||
      index < 0 ||
      index > this.slideCount - 1
    ) {
      return
    }
    this.activeIndex = index
    this._animation()
  }

  scroll(left) {
    this.moving = true
    const { cssPrefix, duration, style } = this
    requestAnimationFrame(() => {
      style[`${cssPrefix}transition-duration`] = `${duration}ms`
      style[`${cssPrefix}transform`] = `translateX(${left}px)`
      setTimeout(() => {
        style[`${cssPrefix}transition-duration`] = ''
        this.currentLeft = left
        this.lastLeft = left
        this.moving = false
      }, duration)
    })
  }

  update(options = {}) {
    if (!this.cssPrefix) {
      return
    }
    if (this.adjust) {
      this.slideCount = this.el.children.length
    }
    if (options) {
      if (options.index !== undefined) {
        this.activeIndex = options.index
      }
      if (options.maxLeft !== undefined) {
        this.maxLeft = Math.abs(options.maxLeft)
      }
    }
    this.destroy()
    this._setupSizes()
    this._setupIndex()
    this._setupTouchEvents()
  }

  play(timeout = 1000) {
    const time = Math.max(timeout, this.duration)
    if (this.autoplayTimer) {
      return
    }
    this.continuous = true
    this.sticky = false
    this.autoplayTimer = setInterval(() => {
      this.next()
    }, time)
  }

  stop() {
    if (!this.autoplayTimer) {
      return
    }
    clearInterval(this.autoplayTimer)
    this.autoplayTimer = 0
  }

  destroy() {
    const { el, events } = this
    if (!el) {
      return
    }
    el.removeEventListener('touchstart', events.touchstart, {
      capture: true,
      passive: true
    })
    el.removeEventListener('touchmove', events.touchmove, true)
    el.removeEventListener('touchend', events.touchend, {
      capture: true,
      passive: true
    })
    this.stop()
  }

  _setupTouchEvents() {
    const { el, events } = this
    if (!el) {
      return
    }
    events.touchstart = this._start.bind(this)
    events.touchmove = this._move.bind(this)
    events.touchend = this._end.bind(this)
    el.addEventListener('touchstart', events.touchstart, {
      capture: true,
      passive: true
    })
    el.addEventListener('touchmove', events.touchmove, true)
    el.addEventListener('touchend', events.touchend, {
      capture: true,
      passive: true
    })
  }

  _setupConst() {
    this.startPoint = {
      x: 0,
      y: 0
    }
    this.deltaPoint = {
      x: 0,
      y: 0
    }
    this.maxDeltaPoint = {
      x: 0,
      y: 0
    }
    this.lastLeft = 0
    this.currentLeft = 0
    this.moving = false
    this.startAt = 0
    this.events = {}
    this.autoplayTimer = 0
  }

  _setupProps(options) {
    const duration = options.duration === undefined ? 300 : Math.abs(options.duration)
    this.el = options.el
    this.style = options.el.style
    this.duration = duration
    this.sticky = duration ? (options.sticky === undefined ? true : options.sticky) : false
    this.swipe = options.swipe === undefined ? true : options.swipe
    this.disabled = options.disabled || false
    this.continuous = options.continuous || false
    this.adjust = options.adjust === undefined ? true : options.adjust
    this.maxLeft = options.maxLeft ? Math.abs(options.maxLeft) : 0
    this.autoCalcMaxLeft = !options.maxLeft
    this.callback = options.callback
    this.beforeCallback = options.beforeCallback
    this.slideCount = Math.max(options.el.children.length, 1)
    this.activeIndex = options.index
      ? Math.max(Math.min(options.index, this.slideCount - 1), 0)
      : 0
  }

  _setupStyle() {
    if (!this.adjust) {
      return
    }
    const { style, slideCount, slideWidth } = this
    style.width = `${slideCount * 100}%`
    if (slideCount > 1) {
      const slides = this.el.children
      ;[].forEach.call(slides, item => {
        const { style } = item
        style.width = `${slideWidth}px`
        style.float = 'left'
      })
    }
  }

  _setupIndex() {
    if (!this.activeIndex) {
      return
    }
    const left = (-this.activeIndex * this.maxLeft) / (this.slideCount - 1)
    this.lastLeft = left
    this.currentLeft = left
    this._translate(left)
  }

  _setupSizes() {
    if (!this.el) {
      return
    }
    const offsetWidth = this.el.parentNode.offsetWidth
    this.slideWidth = offsetWidth
    if (this.autoCalcMaxLeft) {
      this.maxLeft = offsetWidth * this.slideCount - offsetWidth
    }
  }

  _start(event) {
    if (this.moving || this.disabled) {
      return
    }
    const point = event.touches[0]
    this.startPoint = {
      x: point.pageX,
      y: point.pageY
    }
    this.startAt = +new Date()
    this._lockedSwipeEvents()
  }

  _move(event) {
    if (this.moving || this.disabled) {
      return
    }
    const point = event.touches[0]
    const start = this.startPoint
    const max = this.maxDeltaPoint
    const delta = {
      x: point.pageX - start.x,
      y: point.pageY - start.y
    }
    this.maxDeltaPoint = {
      x: Math.max(max.x, Math.abs(delta.x)),
      y: Math.max(max.y, Math.abs(delta.y))
    }
    if (this._isVerticalScroll(this.maxDeltaPoint)) {
      return
    }
    this.deltaPoint = delta
    const lastLeft = this.lastLeft
    let resultX = delta.x + lastLeft
    if (resultX > 0) {
      resultX = 0
    } else if (resultX + this.maxLeft < 0) {
      resultX = -this.maxLeft
    }
    if (resultX === this.currentLeft) {
      return
    }
    if (this.sticky) {
      this._translate(resultX)
      this.currentLeft = resultX
    }
  }

  _end() {
    if (this.moving || this.disabled) {
      return
    }
    this.lastLeft = this.currentLeft
    this.maxDeltaPoint = {
      x: 0,
      y: 0
    }
    this._unlockSwipeEvents()
    const delta = this.deltaPoint
    if (!this.sticky && this._isVerticalScroll(delta)) {
      return
    }
    if (this.swipe) {
      delta.x > 0 ? this.prev(false) : this.next(false)
    } else {
      this._calcActiveIndex(delta.x < 0)
    }
  }

  _continuousAnimation(isNext) {
    this.moving = true
    const { cssPrefix, slideCount, duration, slideWidth, style, el, beforeCallback } = this
    const slides = el.children
    const slide = isNext ? slides[0] : slides[slideCount - 1]
    const left = isNext ? -slideCount * slideWidth : slideWidth
    const activeIndex = isNext ? 0 : slideCount - 1
    slide.style[`${cssPrefix}transform`] = `translateX(${(isNext ? 100 : -100) *
      slideCount}%)`
    beforeCallback && beforeCallback(activeIndex)
    requestAnimationFrame(() => {
      style[`${cssPrefix}transition-duration`] = `${duration}ms`
      style[`${cssPrefix}transform`] = `translateX(${left}px)`
      setTimeout(() => {
        const finalLeft = isNext ? 0 : -activeIndex * slideWidth
        style[`${cssPrefix}transition-duration`] = ''
        style[`${cssPrefix}transform`] = `translateX(${finalLeft}px)`
        slide.style[`${cssPrefix}transform`] = ''
        this.currentLeft = finalLeft
        this.lastLeft = finalLeft
        this.activeIndex = activeIndex
        this.moving = false
        this.callback && this.callback(activeIndex)
      }, duration)
    })
  }

  _animation(emit = true) {
    this.moving = true
    const { cssPrefix, duration, activeIndex, style, beforeCallback } = this
    const left = -activeIndex * this.slideWidth
    beforeCallback && beforeCallback(activeIndex)
    requestAnimationFrame(() => {
      style[`${cssPrefix}transition-duration`] = `${duration}ms`
      style[`${cssPrefix}transform`] = `translateX(${left}px)`
      setTimeout(() => {
        style[`${cssPrefix}transition-duration`] = ''
        this.currentLeft = left
        this.lastLeft = left
        this.moving = false
        if (emit) {
          this.callback && this.callback(activeIndex)
        }
      }, duration)
    })
  }

  _translate(left) {
    requestAnimationFrame(() => {
      this.style[`${this.cssPrefix}transform`] = `translateX(${left}px)`
    })
  }

  _lockedSwipeEvents() {
    this.style['touch-action'] = 'none'
    this.style.willChange = 'transform'
  }

  _unlockSwipeEvents() {
    this.style['touch-action'] = 'auto'
    this.style.willChange = ''
  }

  _isVerticalScroll(delta) {
    return Math.abs(delta.x) < Math.abs(delta.y) * 3
  }

  _calcCssPrefix() {
    let result = ''
    const regex = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/
    const styleDeclaration = document.getElementsByTagName('script')[0].style
    // eslint-disable-next-line no-unused-vars
    for (const prop in styleDeclaration) {
      if (regex.test(prop)) {
        result = '-' + prop.match(regex)[0].toLowerCase() + '-'
      }
    }

    if (!result && 'WebkitOpacity' in styleDeclaration) {
      result = '-webkit-'
    }
    if (!result && 'KhtmlOpacity' in styleDeclaration) {
      result = '-khtml-'
    }
    this.cssPrefix = result
  }

  _calcActiveIndex(isNext) {
    if (this.sticky) {
      this.activeIndex = isNext
        ? Math.ceil(Math.abs(this.currentLeft) / this.slideWidth)
        : Math.floor(Math.abs(this.currentLeft) / this.slideWidth)
    } else {
      isNext ? this.activeIndex++ : this.activeIndex--
    }
  }

  _isValidSlide() {
    const x = Math.abs(this.deltaPoint.x)
    return (
      (Number(+new Date() - this.startAt) < 250 && x > 20) ||
      x > this.slideWidth / 2
    )
  }
}
