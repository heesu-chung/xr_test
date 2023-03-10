import { Box, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
// import { ARButton, XR } from '@react-three/xr'
import { useEffect, useRef, useState } from 'react'
import { ARScreen } from './xr/arScreen'
import { ARButton } from '@react-three/xr'
import styles from '../../pages/index.module.css'
import { USDZExporter } from 'three-stdlib'

export function Scene() {
    const arClickRef = useRef<HTMLButtonElement>(null!)
    const usdzClickRef = useRef<HTMLButtonElement>(null!)
    const [usdz, setUsdz] = useState('/usdz/usdzExport.usdz')
    // const [usdz, setUsdz] = useState('')
    const [userAgent, setUserAgent] = useState('')

    const [btnClicked, setBtnClicked] = useState(false)

    const checkMobile = () => {
        let varUA = navigator.userAgent.toLowerCase()
        if (varUA.indexOf('android') > -1) {
            return 'android'
        } else if (
            varUA.indexOf('iphone') > -1 ||
            varUA.indexOf('ipad') > -1 ||
            varUA.indexOf('ipod') > -1
        ) {
            return 'ios'
        } else {
            return 'other'
        }
    }

    const onClick = () => {
        setBtnClicked(true)
    }

    useEffect(() => {
        setUserAgent(checkMobile())
    }, [])

    useEffect(() => {
        // console.log(usdz)
    }, [usdz])

    return (
        <>
            {userAgent === 'android' && (
                <ARButton ref={arClickRef} className={styles.btn}>
                    AR for Android
                </ARButton>
            )}
            {userAgent === 'ios' && (
                <>
                    <ARButton ref={usdzClickRef} className={styles.btn}>
                        AR for iOs
                    </ARButton>
                    <a href={usdz} rel="ar" target="_blank"></a>
                </>
            )}
            {userAgent === 'other' && (
                <button
                    ref={arClickRef}
                    className={styles.btn}
                    onClick={onClick}
                >
                    Not for AR features
                </button>
            )}
            {btnClicked && userAgent === 'android' && (
                <Canvas>
                    <ARScreen setUsdz={setUsdz} />
                </Canvas>
            )}
        </>
    )
}
