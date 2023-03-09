import dynamic from "next/dynamic";
import * as THREE from 'three'
import * as React from "react";
import { useRouter } from 'next/router'
import styles from "./ThreeFiber.module.scss";

import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere } from "three";
import { Html } from '@react-three/drei'
import cn from "classnames";


function Box({ color, ...props }) {
    // const [hovered, set] = useState(false)
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    useFrame((state, delta) => (ref.current.rotation.x += 0.01))
    return (
        <mesh {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
            {/* <Html position={[0, 1, 1]} className="h1" center>
                {text}
            </Html> */}
            
        </mesh>
    )
}

export default function ThreeF() {
    return (
        <Canvas
            shadows    
            camera={{ position: [20, 0.9, 20], fov: 26 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box color="aquamarine" />
        </Canvas>
    )
}
