import { useContext, useState } from "react"
import { Box, IconButton, Button, Flex } from "theme-ui"
import { ViewerContext } from "../App"

const ButtonMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { state, setState } = useContext(ViewerContext)

  const handleRotation = (side) => {
    //front
    if (side === 'front') {
      setState(prev => ({ ...prev, camera: { x: 0, y: 8.572527594031473e-15, z: 140 } }))
    }
    //back
    if (side === 'back') {
      setState(prev => ({ ...prev, camera: { x: 0, y: 8.572527594031473e-15, z: -140 } }))
    }

    //left
    if (side === 'left') {
      setState(prev => ({ ...prev, camera: { x: -140, y: 8.572527594031473e-15, z: 15.734688802032885 } }))
    }

    //right
    if (side === 'right') {
      setState(prev => ({ ...prev, camera: { x: 140, y: 0.9153378521075906, z: 34.64736526301856 } }))
    }
    //upper
    if (side === 'upper') {
      setState(prev => ({ ...prev, camera: { x: 0, y: 140, z: 0.008974715007114388 } }))
    }
    //bottom
    if (side === 'bottom') {
      setState(prev => ({ ...prev, camera: { x: 0, y: -140, z: 0.008974715007114388 } }))
    }
    //reset
    if (side === 'reset') {
      console.log('dser')
      setState(prev => ({ ...prev, camera: { x: 0, y: 8.572527594031473e-15, z: 140, reset: true } }))
    }

  }

  return (
    <Box sx={{ position: 'absolute', top: ['80vh', '92vh'], right: '1.5rem' }}>
      <Box sx={{ position: 'relative' }}>
        {isOpen &&
          <Flex sx={{ position: 'absolute', top: '-19rem', left: '-4.8rem', flexDirection: 'column', p: 3, borderRadius: '3px', bg: state.darkTheme ? 'rgba(134, 142, 150, 0.8)' : 'rgba(134, 142, 150, 1)' }}>
            <Button sx={{ bg: 'rgba(33, 37, 41, 0.6)', display: 'block', mb: 1, cursor: 'pointer' }} onClick={() => handleRotation('front')}>Frontal</Button>
            <Button sx={{ bg: 'rgba(33, 37, 41, 0.6)', display: 'block', mb: 1, cursor: 'pointer' }} onClick={() => handleRotation('back')}>Posterior</Button>
            <Button sx={{ bg: 'rgba(33, 37, 41, 0.6)', display: 'block', mb: 1, cursor: 'pointer' }} onClick={() => handleRotation('upper')}>Superior</Button>
            <Button sx={{ bg: 'rgba(33, 37, 41, 0.6)', display: 'block', mb: 1, cursor: 'pointer' }} onClick={() => handleRotation('bottom')}>Inferior</Button>
            <Button sx={{ bg: 'rgba(33, 37, 41, 0.6)', display: 'block', mb: 1, cursor: 'pointer' }} onClick={() => handleRotation('left')}>Esquerda</Button>
            <Button sx={{ bg: 'rgba(33, 37, 41, 0.6)', display: 'block', mb: 1, cursor: 'pointer' }} onClick={() => handleRotation('right')}>Direita</Button>
          </Flex>
        }
        <IconButton sx={{ cursor: 'pointer', height: '3.5rem', width: '3.5rem', bg: state.darkTheme ? 'rgba(173, 181, 189, 0.3)' : 'rgba(33, 37, 41, 0.5)' }}
          onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill='#ced4da'
            height='100%'
            width='100%'
          ><title>rotate-360</title>
            <path d="M12 7C6.5 7 2 9.2 2 12C2 14.2 4.9 16.1 9 16.8V20L13 16L9 12V14.7C5.8 14.1 4 12.8 4 12C4 10.9 7 9 12 9S20 10.9 20 12C20 12.7 18.5 13.9 16 14.5V16.6C19.5 15.8 22 14.1 22 12C22 9.2 17.5 7 12 7Z" /></svg>
        </IconButton>
      </Box>
    </Box >
  )
}

export default ButtonMenu