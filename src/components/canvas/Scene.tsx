import { Canvas } from '@react-three/fiber'
import { ARButton } from '@react-three/xr'
import React, { Suspense } from 'react'
import { ARScreen } from './xr/arScreen'

export function Scene() {
    return (
        <>
            <ARButton />
            <Canvas>
                <Suspense fallback={null}>
                    <ARScreen />
                </Suspense>
            </Canvas>
        </>
    )
}
