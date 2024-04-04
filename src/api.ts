import axios from "axios";
import { toQueryString } from "./utils/querystring";
import { SearchRecipesParams } from "./types/SearchRecipesParams";
import { BaseRecipe, RecipeWithInformation, RecipeWithIngredients } from "./types/Recipe";
import { Autocomplete } from "./types/Autocomplete";

const api = axios.create({
  baseURL: "https://cheff-utility.netlify.app"
})

const formatDate = (date: Date | undefined): string =>
  date?.toISOString()?.replace(/T+.*/g, "")

export const news = {
  everything: async (query: string, offset = 0, number = 5, sortBy = 'publishedAt', from: Date = undefined, to: Date = undefined): Promise<any> =>
    (await api.get(`/news${toQueryString({
      q: query,
      language: 'en',
      sortBy,
      pageSize: number,
      page: 1 + offset,
      from: formatDate(from),
      to: formatDate(to)
    })}`)).data
}

export const recipes = {
  getSimilar: async (id: number, number = 10, limitLicense = true): Promise<RecipeWithInformation[]> =>
    (await api.get(`/recipes/${id}/similar${toQueryString({ number, limitLicense })}`)).data,

  getRandom: async (number = 50, limitLicense = true, includeTags: string[] = [], excludeTags: string[] = []): Promise<RecipeWithInformation[]> =>
    (await api.get(`/recipes/random${toQueryString({ number, limitLicense, "include-tags": includeTags, "exclude-tags": excludeTags })}`)).data,

  getInformation: async (id: number, includeNutrition = false): Promise<RecipeWithInformation> =>
    (await api.get(`/recipes/${id}/information${toQueryString({ includeNutrition })}`)).data,

  search: async (query: string, offset = 0, number = 10, params: SearchRecipesParams = null): Promise<(RecipeWithInformation | RecipeWithIngredients | BaseRecipe)[]> =>
    (await api.get(`/recipes/complexSearch${toQueryString({ query, offset, number, ...params })}`)).data,

  autocomplete: async (query: string, number = 10): Promise<Autocomplete[]> =>
    (await api.get(`/recipes/autocomplete${toQueryString({ query, number })}`)).data,
}