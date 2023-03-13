import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useState } from 'react'
import { MeshPhysicalMaterial } from 'three'
import { USDZExporter } from 'three-stdlib'

interface ModelProps {
    setUsdz: React.Dispatch<React.SetStateAction<string>>
}

export function Model({ setUsdz }: ModelProps) {
    // const { scene } = useGLTF('/gltf/city.glb')
    // const { scene } = useGLTF('/gltf/iphone_13_pro.glb') // simple geometry with texture
    const { scene } = useGLTF('/gltf/nike_air.glb') // complex geometry with texture
    // const { scene } = useGLTF('/gltf/smart_watch.glb') // low-quality

    const [deviceOrigin, setDeviceOrigin] = useState('')

    const getUsdzFile = async () => {
        const exporter = new USDZExporter()
        const arraybuffer = await exporter.parse(scene)

        const usdz = new Blob([arraybuffer], {
            type: 'application/octet-stream',
        })

        const url = URL.createObjectURL(usdz)
        const a = document.querySelector('.ios-usdz') as HTMLAnchorElement
        console.log(a)
        if (a) {
            a.setAttribute('rel', 'ar')
            a.setAttribute('target', '_self')
            a.setAttribute('href', `${url}`)
            a.setAttribute('download', 'usdzExport.usdz')
            a.click()
        }
    }

    const checkMobile = () => {
        console.log('checkMobile')
        let varUA = navigator.userAgent.toLowerCase()
        if (varUA.indexOf('android') > -1) {
            return 'android'
        } else if (
            varUA.indexOf('iphone') > -1 ||
            varUA.indexOf('ipad') > -1 ||
            varUA.indexOf('ipod') > -1
        ) {
            return 'ios'
        } else {
            return 'other'
        }
    }

    useEffect(() => {
        if (deviceOrigin === 'ios') {
            console.log('device: ios')
            getUsdzFile()
        } else if (deviceOrigin === 'android') {
            console.log('device: android')
        } else if (deviceOrigin === 'other') {
            console.log('device: Not for AR')
        }
    }, [deviceOrigin])

    useLayoutEffect(() => {
        setDeviceOrigin(checkMobile())

        scene.traverse((c: any) => {
            if (c.material) {
                const material = c.material
                if (material.opacity < 0.65 && material.opacity > 0.2) {
                    const newMaterial: any = new MeshPhysicalMaterial()
                    for (const key in material) {
                        if (key in material) {
                            if (material[key] === null) {
                                continue
                            }

                            if (material[key].isTexture) {
                                newMaterial[key] = material[key]
                            } else if (
                                material[key].copy &&
                                material[key].constructor ===
                                    newMaterial[key].constructor
                            ) {
                                newMaterial[key].copy(material[key])
                            } else if (typeof material[key] === 'number') {
                                newMaterial[key] = material[key]
                            }
                        }
                    }

                    newMaterial.opacity = 1.0
                    newMaterial.transmission = 1.0
                    c.material = newMaterial
                }
            }
        })
    }, [scene])

    return (
        <>
            <primitive object={scene} />
        </>
    )
}
