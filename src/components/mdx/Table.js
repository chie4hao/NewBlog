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
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  background: ${props => props.theme.colors.surface};
  box-shadow: ${props => props.theme.shadows.small};
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.9em;
`

const Th = styled.th`
  background: ${props => props.theme.colors.hover};
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  border-bottom: 1px solid ${props => props.theme.colors.border};
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
  border-bottom: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  transition: background-color 0.2s ease;
`

const Tr = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.hover};
    
    td {
      color: ${props => props.theme.colors.primary};
    }
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