const numW = value => {
  if (!value) {
    return 0
  }
  if (('' + value).length >= 4) {
    // 千
    value = value / 1000
    value = value.toFixed(1)
    return value + ('千')
  } else {
    return value
  }
}
const split = str => {
  if (!str) {
    return ''
  }
  return str.split('|').join('、')
}
export default {numW, split}
