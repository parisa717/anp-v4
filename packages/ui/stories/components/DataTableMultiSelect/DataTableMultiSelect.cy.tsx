import { ColumnFilterElementTemplateOptions } from 'primereact/column'

import { DataTableMultiSelect } from './DataTableMultiSelect'

const restColumnFilterElementTemplateOptions: Omit<
  ColumnFilterElementTemplateOptions,
  'value' | 'filterApplyCallback'
> = {
  filterModel: {},
  filterCallback: () => {},
  index: 0,
  field: '',
}

const Component = DataTableMultiSelect({
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
  className: 'w-52',
})

describe('DataTableMultiSelect component', () => {
  it('renders the component with the correct value', () => {
    cy.mount(<Component value={['yes']} filterApplyCallback={() => {}} {...restColumnFilterElementTemplateOptions} />)

    cy.get('[data-pc-name="multiselect"]').should('have.text', 'yes')
  })

  it('calls filterApplyCallback props with the value when the option item is selected', () => {
    const handleFilterApplyCallback = cy.spy().as('handleFilterApplyCallback')

    cy.mount(
      <Component
        value={['yes']}
        filterApplyCallback={handleFilterApplyCallback}
        {...restColumnFilterElementTemplateOptions}
      />,
    )

    cy.get('[data-pc-name="multiselect"]').click()
    cy.get('[data-pc-section="item"]').eq(1).click()
    cy.get('@handleFilterApplyCallback').should('have.been.calledWith', ['yes', 'no'])
  })
})
