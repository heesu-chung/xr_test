import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useState } from 'react'
import { MeshPhysicalMaterial } from 'three'
import { USDZExporter } from 'three-stdlib'
import * as THREE from 'three'

interface ModelProps {
    setUsdz: React.Dispatch<React.SetStateAction<string>>
}

export function Model({ setUsdz }: ModelProps) {
    // const { scene } = useGLTF('/gltf/sofa.glb') //
    // const { scene } = useGLTF('/gltf/city.glb') //
    // const { scene } = useGLTF('/gltf/mug.glb')
    // const { scene } = useGLTF('/gltf/laptop.glb')
    // const { scene } = useGLTF('/gltf/casual_watch.glb') // face disappear
    // const { scene } = useGLTF('/gltf/iphone_13_pro.glb') // face flipped
    const { scene } = useGLTF('/gltf/ar_test.glb') // ok
    // const { scene } = useGLTF('/gltf/smart_watch.glb') // face disappear

    const [deviceOrigin, setDeviceOrigin] = useState('')

    const getUsdzFile = async () => {
        const exporter = new USDZExporter()
        const arraybuffer = await exporter.parse(scene)

        const usdz = new Blob([arraybuffer], {
            type: 'application/octet-stream',
        })

        const url = URL.createObjectURL(usdz)
        const a = document.querySelector('.ios-usdz') as HTMLAnchorElement
        const aTag = document.createElement('a')

        // if (a) {
        //     a.setAttribute('rel', 'ar')
        //     a.setAttribute('target', '_self')
        //     a.setAttribute('href', `${url}`)
        //     a.setAttribute('download', 'usdzExport.usdz')
        //     a.click()
        // }
        aTag.setAttribute('download', 'usdzExport.usdz')
        aTag.setAttribute('rel', 'ar')
        aTag.setAttribute('target', '_blank')
        aTag.setAttribute('href', url)

        aTag.click()
    }

    const checkMobile = () => {
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
            getUsdzFile()
        }
    }, [deviceOrigin])

    useLayoutEffect(() => {
        scene.traverse((c: any) => {
            if (c instanceof THREE.Mesh) {
                c.updateMatrix()
                c.updateMatrixWorld()
                // c.material.side = THREE.BackSide
            }
        })

        setDeviceOrigin(checkMobile())
    }, [scene])

    return (
        <>
            <primitive object={scene} />
        </>
    )
}
