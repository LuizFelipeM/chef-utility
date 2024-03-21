export const toQueryString = (obj: Record<string, string | number | boolean | string[]>) =>
  Object.entries(obj)
    .reduce((acc, curr) => curr[1] ? [...acc, curr] : acc, [])
    .map(([key, value], i) => `${i === 0 ? "?" : ""}${key}=${value}`)
    .join("&")