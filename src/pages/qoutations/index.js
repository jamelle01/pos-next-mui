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
import Button from '@mui/material/Button'

import Image from 'next/image'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsSeparator'
import FormLayoutsAlignment from 'src/views/form-layouts/FormLayoutsAlignment'

//react import
import { useState, useEffect } from 'react'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { CSVLink } from 'react-csv'

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

const url = 'http://localhost:8000/products'

const Qoutations = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [products, setProducts] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            Products
          </Link>
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
            onChange={e => setSearch(e.target.value)}
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
            // size='large'
            // type='submit'
            fullWidth
            disableElevation
            style={{ textTransform: 'none' }}
            variant='contained'
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
                  <StyledTableCell align='center'>Created On</StyledTableCell>
                  <StyledTableCell align='center'>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(product => (
                    <StyledTableRow key={product.name}>
                      <StyledTableCell align='left'>
                        <Image src='/images/no-image.png' alt='image' width={30} height={30} draggable={false} />
                      </StyledTableCell>
                      <StyledTableCell component='th' scope='product'>
                        <Typography
                          style={{
                            fontSize: '.8rem'
                            // lineHeight: 1,
                            // // maxHeight: '2.4rem',
                            // overflow: 'hidden',
                            // textOverflow: 'ellipsis',
                            // display: '-webkit-box',
                            // WebkitBoxOrient: 'vertical'
                            // WebkitLineClamp: 2
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
                            // maxHeight: '2.4rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical'
                            // WebkitLineClamp: 2
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
                            // lineHeight: 1,
                            // // maxHeight: '2.4rem',
                            // overflow: 'hidden',
                            // textOverflow: 'ellipsis',
                            // display: '-webkit-box',
                            // WebkitBoxOrient: 'vertical'
                            // WebkitLineClamp: 2
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
                      <StyledTableCell align='center'>Crud</StyledTableCell>
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

export default Qoutations

// to run json 
// npx json-server --watch data/db.json --port 8000
