import Link from 'next/link'
import Image from 'next/image'
import { fetchData, filterData } from '../../common/lib/data'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import type { FilteredDataObject } from '../../common/lib/data'

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const countries = await fetchData()

  return {
    paths: filterData(countries).map(country => ({
      params: { id: country.alpha3Code }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams

  const countries = await fetchData()

  return {
    props: {
      countryData: filterData(countries).find(country => country.alpha3Code === id)
    }
  }
}

interface IProps {
  countryData: FilteredDataObject
}

const Country: NextPage<IProps> = ({ countryData }) => {
  return (
    <main className="pb-20">
      <div className="container px-7">
        <Link href="/">
          <a className="mt-10 desktop:mt-20 w-[6.5rem] desktop:w-[8.5rem] h-8 desktop:h-10 bg-white desktop:bg-gray-400 dark:bg-[#2B3844] font-light flex justify-center items-center gap-3 drop-shadow desktop:text-[1rem] rounded-md">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="dark:fill-white" fillRule="evenodd" clipRule="evenodd" d="M5.81802 0.696699L6.87868 1.75736L3.3785 5.25754H16.7428L16.7428 6.74246H3.3785L6.87868 10.2426L5.81802 11.3033L0.514719 6L5.81802 0.696699Z" fill="#111517" />
            </svg>
            Back
          </a>
        </Link>

        <div className="mt-16 desktop:mt-20 flex flex-col desktop:flex-row desktop:gap-[7.5rem] desktop:items-center desktop:text-[1rem]">
          <div className="mt-10">
            <h1 className="text-[1.375rem] desktop:text-[2rem] font-extra-bold">{countryData.name}</h1>
            <div className="mt-4 desktop:mt-6 flex flex-col desktop:flex-row gap-8 desktop:gap-[8.8125rem]">
              <div className="flex flex-col gap-2">
                <p className="font-light"><span className="font-bold capitalize">Native name: </span>{countryData.nativeName}</p>
                <p className="font-light"><span className="font-bold">Population: </span>{countryData.population.toLocaleString('en', { useGrouping: true })}</p>
                <p className="font-light"><span className="font-bold">Region: </span>{countryData.region}</p>
                <p className="font-light"><span className="font-bold capitalize">Sub region: </span>{countryData.subregion}</p>
                <p className="font-light"><span className="font-bold">Capital: </span>{countryData.capital}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-light"><span className="font-bold capitalize">Top level domain: </span>{countryData.topLevelDomain}</p>
                <p className="font-light"><span className="font-bold">Currenc{countryData.currencies.length > 1 ? 'ies' : 'y'}: </span>{countryData.currencies.join(', ')}</p>
                <p className="font-light"><span className="font-bold">Language{countryData.currencies.length > 1 && 's'}: </span>{countryData.languages.join(', ')}</p>
              </div>
            </div>
            <div className="mt-[2.125rem] desktop:mt-[4.375rem] flex items-center gap-4 flex-wrap">
              <p className="text-[1rem] font-bold capitalize">Border countries:</p>
              {countryData.borders.length === 0
                ? <p className="font-light">None</p>
                : (
                  <ul className="flex gap-[.625rem] flex-wrap">
                    {countryData.borders.map(border => (
                      <li key={border.alpha3Code}>
                        <Link href={`/country/${border.alpha3Code}`}>
                          <a className="text-[.75rem] desktop:text-[.875rem] font-light h-7 flex items-center px-7 bg-white dark:bg-[#2B3844] drop-shadow">{border.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )
              }
            </div>
          </div>
          <div className="order-first relative w-80 shrink-0 desktop:w-[35rem] h-[14.75rem] desktop:h-[26.4375rem] rounded-[.3125rem] desktop:rounded-[.625rem]">
            <Image src={countryData.flag} layout="fill" objectFit="cover" className="rounded-[.3125rem] desktop:rounded-[.625rem]" alt={`Flag of ${countryData.name}`} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Country
