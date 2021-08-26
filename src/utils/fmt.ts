import moment from "moment";

const timeFmter = "YYYY-MM-DD HH:mm:ss"
const oneDay = 60 * 60 * 24 * 1000

const fmtTime = (time: number): string => {
  const now = Date.now()
  const spendMs = now - time
  const spendDay = (spendMs / oneDay) >> 0
  let result = ''

  if (spendDay === 0) result = '新片刚到'
  else result = `${spendDay}天前`

  return moment(time).format(timeFmter) + `(${result})`
}

const fmtSize = (size: number): string => {
  size = (size / (1024*1024)) >> 0

  if (size > 1024) return (size / 1024).toFixed(2) + 'GB'
  return size + 'MB'
}

export {
  fmtSize,
  fmtTime
}
