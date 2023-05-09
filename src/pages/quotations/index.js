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
import IconButton from '@mui/material/IconButton'

import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import ListItemIcon from '@mui/material/ListItemIcon'

// icons here
import DotsVertical from 'mdi-material-ui/DotsVertical'
import Eye from 'mdi-material-ui/Eye'
import Delete from 'mdi-material-ui/Delete'
import FilePdfBox from 'mdi-material-ui/FilePdfBox'
import Cart from 'mdi-material-ui/Cart'
import SquareEditOutline from 'mdi-material-ui/SquareEditOutline'

import CloseIcon from '@mui/icons-material/Close'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

import Image from 'next/image'

// import Link from 'next/link'

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

import { useRouter } from 'next/router'

//react import
import { useState, useEffect, forwardRef } from 'react'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { CSVLink } from 'react-csv'
import EditQuotation from './modal/edit'

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

const url = 'http://localhost:8000/quotations'

const Quotations = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [quotations, setQuotations] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')

  const [statusFilter, setStatusFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState()

  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const [openEdit, setOpenEdit] = useState(false)

  // * this are the data to be change/ update used in edit page
  const [id, setId] = useState(null)
  const [reference, setReference] = useState()
  const [shelf, setShelf] = useState()
  const [customer, setCustomer] = useState()
  const [customerId, setCustomerId] = useState()
  const [selectedProducts, setSelectedProducts] = useState([])
  const [discount, setDiscount] = useState()
  const [shipping, setShipping] = useState()
  const [grandTotal, setGrandTotal] = useState()
  const [status, setStatus] = useState()
  const [notes, setNotes] = useState()

  const [refresh, setRefresh] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleQuotation = quotation => {
    setId(quotation.id)
    setReference(quotation.reference)
    setShelf(quotation.shelf)
    setCustomer(quotation.customer)
    setCustomerId(quotation.customerId)
    setSelectedProducts(quotation.selectedProducts)
    setDiscount(quotation.discount)
    setShipping(quotation.shipping)
    setGrandTotal(quotation.grand_total)
    setStatus(quotation.status)
    setNotes(quotation.notes)

    // Read the quotation object first, then set openEdit
    console.log(quotation.customerId)
  }

  const handleChangeDateFilter = event => {
    setDateFilter(event.target.value)
  }

  const handleChangeStatus = event => {
    setStatusFilter(event.target.value)
  }

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
        setQuotations(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [refresh])

  const handleSort = property => {
    const isAscending = sortOrder === 'asc'
    const order = isAscending ? 'desc' : 'asc'
    setSortBy(property)
    setSortOrder(order)
    quotations.sort((a, b) => {
      const valueA = a[property]
      const valueB = b[property]
      const direction = isAscending ? 1 : -1

      return valueA < valueB ? -direction : valueA > valueB ? direction : 0
    })
  }

  const deleteQuotation = id => {
    const newQuotations = quotations.filter(quotation => quotation.id !== id)

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
        console.log('quotation deleted successfully:', data)

        // Update the state to remove the deleted product
        setQuotations(newQuotations)
      })
      .catch(error => {
        console.error('There was an error deleting the quotation:', error)
      })
  }

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
            This action will delete the selected quotation.
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
              deleteQuotation(id)
              setOpenDelete(false)
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <EditQuotation
        setRefresh={setRefresh}
        refresh={refresh}
        quotationId={id}
        quotationReference={reference}
        quotationShelf={shelf}
        quotationCustomer={customer}
        quotationCustomerId={customerId}
        quotationSelectedProducts={selectedProducts}
        quotationDiscount={discount}
        quotationShipping={shipping}
        quotationGrandTotal={grandTotal}
        quotationStatus={status}
        quotationNotes={notes}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
      />
      <Grid item xs={12}>
        <Typography variant='h5'>quotations</Typography>
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
        {/* <Card sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
        {/* <Button
            sx={{ height: '100%', whiteSpace: 'nowrap' }}
            align='center'
            fullWidth
            disableElevation
            variant='contained'
            style={{ textTransform: 'none' }}
          > */}
        <FormControl sx={{ padding: 0.5 }} size='small' fullWidth>
          <InputLabel id='demo-simple-select-label'>Filter by Status</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={statusFilter}
            label='Filter by Status'
            onChange={handleChangeStatus}
          >
            <MenuItem value={'All'}>All</MenuItem>
            <MenuItem value={'Received'}>Received</MenuItem>
            <MenuItem value={'Pending'}>Pending</MenuItem>
            <MenuItem value={'Ordered'}>Ordered</MenuItem>
          </Select>
        </FormControl>
        {/* </Button> */}
        {/* </Card> */}
      </Grid>

      {/* full screen button */}

      <Grid item xs={2}>
        <FormControl sx={{ padding: 0.5 }} size='small' fullWidth>
          <InputLabel id='demo-simple-select-label'>Filter by Status</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={dateFilter}
            label='Filter by Date'
            onChange={handleChangeDateFilter}
          >
            <MenuItem value={null}>none</MenuItem>
            <MenuItem value={'Today'}>Today</MenuItem>
            <MenuItem value={'This Week'}>This Week</MenuItem>
            <MenuItem value={'Last Week'}>Last Week</MenuItem>
            <MenuItem value={'This Month'}>This Month</MenuItem>
            <MenuItem value={'Last Month'}>Last Month</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <Card sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            sx={{ height: '100%', whiteSpace: 'nowrap' }}
            align='center'
            fullWidth
            disableElevation
            style={{ textTransform: 'none' }}
            onClick={() => router.push('/quotations/' + 'create')}
            variant='contained'
          >
            Create Quotation
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
                  <StyledTableCell align='left'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'reference'}
                      direction={sortOrder}
                      onClick={() => handleSort('reference')}
                    >
                      Reference
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'customer'}
                      direction={sortOrder}
                      onClick={() => handleSort('customer')}
                    >
                      Customer
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'shelf'}
                      direction={sortOrder}
                      onClick={() => handleSort('shelf')}
                    >
                      Warehouse
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'status'}
                      direction={sortOrder}
                      onClick={() => handleSort('status')}
                    >
                      Status
                    </TableSortLabel>
                  </StyledTableCell>

                  <StyledTableCell align='center'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'grand_total'}
                      direction={sortOrder}
                      onClick={() => handleSort('grand_total')}
                    >
                      Grand Total
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <TableSortLabel
                      fullwidth
                      active={sortBy === 'grand_total'}
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
                {quotations
                  .filter(quotation => quotation.reference.toLowerCase().includes(search.toLowerCase()))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(quotation => (
                    <StyledTableRow key={quotation.id}>
                      <StyledTableCell align='left'>
                        <Typography
                          style={{
                            fontSize: '.8rem'
                          }}
                        >
                          {quotation.reference}
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
                          {quotation.customer}
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
                          {quotation.shelf}
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
                          {quotation.status}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <span style={{ alignSelf: 'flex-start' }}>₱&nbsp;</span>
                          <span style={{ alignSelf: 'flex-end' }}>
                            {parseFloat(quotation.grand_total)
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          </span>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <Typography
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                          variant='caption'
                        >
                          {quotation.created_on}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <IconButton
                          id='fade-button'
                          aria-controls={open ? 'fade-menu' : undefined}
                          aria-haspopup='true'
                          aria-expanded={open ? 'true' : undefined}
                          onClick={e => {
                            handleQuotation(quotation)
                            setAnchorEl(e.currentTarget)

                            console.log(quotation.id)
                          }}
                        >
                          <DotsVertical />
                        </IconButton>
                        <Menu
                          id='fade-menu'
                          MenuListProps={{
                            'aria-labelledby': 'fade-button'
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={() => setAnchorEl(null)}
                          TransitionComponent={Fade}
                        >
                          <MenuItem onClick={() => setAnchorEl(null)}>
                            <Link
                              sx={{ display: 'flex' }}
                              onClick={() => {
                                router.push('/quotations/details/' + id)
                                console.log(id)
                              }}
                            >
                              <ListItemIcon>
                                <Eye fontSize='small' />
                              </ListItemIcon>
                              <Typography variant='subtitle2'>View Quotation</Typography>
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={() => setAnchorEl(null)}>
                            <ListItemIcon>
                              <FilePdfBox fontSize='small' />
                            </ListItemIcon>
                            <Typography sx={{ display: 'inline' }} variant='subtitle2'>
                              Download PDF
                            </Typography>
                          </MenuItem>
                          <MenuItem onClick={() => setAnchorEl(null)}>
                            <ListItemIcon>
                              <Cart fontSize='small' />
                            </ListItemIcon>
                            <Typography sx={{ display: 'inline' }} variant='subtitle2'>
                              Create Sale
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setAnchorEl(null)
                              setOpenEdit(true)
                            }}
                          >
                            <ListItemIcon>
                              <SquareEditOutline fontSize='small' />
                            </ListItemIcon>
                            <Typography sx={{ display: 'inline' }} variant='subtitle2'>
                              Edit Quotation
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setAnchorEl(null)
                              setOpenDelete(true)
                            }}
                          >
                            <ListItemIcon>
                              <Delete fontSize='small' />
                            </ListItemIcon>
                            <Typography sx={{ display: 'inline' }} variant='subtitle2'>
                              Delete Quotation
                            </Typography>
                          </MenuItem>
                        </Menu>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={quotations.length}
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
//   const url = 'http://localhost:8000/quotations'

//   try {
//     const response = await fetch(url)
//     const quotations = await response.json()

//     return { props: { quotations } }
//   } catch (error) {
//     console.error(error)

//     return { props: { quotations: [] } }
//   }
// }

export default Quotations

// to run json

// npx json-server --watch data/db.json --port 8000
