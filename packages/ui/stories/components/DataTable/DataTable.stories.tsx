import type { Meta, StoryObj } from '@storybook/react'

import * as ClientSideStories from './clientSide/ClientSideStories'
import { DataTable } from './DataTable'
import * as ServerSideStories from './serverSide/ServerSideStories'

const meta: Meta<typeof DataTable> = {
  title: 'DataTable/DataTable',
  component: DataTable,
}

export default meta

type Story = StoryObj<typeof DataTable>

/**
 * Client-side stories
 */

export const Default: Story = {
  render: ClientSideStories.Default,
}

export const WithCustomCellTemplate: Story = {
  render: ClientSideStories.WithCustomCellTemplate,
}

export const WithSorting: Story = {
  render: ClientSideStories.WithSorting,
}

export const WithFiltering: Story = {
  render: ClientSideStories.WithFiltering,
}

/**
 * Server-side stories
 */

export const WithServerSideData: Story = {
  render: ServerSideStories.WithServerSideData,
}
