import Link from 'next/link'
import { memo } from 'react'
import { filterCountriesByName, filterCountriesByRegion } from '../lib/data'
import { saveVerticalScrollPositionToSessionStorage } from '../lib/sessionStorage'
import CountryCard from './CountryCard'
import type { FilteredDataObject } from '../lib/data'

interface IProps {
  countries: FilteredDataObject[]
  nameFilter: string
  regionFilter: string | null
}

const CountryList: React.FC<IProps> = memo(({ countries, nameFilter, regionFilter }) => {
  const applyCustomFilter = (countries: FilteredDataObject[]) => {
    if (regionFilter !== null) {
      countries = filterCountriesByRegion(countries, regionFilter)
    }
    if (nameFilter.length !== 0) {
      countries = filterCountriesByName(countries, nameFilter)
    }

    return countries
  }

  return (
    <ul className="flex flex-col desktop:flex-row items-center desktop:items-start gap-10 desktop:gap-[4rem] desktop:flex-wrap">
      {applyCustomFilter(countries).map(country => (
        <li key={country.alpha3Code}>
          <Link href={`/country/${country.alpha3Code}`}>
            <a onClick={() => saveVerticalScrollPositionToSessionStorage(window.scrollY)}>
              <CountryCard country={country} />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
})

export default CountryList