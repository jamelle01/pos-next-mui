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

import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
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

//icon import
import SquareEditOutline from 'mdi-material-ui/SquareEditOutline'
import Delete from 'mdi-material-ui/Delete'
import IconButton from '@mui/material/IconButton'

// third party import
import { CSVLink } from 'react-csv'

// modal import
import CreateBrand from './modal'

//react import
import { useState, useEffect, forwardRef } from 'react'
import EditBrand from './modal/edit'

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
const brandsUrl = 'http://localhost:8000/brands'

const Brands = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')

  //modal purps
  const [openCreate, setOpenCreate] = useState(false)

  const [openEdit, setOpenEdit] = useState(false)
  const [id, setId] = useState(null)
  const [brand, setBrand] = useState()
  const [count, setCount] = useState()
  const [refresh, setRefresh] = useState(false)

  const [openDelete, setOpenDelete] = useState(false)

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(brandsUrl)
        const data = await response.json()
        setBrands(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [brandsUrl, refresh])

  const handleSort = property => {
    const isAscending = sortOrder === 'asc'
    const order = isAscending ? 'desc' : 'asc'

    // setSortBy(property)
    // setSortOrder(order)
    brands.sort((a, b) => {
      const valueA = a[property]
      const valueB = b[property]
      const direction = isAscending ? 1 : -1

      return valueA < valueB ? -direction : valueA > valueB ? direction : 0
    })
  }

  const categoryCounts = brands.reduce((counts, brand) => {
    counts[brand.brand] = (counts[brand.brand] || 0) + 1

    return counts
  }, {})

  function deleteBrand(id) {
    const newBrand = brands.filter(brand => brand.id !== id)

    fetch(`${brandsUrl}/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        return response.json()
      })
      .then(data => {
        console.log('Brand deleted successfully:', data)

        // Update the state to remove the deleted product
        setBrands(newBrand)
        setOpenDelete(false)
      })
      .catch(error => {
        console.error('There was an error deleting the product:', error)
      })
  }

  // console.log(categoryCounts)

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
            This action will delete the selected brand.
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
              deleteBrand(id)
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <CreateBrand
        refresh={refresh}
        setRefresh={setRefresh}
        brandsUrl={brandsUrl}
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
      />
      <EditBrand
        count={count}
        brand={brand}
        id={id}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <Grid item xs={12}>
        <Typography variant='h5'>
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
            fullWidth
            disableElevation
            style={{ textTransform: 'none' }}
            variant='contained'
            onClick={() => setOpenCreate(true)}
          >
            Create Brand
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
                      Brand Name
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'count'}
                      direction={sortOrder}
                      onClick={() => handleSort('count')}
                    >
                      Product Count
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align='left'>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brands
                  .filter(
                    brand => brand.name.toLowerCase().includes(search.toLowerCase()) && brand.name !== 'All Brands'
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(brand => (
                    <StyledTableRow key={brand.name}>
                      <StyledTableCell align='left' style={{ width: '70px' }}>
                        <Image src='/images/no-image.png' alt='image' width={30} height={30} draggable={false} />
                      </StyledTableCell>
                      <StyledTableCell component='th' scope='brand'>
                        <Typography
                          style={{
                            fontSize: '.8rem'
                          }}
                        >
                          {brand.name}
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
                          {brand.count}
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
                          <IconButton
                            onClick={async () => {
                              setBrand(brand.name)
                              setCount(brand.count)
                              setId(brand.id)
                              setOpenEdit(true)
                            }}
                          >
                            <SquareEditOutline style={{ fontSize: '1.2rem' }} />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setId(brand.id)
                              setOpenDelete(true)
                            }}
                          >
                            <Delete style={{ fontSize: '1.2rem' }} />
                          </IconButton>
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
            count={brands.length - 1}
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

// export async function getServerSideProps(context) {
//   const url = 'http://localhost:8000/products'
//   const brandsUrl = 'http://localhost:8000/brands'
//   const [productsRes, brandsRes] = await Promise.all([fetch(url), fetch(brandsUrl)])
//   const [productsData, brandsData] = await Promise.all([productsRes.json(), brandsRes.json()])

//   return {
//     props: {
//       products: productsData,
//       brands: brandsData
//     }
//   }
// }

export default Brands
