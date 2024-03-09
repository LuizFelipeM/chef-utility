import axios from "axios";
import { toQueryString } from "./utils/querystring";
import { SearchRecipesParams } from "./types/SearchRecipesParams";
import { BaseRecipe, RecipeWithInformation, RecipeWithIngredients } from "./types/Recipe";
import { Autocomplete } from "./types/Autocomplete";

const api = axios.create({
  baseURL: "https://api.spoonacular.com",
  headers: {
    "x-api-key": process.env.API_KEY
  }
})

export const recipes = {
  getSimilar: async (id: number, number = 10, limitLicense = true): Promise<RecipeWithInformation[]> =>
    (await api.get(`/recipes/${id}/similar${toQueryString({ number, limitLicense })}`)).data,

  getRandom: async (number = 50, limitLicense = true, includeTags: string[] = [], excludeTags: string[] = []): Promise<RecipeWithInformation[]> =>
    (await api.get(`/recipes/random${toQueryString({ number, limitLicense, "include-tags": includeTags, "exclude-tags": excludeTags })}`)).data,

  getInformation: async (id: number, includeNutrition = false): Promise<RecipeWithInformation> =>
    (await api.get(`/recipes/${id}/information${toQueryString({ includeNutrition })}`)).data,

  // getAnalyzedInstructions: async (id: number, number = 10, limitLicense: true) =>
  //   (await api.get(`/recipes/${id}/similar${toQueryString({ number, limitLicense })}`)).data,

  search: async (query: string, offset = 0, number = 10, params: SearchRecipesParams = null): Promise<(RecipeWithInformation | RecipeWithIngredients | BaseRecipe)[]> =>
    (await api.get(`/recipes/complexSearch${toQueryString({ query, offset, number, ...params })}`)).data,

  autocomplete: async (query: string, number = 10): Promise<Autocomplete[]> =>
    (await api.get(`/recipes/autocomplete${toQueryString({ query, number })}`)).data,
}