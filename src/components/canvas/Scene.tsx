import { Box, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
// import { ARButton, XR } from '@react-three/xr'
import { useEffect, useRef, useState } from 'react'
import { ARScreen } from './xr/arScreen'
import { ARButton } from '@react-three/xr'

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
            //안드로이드
            return 'android'
        } else if (
            varUA.indexOf('iphone') > -1 ||
            varUA.indexOf('ipad') > -1 ||
            varUA.indexOf('ipod') > -1
        ) {
            //IOS
            return 'ios'
        } else {
            //아이폰, 안드로이드 외
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
                <ARButton
                    ref={arClickRef}
                    style={{
                        position: 'absolute',
                        zIndex: '99999',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '200px',
                        height: '40px',
                        borderRadius: '20px',
                        border: '2px solid #ccc',
                    }}
                >
                    AR for Android
                </ARButton>
            )}
            {userAgent === 'iOS' && (
                <a href={usdz} rel="ar" target="_blank">
                    <button
                        ref={usdzClickRef}
                        style={{
                            position: 'absolute',
                            zIndex: '99999',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '200px',
                            height: '40px',
                            borderRadius: '20px',
                            border: '2px solid #ccc',
                        }}
                    >
                        AR for iOS
                    </button>
                </a>
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
