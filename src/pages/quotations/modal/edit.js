import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'

import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'

//icons import
import Magnify from 'mdi-material-ui/Magnify'
import Delete from 'mdi-material-ui/Delete'
import MinusBox from 'mdi-material-ui/MinusBox'
import PlusBox from 'mdi-material-ui/PlusBox'
import CloseIcon from '@mui/icons-material/Close'

//next imports
import { useRouter } from 'next/router'

import { useState, forwardRef, useEffect, useMemo, useRef } from 'react'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

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
    fontSize: '0.9rem'

    // Change the font size here
  },
  '& .MuiListItemText-secondary': {
    color: theme.palette.text.secondary,
    fontSize: '0.8rem'

    // Change the font size here
  }
}))

const StyledName = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: theme.palette.background.default,
  padding: '2px 4px',
  borderRadius: '4px',
  fontSize: '0.7rem'
}))

const status = [
  { id: 1, name: 'sent' },
  { id: 2, name: 'pending' }
]

const EditQuotation = ({ openEdit, setOpenEdit, quotation, id }) => {
  const router = useRouter()
  const searchInputRef = useRef(null)

  // data from json | choices data
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [shelves, setShelves] = useState([])

  // data to be sent to database
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedShelve, setSelectedShelve] = useState('')

  // selected customer details
  const [selectedCustomer, setSelectedCustomer] = useState()
  const [customerDetails, setCustomerDetails] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [discount, setDiscount] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState()
  const [notes, setNotes] = useState('')

  const [total, setTotal] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [search, setSearch] = useState('')

  const [selectedQuot, setSelectedQuot] = useState([])

  useEffect(() => {
    setSelectedDate(quotation.selectedDate)
  }, [id, quotation])

  const handleKeyPress = event => {
    const keyCode = event.keyCode || event.which
    const keyValue = String.fromCharCode(keyCode)

    if (!/^\d*\.?\d*$/.test(keyValue)) {
      event.preventDefault()
    } else if (keyValue === '.' && event.target.value.includes('.')) {
      event.preventDefault()
    }
  }

  return (
    <Dialog
      open={openEdit}
      onClose={() => {
        setOpenEdit(false)
      }}
      maxWidth='lg'
      TransitionComponent={Transition}
      keepMounted
      sx={{ m: 0, p: 2 }}
    >
      <DialogTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {'Edit Quotation'}
        <IconButton onClick={() => setOpenEdit(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Edit Quotation' titleTypographyProps={{ variant: 'h6' }} />
              <Divider sx={{ margin: 0 }} />
              <form onSubmit={e => handleSubmit(e)}>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={4}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: '100%' }}
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
                          value={selectedShelve}
                          onChange={e => setSelectedShelve(e.target.value)}
                          disabled={selectedProducts.length > 0}
                          input={<OutlinedInput label='Shelve' />}
                        >
                          {shelves.map(shelf => (
                            <MenuItem key={shelf.id} value={shelf.name}>
                              {shelf.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {search && !selectedShelve && (
                        <Typography variant='caption' style={{ color: 'red' }}>
                          Please select shelf
                        </Typography>
                      )}
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
                          } else {
                            setSelectedCustomer('')
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
                              autoComplete: 'new-password'

                              // disable browser auto-complete
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
                        autoComplete='off'
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

                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        label='Discount'
                        placeholder='0.00'
                        value={discount}
                        onChange={e => {
                          let value = e.target.value
                          if (value === '') {
                            setDiscount(0)
                          } else {
                            value = value.replace(/^0+(?=\d)/, '')

                            // remove leading zeros
                            setDiscount(value)
                          }
                        }}
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
                        value={shipping || 0}
                        onChange={e => {
                          let value = e.target.value
                          if (value === '') {
                            setShipping(0)
                          } else {
                            value = value.replace(/^0+(?=\d)/, '')

                            // remove leading zeros
                            setShipping(value)
                          }
                        }}
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
                        <Button
                          size='large'
                          type='submit'
                          sx={{ mr: 2 }}
                          variant='contained'
                          disabled={
                            !selectedDate ||
                            !selectedShelve ||
                            !selectedCustomer ||
                            !selectedProducts.length ||
                            !selectedStatus
                          }
                        >
                          Save
                        </Button>
                        <Button onClick={() => setOpenEdit(false)} size='large' color='secondary' variant='outlined'>
                          Cancel
                        </Button>
                      </CardActions>
                    </Grid>
                  </Grid>
                </CardContent>
              </form>
            </Card>
          </Grid>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default EditQuotation
