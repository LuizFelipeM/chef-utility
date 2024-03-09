export function getRouteParams(route: string): Record<string, string> {
  const pathnameSplit = window.location.pathname.split('/').filter(s => s)
  const routeSplit = route.split(':')
  const params = pathnameSplit.reduce((acc, curr, index) => routeSplit[index].includes(curr) ? acc : { ...acc, [routeSplit[index]]: curr }, {})
  return params
}