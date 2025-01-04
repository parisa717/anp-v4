import { TFunction } from 'i18next'

import { ApplicationMessage } from '../../types'
import { GraphQLError, ServerSideErrorCodesConfig } from '../types'

export abstract class AbstractServerSideErrorHandler {
  constructor(
    protected t: TFunction,
    protected errorCodes: ServerSideErrorCodesConfig,
    protected errorCodeToMessageKey: Record<number, string>,
  ) {}

  abstract canHandleError(error: GraphQLError): boolean
  abstract handleSingleError(error: GraphQLError, page: string): ApplicationMessage

  protected getErrorCode(error: GraphQLError): number | null {
    return error.extensions.code || null
  }

  protected getMessageKeyForCode(code: number): string {
    return this.errorCodeToMessageKey[code] || this.errorCodeToMessageKey[0]
  }
}
