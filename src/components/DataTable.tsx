import { Button, Space, Table } from 'antd'
import type { TableProps } from 'antd'
import { DataType } from '../types/Product'

export default function DataTable({
  data,
  onDelete,
  onEdit,
}: {
  data: DataType[]
  onDelete: (id: string) => void
  onEdit: (id: string) => void
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
        <Space className="flex flex-col" size="small">
          <Button type="primary" size="small" onClick={() => onEdit(record.id)}>
            Editar
          </Button>
          <Button
            type="primary"
            size="small"
            className="bg-red-500 text-white hover:!bg-red-400"
            onClick={() => onDelete(record.id)}
          >
            Excluir
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
