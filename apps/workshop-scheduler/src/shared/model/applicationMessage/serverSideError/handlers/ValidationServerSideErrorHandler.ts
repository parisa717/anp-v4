import isEmpty from 'lodash/isEmpty'

import { generateApplicationMessageId } from '../../../../lib/applicationMessage/generateId'
import { APPLICATION_MESSAGE_PAGE, APPLICATION_MESSAGE_TYPE, ApplicationMessage } from '../../types'
import { GraphQLError } from '../types'
import { isServerSideValidationField, isServerSideValidationFields } from '../utils/validationGuards'
import { ServerSideValidationField } from '../validationTypes'
import { AbstractServerSideErrorHandler } from './AbstractServerSideErrorHandler'

export class ValidationServerSideErrorHandler extends AbstractServerSideErrorHandler {
  canHandleError(error: GraphQLError) {
    const code = this.getErrorCode(error)
    return code === this.errorCodes.VALIDATION && !isEmpty(error.extensions.context)
  }

  handleSingleError(error: GraphQLError, page: APPLICATION_MESSAGE_PAGE): ApplicationMessage {
    const context = error.extensions.context

    if (!isServerSideValidationFields(context)) {
      return {
        id: generateApplicationMessageId({
          page,
          title: this.t('error'),
          message: error.message,
        }),
        severity: 'error',
        summary: this.t('error.generic.title'),
        detail: this.t('error.generic.message'),
        sticky: true,
        page,
        type: APPLICATION_MESSAGE_TYPE.SERVER_SIDE_VALIDATION,
        error: error.extensions,
        validationErrors: {},
      }
    }

    return {
      id: generateApplicationMessageId({
        page,
        title: this.t('error'),
        message: error.message,
      }),
      severity: 'error',
      summary: this.t('error.generic.title'),
      detail: this.t('error.generic.message'),
      sticky: true,
      page,
      type: APPLICATION_MESSAGE_TYPE.SERVER_SIDE_VALIDATION,
      error: error.extensions,
      validationErrors: this.processValidationFields(context.fields),
    }
  }

  private processValidationFields(fields: Record<string, ServerSideValidationField>, parentPath: string = '') {
    const errors: Record<string, string[]> = {}

    for (const [fieldName, fieldData] of Object.entries(fields)) {
      if (!isServerSideValidationField(fieldData)) {
        continue
      }

      const currentPath = parentPath ? `${parentPath}.${fieldName}` : fieldName

      if (fieldData.errors?.length) {
        errors[currentPath] = fieldData.errors.map((error) =>
          this.t(error.messageKey, {
            ...error.context,
            count: error.plurality === null ? undefined : error.plurality,
          }),
        )
      }

      if (fieldData.children) {
        const childErrors = this.processValidationFields(fieldData.children, currentPath)
        Object.assign(errors, childErrors)
      }
    }

    return errors
  }
}
