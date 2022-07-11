import Image from 'next/image'
import type { FilteredDataObject } from '../lib/data'

interface Props {
  country: FilteredDataObject
}

const CountryCard: React.FC<Props> = ({ country }) => {
  return (
    <article className="w-[16.5rem] h-[23rem] bg-white dark:bg-[#2B3844] rounded-[.3125rem] drop-shadow flex flex-col gap-6">
      <div className="px-6">
        <h2 className="text-[1.125rem] font-extra-bold">{country.name}</h2>
        <p className="mt-4 font-light"><span className="font-bold">Population: </span>{country.population.toLocaleString('en', { useGrouping: true })}</p>
        <p className="mt-2 font-light"><span className="font-bold">Region: </span>{country.region}</p>
        <p className="mt-2 font-light"><span className="font-bold">Capital: </span>{country.capital}</p>
      </div>
      <div className="order-first relative w-[16.5rem] h-40 rounded-t-[.3125rem]">
        <Image src={country.flag} layout="fill" objectFit="cover" className="rounded-t-[.3125rem]" alt={`Flag of ${country.name}`} />
      </div>
    </article>
  )
}

export default CountryCard