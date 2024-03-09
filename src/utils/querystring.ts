export const toQueryString = (obj: Record<string, string | number | boolean | string[]>) =>
  Object.entries(obj)
    .map(([key, value], i) => `${i === 0 ? "?" : ""}${key}=${value}`)
    .join("&")