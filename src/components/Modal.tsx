import { Modal as AntdModal, Form, Input } from 'antd'
import { DataType } from '../types/Product'
import { useEffect, useState } from 'react'

export default function Modal({
  open,
  onOk,
  onCancel,
  productId,
}: {
  open: boolean
  onOk: (product: DataType) => void
  onCancel: () => void
  productId: string
}) {
  const [product, setProduct] = useState<DataType>({ id: '', name: '', quantity: 0, location: '' })

  const fetchProduct = (id: string) => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
  }

  useEffect(() => {
    fetchProduct(productId)
  }, [productId])

  return (
    <AntdModal title={`Produto ${product?.id}`} open={open} onOk={() => onOk(product)} onCancel={onCancel}>
      <Form>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nome:</label>
          <Input
            type="text"
            id="name"
            value={product?.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="quantity">Quantidade:</label>
          <Input
            type="number"
            id="quantity"
            value={product?.quantity}
            onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="location">Localização:</label>
          <Input
            type="text"
            id="location"
            value={product?.location}
            onChange={(e) => setProduct({ ...product, location: e.target.value })}
          />
        </div>
      </Form>
    </AntdModal>
  )
}
