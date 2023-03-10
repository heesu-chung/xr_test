import { Box, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
// import { ARButton, XR } from '@react-three/xr'
import { useEffect, useRef, useState } from 'react'
import { ARScreen } from './xr/arScreen'
import { ARButton } from '@react-three/xr'
import styles from '../../pages/index.module.css'
import { USDZExporter } from 'three-stdlib'

export function Scene() {
    const arClickRef = useRef<HTMLButtonElement>(null!)
    const usdzClickRef = useRef<HTMLButtonElement>(null!)

    const [usdz, setUsdz] = useState('/usdz/Smart_Watch_KW_19.usdz')
    // const [usdz, setUsdz] = useState('')

    const [userAgent, setUserAgent] = useState('')

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
        setUserAgent(checkMobile())

        // arClickRef.current.click()
        // usdzClickRef.current.click()
    }, [])

    return (
        <>
            {userAgent === 'android' && (
                <ARButton ref={arClickRef} className={styles.btn}>
                    AR for Android
                </ARButton>
            )}
            {userAgent === 'ios' && (
                <a href={usdz} rel="ar" target="_blank">
                    <button ref={usdzClickRef} className={styles.btn}>
                        AR for iOS
                    </button>
                </a>
            )}
            {userAgent === 'other' && (
                <button className={styles.btn}>Not for AR features</button>
            )}

            <Canvas>
                <ARScreen setUsdz={setUsdz} />
            </Canvas>
        </>
    )
}

// function USDZModel () {
//     const { scene } = useThree();
//     const exporter = new USDZExporter();
//     exporter.parse(scene, function(usedz) {
//         const blob = new Blob([usdz], { type: 'model/vnd.usdz+zip'});
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download
//     })
// }
