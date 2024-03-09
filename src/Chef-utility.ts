export * as api from "./api"
export * from "./state"
export { getRouteParams } from './utils/routeParams'

export const routes: Record<string, string> = {
  HOME: '/',
  SEARCH: '/search/:term',
  RECIPE: '/recipe/:id'
} 