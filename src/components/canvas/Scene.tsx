import { Box, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { ARButton, useXR, XR } from '@react-three/xr'
import { useEffect, useRef } from 'react'
import { ARScreen } from './xr/arScreen'

import { USDZExporter } from 'three-stdlib'

export function Scene() {
    const arClickRef = useRef<HTMLButtonElement>(null!)
    const usdzClickRef = useRef<HTMLAnchorElement>(null!)

    useEffect(() => {
        // arClickRef.current.click()
        usdzClickRef.current.click()
    }, [])

    return (
        <>
            {/* <ARButton
                sessionInit={{
                    optionalFeatures: [
                        'local-floor',
                        'bounded-floor',
                        'hand-tracking',
                        'layers',
                    ],
                }}
                enterOnly={true}
                exitOnly={true}
            /> */}

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
            />

            <a
                ref={usdzClickRef}
                href="/usdz/Smart_Watch_KW_19.usdz"
                rel="ar"
                target="_blank"
            >
                USDZ File
            </a>

            <Canvas>
                <ARScreen />
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
