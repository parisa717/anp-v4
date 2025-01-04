export type MockedGqlLocationOverbooking = {
  minimumOverbookingMultiplier: number
  capacityOverbookingMultiplier: number
  maxCapacityMultiplier: number
}

export const locationOverbooking: MockedGqlLocationOverbooking[] = [
  {
    minimumOverbookingMultiplier: 1.2,
    capacityOverbookingMultiplier: 1.5,
    maxCapacityMultiplier: 1.9,
  },
]
