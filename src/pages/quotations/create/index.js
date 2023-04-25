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
import Button from '@mui/material/Button'

import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

//icons import
import Magnify from 'mdi-material-ui/Magnify'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Third Party Imports
// import DatePicker from 'react-datepicker'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'

dayjs.extend(localizedFormat)

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

import { CSVLink } from 'react-csv'

//react import

import { useState, useEffect, forwardRef } from 'react'

// next import
import { useRouter } from 'next/router'
import Image from 'next/image'

const sample = [{ name: 'sample 1' }, { name: 'sample 2' }]

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

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

// for table hardcoded
const TAX_RATE = 0.07

const ccyFormat = num => {
  return `${num.toFixed(2)}`
}

const priceRow = (qty, samp) => {
  return qty * samp
}

const createRow = (desc, qty, samp) => {
  const price = priceRow(qty, samp)

  return { desc, qty, samp, price }
}

const subtotal = items => {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0)
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99)
]
const invoiceSubtotal = subtotal(rows)
const invoiceTaxes = TAX_RATE * invoiceSubtotal
const invoiceTotal = invoiceTaxes + invoiceSubtotal

const Create = () => {
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

  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

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

  const handleKeyPress = event => {
    const keyCode = event.keyCode || event.which
    const keyValue = String.fromCharCode(keyCode)

    if (!/^\d*\.?\d*$/.test(keyValue)) {
      event.preventDefault()
    } else if (keyValue === '.' && event.target.value.includes('.')) {
      event.preventDefault()
    }
  }


  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [selectedShelve, setSelectedShelve] = useState()
  const [selectedCustomer, setSelectedCustomer] = useState()
  const [discount, setDiscount] = useState()
  const [shipping, setShipping] = useState()
  const [selectedStatus, setSelecteStatus] = useState()
  const [notes, setNotes] = useState()

  console.log(selectedDate)

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        {/* <Typography variant='h5'>Create Product</Typography> */}
      </Grid>

      <Grid item xs={2}>
        <Card sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            sx={{ height: '100%', whiteSpace: 'nowrap' }}
            align='center'
            fullWidth
            disableElevation
            style={{ textTransform: 'none' }}
            onClick={() => router.push('/quotations')}
            variant='contained'
          >
            Back
          </Button>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Create Quotation' titleTypographyProps={{ variant: 'h6' }} />
          <Divider sx={{ margin: 0 }} />
          <form onSubmit={e => e.preventDefault()}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Date'
                      value={selectedDate}
                      onChange={date => setSelectedDate(date)}
                      shouldDisableDate={date => date.isAfter(dayjs(), 'day')}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={4}>
                  <FormControl required fullWidth>
                    <InputLabel id='demo-multiple-name-label'>Shelve</InputLabel>
                    <Select
                      labelId='demo-multiple-name-label'
                      id='demo-multiple-name'
                      // multiple
                      // value={selectedUnit}
                      onChange={e => setSelectedShelve(e.target.value)}
                      input={<OutlinedInput label='Shelve' />}
                    >
                      {sample.map(samp => (
                        <MenuItem key={samp.name} value={samp.name}>
                          {samp.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl required fullWidth>
                    <InputLabel id='demo-multiple-name-label'>Customer</InputLabel>
                    <Select
                      labelId='demo-multiple-name-label'
                      id='demo-multiple-name'
                      // multiple
                      // value={selectedUnit}
                      onChange={e => setSelectedCustomer(e.target.value)}
                      input={<OutlinedInput label='Customer' />}
                    >
                      {sample.map(samp => (
                        <MenuItem key={samp.name} value={samp.name}>
                          {samp.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    placeholder='Search Product by Code Name'
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
                </Grid>

                {/* table */}

                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell align='right'>Price</TableCell>
                          <TableCell align='right'>Stock</TableCell>
                          <TableCell align='right'>Qty</TableCell>
                          <TableCell align='right'>Subtotal</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => (
                          <TableRow key={row.desc}>
                            <TableCell>{row.desc}name</TableCell>
                            <TableCell align='right'>{row.qty}price</TableCell>
                            <TableCell align='right'>{row.samp}stock</TableCell>
                            <TableCell align='right'>{ccyFormat(row.price)}quantiry</TableCell>
                            <TableCell align='right'>{ccyFormat(row.price)}subtotal</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} rowSpan={4} />
                          <TableCell>Subtotal</TableCell>
                          <TableCell align='right'>{ccyFormat(invoiceSubtotal)}subtot</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Discount</TableCell>
                          <TableCell align='right'>{ccyFormat(invoiceTaxes)}discount</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Shipping</TableCell>
                          <TableCell align='right'>{ccyFormat(invoiceTaxes)}shipping</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Total</TableCell>
                          <TableCell align='right'>{ccyFormat(invoiceTotal)}total</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label='Discount'
                    placeholder='0.00'
                    value={discount}
                    onChansge={e => setDiscount(e.target.value)}
                    InputProps={{
                      onKeyPress: handleKeyPress,
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Typography variant='h6' color='textSecondary'>
                            ₱
                          </Typography>
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label='Shipping'
                    placeholder='0.00'
                    value={shipping}
                    onChange={e => setShipping(e.target.value)}
                    InputProps={{
                      onKeyPress: handleKeyPress,
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Typography variant='h6' color='textSecondary'>
                            ₱
                          </Typography>
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant='outlined'
                  />
                </Grid>

                <Grid item xs={4}>
                  <FormControl required fullWidth>
                    <InputLabel id='demo-multiple-name-label'>Status</InputLabel>
                    <Select
                      labelId='demo-multiple-name-label'
                      id='demo-multiple-name'
                      // multiple
                      // value={selectedUnit}
                      onChange={e => setSelectedStatus(e.target.value)}
                      input={<OutlinedInput label='Shelve' />}
                    >
                      {sample.map(samp => (
                        <MenuItem key={samp.name} value={samp.name}>
                          {samp.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={4}>
                  <TextField fullWidth label='First Name' placeholder='Leonard' />
                </Grid> */}

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id='standard-multiline-static'
                    label='Notes'
                    multiline
                    placeholder='Enter Notes'
                    rows={4}
                    // defaultValue='Default Value'
                    // variant='standard'
                  />
                </Grid>

                {/* submit btn  */}

                <Grid item xs={12}>
                  <Divider sx={{ margin: 0 }} />
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                      Save
                    </Button>
                    <Button size='large' color='secondary' variant='outlined'>
                      Cancel
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Create
