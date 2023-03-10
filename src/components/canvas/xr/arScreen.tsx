import React from 'react'
import { Controllers, XR } from '@react-three/xr'
import { Button } from '../interface/button'
import { Model } from '../load/loadModel'

interface ARScreenProps {
    setUsdz: React.Dispatch<React.SetStateAction<string>>
}

export function ARScreen({ setUsdz }: ARScreenProps) {
    return (
        <>
            <XR referenceSpace="local">
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {/* <Button /> */}
                <Model setUsdz={setUsdz} />

                {/* <Controllers /> */}
            </XR>
        </>
    )
}
