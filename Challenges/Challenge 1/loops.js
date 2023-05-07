// scripts.js

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below 

const createArray = (length) => {
  const result = []

  for (let i = 1; i < length + 1; i++) {
      result.push(i)
  }

  return result
}

const createData = () => {
  const current = new Date() 
  const dayOne = current.setDate(1) 

  const startDay = current.getDay() 
  const daysInMonth = getDaysInMonth(current) 

  const weeks = createArray(5) 
  const days = createArray(7) 
  let value = null
  let day = null
  let result = []

  for (const weekIndex in weeks) {
      value = [{
          week: parseInt(weekIndex) + 1,
          days: []
      }]

 
      result.push(value)
      
      for (const dayIndex in days) {
        value = dayIndex - startDay
        day++
        const isValid = day > 0 && day <= daysInMonth 

          result[weekIndex].days = [{
              dayOfWeek: parseInt(dayIndex) + 1,
              value: isValid && day,
          }]
      }
    }

    return result
}

const addCell = (existing, classString, value) => {
  const result = /* html */ `
      <td ${classString}>
          ${value}
      </td>

      ${existing}
  `
  return result
}

const createHtml = (data) => {
  let result = ''

  for (const {week, days} of data) {
      let inner = ""
      addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`)
      let classString = null
      let isToday = null
      let isWeekend = null
      let isAlternate = null
  
      for (const {dayOfWeek, value} of days) {
          classString = 'table__cell'
          isToday = new Date() === value
          isWeekend = dayOfWeek >= 6 && dayOfWeek <= 7
          isAlternate = week % 2 === 0

          if (isToday) classString = `${classString} table__cell_today`
          if (isWeekend) classString = `${classString} table__cell_weekend`
          if (isAlternate) classString = `${classString} table__cell_alternate`
          inner = addCell(inner, classString, value)
      }

      result += `<tr>${inner}</tr>`
  }
  return result
}

// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)