import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect } from 'react'
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

    const { gl } = useThree()

    const getUsdzFile = async () => {
        const exporter = new USDZExporter()
        const arraybuffer = await exporter.parse(scene)

        const usdz = new Blob([arraybuffer], {
            type: 'application/octet-stream',
        })

        const url = URL.createObjectURL(usdz)
        console.log(url)
        const a = document.createElement('a')
        // const a = document.querySelector('.ios-usdz')

        if (a) {
            // a.setAttribute('download', 'usdzExport.usdz')
            a.setAttribute('rel', 'ar')
            a.setAttribute('target', '_blank')

            a.setAttribute('href', URL.createObjectURL(usdz))
            a.setAttribute('href', url)

            // console.log(URL.createObjectURL(usdz))
            // console.log(a)
            // console.log(url)

            const usdzFile = new File([usdz], 'usdzExport.usdz', {
                type: usdz.type,
            })
            // console.log(usdzFile)
            // a.setAttribute('href', 'usdzExport.usdz')
            // a.click()

            // localStorage.setItem('usdzFile', JSON.stringify(usdzFile))
        }
    }

    useLayoutEffect(() => {
        getUsdzFile()

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
            <primitive object={scene} scale={0.03} />
        </>
    )
}
