import React from 'react'
import { Controllers, XR } from '@react-three/xr'
import { Button } from '../interface/button'

export function ARScreen() {
    return (
        <>
            <XR referenceSpace="local">
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Button />
                <Controllers />
            </XR>
        </>
    )
}
