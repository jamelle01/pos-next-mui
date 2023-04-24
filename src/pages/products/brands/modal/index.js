import { useState, forwardRef } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'

//icon imports
import CloseCircle from 'mdi-material-ui/CloseCircle'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function CreateCategory({ openCreate, setOpenCreate }) {


    const [imageFile, setImageFile] = useState(null)

    const handleImageChange = event => {
      const file = event.target.files[0]
      setImageFile(file)
    }

  return (
    <Dialog
      open={openCreate}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpenCreate(false)}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{'Create Product Category  '}</DialogTitle>
      <form>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Card sx={{ padding: 2 }}>
                  <TextField fullWidth required autoComplete='off' label='Name' placeholder='Enter Product Name' />
                </Card>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Button variant='contained' component='label'>
                    Choose Image
                    <input type='file' accept='.png,.jpg,.jpeg' hidden onChange={handleImageChange} />
                  </Button>
                  {imageFile && (
                    <div
                      style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10px'
                      }}
                    >
                      <IconButton
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          zIndex: 1,
                          borderRadius: '50%'
                        }}
                        onClick={() => setImageFile(null)}
                      >
                        <CloseCircle />
                      </IconButton>
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt='Selected'
                        width='150'
                        height='auto'
                        style={{ margin: '0 auto' }}
                      />
                    </div>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button
            color='info'
            variant='contained'
            type='submit'
            onClick={() => {
              setOpenCreate(false)
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
