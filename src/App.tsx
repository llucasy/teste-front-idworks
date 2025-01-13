import { useEffect, useState } from 'react'
import DataTable from './components/DataTable'
import { DataType } from './types/Product'
import Modal from './components/Modal'

function App() {
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (id: string) => {
    setProductId(id)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const fetchProducts = () => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => data.map((product: DataType) => ({ ...product, key: product.id })))
      .then((data) => setProducts(data))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = (id: string) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => fetchProducts())
      .catch((error) => console.error(error))
  }

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
