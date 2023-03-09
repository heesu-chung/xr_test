import React from 'react'
import { Controllers, XR } from '@react-three/xr'
import { Button } from '../interface/button'
import { Model } from '../load/loadModel'

export function ARScreen() {
    return (
        <>
            <XR referenceSpace="local">
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Button />
                {/* <Model /> */}

                <Controllers />
            </XR>
        </>
    )
}
