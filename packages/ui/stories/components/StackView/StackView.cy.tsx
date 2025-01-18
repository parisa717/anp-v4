import { StackView } from './StackView'
import { useStackView } from './StackViewContext'

const Controls = () => {
  const { openPreviousView, openNextView, setOpenViewIndex } = useStackView()

  return (
    <div className="flex gap-4">
      <button data-cy="open-first" onClick={() => setOpenViewIndex(0)}>
        Open First view
      </button>
      <button data-cy="open-previous" onClick={openPreviousView}>
        Open previous view
      </button>
      <button data-cy="open-next" onClick={openNextView}>
        Open next view
      </button>
      <button data-cy="open-third" onClick={() => setOpenViewIndex(2)}>
        Open Third view
      </button>
    </div>
  )
}

const First = () => {
  return (
    <div data-cy="first">
      <h1>First view</h1>
      <Controls />
    </div>
  )
}

const Second = () => {
  return (
    <div data-cy="second">
      <h1>Second view</h1>
      <Controls />
    </div>
  )
}

describe('StackView component', () => {
  it('renders correct view when navigation via openNextView', () => {
    cy.mount(
      <StackView>
        <First />
        <Second />
        <div data-cy="third">
          <h1>Third view</h1>
          <Controls />
        </div>
      </StackView>,
    )

    cy.get('[data-cy="first"]').should('exist')

    cy.get('[data-cy="open-next"]').click()
    cy.get('[data-cy="second"]').should('exist')

    cy.get('[data-cy="open-next"]').click()
    cy.get('[data-cy="third"]').should('exist')

    cy.get('[data-cy="open-next"]').click()
    cy.get('[data-cy="third"]').should('exist')
  })

  it('renders correct view when navigation via openPreviousView', () => {
    cy.mount(
      <StackView openView={2}>
        <First />
        <Second />
        <div data-cy="third">
          <h1>Third view</h1>
          <Controls />
        </div>
      </StackView>,
    )

    cy.get('[data-cy="third"]').should('exist')

    cy.get('[data-cy="open-previous"]').click()
    cy.get('[data-cy="second"]').should('exist')

    cy.get('[data-cy="open-previous"]').click()
    cy.get('[data-cy="first"]').should('exist')

    cy.get('[data-cy="open-previous"]').click()
    cy.get('[data-cy="first"]').should('exist')
  })

  it('renders correct view when navigation via setOpenViewIndex', () => {
    cy.mount(
      <StackView>
        <First />
        <Second />
        <div data-cy="third">
          <h1>Third view</h1>
          <Controls />
        </div>
      </StackView>,
    )

    cy.get('[data-cy="first"]').should('exist')

    cy.get('[data-cy="open-third"]').click()
    cy.get('[data-cy="third"]').should('exist')

    cy.get('[data-cy="open-first"]').click()
    cy.get('[data-cy="first"]').should('exist')
  })
})
