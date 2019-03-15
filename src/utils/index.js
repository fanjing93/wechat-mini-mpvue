const formatTime = (date, needHms = true, needHm = true, needStart = false) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  if (needStart) {
    return formatNumber(month) + '月' + formatNumber(day) + '日' + formatNumber(hour) + ':' + formatNumber(minute) + '开始'
  } else {
    return [year, month, day].map(formatNumber).join('.') + (needHms ? ' ' + [hour, minute, second].map(formatNumber).join(':') : '') + (needHm ? ' ' + [hour, minute].map(formatNumber).join(':') : '')
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// pop_zero去除后面的0
const formatPrice = (price, popZero = false) => {
  var result = price > 0 ? price / 100 : 0
  return popZero ? parseFloat(formatFloat(result)) : formatFloat(result)
}

const formatFloat = (price, num = 2) => {
  return Math.abs(price).toFixed(num)
}

module.exports = {
  formatTime,
  formatPrice,
  formatFloat
}
