import { AvailabilityColorToValidate } from './types'

const VALID_CAPACITY_FORMAT_REG_EXP = /^[0-9]+-[0-9]+$/
const VALID_LAST_CAPACITY_FORMAT_REG_EXP = /^>[0-9]+$/

/**
 * We need {errorIndex} in the returned object because we need to show the error message for the correct field
 *
 * @param availabilityColors
 */
export const validateCapacityFormat = (
  availabilityColors: AvailabilityColorToValidate[],
): { isValid: boolean; errorIndex: number } => {
  /**
   * Check all entries except the last one the following format:
   *
   * "There must be no space between the value and the hyphen"
   *
   * Examples: "0-50"
   */

  const errorIndex = availabilityColors
    .slice(0, -1)
    .findIndex(
      ({ capacityValueWithoutPercentages }) =>
        !VALID_CAPACITY_FORMAT_REG_EXP.test(capacityValueWithoutPercentages.trim()),
    )

  if (errorIndex !== -1) {
    return {
      isValid: false,
      errorIndex,
    }
  }

  /**
   *  The last capacity entry has another validation rule:
   *
   *  "The last capacity level must be entered in the format >Value"
   *
   *  Examples: ">100"
   */

  const lastCapacityValue = availabilityColors[availabilityColors.length - 1].capacityValueWithoutPercentages.trim()

  if (!VALID_LAST_CAPACITY_FORMAT_REG_EXP.test(lastCapacityValue)) {
    return {
      isValid: false,
      errorIndex: availabilityColors.length - 1,
    }
  }

  return {
    isValid: true,
    errorIndex: -1,
  }
}
