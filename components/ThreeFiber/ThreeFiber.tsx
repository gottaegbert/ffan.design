import dynamic from "next/dynamic";
import * as THREE from 'three'
import * as React from "react";
import { useRouter } from 'next/router'
import styles from "./ThreeFiber.module.scss";
import { Suspense, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, applyProps, extend, useFrame, useThree } from '@react-three/fiber'
import { Effects, Environment, Html, Loader, OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { useSpring, animated, config } from "@react-spring/three";
import { useControls, Leva } from 'leva'


function Logo(props) {
    const ref = useRef<THREE.Mesh>(null!)
    const [active, setActive] = useState(false);
    /* @ts-ignore */
    const { nodes } = useGLTF('/mylogo.glb')
    useFrame(({ clock }) => {
        const a = clock.getElapsedTime();
        ref.current.rotation.y = 0.5*a;
    });
    const { scale } = useSpring({
        scale: active ? 1.5 : 1,
        config: config.wobbly
    });
    const materialProps = useControls({
        thickness: { value: 2.0, min: 0, max: 20 },
        roughness: { value: 1.0, min: 0, max: 1, step: 0.1 },
        clearcoat: { value: 0, min: 0, max: 1, step: 0.1 },
        clearcoatRoughness: { value: 0.7, min: 0, max: 1, step: 0.1 },
        transmission: { value: 0.99, min: 0.9, max: 1, step: 0.01 },
        ior: { value: 1.05, min: 1, max: 2.3, step: 0.05 },
        envMapIntensity: { value: 18, min: 0, max: 100, step: 1 },
        color: '#10e553',
        attenuationTint: '#408042',
        attenuationDistance: { value: 0.73, min: 0.1, max: 1 },
        rotation: { value: 0.3, min: 0.1, max: 6.24},
    })
    return (
        <mesh geometry={nodes.Cylinder.geometry}
            onClick={() => setActive(!active)}
            position={[0, 0, 0]} rotation={[-1.4, 4.68, 3]} scale={[0.15, 0.15, 0.15]} {...props}
            ref={ref}>
            <meshPhysicalMaterial {...materialProps} />
        </mesh>
    )
}

export default function ThreeF({ children, ...props })
    {
    const envProps = useControls({ background: false })
    return (
        <>
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 2.5] }} gl={{ alpha: true }}>
                <Leva fill flat collapsed hidden titleBar/>
                {/* <color attach="background" args={['#111111']} /> */}
                <Suspense fallback={null}>
                    <Logo />
                    <Environment {...envProps} files="adams_place_bridge_1k.hdr" />
                    {/* <group rotation={[0, 0, 0.785]} >
                        <mesh position={[0, 0, -10]} material-color="off">
                            <planeGeometry args={[5, 1]} />
                        </mesh>
                        <mesh position={[0, 0, -10]} material-color="#41ce46">
                            <planeGeometry args={[1, 5]} />
                        </mesh>
                    </group> */}
                </Suspense>
                <OrbitControls/>
            </Canvas>
            <Loader />
        </>
    )
}
