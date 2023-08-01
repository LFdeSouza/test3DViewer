
import { useEffect } from 'react'
import { DoubleSide, MeshMatcapMaterial } from 'three'


const Model = ({ geometry, config }) => {
    useEffect(() => {
        if (config.isObj) {
            geometry.traverse((mesh) => {
                mesh.material = new MeshMatcapMaterial({ color: config.color, matcap: config.matcap, transparent: config.transparent, alphaTest: 0.1, opacity: config.opacity })
            })
        }
    }, [geometry, config.isObj, config.opacity, config.color, config.matcap, config.transparent])

    const handleOpenConfig = (e) => {
        if (config.opacity < 0.1) {
            return
        }
        e.stopPropagation()
        console.log(config.name)
    }

    return (
        <mesh scale={0.5}
            onDoubleClick={handleOpenConfig}>
            <primitive object={geometry} />
            <meshMatcapMaterial
                side={DoubleSide}
                matcap={config.matcap}
                alphaTest={0.1}
                color={config.color}
                opacity={config.opacity}
                transparent={config.isObj ? config.transparent : true} //For some reason does not work on stl 
            />
        </mesh >
    )
}

export default Model