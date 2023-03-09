import { Box, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { ARButton, useXR, XR } from '@react-three/xr'
import { useRef } from 'react'

import { ARScreen } from './xr/arScreen'

export function Scene() {
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
            <ARButton />
            <Canvas>
                <ARScreen />
            </Canvas>
        </>
    )
}
