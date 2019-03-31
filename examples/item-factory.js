export default new class {
  constructor() {
    this.lastIndex = 0
  }

  get(count) {
    var items = [],
      i
    for (i = 0; i < count; i++) {
      const width = 100 + ~~(Math.random() * 50)
      const height = 100
      items[i] = {
        index: this.lastIndex++,
        id: Math.random().toString(36),
        style: {
          color: this.getRandomColor()
        },
        width,
        height
      }
    }
    return items
  }

  getRandomColor() {
    var colors = [
      'rgba(21,174,103,.5)',
      'rgba(245,163,59,.5)',
      'rgba(255,230,135,.5)',
      'rgba(194,217,78,.5)',
      'rgba(195,123,177,.5)',
      'rgba(125,205,244,.5)'
    ]
    return colors[~~(Math.random() * colors.length)]
  }
}()
