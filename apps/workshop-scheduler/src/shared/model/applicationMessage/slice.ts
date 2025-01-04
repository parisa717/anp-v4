import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isEqual } from 'lodash'

import { APPLICATION_MESSAGE_PAGE, APPLICATION_MESSAGE_TYPE, ApplicationMessage } from './types'

export type ApplicationMessagePageAndType = {
  page: APPLICATION_MESSAGE_PAGE
  type: APPLICATION_MESSAGE_TYPE
}

type ApplicationMessageSlice = {
  byId: {
    [id: string]: ApplicationMessage
  }
  byPage: Partial<{
    [P in APPLICATION_MESSAGE_PAGE]: string[]
  }>
  byType: Partial<{
    [T in APPLICATION_MESSAGE_TYPE]: string[]
  }>
}

const initialState: ApplicationMessageSlice = {
  byId: {},
  byPage: {},
  byType: {},
}

export const applicationMessageSlice = createSlice({
  name: 'applicationMessage',
  initialState,
  reducers: {
    addApplicationMessage: (state, action: PayloadAction<ApplicationMessage>) => {
      const applicationMessage = action.payload

      if (!state.byPage[applicationMessage.page]) {
        state.byPage[applicationMessage.page] = []
      }
      if (!state.byType[applicationMessage.type]) {
        state.byType[applicationMessage.type] = []
      }

      const applicationMessagesByPage = state.byPage[applicationMessage.page]
      const applicationMessagesByType = state.byType[applicationMessage.type]

      if (applicationMessagesByPage && applicationMessagesByType) {
        state.byId[applicationMessage.id] = applicationMessage
        applicationMessagesByPage.push(applicationMessage.id)
        applicationMessagesByType.push(applicationMessage.id)
      }
    },

    replaceApplicationMessages: (state, action: PayloadAction<ApplicationMessage[]>) => {
      const newApplicationMessages = action.payload

      if (newApplicationMessages.length === 0) return

      const { page, type } = newApplicationMessages[0]

      // Get existing messages of the same page and type
      const existingMessageIds = (state.byPage[page] || []).filter((id) => {
        const message = state.byId[id]
        return message && message.type === type
      })

      const existingMessages = existingMessageIds.map((id) => state.byId[id])

      // Compare messages without IDs to check if they're identical
      const areMessagesEqual =
        existingMessages.length === newApplicationMessages.length &&
        existingMessages.every((existingMsg, index) => {
          const newMsg = newApplicationMessages[index]
          // Create new objects without the id property using destructuring
          const { id: _existingId, ...existingMsgWithoutId } = existingMsg
          const { id: _newId, ...newMsgWithoutId } = newMsg
          return isEqual(existingMsgWithoutId, newMsgWithoutId)
        })

      // If messages are identical (ignoring IDs), don't update state
      if (areMessagesEqual) {
        return
      }

      const applicationMessageIdsToRemove = (state.byPage[page] || []).filter((id) => {
        const message = state.byId[id]
        return message && message.type === type
      })

      applicationMessageIdsToRemove.forEach((id) => {
        delete state.byId[id]
      })

      if (state.byPage[page]) {
        state.byPage[page] = state.byPage[page]?.filter((id) => !applicationMessageIdsToRemove.includes(id))
      }

      if (state.byType[type]) {
        state.byType[type] = state.byType[type]?.filter((id) => !applicationMessageIdsToRemove.includes(id))
      }

      if (!state.byPage[page]) {
        state.byPage[page] = []
      }
      if (!state.byType[type]) {
        state.byType[type] = []
      }

      const applicationMessagesByPage = state.byPage[page]
      const applicationMessagesByType = state.byType[type]

      if (applicationMessagesByPage && applicationMessagesByType) {
        newApplicationMessages.forEach((message) => {
          state.byId[message.id] = message
          applicationMessagesByPage.push(message.id)
          applicationMessagesByType.push(message.id)
        })
      }
    },

    removeApplicationMessageById: (state, action: PayloadAction<string>) => {
      const applicationMessageById = action.payload
      const applicationMessage = state.byId[applicationMessageById]

      if (!applicationMessage) {
        return
      }

      delete state.byId[applicationMessageById]

      const applicationMessagesByPage = state.byPage[applicationMessage.page]
      if (applicationMessagesByPage) {
        state.byPage[applicationMessage.page] = applicationMessagesByPage.filter((id) => id !== applicationMessageById)
      }

      const applicationMessagesByType = state.byType[applicationMessage.type]
      if (applicationMessagesByType) {
        state.byType[applicationMessage.type] = applicationMessagesByType.filter((id) => id !== applicationMessageById)
      }
    },

    removeApplicationMessagesByPageAndType: (state, action: PayloadAction<ApplicationMessagePageAndType>) => {
      const { page, type } = action.payload

      const applicationMessagesByPage = state.byPage[page]
      const applicationMessageByType = state.byType[type]

      if (!applicationMessagesByPage || !applicationMessageByType) {
        return
      }

      const applicationMessageIds = applicationMessagesByPage.filter((id) => {
        const message = state.byId[id]
        return message && message.type === type
      })

      applicationMessageIds.forEach((id) => {
        if (state.byId) {
          delete state.byId[id]
        }

        const currentApplicationMessagesByPage = state.byPage[page]
        if (currentApplicationMessagesByPage) {
          state.byPage[page] = currentApplicationMessagesByPage.filter((messageId) => messageId !== id)
        }

        const currentApplicationMessagesByType = state.byType[type]
        if (currentApplicationMessagesByType) {
          state.byType[type] = currentApplicationMessagesByType.filter((messageId) => messageId !== id)
        }
      })
    },
  },
})

const selectApplicationMessagesById = (state: RootState) => state.applicationMessage.byId
const selectApplicationMessagesByPage = (state: RootState) => state.applicationMessage.byPage

export const selectApplicationMessagesByPageAndType = createSelector(
  [
    // Input selector 1: Gets messages by ID
    selectApplicationMessagesById,

    // Input selector 2: Gets messages by page
    selectApplicationMessagesByPage,

    // Input selector 3: Gets the page parameter
    (_state: RootState, page: APPLICATION_MESSAGE_PAGE) => page,

    // Input selector 4: Gets the type parameter
    (_state: RootState, _page: APPLICATION_MESSAGE_PAGE, type: APPLICATION_MESSAGE_TYPE) => type,
  ],
  // Result function that combines all inputs
  (byId, byPage, page, type) => {
    const pageApplicationMessages = byPage[page] || []

    return pageApplicationMessages
      .map((id) => byId[id])
      .filter((message): message is ApplicationMessage => message !== undefined && message.type === type)
  },
)

export const {
  addApplicationMessage,
  replaceApplicationMessages,
  removeApplicationMessageById,
  removeApplicationMessagesByPageAndType,
} = applicationMessageSlice.actions
