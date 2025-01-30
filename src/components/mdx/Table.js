import React from 'react'
import styled from 'styled-components'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const TableWrapper = styled.div`
  margin: 1.0rem 0;
  overflow-x: auto;
  border: 1px solid #eaeaea;
  border-radius: 8px;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.9em;
`

const Th = styled.th`
  background: #f9fafb;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #eaeaea;
  white-space: nowrap;
  
  &:first-child {
    border-top-left-radius: 8px;
  }
  
  &:last-child {
    border-top-right-radius: 8px;
  }
`

const Td = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eaeaea;
  color: #4b5563;
`

const Tr = styled.tr`
  &:hover {
    background: #f9fafb;
  }
  
  &:last-child td {
    border-bottom: none;
  }
`

const CustomTable = ({ data }) => {
  // 从第一行数据中提取列信息
  const columns = React.useMemo(() => {
    if (!data || data.length === 0) return []
    return Object.keys(data[0]).map(key => ({
      accessorKey: key,
      header: key,
    }))
  }, [data])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  )
}

export default CustomTable 