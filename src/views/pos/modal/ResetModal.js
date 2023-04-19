import { useState, forwardRef } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function ResetModal({ openReset, setOpenReset, resetSelectedProducts }) {
  return (
    <Dialog
      open={openReset}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpenReset(false)}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{'Confirm Reset  '}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          This action will reset the products displayed in the table.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenReset(false)}>Cancel</Button>
        <Button
          color='info'
          variant='contained'
          onClick={() => {
            resetSelectedProducts()
            setOpenReset(false)
          }}
        >
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  )
}
