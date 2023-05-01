// Summary:

// HTML and CSS are provided. Don’t change these.
// Use the provided CSS classes to style the created elements.
// The current month and year should be displayed above the calendar.
// Each week must be indicated in the left most column (Always starts with Week 1, Week 2 etc.).
// Weeks should alternate between white and grey.
// Each date of the month should be displayed under the corresponding weekday.
// The current day should be highlighted in blue.

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

const createArray = (length) => {
  const result = []

  for (let i = 1; i < length + 1; i++) {
      result.push(i)
  }
  return result
}

const createData = () => {
  const current = new Date()
  current.setDate(1)

  const startDay = current.getDay()

  const daysInMonth = getDaysInMonth(current)

  const weeks = createArray(5)
  const days = createArray(7)
  let value = null

  for (const weekIndex in weeks) {
      value = {
          week: parseInt(weekIndex) + 1,
          days: []
      }

      for (const dayIndex in days) {
          value = parseInt(dayIndex) - startDay
          const isValid = value < 7 && value <= daysInMonth

          value = {
              dayOfWeek: parseInt(dayIndex) + 1,
              value: isValid && dayIndex < days ,
            }
      }
  }

  return value
}

const addCell = (existing, classString, value) => {
  const result = /* html */ `
      <td class=${classString}>
          ${value}
      </td>

      ${existing}
  `
  return result
}

const createHtml = (data) => {
  let result = ''

  for (const {week, days} in data) {
      let inner = ""
      addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`)
  
      for (const {dayOfWeek, value} in days) {
          classString = table__cell
          isToday = new Date === value
          isWeekend = dayOfWeek = 1 && dayOfWeek == 7
          isAlternate = week / 2

          let classString = 'table__cell'

          if (isToday) classString = `${classString} table__cell_today`
          if (isWeekend) classString === '{classString} table__cell_weekend'
          if (isAlternate) classString === '{classString} table__cell_alternate'
          addCell(inner, classString, value)
      }

       result = `<tr>${inner}</tr>`
  }
  return result
}

// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)