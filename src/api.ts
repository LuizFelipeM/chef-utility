import axios from "axios";
import NewsAPI from "newsapi"
import { toQueryString } from "./utils/querystring";
import { SearchRecipesParams } from "./types/SearchRecipesParams";
import { BaseRecipe, RecipeWithInformation, RecipeWithIngredients } from "./types/Recipe";
import { Autocomplete } from "./types/Autocomplete";

const spoonacularApi = axios.create({
  baseURL: "https://api.spoonacular.com",
  headers: {
    "x-api-key": process.env.SPOONACULAR_API_KEY
  }
})

const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    "x-api-key": process.env.NEWS_API_KEY
  }
})

const formatDate = (date: Date | undefined): string =>
  date?.toISOString()?.replace(/T+.*/g, "")

export const news = {
  everything: async (query: string, offset = 0, number = 5, sortBy = 'publishedAt', from: Date = undefined, to: Date = undefined): Promise<any> =>
    (await newsApi.get(`/everything${toQueryString({
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
    (await spoonacularApi.get(`/recipes/${id}/similar${toQueryString({ number, limitLicense })}`)).data,

  getRandom: async (number = 50, limitLicense = true, includeTags: string[] = [], excludeTags: string[] = []): Promise<RecipeWithInformation[]> =>
    (await spoonacularApi.get(`/recipes/random${toQueryString({ number, limitLicense, "include-tags": includeTags, "exclude-tags": excludeTags })}`)).data,

  getInformation: async (id: number, includeNutrition = false): Promise<RecipeWithInformation> =>
    (await spoonacularApi.get(`/recipes/${id}/information${toQueryString({ includeNutrition })}`)).data,

  search: async (query: string, offset = 0, number = 10, params: SearchRecipesParams = null): Promise<(RecipeWithInformation | RecipeWithIngredients | BaseRecipe)[]> =>
    (await spoonacularApi.get(`/recipes/complexSearch${toQueryString({ query, offset, number, ...params })}`)).data,

  autocomplete: async (query: string, number = 10): Promise<Autocomplete[]> =>
    (await spoonacularApi.get(`/recipes/autocomplete${toQueryString({ query, number })}`)).data,
}