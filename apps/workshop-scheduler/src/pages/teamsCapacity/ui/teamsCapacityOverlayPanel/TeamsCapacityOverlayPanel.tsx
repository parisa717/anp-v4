import { OverlayPanel } from 'primereact/overlaypanel'
import { forwardRef, useRef, useState } from 'react'

import { OverlayPanelEditMode } from './OverlayPanelEditMode'
import { OverlayPanelPreview } from './OverlayPanelPreview'

interface TeamsCapacityOverlayPanelProps {
  startDate: Date
  id: string
}

export const TeamsCapacityOverlayPanel = forwardRef<OverlayPanel, TeamsCapacityOverlayPanelProps>(
  function TeamsCapacityOverlayPanel(props, forwardedRef) {
    const ref = useRef<OverlayPanel | null>(null)

    const [isEditMode, setIsEditMode] = useState(false)

    const handleEditModeEnter = () => setIsEditMode(true)

    const handleEditModeExit = () => setIsEditMode(false)

    const handleOverlayPanelClose = () => {
      ref.current?.hide?.()
      handleEditModeExit()
    }

    return (
      <OverlayPanel
        ref={(node) => {
          ref.current = node
          if (typeof forwardedRef === 'function') {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
        }}
        onHide={handleOverlayPanelClose}
      >
        {isEditMode ? (
          <OverlayPanelEditMode
            onClose={handleOverlayPanelClose}
            onCancel={handleEditModeExit}
            id={props.id}
            startDate={props.startDate}
          />
        ) : (
          <OverlayPanelPreview
            onEdit={handleEditModeEnter}
            onClose={handleOverlayPanelClose}
            id={props.id}
            startDate={props.startDate}
          />
        )}
      </OverlayPanel>
    )
  },
)

TeamsCapacityOverlayPanel.displayName = 'TeamsCapacityOverlayPanel'
