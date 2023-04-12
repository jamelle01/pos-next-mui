// ** Next Import
import Link from 'next/link'

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

const Pos = () => {
  return (
    <ApexChartWrapper style={{ padding: '10px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} lg={4}>
          <Box >
            <Card>
              <ProductTable />
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Box>
            <ProductList/>

          </Box>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

Pos.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Pos
