import { MessagesProps as PrimeMessagesProps } from 'primereact/messages'

import { APPLICATION_MESSAGE_PAGE, APPLICATION_MESSAGE_TYPE } from '../../model/applicationMessage/types'
import { MessagesListOfType } from './MessagesListOfType'

export type OperationMessagesListProps = PrimeMessagesProps & {
  page: APPLICATION_MESSAGE_PAGE
}

export const OperationMessagesList = ({ page, ...otherProps }: OperationMessagesListProps) => {
  return <MessagesListOfType {...otherProps} page={page} type={APPLICATION_MESSAGE_TYPE.OPERATION} />
}
