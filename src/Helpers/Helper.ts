function generateGUID() : string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function next(needle : any, haystack : any[]) : any {
  const sorted = haystack.sort((a, b) => a - b)
  return sorted.find(number => number >= needle)
}

function posNext(needle : any, haystack : any[]) : number {
  const sorted = haystack.sort((a, b) => a - b)
  return sorted.findIndex(number => number >= needle)
}

function prev(needle : any, haystack : any[]) : any {
  const sorted = haystack.sort((a, b) => a - b)
  return sorted.reverse().find(number => number <= needle)
}

function posPrev(needle : any, haystack : any[]) : number {
  const sorted = haystack.sort((a, b) => a - b)
  return sorted.findIndex(number => number >= needle) - 1
}

function pos(needle : any, haystack : any[]) : number {
  const sorted = haystack.sort((a, b) => a - b)
  return sorted.findIndex(number => number === needle)
}

function numberToDate(number : number) : string {
  const hours = Math.floor(number / 60)
  const minutes = Math.floor(number % 60)
  const seconds = Math.floor((number % 1) * 60)

  let result = ''
  if (hours > 0) {
    result += `${hours}h `
  }
  if (minutes > 0) {
    result += `${minutes}min `
  }
  if (seconds > 0) {
    result += `${seconds}s`
  }
  return result || '0s'
}


export { generateGUID, next, posNext, prev, posPrev, pos, numberToDate }
