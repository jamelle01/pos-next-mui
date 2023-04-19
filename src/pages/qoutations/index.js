// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'


// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsSeparator'
import FormLayoutsAlignment from 'src/views/form-layouts/FormLayoutsAlignment'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Qoutations = () => {
  return (
    <div>
      <Typography variant='h1'>Qoutations</Typography>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h5'>
            <Link href='https://mui.com/components/tables/' target='_blank'>
              MUI Tables
            </Link>
          </Typography>
          <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Basic Table' titleTypographyProps={{ variant: 'h6' }} />
            <TableBasic />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Dense Table' titleTypographyProps={{ variant: 'h6' }} />
            <TableDense />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
            <TableStickyHeader />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Collapsible Table' titleTypographyProps={{ variant: 'h6' }} />
            <TableCollapsible />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Spanning Table' titleTypographyProps={{ variant: 'h6' }} />
            <TableSpanning />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Customized Table' titleTypographyProps={{ variant: 'h6' }} />
            <TableCustomized />
          </Card>
        </Grid>
      </Grid>

      <DatePickerWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <FormLayoutsBasic />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormLayoutsIcons />
          </Grid>
          <Grid item xs={12}>
            <FormLayoutsSeparator />
          </Grid>
          <Grid item xs={12}>
            <FormLayoutsAlignment />
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </div>
  )
}

export default Qoutations
