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

//next imports
import { useRouter } from 'next/router'

//icon imports
import CloseCircle from 'mdi-material-ui/CloseCircle'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const EditCategory = () => {
  const [imageFile, setImageFile] = useState(null)
  const [productCategory, setProductCategory] = useState(null)

  return <Dialog></Dialog>
}

export default EditCategory
