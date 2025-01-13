import { Modal as AntdModal, Input, message } from 'antd'
import type { InputRef } from 'antd'
import { DataType } from '../types/Product'
import { useEffect, useRef, useState } from 'react'

export default function Modal({
  open,
  onOk,
  onCancel,
  productId,
}: {
  open: boolean
  onOk: (product: DataType, id: string | undefined) => void
  onCancel: () => void
  productId: string | undefined
}) {
  const [product, setProduct] = useState<DataType>({ id: '', name: '', quantity: 0, location: '' })
  const inputRef = useRef<InputRef>(null)
  const [messageApi, contextHolder] = message.useMessage()

  const fetchProduct = (id: string) => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
  }

  useEffect(() => {
    setProduct({ id: '', name: '', quantity: 0, location: '' })
    if (productId !== undefined) fetchProduct(productId)
  }, [productId])

  useEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus()
  }, [product.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (product.name === '' || product.quantity === 0 || product.location === '') {
      messageApi.info('Preencha todos os campos!')
      return
    }
    onOk(product, productId)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as React.FormEvent)
    }
  }

  return (
    <>
      {contextHolder}
      <AntdModal
        title={productId === undefined ? 'Novo Produto' : `Produto ${product?.id}`}
        open={open}
        onOk={handleSubmit}
        onCancel={onCancel}
      >
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nome:</label>
            <Input
              type="text"
              id="name"
              value={product?.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
              ref={inputRef}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="quantity">Quantidade:</label>
            <Input
              type="number"
              id="quantity"
              value={product?.quantity}
              onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="location">Localização:</label>
            <Input
              type="text"
              id="location"
              value={product?.location}
              onChange={(e) => setProduct({ ...product, location: e.target.value })}
              required
            />
          </div>
        </form>
      </AntdModal>
    </>
  )
}
