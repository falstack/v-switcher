export default class {
  constructor(options = {}) {
    if (!(options.el instanceof Element)) {
      return
    }
    this.el = options.el
    this.style = this.el.style
    this.startPoint = {
      x: 0,
      y: 0
    }
    this.deltaPoint = {
      x: 0,
      y: 0
    }
    this.lastLeft = 0
    this.currentLeft = 0
    this.maxLeft = this.calcMaxLeft()
    this.prefix = this._calcCssPrefix()
    this.scrolling = false
    this.init()
    return this
  }

  init() {
    const { el, style } = this
    el.addEventListener('touchstart', this._start.bind(this), {
      capture: true,
      passive: true
    })
    el.addEventListener('touchmove', this._move.bind(this), true)
    el.addEventListener('touchend', this._end.bind(this), {
      capture: true,
      passive: true
    })
    style.willChange = 'transform'
  }

  _start(event) {
    const point = event.touches[0]
    this.startPoint = {
      x: point.pageX,
      y: point.pageY
    }
  }

  _move(event) {
    if (this.scrolling) {
      event.preventDefault()
      event.stopPropagation()
    }
    const point = event.touches[0]
    const start = this.startPoint
    const delta = {
      x: point.pageX - start.x,
      y: point.pageY - start.y
    }
    if (this._condition(delta)) {
      return
    }
    this.scrolling = true
    const lastLeft = this.lastLeft
    let resultX = delta.x + lastLeft
    if (resultX > 0) {
      resultX = 0
    } else if (resultX + this.maxLeft < 0) {
      resultX = -this.maxLeft
    }
    this.deltaPoint = delta
    if (resultX === this.currentLeft) {
      return
    }
    this._translate(resultX)
    this.currentLeft = resultX
  }

  _end() {
    this.lastLeft = this.currentLeft
    this.scrolling = false
  }

  _translate(left) {
    requestAnimationFrame(() => {
      this.style[`${this.prefix}transform`] = `translateX(${left}px)`
    })
  }

  _condition(delta) {
    return Math.abs(delta.x) < Math.abs(delta.y) * 3
  }

  _calcCssPrefix() {
    const regex = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/
    const styleDeclaration = document.getElementsByTagName('script')[0].style
    for (const prop in styleDeclaration) {
      if (regex.test(prop)) {
        return '-' + prop.match(regex)[0].toLowerCase() + '-'
      }
    }

    if ('WebkitOpacity' in styleDeclaration) {
      return '-webkit-'
    }
    if ('KhtmlOpacity' in styleDeclaration) {
      return '-khtml-'
    }
    return ''
  }

  calcMaxLeft() {
    return this.el.offsetWidth - window.screen.width
  }
}
