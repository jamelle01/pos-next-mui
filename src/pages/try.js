// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material'
import Paper from '@mui/material/Paper'

const rows = [
  { name: 'Product A', calories: 10, fat: 2.1, carbs: 15.4 },
  { name: 'Product B', calories: 20, fat: 3.5, carbs: 30.2 },
  { name: 'Product C', calories: 5, fat: 0.9, carbs: 5.5 },
  { name: 'Product D', calories: 15, fat: 2.5, carbs: 20.1 }
]

const Try = () => {
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSort = property => {
    const isAscending = sortOrder === 'asc'
    const order = isAscending ? 'desc' : 'asc'
    setSortBy(property)
    setSortOrder(order)
    rows.sort((a, b) => {
      if (a[property] < b[property]) {
        return isAscending ? -1 : 1
      }
      if (a[property] > b[property]) {
        return isAscending ? 1 : -1
      }
      return 0
    })
  }
  return (
    <TableContainer sx={{ height: '66vh' }} component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel active={sortBy === 'name'} direction={sortOrder} onClick={() => handleSort('name')}>
                Product
              </TableSortLabel>
            </TableCell>
            <TableCell align='center'>
              <TableSortLabel
                active={sortBy === 'calories'}
                direction={sortOrder}
                onClick={() => handleSort('calories')}
              >
                Quantity
              </TableSortLabel>
            </TableCell>
            <TableCell align='center'>
              <TableSortLabel active={sortBy === 'fat'} direction={sortOrder} onClick={() => handleSort('fat')}>
                Price
              </TableSortLabel>
            </TableCell>
            <TableCell align='center'>
              <TableSortLabel active={sortBy === 'carbs'} direction={sortOrder} onClick={() => handleSort('carbs')}>
                Subtotal
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align='center'>{row.calories}</TableCell>
              <TableCell align='center'>{row.fat}</TableCell>
              <TableCell align='center'>{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
Try.getLayout = page => <BlankLayout>{page}</BlankLayout>
export default Try
