import { Button, Space, Table } from 'antd'
import type { TableProps } from 'antd'
import { DataType } from '../types/Product'

export default function DataTable({
  data,
  onDelete,
}: {
  data: DataType[]
  onDelete: (id: string) => void
}) {
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
          <Button onClick={() => onDelete(record.id)} size="small">
            Deletar
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      size="small"
      pagination={{ pageSize: 5 }}
      className="w-full"
      rootClassName="data-table"
    />
  )
}
