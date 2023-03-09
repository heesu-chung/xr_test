import { Text } from '@react-three/drei'
import { Interactive } from '@react-three/xr'
import React, { Suspense, useState } from 'react'

export function Button({ ...props }) {
    const [hover, setHover] = useState(false)
    const [color, setColor] = useState<any>('blue')

    const onSelect = () => {
        setColor((Math.random() * 0xffffff) | 0)
    }

    // useEffect(() => {
    //     console.log(props)
    // }, [])

    return (
        <>
            <Interactive
                onHover={() => setHover(true)}
                onBlur={() => setHover(false)}
                onSelect={onSelect}
            >
                <Box
                    color={color}
                    scale={hover ? [0.6, 0.6, 0.6] : [0.5, 0.5, 0.5]}
                    size={[0.4, 0.1, 0.1]}
                    {...props}
                >
                    <Suspense fallback={null}>
                        <Text
                            position={[0, 0, 0.06]}
                            fontSize={0.05}
                            color="#000"
                            anchorX="center"
                            anchorY="middle"
                        >
                            This is Test XR!!
                        </Text>
                    </Suspense>
                </Box>
            </Interactive>
        </>
    )
}

function Box({ color, size, scale, children, ...rest }: any) {
    return (
        <mesh scale={scale} {...rest}>
            <boxBufferGeometry args={size} />
            <meshPhongMaterial color={color} />
            {children}
        </mesh>
    )
}
