import { useGLTF } from '@react-three/drei'
import { useLayoutEffect } from 'react'
import { MeshPhysicalMaterial } from 'three'

export function Model() {
    const { scene } = useGLTF('/gltf/city.glb')
    // const { scene } = useGLTF('/gltf/iphone_13_pro.glb') // simple geometry with texture
    // const { scene } = useGLTF('/gltf/nike_air.glb'); // complex geometry with texture
    // const { scene } = useGLTF('/gltf/smart_watch.glb') // low-quality

    useLayoutEffect(() => {
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
            <primitive object={scene} scale={0.1} />
        </>
    )
}
