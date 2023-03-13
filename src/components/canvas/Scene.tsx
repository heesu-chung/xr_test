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
    const [usdzDefault, setUsdzDefault] = useState('/usdz/usdzExport')
    const [usdz, setUsdz] = useState('')
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

    return (
        <>
            {userAgent === 'android' && !btnClicked && (
                <ARButton
                    ref={arClickRef}
                    className={styles.btn}
                    onClick={() => setBtnClicked(true)}
                >
                    AR for Android
                </ARButton>
            )}

            {userAgent === 'android' && btnClicked && (
                <button
                    className={styles.exitBtn}
                    onClick={() => setBtnClicked(false)}
                >
                    <span className={styles.rightDash}></span>
                    <span className={styles.leftDash}></span>
                </button>
            )}
            {userAgent === 'ios' && (
                <>
                    <a rel="ar" target="_self" className="ios-usdz">
                        {!btnClicked && (
                            <ARButton
                                ref={usdzClickRef}
                                className={styles.btn}
                                onClick={() => setBtnClicked(true)}
                            >
                                AR for iOs
                            </ARButton>
                        )}
                    </a>
                </>
            )}
            {userAgent === 'other' && (
                <a rel="ar" target="_self" className="ios-usdz">
                    {!btnClicked && (
                        <ARButton
                            className={styles.btn}
                            onClick={() => setBtnClicked(true)}
                        >
                            Not for AR features
                        </ARButton>
                    )}
                </a>
            )}

            <Canvas>
                <ARScreen setUsdz={setUsdz} />
                <OrbitControls />
            </Canvas>
        </>
    )
}
