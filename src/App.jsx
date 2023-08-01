import { useState, useEffect, createContext } from 'react'
import { Flex, Image, Spinner } from 'theme-ui'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { getColor, formatName } from './utils/utils'
import ControlPanel from './components/ControlPanel'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ModelGroup from './components/ModelGroup'
import { TextureLoader } from 'three'
import ButtonMenu from './components/ButtonMenu'

export const ViewerContext = createContext()

function App() {

  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    files: 0,
    texture: 'matcaps/matcap14.png',
    // texture: 'matcaps/matcap16.png',
    // texture: 'matcaps/matcap22.png',
    geometries: {},
    modelOptions: {},
    loaded: false,
    darkTheme: true,
    camera: { x: 0, y: 8.572527594031473e-15, z: 140, reset: false }
  })

  const loadModels = async () => {
    setLoading(true)
    const filesArr = [
      ['liver/High tumor.obj', 'liver/IVC.obj', 'liver/Liver.obj', 'liver/Portal.obj', 'liver/Vein.obj'],
      ['liver2/Artery.obj', 'liver2/High tumor.obj', 'liver2/IVC.obj', 'liver2/Portal.obj', 'liver2/PV1.obj', 'liver2/PV2.obj', 'liver2/PV3.obj', 'liver2/PV4.obj', 'liver2/Vein.obj'],
      ['carotid/AORTA.stl', 'carotid/TROMBO.stl'],
      ['torax/Arteria.obj', 'torax/Bronquio.obj', 'torax/LID.obj', 'torax/LM.obj', 'torax/LSD S1.obj', 'torax/LSD S2.obj', 'torax/LSD S3.obj', 'torax/Tumor.obj', 'torax/Veia.obj'],
    ]

    const files = filesArr[state.files]
    const type = files[0].split(".")[files[0].split(".").length - 1]
    const textureLoader = new TextureLoader()
    const texture = await textureLoader.loadAsync(state.texture)
    //default 9 or 20 + 14
    const geometries = await Promise.all(
      files.map(async (file) => {
        try {
          const loader = type === 'obj' ? new OBJLoader : new STLLoader
          const geometry = await loader.loadAsync(file)
          geometry.name = file
          return geometry
        } catch (err) {
          console.log(err)
        }
      })
    )

    const modelOptions = geometries.reduce((result, i) => {
      result[i.uuid] = {
        name: formatName(i.name),
        color: getColor(formatName((i.name))),
        matcap: texture,
        opacity: 1,
        transparent: false,
        isObj: i.name.split(".")[i.name.split(".").length - 1] === 'obj'
      }

      return result
    }, {})
    setState(prev => ({ ...prev, geometries, modelOptions }))
    setLoading(false)
  }

  useEffect(() => {
    loadModels()
  }, [state.files])

  const darkBg = 'radial-gradient(circle, rgba(71,71,91,1) 0%, rgba(47,49,70,1) 100%);'
  const lightBg = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(224,224,224,1) 100%, rgba(0,212,255,1) 100%)'

  return (
    <ViewerContext.Provider value={{ state, setState }} >
      <Flex p={0} sx={{ position: 'relative', background: state.darkTheme ? darkBg : lightBg, width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? <Spinner /> :
          <>
            <Flex sx={{ position: 'absolute', top: 3, right: 0, flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              <Image src="bmk.png" sx={{ height: ['4rem', '5rem', '10rem'] }} />
            </Flex>
            <Canvas>
              {!!state.geometries.length &&
                <ModelGroup />
              }
              <OrbitControls enableDamping={false} />
              {/* <OrbitControls enableDamping={false} enablePan={false} /> */}
            </Canvas>
            <ControlPanel />
            <ButtonMenu />
          </>
        }
      </Flex>

    </ViewerContext.Provider >
  )
}

export default App
