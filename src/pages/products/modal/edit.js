// mui imports
import CloseIcon from '@mui/icons-material/Close'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

import Input from '@mui/material/Input'

import Slide from '@mui/material/Slide'

// loaidng
import CircularProgress from '@mui/material/CircularProgress'

// react import
import { useEffect, useState, forwardRef } from 'react'
import { Notes } from '@mui/icons-material'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const url = 'http://localhost:8000/products'
const categoriesUrl = 'http://localhost:8000/categories'
const brandsUrl = 'http://localhost:8000/brands'
const barcodeSymbolsUrl = 'http://localhost:8000/barcodeSymbols'
const productUnitsUrl = 'http://localhost:8000/productUnits'
const shelvesUrl = 'http://localhost:8000/shelves'
const suppliersUrl = 'http://localhost:8000/suppliers'

const DialogEdit = ({ open, handleClose, viewProduct }) => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [products, setProducts] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')

  // data to be up
  const [barcodeSymbols, setBarcodeSymbols] = useState([])
  const [productUnits, setProductUnits] = useState([])
  const [shelves, setShelves] = useState([])
  const [suppliers, setSuppliers] = useState([])

  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  const [name, setName] = useState(null)
  const [code, setCode] = useState()
  const [selectedCategory, setSelectedCategory] = useState()
  const [selectedBrand, setSelectedBrand] = useState()
  const [selectedBarcodeSymbol, setSelectedBarcodeSymbol] = useState()
  const [cost, setSelectedCost] = useState()
  const [price, setSelectedPrice] = useState()
  const [selectedUnit, setSelectedUnit] = useState()
  const [stockAlert, setStockAlert] = useState()
  const [notes, setNotes] = useState()
  const [selectedShelve, setSelectedShelve] = useState()
  const [selectedSupplier, setSelectedSupplier] = useState()
  const [quantity, setQuantity] = useState()

  const [imageFile, setImageFile] = useState(null)

  // const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${url}/${viewProduct}`)
        const data = await response.json()
        setProduct(data)
        console.log('success1')
        setLoading(false)
        setName(product.name)
        setCode(product.code)
        setSelectedCategory(product.category)
        setSelectedBarcodeSymbol()
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [url, viewProduct])

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          categoriesResponse,
          brandsResponse,
          barcodeSymbolsResponse,
          productUnitsResponse,
          shelvesResponse,
          suppliersResponse
        ] = await Promise.all([
          fetch(categoriesUrl),
          fetch(brandsUrl),
          fetch(barcodeSymbolsUrl),
          fetch(productUnitsUrl),
          fetch(shelvesUrl),
          fetch(suppliersUrl)
        ])
        const categories = await categoriesResponse.json()
        const brands = await brandsResponse.json()
        const barcodeSymbols = await barcodeSymbolsResponse.json()
        const productUnits = await productUnitsResponse.json()
        const shelves = await shelvesResponse.json()
        const suppliers = await suppliersResponse.json()

        setCategories(categories)
        setBrands(brands)
        setBarcodeSymbols(barcodeSymbols)
        setProductUnits(productUnits)
        setShelves(shelves)
        setSuppliers(suppliers)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [categoriesUrl, brandsUrl, barcodeSymbolsUrl, productUnitsUrl, shelvesUrl, suppliersUrl])

  async function handleSubmit(event) {
    console.log('submitted')
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

  const handleImageChange = event => {
    const file = event.target.files[0]
    setImageFile(file)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='lg'
      sx={{ m: 0, p: 2 }}
      TransitionComponent={Transition}
      keepMounted
      BackdropProps={{ style: { opacity: 0.2 } }}
    >
      {loading && (
        <CircularProgress
          style={{ position: 'absolute', top: '50%', left: '45%', transform: 'translate(-50%, -50%)' }}
        />
      )}
      <DialogTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>Edit Product</span>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={e => handleSubmit(e)}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={8}>
                <Grid container spacing={5}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      autoComplete='off'
                      value={name}
                      focused
                      onChange={e => setName(e.target.value)}
                      label='Name'
                      placeholder='Enter Product Name'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      focused
                      fullWidth
                      value={code}
                      label='Code'
                      onChange={e => setCode(e.target.value)}
                      placeholder='Enter Product Code'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl required focused fullWidth>
                      <InputLabel id='demo-multiple-name-label'>Product Category</InputLabel>
                      <Select
                        labelId='demo-multiple-name-label'
                        id='demo-multiple-name'
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        input={<OutlinedInput label='Product Category' />}
                      >
                        {categories.slice(1).map(category => (
                          <MenuItem key={category.name} value={category.name}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl required focused fullWidth>
                      <InputLabel id='demo-multiple-name-label'>Brand</InputLabel>
                      <Select
                        labelId='demo-multiple-name-label'
                        id='demo-multiple-name'
                        value={selectedBrand}
                        onChange={e => setSelectedBrand(e.target.value)}
                        input={<OutlinedInput label='Brand' />}
                      >
                        {brands.slice(1).map(brand => (
                          <MenuItem key={brand.name} value={brand.name}>
                            {brand.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl focused required fullWidth>
                      <InputLabel id='demo-multiple-name-label'>Barcode Symbology</InputLabel>
                      <Select
                        labelId='demo-multiple-name-label'
                        id='demo-multiple-name'
                        value={selectedBarcodeSymbol}
                        onChange={e => setSelectedBarcodeSymbol(e.target.value)}
                        input={<OutlinedInput label='Barcode Symbology' />}
                      >
                        {barcodeSymbols.map(code => (
                          <MenuItem key={code.name} value={code.name}>
                            {code.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      focused
                      required
                      fullWidth
                      label='Product Cost'
                      autoComplete='off'
                      placeholder='Enter Product Cost'
                      value={cost}
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
                      focused
                      required
                      fullWidth
                      label='Product Price'
                      autoComplete='off'
                      value={price}
                      placeholder='Enter Product Price'
                      onChange={e => setSelectedPrice(e.target.value)}
                      inputProps={{
                        onKeyPress: handleKeyPress,
                        inputMode: 'numeric',
                        pattern: '[0-9]*'
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl focused required fullWidth>
                      <InputLabel id='demo-multiple-name-label'>Product Unit</InputLabel>
                      <Select
                        labelId='demo-multiple-name-label'
                        id='demo-multiple-name'
                        value={selectedUnit}
                        onChange={e => setSelectedUnit(e.target.value)}
                        input={<OutlinedInput label='Product Unit' />}
                      >
                        {productUnits.map(unit => (
                          <MenuItem key={unit.name} value={unit.name}>
                            {unit.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      focused
                      required
                      value={stockAlert}
                      onChange={e => e.target.value}
                      fullWidth
                      type='number'
                      label='Stock Alert'
                      placeholder='Enter Stock Alert'
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      focused
                      fullWidth
                      id='standard-multiline-static'
                      label='Notes'
                      placeholder='Enter Notes'
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      multiline
                      rows={4}

                      // variant='standard'
                    />
                  </Grid>

                  <Grid focused item xs={12}>
                    <Divider sx={{ margin: 0 }} />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                        Save
                      </Button>
                      <Button onClick={handleClose} size='large' color='secondary' variant='outlined'>
                        Cancel
                      </Button>
                    </CardActions>
                  </Grid>
                </Grid>
              </Grid>

              {/* 
                // image and add stock section */}

              <Grid item xs={4}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Button variant='contained' component='label'>
                        Choose Image
                        <input type='file' accept='.png,.jpg,.jpeg' hidden onChange={handleImageChange} />
                      </Button>
                      {imageFile && (
                        <div
                          style={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '10px'
                          }}
                        >
                          <IconButton
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              zIndex: 1,
                              borderRadius: '50%'
                            }}
                            onClick={() => setImageFile(null)}
                          >
                            <CloseCircle />
                          </IconButton>
                          <img
                            src={URL.createObjectURL(imageFile)}
                            alt='Selected'
                            width='150'
                            height='auto'
                            style={{ margin: '0 auto' }}
                          />
                        </div>
                      )}
                    </FormControl>

                    {/* <Button fullWidth variant='contained' component='label'>
                        Upload Image
                        <Camera />
                        <input hidden accept='image/*' multiple type='file' />
                      </Button> */}
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant='h6' align='center'>
                      Add Stocks
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl required focused fullWidth>
                      <InputLabel id='demo-multiple-name-label'>Shelve</InputLabel>
                      <Select
                        labelId='demo-multiple-name-label'
                        id='demo-multiple-name'
                        value={selectedShelve}
                        onChange={e => setSelectedShelve(e.target.value)}
                        input={<OutlinedInput label='Shelve' />}
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
                    <FormControl focused required fullWidth>
                      <InputLabel id='demo-multiple-name-label'>Supplier</InputLabel>
                      <Select
                        labelId='demo-multiple-name-label'
                        id='demo-multiple-name'
                        value={selectedSupplier}
                        onChange={e => setSelectedSupplier(e.target.value)}
                        input={<OutlinedInput label='Supplier' />}
                      >
                        {suppliers.map(supplier => (
                          <MenuItem key={supplier.name} value={supplier.name}>
                            {supplier.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      focused
                      required
                      value={quantity}
                      fullWidth
                      type='number'
                      label='Add Product Quantity'
                      placeholder='Add Product Quantity'
                      onChange={e => setQuantity(e.target.value)}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
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
                    </Grid> */}
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
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Close
        </Button>
      </DialogActions> */}
    </Dialog>
  )
}

export default DialogEdit
