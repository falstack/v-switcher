export const getMatchedRouteIndex = (headers, path) => {
  let result = -1
  headers
    .map(_ => _.route)
    .forEach((route, index) => {
      if (path.startsWith(route)) {
        result = index
      }
    })
  return result
}

export const on = (function() {
  if (typeof window === 'undefined') {
    return
  }
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

export const off = (function() {
  if (typeof window === 'undefined') {
    return
  }
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

export const getScroll = (target, top) => {
  const prop = top ? 'pageYOffset' : 'pageXOffset'
  const method = top ? 'scrollTop' : 'scrollLeft'
  let ret = target[prop]
  if (typeof ret !== 'number') {
    ret = window.document.documentElement[method]
  }
  return ret
}

export const getOffset = element => {
  const rect = element.getBoundingClientRect()
  const scrollTop = getScroll(window, true)
  const scrollLeft = getScroll(window)
  const docEl = window.document.body
  const clientTop = docEl.clientTop || 0
  const clientLeft = docEl.clientLeft || 0
  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  }
}

export const getScrollTarget = dom => {
  let el = dom
  if (!el) {
    return null
  }
  while (
    el &&
    el.tagName !== 'HTML' &&
    el.tagName !== 'BOYD' &&
    el.nodeType === 1
  ) {
    const overflowY = window.getComputedStyle(el).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      if (el.tagName === 'HTML' || el.tagName === 'BODY') {
        return document
      }
      return el
    }
    el = el.parentNode
  }
  return document
}
