export default (dom, target, duration) => {
  let currentTime = 0
  const scrollX = dom.scrollLeft
  const scrollTargetX = target || 0
  const time = Math.max(
    0.1,
    Math.min(Math.abs(scrollX - scrollTargetX) / duration, duration)
  )
  const animationLine = pos => -0.5 * (Math.cos(Math.PI * pos) - 1)
  if (!dom.requestAnimFrame) {
    dom.requestAnimFrame = (function() {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60)
        }
      )
    })().bind(window)
  }
  function tick() {
    currentTime += 1 / 60
    const p = currentTime / time
    const t = animationLine(p)
    if (p < 1) {
      dom.requestAnimFrame(tick)
      dom.scrollLeft = scrollX + (scrollTargetX - scrollX) * t
    } else {
      dom.scrollLeft = scrollTargetX
    }
  }
  tick()
}
