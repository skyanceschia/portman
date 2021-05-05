/* eslint-disable no-useless-escape */
import { GlobalReplacement } from 'types/portmanConfig'

export const cleanupTestSchemaDefs = (
  collectionAsString: string,
  globalReplacements: GlobalReplacement[]
): string => {
  globalReplacements.map(({ searchFor, replaceWith }) => {
    const pattern = searchFor.replace(/\"/g, '\\\\"')
    const replacement = replaceWith.replace(/\"/g, '\\"')
    collectionAsString = collectionAsString.replace(new RegExp(pattern, 'g'), replacement)
    return collectionAsString
  })

  return collectionAsString
}
