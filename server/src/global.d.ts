import type * as url from 'node:url'

declare global {
  export const URL: typeof url.URL
}
