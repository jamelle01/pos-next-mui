import { useState, forwardRef } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const PayModal = ({
  openPay,
  setOpenPay,
  handlePayment,
  selectedProducts,
  setRefresh,
  refresh,
  subTotal,
  total,
  discount
}) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={openPay}
      onClose={() => setOpenPay(false)}
      keepMounted
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{'Confirm Payment'}</DialogTitle>
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Divider
          textAlign='left'
          sx={{
            m: 0,
            width: '80%',
            lineHeight: 'normal',
            textTransform: 'uppercase',
            '&:before, &:after': { top: 7, transform: 'none' },
            '& .MuiDivider-wrapper': { px: 2.5, fontSize: '0.75rem', letterSpacing: '0.21px' }
          }}
        />
      </div> */}

      <DialogContent sx={{ width: 600 }}>
        <DialogContentText id='alert-dialog-slide-description'>
          <TableContainer component={Paper}>
            <Table size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center' colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align='right'>Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align='right'>Qty.</TableCell>
                  <TableCell nowrap align='right'>
                    Unit
                  </TableCell>
                  <TableCell align='right'>Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProducts.map(row => (
                  <TableRow key={row.desc}>
                    <TableCell>
                      <Typography variant='caption'>{row.name}</Typography>
                    </TableCell>

                    <TableCell align='right'>{row.selectedQuantity}</TableCell>
                    <TableCell align='right'>{row.price}</TableCell>
                    <TableCell align='right'>{row.subtotal}</TableCell>
                    <TableCell align='right'></TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align='right'>{subTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>Discount</TableCell>
                  <TableCell />
                  <TableCell align='right'>{discount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align='right'>{total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenPay(false)}>Cancel</Button>
        <Button
          color='info'
          variant='contained'
          onClick={() => {
            handlePayment()
            setOpenPay(false)
            setRefresh(!refresh)
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PayModal
