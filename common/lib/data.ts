import z from 'zod'
import { InitialData, InitialDataObject, FilteredData, FilteredDataObject } from './schemas'

export type InitialDataObject = z.infer<typeof InitialDataObject>
export type FilteredDataObject = z.infer<typeof FilteredDataObject>

export const fetchData = async () => {
  const response = await fetch('https://restcountries.com/v2/all?fields=name,nativeName,population,region,subregion,capital,topLevelDomain,currencies,independent,languages,borders,alpha3Code,flags')
  if (!response.ok) throw new Error()
  
  const countries = await response.json()

  try {
    return InitialData.parse(countries)
  } catch (error) {
    throw error
  }
}

export const filterData = (data: InitialDataObject[]): FilteredDataObject[] => {
  let filteredData: FilteredDataObject[] = []
  for (const country of data) {
    if (!country.independent || !country.currencies || !country.capital) continue

    filteredData.push({
      ...country,
      topLevelDomain: country.topLevelDomain[0],
      currencies: country.currencies.map(currency => currency.name),
      languages: country.languages.map(language => language.name),
      flag: country.flags.png,
      borders: getBorders(country.borders, data),
      capital: country.capital
    })
  }

  try {
    return FilteredData.parse(filteredData.sort((a, b) => b.population - a.population))
  } catch (error) {
    throw error
  }
}

const getBorders = (_borders: InitialDataObject['borders'], data: InitialDataObject[]): FilteredDataObject['borders'] => {
  if (_borders === undefined) return []

  let borders: FilteredDataObject['borders'] = []
  for (const border of _borders) {
    let borderName = data.find(country => country.alpha3Code === border)
    if (borderName === undefined) continue

    borders.push({ name: borderName.name, alpha3Code: border })
  }

  return borders
}

export const getAllRegions = (countries: FilteredDataObject[]) => {
  return countries.reduce((prev: string[], curr) => {
    if (!prev.includes(curr.region)) {
      return [...prev, curr.region]
    } else {
      return prev
    }
  }, [])
}

export const filterCountriesByName = (countries: FilteredDataObject[], filter: string) => {
  if (filter === '') return countries

  let regex = new RegExp(filter, 'i')
  return countries.filter(
    country => regex.test(country.name)
  )
}

export const filterCountriesByRegion = (countries: FilteredDataObject[], filter: string) => {

  let region = filter.toLowerCase()
  return countries.filter(
    country => country.region.toLowerCase() === region
  )
}