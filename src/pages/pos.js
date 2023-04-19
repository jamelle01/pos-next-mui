// ** Next Import
import Link from 'next/link'
import { useState, useEffect } from 'react'

// ** Icons Imports

// ** MUI Components
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// **  Imports components
import StatisticsCard from 'src/views/dashboard/StatisticsCard'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Custom Components Imports
import ProductTable from 'src/views/pos/ProductTable'
import ProductList from 'src/views/pos/ProductList'

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(13)
  }
}))

const TreeIllustration = styled('img')(({ theme }) => ({
  left: 0,
  bottom: '5rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    bottom: 0
  }
}))

const url = 'http://localhost:8000/products'
const urlCategories = 'http://localhost:8000/categories'
const urlBrands = 'http://localhost:8000/brands'

const Pos = () => {
  const [selectedProducts, setSelectedProducts] = useState([])

  const [totalQuantity, setTotalQuantity] = useState(0)
  const [subTotal, setSubTotal] = useState('')
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)

  const [products, setProducts] = useState([])
  const [refresh, setRefresh] = useState(false)

  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesResponse, brandsResponse] = await Promise.all([fetch(urlCategories), fetch(urlBrands)])
        const [categoriesData, brandsData] = await Promise.all([categoriesResponse.json(), brandsResponse.json()])
        setCategories(categoriesData)
        setBrands(brandsData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [urlCategories, urlBrands])

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
  }, [url, refresh])

  useEffect(() => {
    const totalQuantity = selectedProducts.reduce((acc, product) => acc + product.selectedQuantity, 0)
    const subTotal = selectedProducts.reduce((acc, product) => acc + product.subtotal, 0)
    const total = selectedProducts.reduce((acc, product) => acc + product.subtotal, 0)
    // console.log(totalQuantity);
    setTotalQuantity(totalQuantity)
    setSubTotal(subTotal)

    setTotal(total - discount)
  }, [selectedProducts, discount])

  const handleProductRemove = productId => {
    setSelectedProducts(prevSelectedProducts => prevSelectedProducts.filter(product => product.id !== productId))
  }

  const resetSelectedProducts = () => {
    setSelectedProducts([])
  }

  const handleDecrement = id => {
    setSelectedProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, selectedQuantity: product.selectedQuantity - 1 } : product
      )
    )
    console.log('hi')
    console.log(selectedProducts)
  }

  const handleIncrement = id => {
    setSelectedProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, selectedQuantity: product.selectedQuantity + 1 } : product
      )
    )
  }

  const handleQuantChange = (id, e) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value)
    setSelectedProducts(prevProducts =>
      prevProducts.map(product => (product.id === id ? { ...product, selectedQuantity: value } : product))
    )
  }

  const handleProductClick = product => {
    // console.log(product.quantity);
    const productIndex = selectedProducts.findIndex(p => p.id === product.id)
    if (productIndex === -1 && product.quantity) {
      // product does not exist, add it to the array
      const newProduct = { ...product, selectedQuantity: 1, subtotal: 0 }
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
    <ApexChartWrapper style={{ padding: '10px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} lg={5}>
          <Box>
            <Card>
              <ProductTable
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                selectedProducts={selectedProducts}
                handleProductRemove={handleProductRemove}
                handleQuantChange={handleQuantChange}
                discount={discount}
                setDiscount={setDiscount}
                total={total}
                subTotal={subTotal}
                totalQuantity={totalQuantity}
                resetSelectedProducts={resetSelectedProducts}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
          <Box>
            <ProductList
              handleProductClick={handleProductClick}
              products={products}
              brands={brands}
              categories={categories}
            />
          </Box>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

Pos.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Pos
