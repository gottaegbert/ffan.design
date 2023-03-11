import dynamic from "next/dynamic";
import * as THREE from 'three'
import * as React from "react";
import { useRouter } from 'next/router'
import styles from "./ThreeFiber.module.scss";
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, applyProps, useFrame, useThree } from '@react-three/fiber'
import { Sphere } from "three";
import { Environment, Html, OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { FlakesTexture } from "three-stdlib";
function Heart({ color,text, ...props }) {
    // const [hovered, set] = useState(false)
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    useFrame((state, delta) => (ref.current.rotation.x += 0.01))
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
    const { scene, materials } = useGLTF(
        'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/suzanne-high-poly/model.gltf'
    ) as any
    React.useLayoutEffect(() => {
        scene.traverse((obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true))
        applyProps(materials.default, {
            color: 'orange',
            roughness: 0,
            normalMap: new THREE.CanvasTexture(
                new FlakesTexture(),
                THREE.UVMapping,
                THREE.RepeatWrapping,
                THREE.RepeatWrapping
            ),
            'normalMap-flipY': false,
            'normalMap-repeat': [40, 40],
            normalScale: [0.05, 0.05],
        })
    })
    return <primitive object={scene} {...props} />
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
    }, [radius, depth])
    const config = useMemo(() => ({ depth: depth * 10, bevelEnabled: false }), [depth])
    useLayoutEffect(() => {
        geometry.current.translate(0, 0, (-depth * 10) / 2)
        geometry.current.scale(radius / 10, radius / 10, radius / 10)
        geometry.current.rotateY(Math.PI / 2)
        geometry.current.rotateZ(Math.PI)
        geometry.current.computeVertexNormals()
    }, [shape])
    return <extrudeGeometry ref={geometry} args={[shape, config]} />
}



export default function ThreeF({ children, ...props })
    {
    return (
        <Canvas
            {...props}
            
            shadows    
            camera={{ position: [20, 0.9, 20], fov: 26 }}>
            
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Heart text="Digital" color="aquamarine" />
   
            {/* <Suzi rotation={[-0.63, 0, 0]} scale={4} position={[0, 0, 0]} /> */}
            {/* {children} */}
            <Preload all />
            <Environment preset="city" />
            <OrbitControls />
        </Canvas>
    )
}
