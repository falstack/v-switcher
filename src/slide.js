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
    this.curentLeft = 0
    this.calcMaxLeft()
    this.init()
    return this
  }

  init() {
    const { el } = this
    el.addEventListener('touchstart', this._start.bind(this), {
      capture: true,
      passive: true
    })
    el.addEventListener('touchmove', this._move.bind(this), {
      capture: true
    })
    el.addEventListener('touchend', this._end.bind(this), {
      capture: true,
      passive: true
    })
  }

  _start(event) {
    const point = event.touches[0]
    this.startPoint = {
      x: point.pageX,
      y: point.pageY
    }
  }

  _move(event) {
    const point = event.touches[0]
    const start = this.startPoint
    const delta = {
      x: point.pageX - start.x,
      y: point.pageY - start.y
    }
    this.deltaPoint = delta
    if (this._condition(delta)) {
      return
    }
    event.preventDefault()
    const lastLeft = this.lastLeft
    let resultX = delta.x + lastLeft
    if (resultX > 0) {
      resultX = 0
    } else if (resultX + this.maxLeft < 0) {
      resultX = -this.maxLeft
    }
    this._translate(resultX)
    this.curentLeft = resultX
  }

  _end() {
    this.lastLeft = this.curentLeft
  }

  _translate(left) {
    requestAnimationFrame(() => {
      this.style.webkitTransform = `translateX(${left}px)`
    })
  }

  _condition(delta) {
    return Math.abs(delta.x) < Math.abs(delta.y) * 3
  }

  calcMaxLeft() {
    this.maxLeft = this.el.offsetWidth - window.screen.width
  }
}
