import * as THREE from 'three'
import * as React from "react";
import { Suspense,  useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {  OrbitControls,useGLTF, Edges } from '@react-three/drei'

function Logo(props) {
    const ref = useRef<THREE.Mesh>(null!)
    const [active, setActive] = useState(false);
    /* @ts-ignore */
    const { nodes } = useGLTF('/mylogo.glb')
    useFrame(({ clock }) => {
        const a = clock.getElapsedTime();
        ref.current.rotation.y = 0.5*a;
    });

    const black = new THREE.MeshBasicMaterial({ color: 'black', toneMapped: true })
    return (
        <mesh geometry={nodes.Cylinder.geometry}
            onClick={() => setActive(!active)}
            position={[0, 0, 0]} rotation={[-1.4, 4.68, 3]} scale={[0.15, 0.15, 0.15]} {...props}
            ref={ref}>
             <Edges material={black} />
        </mesh>
    )
}

export default function ThreeF({ children, ...props })
    {
    
    return (
        <>
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 2.5] }} gl={{ alpha: true }}>
                <Suspense fallback={null}>
                    <Logo />
                       </Suspense>
                <OrbitControls/>
            </Canvas>
     
        </>
    )
}
