import { MessagesProps as PrimeMessagesProps } from 'primereact/messages'

import { APPLICATION_MESSAGE_PAGE, APPLICATION_MESSAGE_TYPE } from '../../model/applicationMessage/types'
import { MessagesListOfType } from './MessagesListOfType'

type ServerSideErrorsListProps = PrimeMessagesProps & {
  page: APPLICATION_MESSAGE_PAGE
}

export const ServerSideErrorsMessagesList = ({ page, ...otherProps }: ServerSideErrorsListProps) => {
  return <MessagesListOfType {...otherProps} page={page} type={APPLICATION_MESSAGE_TYPE.SERVER_SIDE_FEATURE_SPECIFIC} />
}
