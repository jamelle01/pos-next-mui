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

import { useState } from 'react'
import { Select, MenuItem } from '@mui/material'

import Image from 'next/image'

const options = ['Option 1', 'Option 2', 'Option 3']

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

const ProductList = () => {
  const [selectedOption, setSelectedOption] = useState('')

  const [scrn, setScrn] = useState(typeof localStorage !== 'undefined' ? localStorage.getItem('screen') : false)

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      setScrn(false)
      localStorage.setItem('screen', JSON.stringify(scrn))

      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
      setScrn(true)
      localStorage.setItem('screen', JSON.stringify(scrn))
    }
  }

  const handleOptionChange = event => {
    setSelectedOption(event.target.value)
  }
  return (
    <div style={{ height: '96.5vh' }}>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={8}>
          <Card sx={{ display: 'flex', padding: 2 }}>
            <TextField
              fullWidth
              size='small'
              placeholder='Search'
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
          {/* <Card sx={{ height: '100%' }}>
            <Typography
              component='a'
              href='/'
              variant='button'
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                textDecoration: 'none',
                color: 'inherit',
                py: 1,
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              Home
            </Typography>
          </Card> */}
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ height: '100%' }}>
            <Button fullWidth sx={{ height: '100%' }} onClick={handleFullscreen}>
              {scrn ? (
                <FullscreenExit
                  sx={{
                    fontSize: '2rem'
                  }}
                />
              ) : (
                <Fullscreen
                  sx={{
                    fontSize: '2rem'
                  }}
                />
              )}
            </Button>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ padding: 2 }}>
        {/* dropdown button */}

        <Grid container mb={2} spacing={2}>
          <Grid item xs={12} sm={6}>
            <Select fullWidth value={selectedOption} onChange={handleOptionChange} displayEmpty>
              <MenuItem value='' disabled>
                Choose an option
              </MenuItem>
              {options.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Select fullWidth value={selectedOption} onChange={handleOptionChange} displayEmpty>
              <MenuItem value='' disabled>
                Choose an option
              </MenuItem>
              {options.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        {/* product list */}

        <div style={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
          <Grid container spacing={3} justifyContent='center'>
            {data.map(item => (
              <Grid key={item.id} item xs={12} sm={3} md={2}>
                <Paper sx={{ height: '100%' }} style={{ padding: '1rem' }}>
                  <div className='img-bg'>
                    <Image src='/images/no-image.png' alt='image' width={100} height={100} />
                  </div>

                  <Typography variant='h6'>{item.title}</Typography>
                  {/* <Typography variant='body1'>{item.description}</Typography> */}
                  <Typography variant='body1'>quantity</Typography>
                  <Typography variant='body1'>price</Typography>
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
