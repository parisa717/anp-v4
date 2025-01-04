// TODO check the validity of having this function once we include a date library in the project
export const TIME_SEPARATOR = ':'

/**
 * Converts a time string to a date
 * @param hoursAndMinutes time in format HH:MM
 * @example
 * // returns Wed Dec 11 2024 13:00:00 GMT+0100 (czas środkowoeuropejski standardowy)
 * hoursAndMinutesToDate('13:00');
 * @returns Date created from the current day and the given time
 */
export const hoursAndMinutesToDate = (hoursAndMinutes: string) => {
  const [hours, minutes] = hoursAndMinutes.split(TIME_SEPARATOR)

  return new Date(new Date().setHours(Number(hours), Number(minutes)))
}
