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

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

// icon import
import Plus from 'mdi-material-ui/Plus'
import Minus from 'mdi-material-ui/Minus'
import TrashCanOutline from 'mdi-material-ui/TrashCanOutline'

// react import
import { useState, forwardRef } from 'react'

import ResetModal from './modal/ResetModal'
import PayModal from './modal/PayModal'

// hardcoded data for table
const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein }
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

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
  setDiscount,
  total,
  subTotal,
  totalQuantity,
  resetSelectedProducts,
  setRefresh,
  refresh
}) => {
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [age, setAge] = useState('')

  const handleSort = property => {
    const isAscending = sortOrder === 'asc'
    const order = isAscending ? 'desc' : 'asc'
    setSortBy(property)
    setSortOrder(order)
    selectedProducts.sort((a, b) => {
      const valueA = a[property]
      const valueB = b[property]
      const direction = isAscending ? 1 : -1

      return valueA < valueB ? -direction : valueA > valueB ? direction : 0
    })
  }

  function handlePayment() {
    // Perform pay operation here
    selectedProducts.map(async product => {
      const updatedProduct = {
        id: product.id,
        name: product.name,
        quantity: product.quantity - product.selectedQuantity,
        price: product.price,
        subtotal: product.price * (product.quantity - product.selectedQuantity),
        category: product.category,
        brand: product.brand
      }
      await fetch(`http://localhost:8000/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      })
    })

    resetSelectedProducts()
    setOpenPay(false)
  }

  const [openReset, setOpenReset] = useState(false)
  const [openPay, setOpenPay] = useState(false)

  return (
    <div style={{ position: 'relative', height: '96.5vh' }}>
      <ResetModal openReset={openReset} setOpenReset={setOpenReset} resetSelectedProducts={resetSelectedProducts} />
      <PayModal
        selectedProducts={selectedProducts}
        openPay={openPay}
        setOpenPay={setOpenPay}
        handlePayment={handlePayment}
        setRefresh={setRefresh} // for refresh purpose of data
        refresh={refresh}
        subTotal={subTotal}
        total={total}
        discount={discount}
      />

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
                <TableSortLabel active={sortBy === 'name'} direction={sortOrder} onClick={() => handleSort('name')}>
                  Product
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ border: '1px solid rgba(0, 0, 255, 0.1)' }} align='center'>
                <TableSortLabel
                  active={sortBy === 'selectedQuantity'}
                  direction={sortOrder}
                  onClick={() => handleSort('selectedQuantity')}
                >
                  Quantity
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ border: '1px solid rgba(0, 0, 255, 0.1)' }} align='center'>
                <TableSortLabel active={sortBy === 'price'} direction={sortOrder} onClick={() => handleSort('price')}>
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ border: '1px solid rgba(0, 0, 255, 0.1)' }} align='center'>
                <TableSortLabel
                  active={sortBy === 'subtotal'}
                  direction={sortOrder}
                  onClick={() => handleSort('subtotal')}
                >
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    // backgroundColor: 'yellow',
                    position: 'sticky',
                    left: 0,
                    border: '1px solid rgba(0, 0, 255, 0.1)',
                    width: '1px'
                  }}
                  align='center'
                >
                  <TrashCanOutline
                    onClick={() => handleProductRemove(product.id)}
                    sx={{ color: 'red', cursor: 'pointer' }}
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
              {/* <TextField fullWidth label='Discount' placeholder='Discount' /> */}
              <FormControl sx={{ minWidth: 120, width: '80%', marginLeft: '20%' }} fullWidth size='small'>
                <InputLabel id='demo-select-small-label'>Discount</InputLabel>
                <Select
                  label='Discount'
                  placeholder='Discount'
                  labelId='demo-select-small-label'
                  id='demo-select-small'
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                >
                  <MenuItem value={0}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
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
              <Button
                onClick={() => setOpenReset(true)}
                size='large'
                color='error'
                fullWidth
                variant='contained'
                disabled={selectedProducts.length === 0}
              >
                reset
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                size='large'
                color='info'
                type='submit'
                fullWidth
                variant='contained'
                onClick={() => setOpenPay(true)}
                disabled={selectedProducts.length === 0}
              >
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
