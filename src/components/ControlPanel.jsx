import { useContext } from 'react'
import { Box, Flex, Text, IconButton, Slider, Input, Checkbox, Label, Select } from 'theme-ui'
import { ViewerContext } from '../App'
import Acordeon from './Acordeon'

const ControlPanel = () => {

    const { state, setState } = useContext(ViewerContext)
    const handleVisible = (uid) => {
        setState(prev => {
            return {
                ...prev, modelOptions: {
                    ...prev.modelOptions, [uid]: { ...prev.modelOptions[uid], opacity: prev.modelOptions[uid].opacity === 0 ? 1 : 0 }
                }
            }
        })
    }
    const handleOpacity = (value, uid) => {
        setState(prev => {
            return { ...prev, modelOptions: { ...prev.modelOptions, [uid]: { ...prev.modelOptions[uid], opacity: value, transparent: value > 0.9 ? false : true } } }
        })
    }

    const handleColor = (value, uid) => {
        setState(prev => {
            return { ...prev, modelOptions: { ...prev.modelOptions, [uid]: { ...prev.modelOptions[uid], color: value } } }
        })
    }

    const handleChangeBackground = () => {
        setState(prev => ({ ...prev, darkTheme: !prev.darkTheme }))
    }

    if (!Object.keys(state.modelOptions).length) {
        return null
    }

    return (
        <Box sx={{ position: 'absolute', left: 2, top: 2, p: 3, borderRadius: '5px' }}>
            <Acordeon name='Modelos' defaultOpen={window.innerWidth > 784}>
                <Flex sx={{ flexDirection: 'column', }}>
                    {Object.keys(state.modelOptions).map(i => (
                        <ModelControls key={i} uid={i} handleVisible={handleVisible} handleOpacity={handleOpacity} modelOptions={state.modelOptions[i]} handleColor={handleColor} />
                    ))}
                </Flex>
            </Acordeon>

            <Acordeon name='Opções'>
                <Flex sx={{ alignItems: "center", cursor: 'pointer', mb: 4 }}>
                    <Label sx={{ cursor: 'pointer' }} htmlFor='theme'>Modo escuro</Label>
                    <Checkbox sx={{ color: '#fd7e14' }} id='theme' value={state.darkTheme} onChange={handleChangeBackground} />
                </Flex>

                <Box sx={{ alignItems: "center", cursor: 'pointer' }}>
                    <Label sx={{ cursor: 'pointer', mb: 1 }} htmlFor='files'>Modelo</Label>
                    <Select value={state.files} onChange={(e) => setState(prev => ({ ...prev, files: e.target.value }))}
                        sx={{ bg: 'black' }}
                    >
                        <option value={0}>Fígado com tumor</option>
                        <option value={1}>Fígado com tumor 2</option>
                        <option value={2}>Aorta com trombose</option>
                        <option value={3}>Pulmão com tumor</option>
                    </Select>
                </Box>
            </Acordeon >
        </Box >
    )
}

export default ControlPanel


const ModelControls = ({ uid, handleOpacity, handleVisible, modelOptions, handleColor }) => {
    return <Box sx={{ alignItems: 'center', justifyContent: 'center', p: 2, bg: 'rgba(73, 80, 87, 0.7)', borderRadius: '4px', my: 1 }}>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2, }}>
            <Text sx={{ fontSize: [12, 14, 16] }}>{modelOptions.name}</Text>

            <Input
                sx={{ padding: 0, cursor: 'pointer', height: '1.8rem', width: '1.6rem', border: 'none', outline: 'none', appearance: 'none', '&::WebkitAppearance': 'none', '&::MozAppearance': 'none', '&::-webkit-color-swatch': { borderRadius: '5px', border: 'none' } }}
                type='color' value={modelOptions.color}
                color={modelOptions.color}
                onChange={(e) => handleColor(e.target.value, uid)} />
        </Flex>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton sx={{ cursor: 'pointer', height: '1rem', width: '1.rem' }}
                onClick={() => handleVisible(uid)}
            >
                {modelOptions.opacity < 0.1 ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='#adb5bd'><title>eye-off-outline</title><path d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z" /></svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='#adb5bd'><title>eye-outline</title><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" /></svg>
                }
            </IconButton>
            <Slider sx={{ width: '80%' }} min={0} max={1} value={modelOptions.opacity} step={0.1} onChange={(e) => handleOpacity(e.target.value, uid)} />
        </Flex>

    </Box>
}