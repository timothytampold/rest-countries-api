import { useState, useEffect } from 'react'
import { fetchData, filterData, getAllRegions } from '../common/lib/data'
import { getVerticalScrollPositionFromSessionStorage } from '../common/lib/sessionStorage'
import DropdownSelect from '../common/components/DropdownSelect'
import CountryList from '../common/components/CountryList'
import type { NextPage, GetStaticProps } from 'next'
import type { FilteredDataObject } from '../common/lib/data'

export const getStaticProps: GetStaticProps = async () => {
  const countries = await fetchData()

  return {
    props: {
      countriesData: filterData(countries)
    }
  }
}

interface IProps {
  countriesData: FilteredDataObject[]
}

const Home: NextPage<IProps> = ({ countriesData }) => {
  const [nameFilter, setNameFilter] = useState<string>('')
  const [regionFilter, setRegionFilter] = useState<string | null>(null)

  useEffect(() => {
    let scrollPosition = getVerticalScrollPositionFromSessionStorage()
    if (scrollPosition !== null) {
      window.scroll(0, scrollPosition)
    }
  }, [])

  return (
    <main className="container pt-6 desktop:pt-12 pb-20">
      <div className="flex flex-col gap-10 desktop:flex-row desktop:justify-between desktop:items-center">
        <div className="bg-white dark:bg-[#2B3844] drop-shadow rounded-[.3125rem] px-8 h-12 desktop:h-14 flex items-center gap-7 text-[.75rem] desktop:text-[.875rem] desktop:w-[30rem]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#858585" className="w-[.9725rem] desktop:w-[1.09375rem] h-[.9725rem] desktop:h-[1.09375rem]">
            <path className="dark:fill-white" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
          </svg>
          <input
            type="text"
            className="w-full dark:placeholder:text-white dark:bg-[#2B3844]"
            placeholder="Search for a country…"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
          />
        </div>
        <DropdownSelect
          defaultTitle="Filter by Region"
          options={getAllRegions(countriesData)}
          selectedValue={regionFilter}
          setSelectedValue={setRegionFilter}
        />
      </div>
      <div className="mt-10 desktop:mt-12">
        <CountryList countries={countriesData} nameFilter={nameFilter} regionFilter={regionFilter} />
      </div>
    </main>
  )
}

export default Home