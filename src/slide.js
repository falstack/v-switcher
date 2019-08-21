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
    this._setupScrollEvent()
    this._setupResizeEvent()
    return this
  }

  _setupTouchEvents() {
    const { el, events } = this
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

  _setupScrollEvent() {
    if (this.slideCount <= 1) {
      return
    }
    const scroll = this._scroll.bind(this)
    ;[].forEach.call(this.slides, item => {
      item.addEventListener('scroll', scroll, true)
    })
    this.events.scroll = scroll
  }

  _setupResizeEvent() {
    this.events.resize = this._setupSizes.bind(this)
    window.addEventListener('resize', this.events.resize, {
      capture: false,
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
    this.sliding = false
    this.scrolling = false
    this.scrollLock = 0
    this.startAt = 0
    this.events = {}
  }

  _setupProps(options) {
    this.el = options.el
    this.style = options.el.style
    this.duration =
      options.duration === undefined ? 300 : Math.abs(options.duration)
    this.sticky = options.sticky === undefined ? true : options.sticky
    this.swipe = options.swipe === undefined ? true : options.swipe
    this.disabled = options.disabled || false
    this.callback = options.callback
    this.slideCount = Math.max(options.count || 1, 1)
    this.activeIndex = options.index
      ? Math.max(Math.min(options.index, this.slideCount - 1), 0)
      : 0
    this.slides = options.el.children
  }

  _setupStyle() {
    const { style, slideCount, slideWidth } = this
    style.willChange = 'transform'
    style.width = `${slideCount * 100}%`
    if (slideCount > 1) {
      const children = this.el.children
      ;[].forEach.call(children, item => {
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
    const offsetWidth = this.el.parentNode.offsetWidth
    this.slideWidth = offsetWidth
    this.maxLeft = offsetWidth * this.slideCount - offsetWidth
  }

  _start(event) {
    if (this.moving || this.disabled || this.scrolling) {
      return
    }
    const point = event.touches[0]
    this.startPoint = {
      x: point.pageX,
      y: point.pageY
    }
    this.startAt = +new Date()
  }

  _move(event) {
    if (this.moving || this.disabled || this.scrolling) {
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
    if (!this.sliding) {
      this._lockSlidesTouch()
      this.sliding = true
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
    if (this.moving || this.disabled || this.scrolling) {
      return
    }
    this.sliding = false
    this.lastLeft = this.currentLeft
    this.maxDeltaPoint = {
      x: 0,
      y: 0
    }
    this._unlockSlidesTouch()
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

  _scroll(evt) {
    if (this.sliding) {
      evt.stopPropagation()
      evt.preventDefault()
      return
    }
    this.scrolling = true
    this.scrollLock && clearTimeout(this.scrollLock)
    this.scrollLock = setTimeout(() => {
      this.scrolling = false
    }, 250)
  }

  prev(custom = true) {
    if (this.activeIndex === 0 || this.moving) {
      return
    }
    if (custom) {
      this.activeIndex--
    } else if (this._isValidSlide()) {
      this._calcActiveIndex(false)
    }
    this._animation()
  }

  next(custom = true) {
    if (this.activeIndex === this.slideCount - 1 || this.moving) {
      return
    }
    if (custom) {
      this.activeIndex++
    } else if (this._isValidSlide()) {
      this._calcActiveIndex(true)
    }
    this._animation()
  }

  destroy() {
    const { el, events, slides, slideCount } = this
    el.removeEventListener('touchstart', events.touchstart, {
      capture: true,
      passive: true
    })
    el.removeEventListener('touchmove', events.touchmove, true)
    el.removeEventListener('touchend', events.touchend, {
      capture: true,
      passive: true
    })
    window.removeEventListener('resize', events.resize, {
      capture: false,
      passive: true
    })
    if (slideCount > 1) {
      ;[].forEach.call(slides, item => {
        item.removeEventListener('scroll', events.scroll, true)
      })
    }
  }

  _animation() {
    this.moving = true
    const { cssPrefix, duration, activeIndex } = this
    const left = -activeIndex * this.slideWidth
    requestAnimationFrame(() => {
      this.style[`${cssPrefix}transition-duration`] = `${duration}ms`
      this.style[`${cssPrefix}transform`] = `translateX(${left}px)`
      setTimeout(() => {
        this.style[`${cssPrefix}transition-duration`] = ''
        this.currentLeft = left
        this.lastLeft = left
        this.moving = false
        this.callback && this.callback(activeIndex)
      }, duration)
    })
  }

  _translate(left) {
    requestAnimationFrame(() => {
      this.style[`${this.cssPrefix}transform`] = `translateX(${left}px)`
    })
  }

  _lockSlidesTouch() {
    ;[].forEach.call(this.slides, dom => {
      dom.style['pointer-events'] = 'none'
    })
  }

  _unlockSlidesTouch() {
    ;[].forEach.call(this.slides, dom => {
      dom.style['pointer-events'] = 'auto'
    })
  }

  _isVerticalScroll(delta) {
    return Math.abs(delta.x) < Math.abs(delta.y) * 3
  }

  _calcCssPrefix() {
    let result = ''
    const regex = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/
    const styleDeclaration = document.getElementsByTagName('script')[0].style
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
