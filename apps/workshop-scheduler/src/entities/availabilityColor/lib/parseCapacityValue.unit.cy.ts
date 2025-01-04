import { parseCapacityValue } from './parseCapacityValue'

describe('parseCapacityValue', () => {
  it('should parse range with spaces around hyphen correctly', () => {
    const result = parseCapacityValue('1 - 100')
    expect(result).to.deep.equal({
      minimalCapacity: 1,
      maximumCapacity: 100,
    })
  })

  it('should parse range without spaces around hyphen correctly', () => {
    const result = parseCapacityValue('1-100')
    expect(result).to.deep.equal({
      minimalCapacity: 1,
      maximumCapacity: 100,
    })
  })

  it('should parse range with extra whitespace correctly', () => {
    const result = parseCapacityValue('  1  -  100  ')
    expect(result).to.deep.equal({
      minimalCapacity: 1,
      maximumCapacity: 100,
    })
  })

  it('should parse greater than notation correctly', () => {
    const result = parseCapacityValue('> 100')
    expect(result).to.deep.equal({
      minimalCapacity: 100,
    })
  })

  it('should parse greater than notation with extra whitespace correctly', () => {
    const result = parseCapacityValue('  >  100  ')
    expect(result).to.deep.equal({
      minimalCapacity: 100,
    })
  })
})
