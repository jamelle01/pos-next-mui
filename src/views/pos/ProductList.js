// mui imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import { height } from '@mui/system'

import Link from 'next/link'

//icons
import Magnify from 'mdi-material-ui/Magnify'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Fullscreen from 'mdi-material-ui/Fullscreen'
import FullscreenExit from 'mdi-material-ui/FullscreenExit'

import { useState, useEffect } from 'react'
import { Select, MenuItem } from '@mui/material'

import ProductTable from './ProductTable'

import Image from 'next/image'
import ScreenButton from 'src/layouts/components/vertical/ScreenButton'

const data = [
  { id: 1, title: 'Title 1', description: 'Description 1' },
  { id: 2, title: 'Title 2', description: 'Description 2' },
  { id: 3, title: 'Title 3', description: 'Description 3' },
  { id: 4, title: 'Title 4', description: 'Description 4' },
  { id: 5, title: 'Title 5', description: 'Description 5' },
  { id: 6, title: 'Title 6', description: 'Description 6' },
  { id: 7, title: 'Title 7', description: 'Description 7' },
  { id: 8, title: 'Title 8', description: 'Description 8' },
  { id: 9, title: 'Title 9', description: 'Description 9' },
  { id: 10, title: 'Title 10', description: 'Description 10' },
  { id: 11, title: 'Title 11', description: 'Description 11' },
  { id: 12, title: 'Title 12', description: 'Description 12' },
  { id: 13, title: 'Title 13', description: 'Description 13' },
  { id: 14, title: 'Title 14', description: 'Description 14' },
  { id: 15, title: 'Title 15', description: 'Description 15' },
  { id: 16, title: 'Title 16', description: 'Description 16' },
  { id: 17, title: 'Title 17', description: 'Description 17' },
  { id: 18, title: 'Title 18', description: 'Description 18' },
  { id: 19, title: 'Title 19', description: 'Description 19' },
  { id: 20, title: 'Title 20', description: 'Description 20' },
  { id: 21, title: 'Title 21', description: 'Description 21' },
  { id: 22, title: 'Title 22', description: 'Description 22' },
  { id: 23, title: 'Title 23', description: 'Description 23' },
  { id: 24, title: 'Title 24', description: 'Description 24' },
  { id: 25, title: 'Title 25', description: 'Description 25' },
  { id: 26, title: 'Title 26', description: 'Description 26' },
  { id: 27, title: 'Title 27', description: 'Description 27' },
  { id: 28, title: 'Title 28', description: 'Description 28' },
  { id: 29, title: 'Title 29', description: 'Description 29' },
  { id: 30, title: 'Title 30', description: 'Description 30' }
]

const ProductList = ({ handleProductClick, products, categories, brands }) => {
  console.log(products)
  const [categoryValue, setCategoryValue] = useState('All Categories')
  const [brandValue, setBrandValue] = useState('All Brands')
  const [search, setSearch] = useState('')

  // const categories = [
  //   { name: 'All Categories' },
  //   { name: 'Hand Tools' },
  //   { name: 'Power Tools' },
  //   { name: 'Building Materials' },
  //   { name: 'Fasteners' },
  //   { name: 'Plumbing Supplies' },
  //   { name: 'Electrical Supplies' },
  //   { name: 'Paint and Painting Supplies' },
  //   { name: 'Garden and Outdoor Supplies' },
  //   { name: 'Safety Equipment' }
  // ]

  // const brands = [
  //   { name: 'All Brands' },
  //   { name: 'Bosch' },
  //   { name: 'DeWalt' },
  //   { name: 'Makita' },
  //   { name: 'Milwaukee' },
  //   { name: 'Hitachi' },
  //   { name: 'Black and Decker' },
  //   { name: 'Craftsman' },
  //   { name: 'Stanley' },
  //   { name: 'Ryobi' }
  // ]

  // const handleFullscreen = () => {
  //   if (document.fullscreenElement) {
  //     setScrn(false)

  //     document.exitFullscreen()
  //   } else {
  //     document.documentElement.requestFullscreen()
  //     setScrn(true)
  //   }
  // }

  return (
    <div style={{ height: '96.5vh' }}>
      <Grid container spacing={2} mb={2}>
        {/* search  */}

        <Grid item xs={8}>
          <Card sx={{ display: 'flex', padding: 2 }}>
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

        <Grid item xs={2}>
          <Card sx={{ height: '100%' }}>
            <Link href='/'>
              <Button fullWidth sx={{ height: '100%' }}>
                <HomeOutline
                  sx={{
                    fontSize: '2rem'
                  }}
                />
              </Button>
            </Link>
          </Card>
        </Grid>

        {/* full screen button */}

        <Grid item xs={2}>
          <Card sx={{ height: '100%' }}>
            <ScreenButton />
          </Card>
        </Grid>
      </Grid>

      {/* dropdown button */}

      <Card sx={{ padding: 2 }}>
        <Grid container mb={2} spacing={2}>
          <Grid item xs={12} sm={6}>
            <Select fullWidth value={categoryValue}>
              {categories.map((category, idx) => (
                <MenuItem key={idx} value={category.name} onClick={() => setCategoryValue(category.name)}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Select fullWidth value={brandValue} displayEmpty>
              {brands.map(brand => (
                <MenuItem key={brand.name} value={brand.name} onClick={() => setBrandValue(brand.name)}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        {/* product list */}

        <div style={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
          <Grid container spacing={3} justifyContent='center'>
            {products
              .filter(product => {
                if (search === '') {
                  if (brandValue.toLowerCase() === 'all brands' && categoryValue.toLowerCase() === 'all categories') {
                    return true
                  } else if (
                    product.category.toLowerCase().includes(categoryValue.toLowerCase()) &&
                    product.brand.toLowerCase().includes(brandValue.toLowerCase())
                  ) {
                    return true
                  } else if (
                    brandValue.toLowerCase() === 'all brands' &&
                    product.category.toLowerCase().includes(categoryValue.toLowerCase())
                  ) {
                    return true
                  } else if (
                    categoryValue.toLowerCase() === 'all categories' &&
                    product.brand.toLowerCase().includes(brandValue.toLowerCase())
                  ) {
                    return true
                  }
                } else {
                  return product.name.toLowerCase().includes(search.toLowerCase()) === true
                }
              })
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(item => (
                <Grid key={item.id} item xs={12} sm={3} md={2}>
                  <Paper
                    onClick={() => handleProductClick(item)}
                    title={item.name}
                    sx={{
                      boxSizing: 'border-box',
                      background: '#FFFFFF',
                      // border: '1px solid #6FB1FF',
                      border: '1px solid #cce2ff',
                      borderRadius: '25px 0px',
                      height: '100%',
                      padding: '.5rem',
                      '&:hover': {
                        backgroundColor: '#E3FCEF',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <div className='img-bg'>
                      <Image src='/images/no-image.png' alt='image' width={100} height={100} draggable={false} />
                    </div>

                    <Typography
                      variant='h6'
                      // noWrap
                      style={{
                        fontSize: '0.7rem',
                        lineHeight: 1.2,
                        maxHeight: '2.4rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3
                      }}
                    >
                      {item.name}
                    </Typography>

                    {/* <Typography variant='body1'>{item.description}</Typography> */}
                    <Typography
                      variant='body1'
                      sx={{
                        fontSize: '0.7rem',
                        display: 'flex',
                        margin: '.2em 0',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#EAEAEA', // changed from '#F5F5F5'
                        borderRadius: '8px'
                      }}
                    >
                      {item.quantity} pieces
                    </Typography>

                    <Typography
                      variant='body1'
                      sx={{
                        fontSize: '0.7rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#6FB1FF',
                        borderRadius: '8px'
                      }}
                    >
                      ₱{' '}
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </div>
      </Card>

      {/* <Car>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <TextField fullWidth label='Discount' placeholder='Discount' />
            </CardContent>
          </Grid>
        </Grid>
      </Car d> */}
    </div>
  )
}

export default ProductList
