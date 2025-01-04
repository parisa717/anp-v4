import { generateApplicationMessageId } from '../../../../lib/applicationMessage/generateId'
import { APPLICATION_MESSAGE_PAGE, APPLICATION_MESSAGE_TYPE, ApplicationMessage } from '../../types'
import { GraphQLError } from '../types'
import { AbstractServerSideErrorHandler } from './AbstractServerSideErrorHandler'

export class FeatureSpecificServerSideErrorHandler extends AbstractServerSideErrorHandler {
  canHandleError(error: GraphQLError) {
    const code = this.getErrorCode(error)

    return (
      code !== null &&
      code !== this.errorCodes.VALIDATION &&
      code !== this.errorCodes.AUTH &&
      code !== this.errorCodes.GENERIC
    )
  }

  handleSingleError(error: GraphQLError, page: APPLICATION_MESSAGE_PAGE): ApplicationMessage {
    const messageKey = this.getMessageKeyForCode(error.extensions.code)

    return {
      id: generateApplicationMessageId({
        page,
        title: this.t('error'),
        message: error.message,
      }),
      severity: 'error',
      summary: this.t('error'),
      detail: this.t(messageKey, error.extensions.context),
      sticky: true,
      page,
      type: APPLICATION_MESSAGE_TYPE.SERVER_SIDE_FEATURE_SPECIFIC,
      error: error.extensions,
    }
  }
}
