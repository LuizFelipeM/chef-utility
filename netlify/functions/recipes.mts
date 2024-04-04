import axios from "axios"
import express from "express"
import serverless from "serverless-http"

const spoonacularApi = axios.create({
  baseURL: "https://api.spoonacular.com",
  headers: {
    "x-api-key": process.env.SPOONACULAR_API_KEY
  }
})

const toQueryString = (obj: Record<string, any | undefined>): string =>
  Object.entries(obj)
    .reduce<any>((acc, curr) => curr[1] ? [...acc, curr] : acc, [])
    .map(([key, value], i) => `${i === 0 ? "?" : ""}${key}=${value}`)
    .join("&")

const api = express()
const router = express.Router()

router.get('/:id/similar', async (req, res) =>
  res.json((await spoonacularApi.get(`/recipes/${req.params.id}/similar${toQueryString(req.query)}`)).data)
    .send())

router.get('/:id/information', async (req, res) =>
  res.json((await spoonacularApi.get(`/recipes/${req.params.id}/information${toQueryString(req.query)}`)).data)
    .send())

router.get('/random', async (req, res) => {
  console.log('req.query.includeTags', req.query.includeTags)
  return res.json((await spoonacularApi.get(`/recipes/random${toQueryString(req.query)}`)).data)
    .send()
})

router.get('/complexSearch', async (req, res) =>
  res.json((await spoonacularApi.get(`/recipes/complexSearch${toQueryString(req.query)}`)).data)
    .send())

router.get('/autocomplete', async (req, res) =>
  res.json((await spoonacularApi.get(`/recipes/autocomplete${toQueryString(req.query)}`)).data)
    .send())

api.use((req, res, next) => {
  res.set({
    'access-control-allow-origin': 'https://cheffhub.netlify.app',
    'access-control-allow-methods': 'GET',
    'access-control-allow-headers': '*'
  })
  next()
})
api.use('/recipes/', router)
export const handler = serverless(api)