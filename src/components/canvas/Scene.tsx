import { Box, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { ARButton, useXR, XR } from '@react-three/xr'
import { useRef } from 'react'

import { ARScreen } from './xr/arScreen'

function ARScene() {
    const xr = useXR()
    const ref = useRef()

    useFrame(() => {
        if (xr.isPresenting) {
            xr.update(ref.current)
        }
    })

    return (
        <>
            <XR>
                <Box ref={ref} args={[1, 1, 1]} />
            </XR>
        </>
    )
}

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
            <Canvas>
                {/* <ARScreen /> */}
                <ARScene />
            </Canvas>
        </>
    )
}
