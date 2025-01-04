import { Button } from 'primereact/button'

import { Modal } from './Modal'

describe('Modal component', () => {
  let handleOnHideSpy

  beforeEach(() => {
    handleOnHideSpy = cy.spy().as('handleOnHideSpy')

    const footerContent = <Button label="Save" onClick={handleOnHideSpy} autoFocus />

    cy.mount(
      <Modal visible onHide={handleOnHideSpy} title="Modal Title" footer={footerContent} width="500">
        Modal content
      </Modal>,
    )
  })

  it('renders provided modal header and content', () => {
    cy.get('[data-pc-section="header"]').should('contain.text', 'Modal Title')
    cy.get('[data-pc-section="content"]').should('contain.text', 'Modal content')
  })

  it('executes handleOnHide when clicking the button in the footer', () => {
    cy.get('[data-pc-section="footer"] button').click()
    cy.get('@handleOnHideSpy').should('have.been.called')
  })
})
