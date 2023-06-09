// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'

import TablePagination from '@mui/material/TablePagination'

import TextField from '@mui/material/TextField'
import Magnify from 'mdi-material-ui/Magnify'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

import CloseIcon from '@mui/icons-material/Close'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'

// next import
import { useRouter } from 'next/router'
import Image from 'next/image'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

// icons import
import SquareEditOutline from 'mdi-material-ui/SquareEditOutline'
import Eye from 'mdi-material-ui/Eye'
import Delete from 'mdi-material-ui/Delete'
import IconButton from '@mui/material/IconButton'

// components import
import DialogView from './modal'

// third party import
import { CSVLink } from 'react-csv'

//react import
import { useState, useEffect, forwardRef } from 'react'
import { EditAttributesOutlined } from '@mui/icons-material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // color: theme.palette.common.black,
    // backgroundColor: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const url = 'http://localhost:8000/products'

const Products = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [products, setProducts] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')

  const [viewProduct, setViewProduct] = useState('')

  const router = useRouter()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  function deleteProduct(id) {
    const newProducts = products.filter(product => product.id !== id)

    fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        return response.json()
      })
      .then(data => {
        console.log('Product deleted successfully:', data)

        // Update the state to remove the deleted product
        setProducts(newProducts)
      })
      .catch(error => {
        console.error('There was an error deleting the product:', error)
      })
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [url])

  const handleSort = property => {
    const isAscending = sortOrder === 'asc'
    const order = isAscending ? 'desc' : 'asc'
    setSortBy(property)
    setSortOrder(order)
    products.sort((a, b) => {
      const valueA = a[property]
      const valueB = b[property]
      const direction = isAscending ? 1 : -1

      return valueA < valueB ? -direction : valueA > valueB ? direction : 0
    })
  }

  // modal / dialog things
  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const handleOpenView = id => {
    setViewProduct(id)
    setOpenView(true)
  }

  const handleCloseView = () => setOpenView(false)

  const [openDelete, setOpenDelete] = useState(false)
  const [id, setId] = useState(null)

  return (
    <Grid container spacing={2}>
      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDelete(false)}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Confirm Delete  '}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            This action will delete the selected product.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDelete(false)
            }}
          >
            Cancel
          </Button>
          <Button
            color='info'
            variant='contained'
            onClick={() => {
              deleteProduct(id)
              setOpenDelete(false)
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item xs={12}>
        <Typography variant='h5' style={{ color: '#0000FF' }}>
          {/* <Link href='https://mui.com/components/tables/' target='_blank'> */}
          Products
          {/* </Link> */}
        </Typography>

        {/* <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography> */}
      </Grid>

      {/* search  */}

      <Grid item xs={6}>
        <Card sx={{ padding: 0.5 }}>
          <TextField
            fullWidth
            size='small'
            placeholder='Search'
            onChange={e => {
              setSearch(e.target.value)
              setPage(0)
            }}
            InputProps={{
              startAdornment: (
                <Magnify
                  sx={{
                    fontSize: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />
              )
            }}
          />
        </Card>
      </Grid>

      {/* HOME button */}

      {/* <Button size='large' type='submit' variant='contained' sx={{ width: '100%' }}>
        Login
      </Button> */}

      {/* <Grid item xs={0.6}>
        <Card sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            sx={{ height: '100%', whiteSpace: 'nowrap' }}
            align='center'
            fullWidth
            disableElevation
            style={{ textTransform: 'none' }}
            variant='contained'
          >
            f
          </Button>
        </Card>
      </Grid> */}

      <Grid item xs={2}>
        <Card sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            sx={{ height: '100%', whiteSpace: 'nowrap' }}
            align='center'
            fullWidth
            disableElevation
            variant='contained'
            style={{ textTransform: 'none' }}
          >
            <CSVLink data={products} filename='products.csv' style={{ textDecoration: 'none', color: 'white' }}>
              Export Products
            </CSVLink>
          </Button>
        </Card>
      </Grid>

      {/* full screen button */}

      <Grid item xs={2}>
        <Card sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            sx={{ height: '100%', whiteSpace: 'nowrap' }}
            align='center'
            fullWidth
            disableElevation
            style={{ textTransform: 'none' }}
            variant='contained'
          >
            Import Product
          </Button>
        </Card>
      </Grid>
      <Grid item xs={2}>
        <Card sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            sx={{ height: '100%', whiteSpace: 'nowrap' }}
            align='center'
            fullWidth
            disableElevation
            style={{ textTransform: 'none' }}
            variant='contained'
            onClick={() => router.push('/products/create')}
          >
            Create Product
          </Button>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          {/* <CardHeader title='Customized Table' titleTypographyProps={{ variant: 'h6' }} /> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='left'>Product</StyledTableCell>
                  <StyledTableCell align='left'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'name'}
                      direction={sortOrder}
                      onClick={() => handleSort('name')}
                    >
                      Name
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align='left'>Code</StyledTableCell>
                  <StyledTableCell align='left'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'brand'}
                      direction={sortOrder}
                      onClick={() => handleSort('brand')}
                    >
                      Brand
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'price'}
                      direction={sortOrder}
                      onClick={() => handleSort('price')}
                    >
                      Price
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align='center'>Product Unit</StyledTableCell>
                  <StyledTableCell align='center'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'quantity'}
                      direction={sortOrder}
                      onClick={() => handleSort('quantity')}
                    >
                      In Stock
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'created_on'}
                      direction={sortOrder}
                      onClick={() => handleSort('created_on')}
                    >
                      Created On
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align='center'>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(product => (
                    <StyledTableRow key={product.id}>
                      <StyledTableCell align='left'>
                        <Image src='/images/no-image.png' alt='image' width={30} height={30} draggable={false} />
                      </StyledTableCell>
                      <StyledTableCell component='th' scope='product'>
                        <Typography
                          style={{
                            fontSize: '.8rem'
                          }}
                        >
                          {product.name}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='left'>
                        <Typography
                          style={{
                            fontSize: '0.8rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {product.code}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='left'>
                        <Typography
                          style={{
                            fontSize: '0.8rem',
                            lineHeight: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {product.brand}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ alignSelf: 'flex-start' }}>₱&nbsp;</span>
                          <span style={{ alignSelf: 'flex-end' }}>
                            {product.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </span>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <Typography
                          style={{
                            fontSize: '0.8rem'
                          }}
                        >
                          {product.unit}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='center'>{product.quantity}</StyledTableCell>
                      <StyledTableCell align='center'>
                        <Typography
                          style={{
                            fontSize: '0.8rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {product.created_on}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <div>
                          <DialogView open={openView} handleClose={handleCloseView} viewProduct={viewProduct} />
                          {/* <DialogEdit open={openEdit} handleClose={handleCloseEdit} viewProduct={viewProduct} /> */}
                          <IconButton
                            onClick={() => {
                              handleOpenView(product.id)
                            }}
                          >
                            <Eye style={{ fontSize: '1.2rem' }} />
                          </IconButton>
                          <IconButton onClick={() => router.push('/products/edit/' + product.id)}>
                            <SquareEditOutline style={{ fontSize: '1.2rem' }} />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setId(product.id)
                              setOpenDelete(true)
                            }}
                          >
                            <Delete style={{ fontSize: '1.2rem' }} />
                          </IconButton>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Products
