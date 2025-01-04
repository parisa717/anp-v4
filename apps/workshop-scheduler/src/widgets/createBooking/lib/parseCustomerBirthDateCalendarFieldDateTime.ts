import { parse } from 'date-fns'

export const parseCustomerBirthDateCalendarFieldDateTime = (text: string) => {
  // checks if the input text has a format ddMMyy
  if (text.length === 6 && !text.includes('.')) {
    const date = parse(text, 'ddMMyy', Date.now())

    return new Date(date)
  }

  // checks if the input text has a format ddMMyyyy
  if (text.length === 8 && !text.includes('.')) {
    const date = parse(text, 'ddMMyyyy', Date.now())

    return new Date(date)
  }

  // checks if the input text has a format dd.MM.yyyy
  if (text.length === 10 && text.includes('.')) {
    const [day, month, year] = text.split('.')

    return new Date(`${month}.${day}.${year}`)
  }

  return new Date()
}
