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
  return haystack.length - sorted.reverse().findIndex(number => number <= needle)
}


export { generateGUID, next, posNext, prev, posPrev }
