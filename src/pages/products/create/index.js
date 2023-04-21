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

// import Camera from '@mui/material/Camera';
import Camera from 'mdi-material-ui/Camera'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import React from 'react'

//icons import
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

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

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const names = ['Conductors', 'Semiconductors', 'Isolators', 'Magnetic materials']

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
const categoriesUrl = 'http://localhost:8000/categories'
const brandsUrl = 'http://localhost:8000/brands'

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
  const [personName, setPersonName] = useState([])

  const handleChange = event => {
    const {
      target: { value }
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

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
  }, [categoriesUrl])

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
  }, [brandsUrl])

  const handleKeyPress = event => {
    const keyCode = event.keyCode || event.which
    const keyValue = String.fromCharCode(keyCode)

    if (!/^\d+$/.test(keyValue)) {
      event.preventDefault()
    }
  }

  const barcodeSymbol = [{ name: 'code 39' }, { name: 'code 128' }]
  const productUnit = [{ name: 'kg' }, { name: 'pieces' }]
  const shelves = [{ name: '1' }, { name: '2' }]

  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  const [name, setName] = useState()
  const [code, setCode] = useState()
  const [selectedCategory, setSelectedCategory] = useState()
  const [selectedBrand, setSelectedBrand] = useState()
  const [selectedBarcodeSymbol, setSelectedBarcodeSymbol] = useState()
  const [cost, setSelectedCost] = useState()
  const [price, setSelectedPrice] = useState()
  const [selectedUnit, setSelectedUnit] = useState()
  // const [stockAlert]

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
            onClick={() => router.push('/products')}
            variant='contained'
          >
            Back
          </Button>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Create Product' titleTypographyProps={{ variant: 'h6' }} />
          <Divider sx={{ margin: 0 }} />
          <form onSubmit={e => e.preventDefault()}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={8}>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        onChange={e => setName(e.target.value)}
                        label='Name'
                        placeholder='Enter Product Name'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label='Code'
                        onChange={e => setCode(e.target.value)}
                        placeholder='Enter Product Code'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-multiple-name-label'>Product Category</InputLabel>
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          value={selectedCategory}
                          onChange={e => setSelectedCategory(e.target.value)}
                          input={<OutlinedInput label='Product Category' />}
                        >
                          {categories.map(category => (
                            <MenuItem key={category.name} value={category.name}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-multiple-name-label'>Brand</InputLabel>
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          value={selectedBrand}
                          onChange={e => setSelectedBrand(e.target.value)}
                          input={<OutlinedInput label='Brand' />}
                        >
                          {brands.map(brand => (
                            <MenuItem key={brand.name} value={brand.name}>
                              {brand.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-multiple-name-label'>Barcode Symbology</InputLabel>
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          // multiple
                          value={selectedBarcodeSymbol}
                          onChange={e => setSelectedBarcodeSymbol(e.target.value)}
                          input={<OutlinedInput label='Choose Barcode Symbology' />}
                        >
                          {barcodeSymbol.map(code => (
                            <MenuItem key={code.name} value={code.name}>
                              {code.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label='Product Cost'
                        placeholder='Enter Product Cost'
                        onChange={e => setSelectedCost(e.target.value)}
                        inputProps={{
                          onKeyPress: handleKeyPress,
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label='Product Price'
                        placeholder='Enter Product Cost'
                        onChange={e => setSelectedPrice(e.target.value)}
                        inputProps={{
                          onKeyPress: handleKeyPress,
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-multiple-name-label'>Product Unit</InputLabel>
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          multiple
                          value={personName}
                          onChange={e => setSelectedUnit(e.target.value)}
                          input={<OutlinedInput label='Product Unit' />}
                        >
                          {productUnit.map(unit => (
                            <MenuItem key={unit.name} value={unit.name}>
                              {unit.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-multiple-name-label'>Sales Unit</InputLabel>
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          multiple
                          value={personName}
                          onChange={handleChange}
                          input={<OutlinedInput label='Sales Unit' />}
                        >
                          {names.map(name => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid> */}
                    {/* <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-multiple-name-label'>Purchase Unit</InputLabel>
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          multiple
                          value={personName}
                          onChange={handleChange}
                          input={<OutlinedInput label='Barcode Symbology' />}
                        >
                          {names.map(name => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid> */}
                    <Grid item xs={6}>
                      <TextField
                        onchange={e => setStockAler(e.target.value)}
                        fullWidth
                        type='number'
                        label='Stock Alert'
                        placeholder='Enter Stock Alert'
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id='standard-multiline-static'
                        label='Notes'
                        placeholder='Enter Notes'
                        onchange={e => setNotes(e.target.value)}
                        multiline
                        rows={4}
                        // variant='standard'
                      />
                    </Grid>

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
                </Grid>

                {/* // image and add stock section */}

                <Grid item xs={4}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Button fullWidth variant='contained' component='label'>
                        Upload Image
                        <Camera />
                        <input hidden accept='image/*' multiple type='file' />
                      </Button>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant='h6' align='center'>
                        Add Stocks
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-multiple-name-label'>Shelve</InputLabel>
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          multiple
                          value={personName}
                          onChange={handleChange}
                          input={<OutlinedInput label='Warehouse' />}
                        >
                          {shelves.map(shelve => (
                            <MenuItem key={shelve.name} value={shelve.name}>
                              {shelve.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-multiple-name-label'>Supplier</InputLabel>
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          multiple
                          value={personName}
                          onChange={handleChange}
                          input={<OutlinedInput label='Supplier' />}
                        >
                          {names.map(name => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type='number'
                        label='Add Product Quantity'
                        placeholder='Add Product Quantity'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-multiple-name-label'>Status</InputLabel>
                        <Select
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          multiple
                          value={personName}
                          onChange={handleChange}
                          input={<OutlinedInput label='Status' />}
                        >
                          {names.map(name => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                {/* <Grid item xs={12}>
                  <Divider sx={{ marginBottom: 0 }} />
                </Grid> */}
                {/* <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    2. Personal Info
                  </Typography>
                </Grid> */}
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Create
