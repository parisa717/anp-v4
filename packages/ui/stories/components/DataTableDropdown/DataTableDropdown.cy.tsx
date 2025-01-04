import { ColumnFilterElementTemplateOptions } from 'primereact/column'

import { DataTableDropdown } from './DataTableDropdown'

const restColumnFilterElementTemplateOptions: Omit<
  ColumnFilterElementTemplateOptions,
  'value' | 'filterApplyCallback'
> = {
  filterModel: {},
  filterCallback: () => {},
  index: 0,
  field: '',
}

const Component = DataTableDropdown({
  options: [
    {
      label: 'yes',
      value: 'yes',
    },
    {
      label: 'no',
      value: 'no',
    },
  ],
  optionLabel: 'label',
  optionValue: 'value',
})

describe('DataTableDropdown component', () => {
  it('renders the component with the correct value', () => {
    cy.mount(<Component value={'yes'} filterApplyCallback={() => {}} {...restColumnFilterElementTemplateOptions} />)

    cy.get('[data-cy="datatable-dropdown-input"]').should('have.text', 'yes')
  })

  it('calls filterApplyCallback props with the value when the option item is selected', () => {
    const handleFilterApplyCallback = cy.spy().as('handleFilterApplyCallback')

    cy.mount(
      <Component
        value={'yes'}
        filterApplyCallback={handleFilterApplyCallback}
        {...restColumnFilterElementTemplateOptions}
      />,
    )

    cy.get('[data-cy="datatable-dropdown-trigger"]').realClick()
    cy.get('[data-cy="datatable-dropdown-item-label"]').eq(1).realClick()
    cy.get('@handleFilterApplyCallback').should('have.been.calledWith', 'no')
  })
})
