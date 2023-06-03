import { useState, forwardRef, useEffect } from 'react'

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

//next imports
import { useRouter } from 'next/router'

//icon imports
import CloseCircle from 'mdi-material-ui/CloseCircle'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const brandsUrl = 'http://localhost:8000/brands'

const EditBrand = ({ count, brand, id, openEdit, setOpenEdit, refresh, setRefresh }) => {
  const [imageFile, setImageFile] = useState(null)
  const [productBrand, setProductBrand] = useState(brand)
  const [idd, setId] = useState(id)
  const [countt, setCount] = useState(count)

  // * import fixed populating problem
  useEffect(() => {
    setProductBrand(brand)
    setId(id)
    setCount(count)
  }, [brand, id])

  const handleImageSelect = event => {
    const file = event.target.files[0]
    setImageFile(file)
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch(brandsUrl + '/' + id)
  //       const data = await response.json()
  //       setProductCategory(data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  const handleSubmit = () => {
    const brandData = { name: productBrand, count: countt }
    updateBrand(idd, brandData)
  }

  const updateBrand = (id, brandData) => {
    fetch(`${brandsUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(brandData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        return response.json()
      })
      .then(data => {
        console.log('brand updated successfully:', data)
        setOpenEdit(false)
        setRefresh(!refresh)

        // do something after the product is updated
      })
      .catch(error => {
        console.error('There was an error updating the brand:', error)
      })
  }

  return (
    <Dialog
      open={openEdit}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        setOpenEdit(false)
      }}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{'Edit Product Category'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Card sx={{ padding: 2 }}>
                <TextField
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true
                  }}
                  autoComplete='off'
                  label='Name'
                  placeholder='Enter Product Name'
                  value={productBrand}
                  onChange={e => setProductBrand(e.target.value)}
                />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Button variant='contained' component='label'>
                  {imageFile ? 'Change Image' : 'Choose Image'}
                  <input type='file' accept='.png,.jpg,.jpeg' hidden onChange={handleImageSelect} />
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
        <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
        <Button
          color='info'
          disabled={!productBrand}
          variant='contained'
          type='submit'
          onClick={() => {
            handleSubmit()
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditBrand
