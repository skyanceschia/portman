import { setByPath } from './setByPath'

describe('setByPath', () => {
  it('should set a flat value using dot notation', () => {
    const objUnderTest = {
      foo: 'bar',
      email: 'foo@example.com',
      websites: [
        { url: 'http://example.com', type: 'primary' },
        { url: 'http://other-example.com', type: 'secondary' }
      ]
    }

    const result = setByPath(objUnderTest, 'websites[1].url', 'http://new-example.com')
    expect(result).toEqual({
      foo: 'bar',
      email: 'foo@example.com',
      websites: [
        { url: 'http://example.com', type: 'primary' },
        { url: 'http://new-example.com', type: 'secondary' }
      ]
    })
  })

  it('should set an object/array value using dot notation', () => {
    const objUnderTest = {
      foo: 'bar',
      email: 'foo@example.com',
      websites: [
        { url: 'http://example.com', type: 'primary' },
        { url: 'http://other-example.com', type: 'secondary' }
      ]
    }

    const result = setByPath(objUnderTest, 'websites', [
      { url: 'http://one-example.com', type: 'work' }
    ])

    expect(result).toEqual({
      foo: 'bar',
      email: 'foo@example.com',
      websites: [{ url: 'http://one-example.com', type: 'work' }]
    })
  })

  it('should return unaltered object if path does not exist', () => {
    const objUnderTest = {
      foo: 'bar',
      email: 'foo@example.com',
      websites: [
        { url: 'http://example.com', type: 'primary' },
        { url: 'http://other-example.com', type: 'secondary' }
      ]
    }

    const result = setByPath(objUnderTest, 'websites[10].url', 'http://new-example.com')
    expect(result).toEqual(objUnderTest)
  })

  it('should return append to object if path does not exist', () => {
    const objUnderTest = {
      foo: 'bar',
      email: 'foo@example.com',
      websites: [
        { url: 'http://example.com', type: 'primary' },
        { url: 'http://other-example.com', type: 'secondary' }
      ]
    }

    let result = setByPath(objUnderTest, 'fizz', 'buzz')
    expect(result).toEqual({
      foo: 'bar',
      email: 'foo@example.com',
      fizz: 'buzz',
      websites: [
        { url: 'http://example.com', type: 'primary' },
        { url: 'http://other-example.com', type: 'secondary' }
      ]
    })

    result = setByPath(objUnderTest, 'phone', { type: 'primary', number: '+32484836434' })
    expect(result).toEqual({
      foo: 'bar',
      email: 'foo@example.com',
      fizz: 'buzz',
      phone: { type: 'primary', number: '+32484836434' },
      websites: [
        { url: 'http://example.com', type: 'primary' },
        { url: 'http://other-example.com', type: 'secondary' }
      ]
    })

    result = setByPath(objUnderTest, 'websites[2].url', 'http://new-example.com')
    expect(result).toEqual({
      foo: 'bar',
      fizz: 'buzz',
      phone: { type: 'primary', number: '+32484836434' },
      email: 'foo@example.com',
      websites: [
        { url: 'http://example.com', type: 'primary' },
        { url: 'http://other-example.com', type: 'secondary' },
        { url: 'http://new-example.com' }
      ]
    })
  })
})
