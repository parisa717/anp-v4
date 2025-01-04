/**
 * Get URLSearchParams from a Request object
 *
 * @param request Request object
 * @returns URLSearchParams
 */
export const getUrlSearchParamsFromRequest = (request: Request): URLSearchParams => {
  const url = new URL(request.url)
  return url.searchParams
}
