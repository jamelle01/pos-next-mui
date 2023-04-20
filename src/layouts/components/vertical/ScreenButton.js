import Button from '@mui/material/Button'
import Fullscreen from 'mdi-material-ui/Fullscreen'
import FullscreenExit from 'mdi-material-ui/FullscreenExit'
import { useState } from 'react'

const ScreenButton = () => {
  const [scrn, setScrn] = useState(typeof document !== 'undefined' && document.fullscreenElement)

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      setScrn(false)
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
      setScrn(true)
    }
  }

  return (
    <Button fullWidth sx={{ height: '100%' }} onClick={() => handleFullscreen()}>
      {scrn ? (
        <FullscreenExit
          sx={{
            fontSize: '2rem'
          }}
        />
      ) : (
        <Fullscreen
          sx={{
            fontSize: '2rem'
          }}
        />
      )}
    </Button>
  )
}

export default ScreenButton
