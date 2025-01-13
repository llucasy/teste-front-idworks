import { useEffect, useState } from 'react'
import DataTable from './components/DataTable'

interface DataType {
  id: string
  name: string
  quantity: number
  location: string
}

function App() {
  const [products, setProducts] = useState([])

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
        <DataTable data={products} onDelete={handleDelete} />
      </div>
    </div>
  )
}

export default App
