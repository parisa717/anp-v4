import {
  Messages as PrimeMessages,
  MessagesMessage as PrimeMessage,
  MessagesProps as PrimeMessagesProps,
} from 'primereact/messages'
import { memo, useEffect, useRef } from 'react'

export type MessagesListProps = PrimeMessagesProps & {
  messages: PrimeMessage[]
}

export const MessagesList = memo(({ messages, ...otherProps }: MessagesListProps) => {
  const primeMessageRef = useRef<PrimeMessages>(null)

  useEffect(() => {
    if (primeMessageRef.current) {
      primeMessageRef.current.clear()
      primeMessageRef.current.show(messages)
    }
  }, [messages])

  if (messages.length === 0) {
    return null
  }

  return <PrimeMessages ref={primeMessageRef} {...otherProps} />
})

MessagesList.displayName = 'MessagesList'
