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

// third party import
import { CSVLink } from 'react-csv'

//react import

import { useState, useEffect } from 'react'

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

const ProductCategories = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [products, setProducts] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')

  const router = useRouter()

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

      <Grid item xs={3}>
        {/* <Card sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
        </Card> */}
      </Grid>

      <Grid item xs={3}>
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
            onClick={() => router.push('/products/create')}
          >
            Create Product Category
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
                  <StyledTableCell align='left'></StyledTableCell>
                  <StyledTableCell align='left'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'name'}
                      direction={sortOrder}
                      onClick={() => handleSort('name')}
                    >
                      Product Count
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'name'}
                      direction={sortOrder}
                      onClick={() => handleSort('name')}
                    >
                      Product Count
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align='left'>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(product => (
                    <StyledTableRow key={product.id}>
                      <StyledTableCell align='left' style={{ width: '70px' }}>
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
                          product cat
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
                          count
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
                          action
                        </Typography>
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

export default ProductCategories
