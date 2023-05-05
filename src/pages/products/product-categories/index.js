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

import CloseIcon from '@mui/icons-material/Close'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

// next import
import { useRouter } from 'next/router'
import Image from 'next/image'

//icon import
import SquareEditOutline from 'mdi-material-ui/SquareEditOutline'
import Delete from 'mdi-material-ui/Delete'
import IconButton from '@mui/material/IconButton'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

// third party import
import { CSVLink } from 'react-csv'

// modal import
import CreateCategory from './modal'

//react import
import { useState, useEffect, forwardRef } from 'react'
import EditCategory from './modal/edit'

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
const categoriesUrl = 'http://localhost:8000/categories'

const ProductCategories = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')

  // modal purposes
  const [openCreate, setOpenCreate] = useState(false)
  
  const [openEdit, setOpenEdit] = useState(false)
  const [id, setId] = useState(null)
  const [category, setCategory] = useState()
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

  const handleSort = property => {
    const isAscending = sortOrder === 'asc'
    const order = isAscending ? 'desc' : 'asc'
    setSortBy(property)
    setSortOrder(order)
    categories.sort((a, b) => {
      const valueA = a[property]
      const valueB = b[property]
      const direction = isAscending ? 1 : -1

      return valueA < valueB ? -direction : valueA > valueB ? direction : 0
    })
  }

  const categoryCounts = categories.reduce((counts, category) => {
    counts[category.category] = (counts[category.category] || 0) + 1

    return counts
  }, {})

  function deleteCategory(id) {
    const newCategories = categories.filter(category => category.id !== id)

    fetch(`${categoriesUrl}/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        return response.json()
      })
      .then(data => {
        console.log('Category deleted successfully:', data)

        // Update the state to remove the deleted product
        setCategories(newCategories)
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(categoriesUrl)
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [categoriesUrl, refresh])

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
            This action will delete the selected category.
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
              deleteCategory(id)
              setOpenDelete(false)
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <CreateCategory
        refresh={refresh}
        setRefresh={setRefresh}
        categoriesUrl={categoriesUrl}
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
      />
      <EditCategory
        count={count}
        category={category}
        id={id}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <Grid item xs={12}>
        <Typography variant='h5' style={{ color: 'blue' }}>
          {/* <Link href='https://mui.com/components/tables/' target='_blank'> */}
          Product Categories
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
                      Product Category
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
                {categories
                  .filter(
                    category =>
                      category.name.toLowerCase().includes(search.toLowerCase()) && category.name !== 'All Categories'
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(category => (
                    <StyledTableRow key={category.name}>
                      <StyledTableCell align='left' style={{ width: '70px' }}>
                        <Image src='/images/no-image.png' alt='image' width={30} height={30} draggable={false} />
                      </StyledTableCell>
                      <StyledTableCell component='th' scope='category'>
                        <Typography
                          style={{
                            fontSize: '.8rem'
                          }}
                        >
                          {category.name}
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
                          {category.count}
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
                          <div>
                            <IconButton
                              onClick={async () => {
                                setCategory(category.name)
                                setCount(category.count)
                                setId(category.id)
                                setOpenEdit(true)
                              }}
                            >
                              <SquareEditOutline style={{ fontSize: '1.2rem' }} />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setId(category.id)
                                setOpenDelete(true)
                              }}
                            >
                              <Delete style={{ fontSize: '1.2rem' }} />
                            </IconButton>
                          </div>
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
            count={categories.length - 1}
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

// export async function getServerSideProps() {
//   const url = 'http://localhost:8000/products'
//   const categoriesUrl = 'http://localhost:8000/categories'

//   try {
//     const response = await fetch(url)
//     const products = await response.json()

//     const categoriesResponse = await fetch(categoriesUrl)
//     const categories = await categoriesResponse.json()

//     return {
//       props: {
//         products,
//         categories
//       }
//     }
//   } catch (error) {
//     console.error(error)

//     return {
//       props: {
//         products: [],
//         categories: []
//       }
//     }
//   }
// }

export default ProductCategories
