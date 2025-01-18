import { getCapacityValue } from './getCapacityValue'

describe('getCapacityValue', () => {
  it('should format range with minimum and maximal capacity correctly', () => {
    const color = {
      id: '1',
      color: '#ffffff',
      minimalCapacity: 1,
      maximalCapacity: 100,
    }
    const result = getCapacityValue(color)
    expect(result).to.equal('1%-100%')
  })

  it('should format greater than notation when maximalCapacity is undefined', () => {
    const color = {
      id: '1',
      color: '#ffffff',
      minimalCapacity: 100,
      maximalCapacity: undefined,
    }
    const result = getCapacityValue(color)
    expect(result).to.equal('>100%')
  })
})
