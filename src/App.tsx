import { useEffect, useState } from 'react'
import DataTable from './components/DataTable'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }, [])

  return (
    <div className="App flex h-screen w-screen flex-col items-center justify-center gap-8 bg-zinc-100 sm:px-8 px-1">
      <p className="text-center font-semibold text-lg">Teste Front idWorks</p>
      <div className='w-full max-w-[550px] overflow-x-scroll'>
        <DataTable data={products} />
      </div>
    </div>
  )
}

export default App
