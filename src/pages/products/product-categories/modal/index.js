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

export default function CreateCategory({ openCreate, setOpenCreate }) {
  return (
    <Dialog
      open={openCreate}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpenCreate(false)}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{'Create Product Category  '}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          This action will reset the products displayed in the table.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
        <Button
          color='info'
          variant='contained'
          onClick={() => {
            resetSelectedProducts()
            setOpenCreate(false)
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
