import dynamic from "next/dynamic";
import * as THREE from 'three'
import * as React from "react";
import { useRouter } from 'next/router'
import styles from "./ThreeFiber.module.scss";
import { Suspense, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, applyProps, extend, useFrame, useThree } from '@react-three/fiber'
import { Effects, Environment, Html, Loader, OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { useControls,Leva } from 'leva'

function Heart({ color,text, ...props }) {
    // const [hovered, set] = useState(false)
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    useFrame((state, delta) => (ref.current.rotation.y += 0.01))
    return (
        <mesh {...props}
            ref={ref}
            scale={clicked ? 1.2 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            {/* <boxGeometry args={[5, 5, 5]} /> */}
            <mesh>
                <HeartGeometry depth={0.5} />
                <meshStandardMaterial color={hovered ? '#06c743' : '#4b4b4b'} />
            </mesh>
            {/* <Html position={[0, 1, 1]} className="h1">
                {text}
            </Html> */}
            
        </mesh>
    )
}

function Suzi(props) {
    const ref = useRef<THREE.Mesh>(null!)
    const { nodes } = useGLTF('/neon_game_controller.glb')
    useFrame((state, delta) => (ref.current.rotation.y += 0.01))
    const materialProps = useControls({
        thickness: { value: 13.0, min: 0, max: 20 },
        roughness: { value: 0.6, min: 0, max: 1, step: 0.1 },
        clearcoat: { value: 0.9, min: 0, max: 1, step: 0.1 },
        clearcoatRoughness: { value: 0.3, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1.0, min: 0.9, max: 1, step: 0.01 },
        ior: { value: 1.2, min: 1, max: 2.3, step: 0.05 },
        envMapIntensity: { value: 1, min: 0, max: 100, step: 1 },
        color: '#ffffff',
        attenuationTint: '#41ce46',
        attenuationDistance: { value: 0.3, min: 0.1, max: 1 }
    })
    return (
        <mesh geometry={nodes.Object_4.geometry} position={[0, 0, 0]} rotation={[0, 0, 0.3]}  scale={[0.1, 0.1, 0.1]} {...props}
            ref={ref}>
            <meshPhysicalMaterial {...materialProps} />
        </mesh>
    )
}
export function HeartGeometry({ radius = 6, depth = 1 }) {
    const geometry = useRef()
    const shape = useMemo(() => {
        const s = new THREE.Shape()
        const x = -2.5
        const y = -5
        s.moveTo(x + 2.5, y + 2.5)
        s.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y)
        s.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5)
        s.bezierCurveTo(x - 3, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5)
        s.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 5.5, x + 8, y + 3.5)
        s.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y)
        s.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5)
        return new THREE.Shape(s.getPoints(10))
    }, [])
    const config = useMemo(() => ({ depth: depth * 10, bevelEnabled: false }), [depth])
    useLayoutEffect(() => {
        /* @ts-ignore */
        geometry.current.translate(0, 0, (-depth * 10) / 2)
        /* @ts-ignore */
        geometry.current.scale(radius / 10, radius / 10, radius / 10)
        /* @ts-ignore */
        geometry.current.rotateY(Math.PI / 2)
        /* @ts-ignore */
        geometry.current.rotateZ(Math.PI)
        /* @ts-ignore */
        geometry.current.computeVertexNormals()
        
    }, [depth, radius, shape])
    return <extrudeGeometry ref={geometry} args={[shape, config]} />
}



export default function ThreeF({ children, ...props })
    {
    const envProps = useControls({ background: false })
    return (
        <>
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 2.5] }} gl={{ alpha: false }}>
                <Leva   hidden />
                <color attach="background" args={['#111111']} />
                <Suspense fallback={null}>
                    <Suzi />
                    <Environment {...envProps} files="adams_place_bridge_1k.hdr" />
                    <group rotation={[0, 0, 0.785]} >
                        <mesh position={[0, 0, -10]} material-color="#41ce46">
                            <planeGeometry args={[5, 1]} />
                        </mesh>
                        <mesh position={[0, 0, -10]} material-color="#41ce46">
                            <planeGeometry args={[1, 5]} />
                        </mesh>
                    </group>
                </Suspense>
    
            </Canvas>
            <Loader />
        </>
    )
}
