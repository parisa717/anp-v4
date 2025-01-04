import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { SearchInput } from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'Form/SearchInput',
  component: SearchInput,
}

export default meta

type Story = StoryObj<typeof SearchInput>

const DefaultStoryComponent = () => {
  const [value, setValue] = useState('')

  return <SearchInput value={value} onSearch={(query) => setValue(query)} />
}

export const Default: Story = {
  render: DefaultStoryComponent,
}
