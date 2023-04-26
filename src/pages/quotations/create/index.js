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

import Autocomplete from '@mui/material/Autocomplete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

//icons import
import Magnify from 'mdi-material-ui/Magnify'
import Delete from 'mdi-material-ui/Delete'
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

import { useState, useEffect, forwardRef, useMemo, useRef } from 'react'
// next import
import { useRouter } from 'next/router'
import Image from 'next/image'

// custom style below

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

// const StyledList = styled(List)`
//   position: absolute;
//   z-index: 999;
//   background-color: #fff;
//   border: 1px solid #ccc;
//   margin-top: 8px;
//   width: 100%;
// `

const StyledList = styled(List)(({ theme }) => ({
  position: 'absolute',
  zIndex: 999,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[10],
  marginTop: theme.spacing(1),
  padding: 0,
  maxHeight: '300px',
  overflowY: 'auto',
  width: '100%'
}))

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer'
  }
}))

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '0.9rem' // Change the font size here
  },
  '& .MuiListItemText-secondary': {
    color: theme.palette.text.secondary,
    fontSize: '0.8rem' // Change the font size here
  }
}))

const StyledName = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: theme.palette.background.default,
  padding: '2px 4px',
  borderRadius: '4px',
  fontSize: '0.7rem'
}))

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

// harcoded data

const status = [
  { id: 1, name: 'sent' },
  { id: 2, name: 'pending' }
]

const productsUrl = 'http://localhost:8000/products'
const customersUrl = 'http://localhost:8000/customers'
const shelvesUrl = 'http://localhost:8000/shelves'

const Create = () => {
  const router = useRouter()
  const searchInputRef = useRef(null)

  // usestates here
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // data from json | choices data
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [shelves, setShelves] = useState([])

  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // data to be sent to database

  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [selectedShelve, setSelectedShelve] = useState()

  const [selectedCustomer, setSelectedCustomer] = useState()
  // selected customer details
  const [customerDetails, setCustomerDetails] = useState([])
  const [search, setSearch] = useState('')

  const [selectedProducts, setSelectedProducts] = useState([])

  const [discount, setDiscount] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState()
  const [notes, setNotes] = useState()

  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)

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
        const response = await fetch(productsUrl)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [productsUrl])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(customersUrl)
        const data = await response.json()
        setCustomers(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [customersUrl])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(shelvesUrl)
        const data = await response.json()
        setShelves(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [shelvesUrl])

  useEffect(() => {
    // add event listener to document for click events
    const handleClickOutside = e => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target) &&
        !document.getElementsByClassName('MuiList-root')[0].contains(e.target)
      ) {
        setSearch('')
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter(
      product =>
        product.code.toLowerCase().includes(search.toLowerCase()) ||
        product.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [products, search])

  useEffect(async () => {
    // const totalQuantity = selectedProducts.reduce((acc, product) => acc + product.selectedQuantity, 0)
    const subTotal = await selectedProducts.reduce((acc, product) => acc + product.subtotal, 0)
    const total = selectedProducts.reduce((acc, product) => acc + product.subtotal, 0)
    // console.log(totalQuantity);
    // setTotalQuantity(totalQuantity)
    setSubTotal(subTotal)

    setTotal(total - discount)
    console.log(subTotal)
  }, [selectedProducts, discount])

  // functions here
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
  const handleKeyDown = event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex(prevIndex => (prevIndex === filteredProducts.length - 1 ? 0 : prevIndex + 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex(prevIndex => (prevIndex === 0 ? filteredProducts.length - 1 : prevIndex - 1))
    } else if (event.key === 'Enter' && highlightedIndex !== -1) {
      // Do something with the selected product
      console.log(filteredProducts[highlightedIndex])
    }
    event.stopPropagation()
  }
  const handleFocus = () => {
    setHighlightedIndex(0)
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

  const handleProductClick = product => {
    // console.log(product.quantity);
    const productIndex = selectedProducts.findIndex(p => p.id === product.id)
    if (productIndex === -1 && product.quantity) {
      // product does not exist, add it to the array
      const newProduct = { ...product, selectedQuantity: 1, subtotal: 0, discount: 0 }
      setSelectedProducts([...selectedProducts, newProduct])
    } else {
      // product exists, increment its quantity
      const updatedProducts = [...selectedProducts]
      if (product.quantity) {
        if (updatedProducts[productIndex].selectedQuantity !== product.quantity) {
          updatedProducts[productIndex].selectedQuantity += 1
          setSelectedProducts(updatedProducts)
        }
      }
    }
  }

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
                      value={selectedShelve}
                      onChange={e => setSelectedShelve(e.target.value)}
                      input={<OutlinedInput label='Shelve' />}
                    >
                      {shelves.map(shelf => (
                        <MenuItem key={shelf.id} value={shelf.name}>
                          {shelf.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    id='combo-box-demo'
                    options={customers}
                    getOptionLabel={option => option.name}
                    onChange={(event, value) => {
                      if (value) {
                        setSelectedCustomer(value.name)
                        setCustomerDetails({ customerId: value.id, name: value.name })
                      }
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Customer'
                        required
                        fullWidth
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password' // disable browser auto-complete
                        }}
                        variant='outlined'
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    placeholder='Search Product by Code or Product Name'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    inputRef={searchInputRef}
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
                  {search.length > 0 && filteredProducts.length > 0 && (
                    <StyledList>
                      {filteredProducts.map(product => (
                        <StyledListItem
                          button
                          key={product.id}
                          onClick={() => {
                            handleProductClick(product)
                          }}
                        >
                          <ListItemIcon>
                            <Magnify />
                          </ListItemIcon>
                          <StyledListItemText primary={product.name} secondary={product.code} />
                        </StyledListItem>
                      ))}
                    </StyledList>
                  )}
                </Grid>

                {/* table */}

                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell align='left'>Price</TableCell>
                          {/* <TableCell align='right'>Stock</TableCell> */}
                          <TableCell align='left'>Qty</TableCell>
                          <TableCell align='left'>Discount</TableCell>
                          <TableCell align='left'>Subtotal</TableCell>
                          <TableCell sx={{ width: '20px' }} align='left'>
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedProducts.map(item => (
                          <TableRow key={item.desc}>
                            <TableCell>
                              <Typography variant='subtitle1'>{item.code}</Typography>

                              <StyledName sx={{ fontSize: '0.7rem' }}>{item.name}</StyledName>
                            </TableCell>

                            <TableCell align='left'>
                              {item.price.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </TableCell>
                            {/* <TableCell align='right'>{item.samp}stock</TableCell> */}
                            <TableCell align='left'>{item.selectedQuantity}</TableCell>
                            <TableCell align='left'>
                              {item.discount.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </TableCell>
                            <TableCell align='left'>
                              {(item.price * item.selectedQuantity).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </TableCell>
                            <TableCell align='left'>
                              <Delete />
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={4} rowSpan={4} />
                          <TableCell>Subtotal</TableCell>
                          <TableCell align='left'>
                            {subTotal.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Discount</TableCell>
                          <TableCell align='left'>
                            {discount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Shipping</TableCell>
                          <TableCell align='left'>
                            {shipping.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Total</TableCell>
                          <TableCell align='left'>
                            {total.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </TableCell>
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
                    type='number'
                    onChange={e => setDiscount(e.target.value)}
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
                      value={selectedStatus}
                      onChange={e => setSelectedStatus(e.target.value)}
                      input={<OutlinedInput label='Shelve' />}
                    >
                      {status.map(stat => (
                        <MenuItem key={stat.id} value={stat.name}>
                          {stat.name}
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
                    onChange={e => setNotes(e.target.value)}
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
