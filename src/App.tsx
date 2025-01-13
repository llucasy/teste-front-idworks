import { useEffect, useState } from 'react'
import DataTable from './components/DataTable'
import { DataType } from './types/Product'
import Modal from './components/Modal'

function App() {
  const [products, setProducts] = useState<DataType[]>([])
  const [productId, setProductId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchProducts = () => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => data.map((product: DataType) => ({ ...product, key: product.id })))
      .then((data) => setProducts(data))
  }

  const handleUpdate = (product: DataType) => {
    fetch(`http://localhost:3001/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then(() => fetchProducts())
      .catch((error) => console.error(error))
  }
  
  const handleDelete = (id: string) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => fetchProducts())
      .catch((error) => console.error(error))
  }

  const openModal = (id: string) => {
    setProductId(id)
    setIsModalOpen(true)
  }

  const handleOk = (product: DataType) => {
    handleUpdate(product)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="App flex h-screen w-screen flex-col items-center justify-center gap-8 bg-zinc-100 px-1 sm:px-8">
      <p className="text-center text-lg font-semibold">Teste Front idWorks</p>
      <div className="w-full max-w-[550px] overflow-x-scroll">
        <DataTable data={products} onDelete={handleDelete} onEdit={openModal} />
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} productId={productId} />
      </div>
    </div>
  )
}

export default App
