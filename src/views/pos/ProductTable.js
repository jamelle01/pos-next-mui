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

// icon import
import Plus from 'mdi-material-ui/Plus'
import Minus from 'mdi-material-ui/Minus'
import TrashCanOutline from 'mdi-material-ui/TrashCanOutline'

// react import
import { useState } from 'react'

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

const ProductTable = ({
  selectedProducts,
  handleIncrement,
  handleDecrement,
  handleProductRemove,
  handleQuantChange,
  discount,
  total,
  subTotal,
  totalQuantity
}) => {
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
        <Table size='small' aria-label='a dense table' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ border: '1px solid rgba(0, 0, 255, 0.1)' }}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('')}
              >
                #
              </TableCell>
              <TableCell sx={{ border: '1px solid rgba(0, 0, 255, 0.1)' }}>
                <TableSortLabel
                  active={sortBy === 'product'}
                  direction={sortOrder}
                  onClick={() => handleSort('product')}
                >
                  Product
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ border: '1px solid rgba(0, 0, 255, 0.1)' }} align='center'>
                <TableSortLabel
                  active={sortBy === 'calories'}
                  direction={sortOrder}
                  onClick={() => handleSort('calories')}
                >
                  Quantity
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ border: '1px solid rgba(0, 0, 255, 0.1)' }} align='center'>
                <TableSortLabel active={sortBy === 'fat'} direction={sortOrder} onClick={() => handleSort('fat')}>
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ border: '1px solid rgba(0, 0, 255, 0.1)' }} align='center'>
                <TableSortLabel active={sortBy === 'carbs'} direction={sortOrder} onClick={() => handleSort('carbs')}>
                  Subtotal
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ border: '1px solid rgba(0, 0, 255, 0.1)' }} align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProducts.map((product, index) => (
              <TableRow key={product.name} sx={{ '&:nth-of-type(even)': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
                <TableCell sx={{ border: '1px solid rgba(0, 0, 255, 0.1)' }}>{index + 1}</TableCell>
                <TableCell title={product.name} sx={{ fontSize: '14px', border: '1px solid rgba(0, 0, 255, 0.1)' }}>
                  <Typography
                    // variant='h6'
                    // noWrap
                    style={{
                      fontSize: '0.7rem',
                      lineHeight: 1,
                      // maxHeight: '2.4rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2
                    }}
                  >
                    {product.name}
                  </Typography>
                </TableCell>
                <TableCell
                  align='center'
                  verticalAlign='middle'
                  sx={{
                    fontSize: '14px',
                    border: '1px solid rgba(0, 0, 255, 0.1)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Minus
                      onClick={() => {
                        if (product.selectedQuantity > 1) {
                          handleDecrement(product.id)
                        }
                      }}
                      fontSize='small'
                      sx={{
                        color: 'red',
                        border: '1px solid red',
                        borderRadius: '5px',
                        opacity: product.selectedQuantity === 1 ? '0.5' : '1',
                        cursor: product.selectedQuantity === 1 ? 'not-allowed' : 'pointer'
                      }}
                      disabled={product.selectedQuantity === 1}
                    />

                    {/* <TextField
                    value={product.calories}
                    InputProps={{ disableUnderline: true }}
                    sx={{ fontSize: '14px', fontWeight: 'bold', color: 'secondary.main' }}
                  /> */}
                    <input
                      className='quantValue'
                      type='number'
                      // inputMode='numeric'
                      value={
                        product.selectedQuantity >= product.quantity
                          ? (product.selectedQuantity = product.quantity)
                          : product.selectedQuantity
                      }
                      style={{
                        minWidth: '30px',
                        maxWidth: '50px',
                        textAlign: 'center',
                        border: '1px solid transparent',
                        backgroundColor: 'transparent'
                      }}
                      onChange={e => handleQuantChange(product.id, e)}
                    />

                    {/* {product.calories} */}

                    <Plus
                      onClick={() => {
                        if (product.selectedQuantity < product.quantity) {
                          handleIncrement(product.id)
                        }
                      }}
                      fontSize='small'
                      sx={{
                        color: 'blue',
                        border: '1px solid blue',
                        borderRadius: '5px',
                        opacity: product.selectedQuantity === product.quantity ? '0.5' : '1',
                        cursor: product.selectedQuantity === product.quantity ? 'not-allowed' : 'pointer'
                      }}
                      disabled={product.selectedQuantity === product.quantity}
                    />
                  </div>
                </TableCell>

                <TableCell sx={{ fontSize: '14px', border: '1px solid rgba(0, 0, 255, 0.1)' }}>
                  <div style={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ alignSelf: 'flex-start' }}>₱</span>
                    <span style={{ alignSelf: 'flex-end' }}>
                      {product.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: '14px', border: '1px solid rgba(0, 0, 255, 0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ alignSelf: 'flex-start' }}>₱</span>
                    <span style={{ alignSelf: 'flex-end' }}>
                      {(product.subtotal = product.price * product.selectedQuantity).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: 'yellow',
                    position: 'sticky',
                    left: 0,
                    border: '1px solid rgba(0, 0, 255, 0.1)',
                    width: '1px'
                  }}
                  align='center'
                >
                  <TrashCanOutline
                    onClick={() => handleProductRemove(product.id)}
                    sx={{ color: 'red', backgroundColor: 'yellow', cursor: 'pointer' }}
                  />
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
                  {totalQuantity}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} container justify='center' alignItems='center'>
              <Grid xs={6}>
                <Typography align='right'>Subtotal: ₱ </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography mr={5} align='right'>
                  {subTotal}
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
                  {total}
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
