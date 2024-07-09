import { getSeedNumber } from './sm-rando'

describe('getSeedNumber', () => {
  const MAX_SEED = 1000000

  test('Should return random number with no input', () => {
    const seedNumber = getSeedNumber()
    expect(seedNumber).toBeGreaterThan(0)
    expect(seedNumber).toBeLessThan(MAX_SEED)
  })

  test('Should generate a random number on 0', () => {
    const seedNumber = getSeedNumber(0)
    expect(seedNumber).toBeGreaterThan(0)
    expect(seedNumber).toBeLessThan(MAX_SEED)
  })

  test('Should return the same number if input is valid', () => {
    const seedNumber = getSeedNumber(12345)
    expect(seedNumber).toBe(12345)
  })

  test('Should throw an error if seed number is invalid', () => {
    const overMaxSeed = MAX_SEED + 1
    const underMinSeed = -1
    expect(() => getSeedNumber(overMaxSeed)).toThrow(`Invalid seed number: ${overMaxSeed}`)
    expect(() => getSeedNumber(underMinSeed)).toThrow(`Invalid seed number: ${underMinSeed}`)
  })

  test('Should return different results when called in quick succession', async () => {
    const seedNumber1 = getSeedNumber()
    await new Promise(resolve => setTimeout(resolve, 1))
    const seedNumber2 = getSeedNumber()
    await new Promise(resolve => setTimeout(resolve, 1))
    const seedNumber3 = getSeedNumber()
    await new Promise(resolve => setTimeout(resolve, 1))
    const seedNumber4 = getSeedNumber()
    const seedNumbers = [seedNumber1, seedNumber2, seedNumber3, seedNumber4]
    expect(new Set(seedNumbers).size).toBe(seedNumbers.length)
  })

})
