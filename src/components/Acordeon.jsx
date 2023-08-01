import { useState } from 'react'
import { Box, Flex, IconButton, Heading } from 'theme-ui'


const Acordeon = ({ children, name, defaultOpen }) => {

    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <Box
            sx={{
                flexDirection: 'column', justifyContent: 'space-between', width: ['17rem', '23rem'], bg: 'rgba(33, 37, 41, 0.6)',
                borderRadius: '2px'
            }}>
            <Box>
                <Flex
                    onClick={() => setIsOpen(!isOpen)}
                    sx={{ p: 2, alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <Heading sx={{ display: 'block', fontSize: '1rem' }}>{name}</Heading>
                    <IconButton sx={{ cursor: 'pointer' }}>
                        {isOpen ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='#ced4da'><title>chevron-up</title><path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='#ced4da' width={30} height={30}><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                        }
                    </IconButton>
                </Flex>
                <Box sx={{ bg: 'rgba(73, 80, 87, 0.3)', width: '100%', maxHeight: '35rem', overflow: 'auto', p: isOpen ? 3 : 0, '&::-webkit-scrollbar': { width: 8, height: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'hsl(0, 0%, 0%, 0.38)' } }}>
                    {isOpen &&
                        <>
                            {children}
                        </>
                    }
                </Box>
            </Box>

        </Box>
    )
}

export default Acordeon