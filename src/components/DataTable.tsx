import { Space, Table } from 'antd'
import type { TableProps } from 'antd'

interface DataType {
  id: string
  name: string
  quantity: number
  location: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Quantidade',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Localização',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Ação',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Deletar</a>
      </Space>
    ),
  },
]

export default function DataTable({ data }: { data: DataType[] }) {
  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      size="small"
      pagination={{ pageSize: 5 }}
      className="w-full"
      rootClassName='data-table'
    />
  )
}
