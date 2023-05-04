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

// loaidng 
import CircularProgress from '@mui/material/CircularProgress'

// react import
import { useEffect, useState } from 'react'
import { Image } from 'mdi-material-ui'
import { TableContainer } from '@material-ui/core'

const DialogView = ({ open, handleClose, viewProduct }) => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)

  const url = 'http://localhost:8000/products'

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${url}/${viewProduct}`)
        const data = await response.json()
        setProduct(data)
        console.log('success1')
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [url, viewProduct])

  return (
    <Dialog open={open} onClose={handleClose}>
      {loading && (
        <CircularProgress
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      )}
      <DialogTitle>
        Product Details
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {product.code}
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1'>Code Product</Typography>
          </Grid>
          <Grid item xs={6}>
            {product.code}
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1'>Product</Typography>
          </Grid>
          <Grid item xs={6}>
            {product.name}
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1'>Category</Typography>
          </Grid>
          <Grid item xs={6}>
            {product.category}
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1'>Brand</Typography>
          </Grid>
          <Grid item xs={6}>
            {product.brand}
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1'>Price</Typography>
          </Grid>
          <Grid item xs={6}>
            {product.price}
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1'>Stock Alert</Typography>
          </Grid>
          <Grid item xs={6}>
            {product.stockAlert}
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <img style={{ minHeight: '100px', backgroundColor: 'gray' }} alt='sample image' src='#' loading='lazy' />
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={paper}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Shelf
                    </TableCell>
                    <TableCell>
                      quantity
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            {product.stockAlert}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogView
