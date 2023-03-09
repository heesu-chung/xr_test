import { Canvas } from '@react-three/fiber'
import { ARButton } from '@react-three/xr'

import { ARScreen } from './xr/arScreen'

export function Scene() {
    return (
        <>
            <ARButton />
            <Canvas>
                <ARScreen />
            </Canvas>
        </>
    )
}
