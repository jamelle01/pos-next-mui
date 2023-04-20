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

import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

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

import { useRouter } from 'next/router'

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
  }, [url])

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            quotations
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
            // size='large'
            // type='submit'
            fullWidth
            disableElevation
            style={{ textTransform: 'none' }}
            onClick={() => router.push('/quotation')}
            variant='contained'
          >
            Create quotation
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
                      active={sortBy === 'warehouse'}
                      direction={sortOrder}
                      onClick={() => handleSort('warehouse')}
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
                            // lineHeight: 1,
                            // // maxHeight: '2.4rem',
                            // overflow: 'hidden',
                            // textOverflow: 'ellipsis',
                            // display: '-webkit-box',
                            // WebkitBoxOrient: 'vertical'
                            // WebkitLineClamp: 2
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
                            // maxHeight: '2.4rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical'
                            // WebkitLineClamp: 2
                          }}
                        >
                          {quotation.warehouse}
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
                            fontSize: '0.8rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {quotation.created_on}
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

export default Quotations

// to run json
// npx json-server --watch data/db.json --port 8000
