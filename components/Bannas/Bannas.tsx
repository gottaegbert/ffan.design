import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useThree, useFrame} from '@react-three/fiber'
// https://github.com/pmndrs/drei
import { useGLTF, Detailed, Edges } from '@react-three/drei'

const black = new THREE.MeshBasicMaterial({ color: 'black', toneMapped: true })
// eslint-disable-next-line react-hooks/rules-of-hooks
function Banana({ index, z, speed }) {

    const ref = useRef()
    // useThree gives you access to the R3F state model
    const { viewport, camera, gl,scene} = useThree()
    // getCurrentViewport is a helper that calculates the size of the viewport
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
    /* @ts-ignore */
    const { nodes } = useGLTF('/mylogo.glb')
    // By the time we're here the model is loaded, this is possible through React suspense

    // Local component state, it is safe to mutate because it's fixed data
    const [data] = useState({
        // Randomly distributing the objects along the vertical
        y: THREE.MathUtils.randFloatSpread(height * 2),
        // This gives us a random value between -1 and 1, we will multiply it with the viewport width
        x: THREE.MathUtils.randFloatSpread(2),
        // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
        spin: THREE.MathUtils.randFloat(8, 12),
        // Some random rotations, Math.PI represents 360 degrees in radian
        rX: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI
    })

    // useFrame executes 60 times per second
    useFrame((state, dt) => {
        // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
        // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
        // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
        /* @ts-ignore */
        if (dt < 0.1) ref.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z)
        // Rotate the object around
        /* @ts-ignore */
        ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
        // If they're too far up, set them back to the bottom
        if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
    })
     return (
        /* @ts-ignore */
        <Detailed ref={ref} distances={[0, 80, 100]} >
            <mesh geometry={nodes.Cylinder.geometry} >
                <meshToonMaterial color={'#9bd64f'} wireframe={false} />
                <Edges material={black}  />
            
            </mesh>
     
            
        </Detailed>
    )
}

export default function Bananas({ speed = 2, count = 10, depth = 50, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) {
    
    return (
      
        <Canvas gl={{  preserveDrawingBuffer: true }} dpr={[1.5, 1.5]} camera={{ position: [0, 0, 10], fov: 35, near: 0.01, far: depth + 15 }}>
  
            <spotLight position={[10, 20, 10]} penumbra={1} intensity={2} color="white" />
       
            {Array.from({ length: count }, (_, i) => <Banana key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} /> /* prettier-ignore */)}

        </Canvas>
        
    )
}
