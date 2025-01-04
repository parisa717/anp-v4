import { range, RANGE_FALLBACK_ARRAY } from './range'

describe('range function', () => {
  it('should return numbers in the range incrementing by one by default', () => {
    expect(range(0, 5)).to.deep.equal([0, 1, 2, 3, 4, 5])
  })

  it('should return numbers in the range incrementing by provided step parameter value', () => {
    expect(range(0, 6, 2)).to.deep.equal([0, 2, 4, 6])
  })

  it('should return fallback array when start number is bigger than end number', () => {
    expect(range(6, 2)).to.deep.equal(RANGE_FALLBACK_ARRAY)
  })

  it('should return fallback array when step value is negative number', () => {
    expect(range(0, 2, -3)).to.deep.equal(RANGE_FALLBACK_ARRAY)
  })
})
