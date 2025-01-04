import { DataTable } from './DataTable'

interface Brand {
  id: number
  name: string
  isActive: boolean
}

const data = [
  { id: 1, name: 'Opel', isActive: true },
  { id: 2, name: 'Kia', isActive: false },
  { id: 3, name: 'Nissan', isActive: true },
]

beforeEach(() => {
  const statusTemplate = (brand: Brand) => {
    return <div>{brand.isActive ? 'Active' : 'Inactive'}</div>
  }
  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'isActive', header: 'Status', body: statusTemplate },
  ]

  cy.mount(<DataTable<Brand[]> columns={columns} data={data}></DataTable>)
})

describe('DataTable component', () => {
  it('renders number of rows according to data length', () => {
    cy.get('[data-pc-section="bodyrow"]').should('have.length', data.length)
  })

  it('renders status field according to the provided template', () => {
    cy.get('[data-pc-section="bodyrow"]')
      .eq(0)
      .find('[data-pc-section="bodycell"]')
      .eq(1)
      .should('contain.text', 'Active')

    cy.get('[data-pc-section="bodyrow"]')
      .eq(1)
      .find('[data-pc-section="bodycell"]')
      .eq(1)
      .should('contain.text', 'Inactive')
  })
})
