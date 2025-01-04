import { GqlAvailabilityColorObjectType } from '@/shared/api/types.generated'

type ParsedCapacityValue = {
  minimalCapacity: GqlAvailabilityColorObjectType['minimalCapacity']
  maximumCapacity?: GqlAvailabilityColorObjectType['maximumCapacity']
}

export const parseCapacityValue = (capacityValue: string): ParsedCapacityValue => {
  const trimmedCapacityValue = capacityValue.trim()

  if (trimmedCapacityValue.startsWith('>')) {
    const minimalCapacity = parseInt(trimmedCapacityValue.replace('>', '').trim(), 10)
    return { minimalCapacity }
  } else {
    const [minStr, maxStr] = trimmedCapacityValue.split('-').map((part) => part.trim())
    const minimalCapacity = parseInt(minStr, 10)
    const maximumCapacity = parseInt(maxStr, 10)
    return { minimalCapacity, maximumCapacity }
  }
}
