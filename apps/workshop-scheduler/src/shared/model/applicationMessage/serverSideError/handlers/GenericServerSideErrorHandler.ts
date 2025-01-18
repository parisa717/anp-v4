import { generateApplicationMessageId } from '../../../../lib/applicationMessage/generateId'
import { APPLICATION_MESSAGE_PAGE, APPLICATION_MESSAGE_TYPE, ApplicationMessage } from '../../types'
import { GraphQLError } from '../types'
import { AbstractServerSideErrorHandler } from './AbstractServerSideErrorHandler'

export class GenericServerSideErrorHandler extends AbstractServerSideErrorHandler {
  canHandleError() {
    return true
  }

  handleSingleError(error: GraphQLError, page: APPLICATION_MESSAGE_PAGE): ApplicationMessage {
    return {
      id: generateApplicationMessageId({
        page,
        title: this.t('error'),
        message: error.message,
      }),
      severity: 'error',
      summary: this.t('error'),
      detail: this.t('serverSideErrors.generic.unexpectedError'),
      sticky: true,
      page,
      type: APPLICATION_MESSAGE_TYPE.SERVER_SIDE_GENERIC,
      error: error.extensions,
    }
  }
}
