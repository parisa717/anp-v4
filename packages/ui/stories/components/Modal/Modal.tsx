import merge from 'lodash/merge'
import { Dialog, DialogProps } from 'primereact/dialog'

export type ModalProps = DialogProps & {
  width: number | string
  minWidth?: number | string
  visible: boolean
  footer: DialogProps['footer']
  title?: string
}

const DIALOG_PT_ATTRIBUTES = {
  root: { className: 'gap-8 bg-dialog-header' },
  header: { className: 'pt-[59px] px-[72px] pb-0' },
  headerIcons: { className: 'hidden' },
  content: { className: 'px-[72px] py-0' },
  footer: { className: 'px-[72px] pb-[59px]' },
}

export const Modal = ({ width, minWidth, visible, header, title, pt, ...otherProps }: ModalProps) => {
  const headerElement = title ? (
    <h2 className="text-center my-0 text-[28px] font-semibold leading-none">{title}</h2>
  ) : (
    header
  )

  const mergedPt = merge(DIALOG_PT_ATTRIBUTES, pt || {})

  return (
    <Dialog
      modal
      visible={visible}
      draggable={false}
      resizable={false}
      header={headerElement}
      pt={mergedPt}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        minWidth: minWidth ? (typeof minWidth === 'number' ? `${minWidth}px` : minWidth) : undefined,
      }}
      {...otherProps}
    />
  )
}
