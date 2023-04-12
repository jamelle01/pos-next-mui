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

import Typography from '@mui/material/Typography'

// hardcoded data for table
const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const ProductTable = () => {

  return (
    <div style={{ position: 'relative' ,height: '96.5vh'}}>
      {/* table  */}
      <TableContainer sx={{ height: '66vh' }} component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell align='center'>Price</TableCell>
              <TableCell align='center'>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell align='center'>{row.calories}</TableCell>
                <TableCell align='center'>{row.fat}</TableCell>
                <TableCell align='center'>{row.carbs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* totals */}

      {/* <Card> */}
      <form onSubmit={e => e.preventDefault()} style={{ position: 'absolute', bottom: '0' }}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} container justify='center' alignItems='center'>
              <Grid xs={6}>
                <Typography align='right'>Total QTY: </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography mr={5} align='right'>
                  9900{' '}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} container justify='center' alignItems='center'>
              <Grid xs={6}>
                <Typography align='right'>Subtotal: ₱ </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography mr={5} align='right'>
                  9900{' '}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Discount' placeholder='Discount' />
            </Grid>
            <Grid item xs={12} sm={6} container justify='center' alignItems='center'>
              <Grid xs={6}>
                <Typography align='right'>Total: ₱ </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography mr={5} align='right'>
                  9900{' '}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button size='large' color='error' fullWidth variant='contained'>
                reset
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button size='large' color='info' type='submit' fullWidth variant='contained'>
                pay now
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
      {/* </Card> */}
    </div>
  )
}

export default ProductTable
