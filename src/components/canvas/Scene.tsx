import { Canvas } from '@react-three/fiber'
import { ARButton } from '@react-three/xr'

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
            <Canvas>
                <ARScreen />
            </Canvas>
        </>
    )
}
