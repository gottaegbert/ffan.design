import dynamic from "next/dynamic";
import * as THREE from 'three'
import styles from "./ThreeFiber.module.scss";
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere } from "three";
import { Html } from '@react-three/drei'

// export function ThreeF() {
    

//     return (
//         <h4>threehere</h4>
//     );
// }

function Box({ text, color, ...props }) {
    const [hovered, set] = useState(false)
    return (
        <mesh {...props} onPointerOver={(e) => set(true)} onPointerOut={(e) => set(false)}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : color} />
            <Html position={[0, 0, 1]} className="label" center>
                {text}
            </Html>
        </mesh>
    )
}
// function Box(props) {
//     // This reference gives us direct access to the THREE.Mesh object.
//     const ref = useRef()

//     // Hold state for hovered and clicked events.
//     const [hovered, hover] = useState(false)
//     const [clicked, click] = useState(false)

//     // Subscribe this component to the render-loop and rotate the mesh every frame.
//     useFrame((state, delta) => (ref.current.rotation.x += delta))

//     // Return the view.
//     // These are regular three.js elements expressed in JSX.
//     return (
//         <mesh
//             {...props}
//             ref={ref}
//             scale={clicked ? 1.5 : 1}
//             onClick={(event) => click(!clicked)}
//             onPointerOver={(event) => hover(true)}
//             onPointerOut={(event) => hover(false)}
//         >
//             <boxGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//         </mesh>
//     )
// }

export function ThreeF() {
    return (
        <Canvas>
            <color attach="background" args={['#fff']} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box text={<span>This is HTML</span>} color="aquamarine" />
            {/* <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} /> */}
        </Canvas>
    )
}
