import { Canvas } from '@react-three/fiber'
import { ARButton } from '@react-three/xr'
import { Suspense } from 'react'
import { ARScreen } from './xr/arScreen'

export function Scene() {
    return (
        <>
            <ARButton />
            <Canvas>
                <Suspense>
                    <ARScreen />
                </Suspense>
            </Canvas>
        </>
    )
}
