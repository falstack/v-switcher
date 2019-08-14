import ItemFactory from './item-factory'

export const getListByPage = ({ page, count, index }) => {
  console.log('getListByPage', index)
  return new Promise(resolve => {
    const total = 1024
    const hasFetch = (page - 1) * count
    const getLength = total - hasFetch >= count ? count : total - hasFetch
    const no_more = getLength + hasFetch >= total
    setTimeout(() => {
      const result = ItemFactory.get(getLength)
      resolve({
        result,
        no_more,
        total
      })
    }, 500)
  })
}
