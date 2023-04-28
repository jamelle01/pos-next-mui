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
import MinusBox from 'mdi-material-ui/MinusBox'
import PlusBox from 'mdi-material-ui/PlusBox'
import TrashCanOutline from 'mdi-material-ui/TrashCanOutline'
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
import { reference } from '@popperjs/core'

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
const quotationsUrl = 'http://localhost:8000/quotations'

const InfoCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant='body1' component='h6'>
          CUSTOMER INFO
        </Typography>
        <Typography variant='caption' component='p'>
          Tedt
        </Typography>
        <Typography variant='caption' component='p'>
          tedt@gmail.com
        </Typography>
        <Typography variant='caption' component='p'>
          67777777777777777777
        </Typography>
        <Typography variant='caption' component='p'>
          Surat
        </Typography>
      </CardContent>
    </Card>
  )
}

const View = () => {
  const router = useRouter()
  const id = router.query.id

  const [quotation, setQuotation] = useState([])

  const [selectedProducts, setSelectedProducts] = useState([])

  const [discount, setDiscount] = useState(0)
  const [shipping, setShipping] = useState(0)

  const [total, setTotal] = useState(0)
  const [subTotal, setSubTotal] = useState(0)

  useState(() => {
    async function fetchData() {
      try {
        const response = await fetch(quotationsUrl + '/' + id)
        const data = await response.json()
        setQuotation(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  console.log(quotation)

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
          <CardHeader title={'Quotation Details ' + id} titleTypographyProps={{ variant: 'h6' }} />
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body1' align='center'>
                  Quotation Details : {quotation.reference}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <InfoCard />
              </Grid>
              <Grid item xs={4}>
                <InfoCard />
              </Grid>
              <Grid item xs={4}>
                <InfoCard />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body1'>ORDER SUMMARY</Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align='left'>Price</TableCell>
                        <TableCell align='left'>Stock</TableCell>
                        <TableCell align='center'>Qty</TableCell>
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
                          <TableCell align='left'>{item.quantity}</TableCell>
                          <TableCell align='left'>
                            <div
                              style={{
                                display: 'flex',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                            >
                              <IconButton
                                onClick={() => {
                                  if (item.selectedQuantity > 1) {
                                    handleDecrement(item.id)
                                  }
                                }}
                                disabled={item.selectedQuantity <= 1}
                                sx={{
                                  color: 'red',
                                  opacity: item.selectedQuantity <= 1 ? '0.5' : '1',
                                  cursor: item.selectedQuantity <= 1 ? 'not-allowed' : 'pointer'
                                }}
                              >
                                <MinusBox />
                              </IconButton>

                              <input
                                className='quantValue'
                                type='number'
                                value={item.selectedQuantity}
                                // value={item.selectedQuantity >= item.quantity ? item.quantity : item.selectedQuantity}
                                style={{
                                  minWidth: '30px',
                                  maxWidth: '50px',
                                  textAlign: 'center',
                                  border: '1px solid transparent',
                                  // backgroundColor: 'transparent',
                                  fontSize: '14px',
                                  fontWeight: 'bold',
                                  // color: 'secondary.main',
                                  appearance: 'textfield'
                                }}
                                onChange={e => handleQuantChange(item.id, e)}
                              />

                              <IconButton
                                sx={{
                                  color: 'blue',
                                  // opacity: item.selectedQuantity === item.quantity ? '0.5' : '1',
                                  cursor: 'pointer'
                                  // cursor: item.selectedQuantity === item.quantity ? 'not-allowed' : 'pointer'
                                }}
                                onClick={() => {
                                  // if (item.selectedQuantity < item.quantity) {
                                  handleIncrement(item.id)
                                  // }
                                }}
                                // disabled={item.selectedQuantity === item.quantity}
                              >
                                <PlusBox />
                              </IconButton>
                            </div>
                          </TableCell>
                          <TableCell align='left'>
                            {item.discount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </TableCell>
                          <TableCell align='left'>
                            {(item.subtotal = item.price * item.selectedQuantity).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </TableCell>
                          <TableCell align='center'>
                            <IconButton onClick={() => handleProductRemove(item.id)} sx={{ color: 'red' }}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      {selectedProducts.length == 0 && (
                        <TableRow>
                          <TableCell colSpan={7}>
                            <Typography align='center' variant='subtitle2'>
                              No Data Available
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}

                      <TableRow>
                        <TableCell colSpan={4} rowSpan={4} />
                        <TableCell>Subtotal</TableCell>
                        <TableCell colspan={2} align='right'>
                          {subTotal.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Discount</TableCell>
                        <TableCell colspan={2} align='right'>
                          {discount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Shipping</TableCell>
                        <TableCell colspan={2} align='right'>
                          {shipping.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell colspan={2} align='right'>
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
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default View
