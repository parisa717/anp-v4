import { useCallback, useEffect } from 'react'
import { useLocation, useParams } from 'react-router'

import { ROUTE_PATHS } from '@/shared/lib'
import {
  APPLICATION_MESSAGE_PAGE,
  selectCurrentRouterLocationPathName,
  updateCurrentRouterLocation,
  updateCurrentRouterPageUrl,
  useAppDispatch,
  useAppSelector,
} from '@/shared/model'

const ALL_ROUTE_PATHS = Object.values(ROUTE_PATHS).flatMap((section) =>
  typeof section === 'string'
    ? [section]
    : Object.values(section).flatMap((subsection) =>
        typeof subsection === 'string' ? [subsection] : Object.values(subsection),
      ),
)

// Type guard function to verify if a string is a valid APPLICATION_MESSAGE_PAGE
const isValidRoutePath = (path: string): path is APPLICATION_MESSAGE_PAGE => {
  return ALL_ROUTE_PATHS.includes(path)
}

export const RouterPageUrlSync = () => {
  const location = useLocation()
  const params = useParams()
  const dispatch = useAppDispatch()
  const currentRouterLocationPathName = useAppSelector(selectCurrentRouterLocationPathName)

  const getCurrentRouterPath = useCallback(() => {
    // Find matching route pattern from ROUTE_PATHS
    // Create a matcher function that handles params
    const matchesPattern = (pattern: string, path: string) => {
      const patternParts = pattern.split('/')
      const pathParts = path.split('/')

      if (patternParts.length !== pathParts.length) {
        return false
      }

      return patternParts.every((part, i) => {
        // return true if the part starts with ":" because in location.pathname it will be arbitrary string
        if (part.startsWith(':')) {
          return true
        }
        return part === pathParts[i]
      })
    }

    // Find the matching route pattern
    const matchingPattern = ALL_ROUTE_PATHS.find(
      (pattern): pattern is APPLICATION_MESSAGE_PAGE =>
        typeof pattern === 'string' && matchesPattern(pattern, location.pathname) && isValidRoutePath(pattern),
    )

    if (matchingPattern) {
      return matchingPattern
    }

    // Fallback: manually replace params with placeholders
    let currentRouterPageUrl = location.pathname

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        currentRouterPageUrl = currentRouterPageUrl.replace(value, `:${key}`)
      }
    })

    // If the resulting URL isn't a valid route path, return a default route
    return isValidRoutePath(currentRouterPageUrl) ? currentRouterPageUrl : ROUTE_PATHS.Root
  }, [location.pathname, params])

  useEffect(() => {
    if (currentRouterLocationPathName !== location.pathname) {
      dispatch(updateCurrentRouterPageUrl(getCurrentRouterPath()))
      dispatch(updateCurrentRouterLocation(location))
    }
  }, [location, dispatch, getCurrentRouterPath, currentRouterLocationPathName])

  return null
}
