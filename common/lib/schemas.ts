import z from 'zod'
import { Alpha3CodesEnum } from '../../constants/alpha3Codes'

export const InitialDataObject = z.object({
  name: z.string(),
  nativeName: z.string(),
  topLevelDomain: z.array(z.string()),
  alpha3Code: Alpha3CodesEnum,
  capital: z.string().optional(),
  region: z.string(),
  subregion: z.string(),
  population: z.number(),
  borders: z.array(Alpha3CodesEnum).optional(),
  flags: z.object({
    svg: z.string().url().optional(),
    png: z.string().url()
  }),
  currencies: z.array(z.object({
    code: z.string(),
    name: z.string(),
    symbol: z.string()
  })).optional(),
  languages: z.array(z.object({
    iso639_1: z.string().optional(),
    iso639_2: z.string().optional(),
    name: z.string(),
    nativeName: z.string().optional()
  })),
  independent: z.boolean()
})

export const FilteredDataObject = InitialDataObject.extend({
  topLevelDomain: InitialDataObject.shape.topLevelDomain.element,
  capital: InitialDataObject.shape.capital.unwrap(),
  borders: z.array(InitialDataObject.pick({ name: true, alpha3Code: true })),
  flag: InitialDataObject.shape.flags.shape.png,
  currencies: z.array(InitialDataObject.shape.currencies.unwrap().element.shape.name),
  languages: z.array(InitialDataObject.shape.languages.element.shape.name)
}).omit({ flags: true, independent: true })

export const InitialData = z.array(InitialDataObject)
export const FilteredData = z.array(FilteredDataObject)