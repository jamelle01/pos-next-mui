// mui imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableSortLabel from '@mui/material/TableSortLabel'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'

import Typography from '@mui/material/Typography'

// react import
import {useState} from 'react'

// hardcoded data for table
const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen ', 159, 6.0, 24, 4.0),
  createData('Ice cream', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Croissant', 290, 11.0, 32, 5.1),
  createData('Bagel', 300, 8.0, 25, 4.2),
  createData('Muffin', 346, 12.0, 48, 3.8),
  createData('Pancake', 430, 15.0, 56, 4.5),
  createData('Waffle', 380, 13.0, 41, 4.1),
  createData('Toast', 180, 3.0, 20, 2.5),
  createData('Omelette', 230, 7.0, 31, 3.3),
  createData('Scrambled eggs', 210, 6.0, 28, 3.0),
  createData('Bacon', 150, 5.0, 15, 2.5),
  createData('Sausage', 180, 4.0, 18, 2.8),
  createData('Hash browns', 220, 7.0, 22, 3.2),
  createData('Fruit salad', 120, 2.0, 16, 1.5),
  createData('Yogurt', 80, 1.5, 10, 1.0),
  createData('Granola', 220, 4.5, 30, 2.5)
]


const ProductTable = () => {

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSort = property => {
    const isAscending = sortOrder === 'asc'
    const order = isAscending ? 'desc' : 'asc'
    setSortBy(property)
    setSortOrder(order)
    const sortedRows = rows.sort((a, b) => {
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
    <div style={{ position: 'relative', height: '96.5vh' }}>
      {/* table  */}
      <TableContainer sx={{ height: '66vh' }} component={Paper}>
        <Table aria-label='simple table' stickyHeader>
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
                <TableCell sx={{ fontSize: '14px' }}>{row.name}</TableCell>
                <TableCell align='center' sx={{ fontSize: '14px' }}>
                  {row.calories}
                </TableCell>
                <TableCell align='center' sx={{ fontSize: '14px' }}>
                  {row.fat}
                </TableCell>
                <TableCell align='center' sx={{ fontSize: '14px' }}>
                  {row.carbs}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* totals */}

      {/* <Card> */}
      <form onSubmit={e => e.preventDefault()} style={{ position: 'absolute', bottom: '0' }}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} container justify='center' alignItems='center'>
              <Grid xs={6}>
                <Typography align='right'>Total QTY: </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography mr={5} align='right'>
                  9900{' '}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} container justify='center' alignItems='center'>
              <Grid xs={6}>
                <Typography align='right'>Subtotal: ₱ </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography mr={5} align='right'>
                  9900{' '}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Discount' placeholder='Discount' />
            </Grid>
            <Grid item xs={12} sm={6} container justify='center' alignItems='center'>
              <Grid xs={6}>
                <Typography align='right'>Total: ₱ </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography mr={5} align='right'>
                  9900{' '}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button size='large' color='error' fullWidth variant='contained'>
                reset
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button size='large' color='info' type='submit' fullWidth variant='contained'>
                pay now
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
      {/* </Card> */}
    </div>
  )
}

export default ProductTable