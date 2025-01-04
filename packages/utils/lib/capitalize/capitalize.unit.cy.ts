import { capitalize } from './capitalize'

describe('capitalize function', () => {
  it('should capitalize the first letter of a lowercase string', () => {
    expect(capitalize('hello')).to.equal('Hello')
  })

  it('should not change an already capitalized string', () => {
    expect(capitalize('World')).to.equal('World')
  })

  it('should handle an empty string', () => {
    expect(capitalize('')).to.equal('')
  })

  it('should handle a single character string', () => {
    expect(capitalize('a')).to.equal('A')
  })

  it('should not change non-alphabetic first characters', () => {
    expect(capitalize('123abc')).to.equal('123abc')
  })

  it('should handle strings with spaces', () => {
    expect(capitalize('hello world')).to.equal('Hello world')
  })

  it('should handle strings with special characters', () => {
    expect(capitalize('$pecial')).to.equal('$pecial')
  })
})
