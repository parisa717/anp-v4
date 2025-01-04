export type MockedGqlWorkshopBrand = {
  id: string
  name: string
  timeUnits: number
}

export const workshopBrands: MockedGqlWorkshopBrand[] = Array.from({ length: 100 }, (_, i) => {
  const brands = [
    'OPEL',
    'TOYOTA',
    'KIA',
    'HONDA',
    'VOLKSWAGEN',
    'BMW',
    'MERCEDES',
    'AUDI',
    'FORD',
    'CHEVROLET',
    'NISSAN',
    'HYUNDAI',
    'MAZDA',
    'SUBARU',
    'VOLVO',
    'LEXUS',
    'PORSCHE',
    'FIAT',
    'RENAULT',
    'PEUGEOT',
  ]

  const brandIndex = i % brands.length

  const cycleNumber = Math.floor(i / brands.length)
  const positionInCycle = i % brands.length
  const timeUnits = 700 + cycleNumber * 30 + positionInCycle * 2

  return {
    id: `brand_${i + 1}`,
    name: brands[brandIndex],
    timeUnits: timeUnits,
  }
})
