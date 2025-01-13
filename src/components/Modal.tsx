import { Modal as AntdModal } from 'antd'

export default function Modal({
  open,
  onOk,
  onCancel,
  productId,
}: {
  open: boolean
  onOk: () => void
  onCancel: () => void
  productId: string
}) {
  return (
    <AntdModal title="Basic Modal" open={open} onOk={onOk} onCancel={onCancel}>
      <p>Some contents...</p>
      <p>{productId}</p>
      <p>Some contents...</p>
    </AntdModal>
  )
}
