import { useRef } from 'react';
import { useGLTF, PerspectiveCamera, useAnimations, useVideoTexture } from '@react-three/drei';
import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { mapProgress } from '../../../utils/progress';
import { Color, DoubleSide } from 'three/webgpu';
import { color, select, texture, uniform } from 'three/tsl';
import { useLayoutEffect } from 'react';
import { applyProps } from '@react-three/fiber';
import { caustics } from 'tsl-textures';
import { useState } from 'react';
import { useMemo } from 'react';
import AnimatedSvgPath from './AnimatedSvgPath';
import HtmlControls from './HtmlControls';

export function Model2({ isVisible }) {
  const [isDianchi, setIsDianchi] = useState(false);
  const [progress, setProgress] = useState(0);

  const group = useRef();
  const progressRef = useRef(0);
  const { nodes, materials, animations } = useGLTF('/19addPlaneaddLine.glb');
  const { nodes: nLine } = useGLTF('/NeonLight.glb');

  const { actions } = useAnimations(animations, group);

  const videoTexture = useVideoTexture('/textures/green.mp4');

  useLayoutEffect(() => {
    applyProps(materials.material_3, { color: '#747474' });
  }, [nodes, materials]);

  useEffect(() => {
    if (actions['Animation']) {
      actions['Animation'].play().paused = true;
    }
  }, [actions]);

  useLenis((lenis) => {
    const currentProgress = (lenis.progress || 0) * 100;
    setProgress(currentProgress);
    progressRef.current = currentProgress;
    console.log(currentProgress);
    const action = actions['Animation'];
    if (action) {
      action.time =
        action.getClip().duration * Math.max(0.01, mapProgress(currentProgress / 100, 0, 0.5));
    }
  });
  const scalePlane = [15, 1, 40];
  const isDianchiU = useMemo(() => uniform(true), []);
  useEffect(() => {
    isDianchiU.value = isDianchi;
  }, [isDianchi]);

  //字体

  return (
    <group ref={group} dispose={null} visible={isVisible}>
      <group name="Scene">
        <group name="Empty007" scale={7.495}>
          <group name="Empty005" position={[0, 0, 1.645]} rotation={[-2.689, 0, 0]} scale={0.103}>
            <group name="Empty003" position={[-2.623, 2.813, 0.632]} scale={1.687}>
              <mesh
                name="右_VID1"
                castShadow
                receiveShadow
                geometry={nodes.右_VID1.geometry}
                material={materials['Mat_IOR_1.0_Dispersion分散0']}
                position={[0, 0, -0.003]}
                rotation={[-0.169, -0.108, -0.024]}
                scale={-2.197}
              />
              <mesh
                name="右_VID2"
                castShadow
                receiveShadow
                geometry={nodes.右_VID2.geometry}
                material={materials['Mat_IOR_1.0_Dispersion分散0']}
                position={[0.008, 0, -0.043]}
                rotation={[-0.169, -0.108, -0.024]}
                scale={-2.197}
              />
              <mesh
                name="右_中间波导层"
                castShadow
                receiveShadow
                geometry={nodes.右_中间波导层.geometry}
                material={materials['Mat_IOR_1.0_Dispersion分散0']}
                position={[0.003, 0, -0.034]}
                rotation={[-0.169, -0.108, -0.024]}
                scale={-2.197}
              />
            </group>
            <group name="Empty004" position={[2.215, 2.882, 0.677]} scale={2.163}>
              <mesh
                name="左_VID1001"
                castShadow
                receiveShadow
                geometry={nodes.左_VID1001.geometry}
                material={materials['Mat_IOR_1.0_Dispersion分散0']}
                position={[0, 0, -0.002]}
                rotation={[-0.169, -0.108, -0.024]}
                scale={[-1.713, -1.714, -1.714]}
              />
              <mesh
                name="左_VID2001"
                castShadow
                receiveShadow
                geometry={nodes.左_VID2001.geometry}
                material={materials['Mat_IOR_1.0_Dispersion分散0']}
                position={[-0.006, 0, -0.034]}
                rotation={[-0.169, -0.108, -0.024]}
                scale={[-1.713, -1.714, -1.714]}
              />
              <mesh
                name="左_中间波导层001"
                castShadow
                receiveShadow
                geometry={nodes.左_中间波导层001.geometry}
                material={materials['Mat_IOR_1.0_Dispersion分散0']}
                position={[-0.002, 0, -0.014]}
                rotation={[-0.169, -0.108, -0.024]}
                scale={[-1.713, -1.714, -1.714]}
              />
            </group>
            <mesh
              name="Object_12004"
              castShadow
              receiveShadow
              geometry={nodes.Object_12004.geometry}
              material={materials.material_3}
              position={[-0.26, 2.252, -0.906]}
            />
            <mesh
              name="Object_12005"
              castShadow
              receiveShadow
              geometry={nodes.Object_12005.geometry}
              material={materials.material_3}
              position={[-0.26, 2.252, -0.906]}
            />
            <mesh
              name="Object_4004"
              castShadow
              receiveShadow
              geometry={nodes.Object_4004.geometry}
              material={materials['002_Nose']}
              position={[-0.26, 2.252, -0.906]}
            >
              <HtmlControls
                fovPoint={{
                  9.09465: [-0.74, -0.19],
                  10.7325: [-0.46, -0.06],
                  11.10288: [-0.7, 0.1],
                  11.9588: [-0.7, 0.12],
                  12.5679: [-0.46, 0.21],
                  14.1399: [0.24, 0.13],
                  14.43621: [0.4, 0.13],
                }}
                progress={progress}
                // debug={true}
              >
                <div className=" w-60 absolute ">
                  <AnimatedSvgPath
                    className="w-60"
                    progress={progress}
                    animationRange={[9.1, 10, 13, 14]}
                  />
                  <div className="text-xl absolute top-12 left-30 ">鼻托</div>
                </div>
              </HtmlControls>
            </mesh>
            <mesh
              name="Object_6002"
              castShadow
              receiveShadow
              geometry={nodes.Object_6002.geometry}
              material={materials['material_3']}
              position={[-0.26, 2.252, -0.906]}
            ></mesh>
            <mesh
              name="前镜框"
              castShadow
              receiveShadow
              geometry={nodes.前镜框.geometry}
              material={materials.material_3}
              position={[-0.171, 2.932, 0.414]}
            />
            <mesh
              name="右指示灯"
              castShadow
              receiveShadow
              geometry={nodes.右指示灯.geometry}
              material={materials['sunglass.002']}
              position={[-0.196, 3.702, 0.718]}
            />
            <mesh
              name="右摄像头1"
              castShadow
              receiveShadow
              geometry={nodes.右摄像头1.geometry}
              material={materials.material_3}
              position={[-4.574, 3.862, 0.109]}
            ></mesh>
            <mesh
              name="右摄像头2"
              castShadow
              receiveShadow
              geometry={nodes.右摄像头2.geometry}
              material={materials.material_3}
              position={[-4.576, 3.867, 0.136]}
            />
            <mesh
              name="右摄像头3"
              castShadow
              receiveShadow
              geometry={nodes.右摄像头3.geometry}
              material={materials.material_3}
              position={[-4.576, 3.868, 0.138]}
            />
            <mesh
              name="右摄像头4"
              castShadow
              receiveShadow
              geometry={nodes.右摄像头4.geometry}
              material={materials['Mat_IOR_1.0_Dispersion分散0']}
              position={[-4.576, 3.868, 0.139]}
            />
            <group
              name="右腿旋转"
              position={[-4.599, 4.112, -0.386]}
              rotation={[Math.PI, -1.549, Math.PI]}
            >
              <mesh
                name="右镜腿"
                castShadow
                receiveShadow
                geometry={nodes.右镜腿.geometry}
                material={materials.material_3}
                position={[-0.067, -1.222, -2.927]}
                rotation={[0.125, 1.488, 2.809]}
                scale={[0.216, 1.059, 0.159]}
              >
                <mesh
                  name="可换电池"
                  castShadow
                  receiveShadow
                  geometry={nodes.可换电池.geometry}
                  position={[0.021, 0.002, 0.066]}
                  scale={[4.63, 0.944, 6.275]}
                >
                  <meshStandardNodeMaterial
                    colorNode={select(
                      isDianchiU,
                      caustics({
                        scale: 2,
                        speed: 0,
                        color: new Color('#83cbd3'),
                        seed: 0,
                      }),
                      color('#757474')
                    )}
                    metalness={1}
                    roughness={0.2}
                  />

                  <mesh
                    position={[-5, 0, -0.5]}
                    onPointerDown={() => {
                      setIsDianchi(true);
                    }}
                    onPointerUp={() => {
                      setIsDianchi(false);
                    }}
                    rotation={[0, 0, 2.6]}
                  >
                    <boxGeometry args={[2, 0.5, 0.2]} />
                    <meshBasicMaterial visible={false} />
                    <HtmlControls
                      fovPoint={{
                        28: [-5.88, 2.26],
                        29.76954732510288: [-6.59, 2.17],
                        31.744855967078188: [-6.84, 2.17],
                        32.76954732510288: [-6.54, 2.26],
                      }}
                      progress={progress}
                      // debug={true}
                      sizeScale={1.4}
                    >
                      <div className=" w-60 absolute ">
                        <img src="Vector 3.svg" className="w-60" />
                        <div className="text-xl absolute top-15 left-8 text-white">可换电池</div>
                      </div>
                    </HtmlControls>
                  </mesh>
                </mesh>
                <mesh
                  name="电源键"
                  castShadow
                  receiveShadow
                  geometry={nodes.电源键.geometry}
                  material={materials.material_3}
                  position={[0.021, -0.009, 0.066]}
                  scale={[0.939, 1.039, 1.039]}
                />
              </mesh>
              <group name="电池片" position={[-0.11, -1.917, -7.405]} rotation={[-0.238, 0, 0]}>
                <mesh
                  name="Cube"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube.geometry}
                  material={materials.电池片基础色}
                />
                <mesh
                  name="Cube_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube_1.geometry}
                  material={materials.电池片金属}
                />
              </group>
            </group>
            <mesh
              name="左指示灯"
              castShadow
              receiveShadow
              geometry={nodes.左指示灯.geometry}
              material={materials['sunglass.002']}
              position={[4.047, 3.894, 0.164]}
            />
            <mesh
              name="左摄像头1"
              castShadow
              receiveShadow
              geometry={nodes.左摄像头1.geometry}
              material={materials.material_3}
              position={[4.236, 3.863, 0.108]}
            >
              <HtmlControls
                fovPoint={{
                  6.469135: [-2.45, -1.0],
                  11.588: [-2.45, -1.0],
                }}
                progress={progress}
                // debug={true}
              >
                <div className=" w-60 absolute ">
                  <img src="Vector 2.svg" className="w-60" />
                  <div className="text-xl absolute -top-8 left-10 text-white">摄像头</div>
                </div>
              </HtmlControls>
            </mesh>
            <mesh
              name="左摄像头2"
              castShadow
              receiveShadow
              geometry={nodes.左摄像头2.geometry}
              material={materials.material_3}
              position={[4.239, 3.868, 0.137]}
            />
            <mesh
              name="左摄像头3"
              castShadow
              receiveShadow
              geometry={nodes.左摄像头3.geometry}
              material={materials.material_3}
              position={[4.239, 3.869, 0.138]}
            />
            <mesh
              name="左摄像头4"
              castShadow
              receiveShadow
              geometry={nodes.左摄像头4.geometry}
              material={materials['Mat_IOR_1.0_Dispersion分散0']}
              position={[4.239, 3.869, 0.139]}
            />
            <group
              name="左腿旋转"
              position={[4.281, 4.112, -0.392]}
              rotation={[-Math.PI, 1.484, -Math.PI]}
            >
              <mesh
                name="左镜腿"
                castShadow
                receiveShadow
                geometry={nodes.左镜腿.geometry}
                material={materials.material_3}
                position={[-8.888, -0.356, -0.278]}
                rotation={[1.41, 0.003, -0.072]}
                scale={[0.216, 1.059, 0.159]}
              />
            </group>
            <mesh
              name="相机键"
              castShadow
              receiveShadow
              geometry={nodes.相机键.geometry}
              material={materials.material_3}
              position={[-4.573, 4.112, -0.172]}
            />
            <mesh
              name="鼻托孔"
              castShadow
              receiveShadow
              geometry={nodes.鼻托孔.geometry}
              material={materials.鼻托}
              position={[-0.612, 3.398, 0.565]}
            ></mesh>
          </group>
          <group name="Empty006" position={[0, 0.382, 0]} rotation={[-1.549, 0, 0]} scale={0.579}>
            <PerspectiveCamera
              name="Camera"
              makeDefault={true}
              far={1000}
              near={0.1}
              fov={20.2}
              position={[-0.04, 0.0, 8.056]}
              scale={0.498}
            />

            <mesh
              name="PlaneTop"
              castShadow
              receiveShadow
              geometry={nodes.Plane001.geometry}
              material={nodes.Plane001.material}
              position={[0, 1.025, -0.673]}
              rotation={[Math.PI - 0.05, 0, 0]}
              scale={scalePlane}
            >
              <meshBasicNodeMaterial
                colorNode={texture(videoTexture).mul(2).mul(color('#98fbe0'))}
                side={DoubleSide}
                toneMapped={false}
                transparent
                opacity={0.4}
              />
            </mesh>

            <group position={[-1.2, 0.912, -1.951]} rotation={[-1.593 - 0.02, 0, 0]}>
              <mesh geometry={nLine.Light.geometry}>
                <meshBasicMaterial
                  color={'#2AF786'}
                  transparent
                  emissive={'#75FF26'}
                  emissiveIntensity={1}
                  opacity={0.1}
                  metalness={0}
                  roughness={1}
                  side={DoubleSide}
                />
              </mesh>
              <mesh geometry={nLine.Glass.geometry}>
                <meshBasicMaterial
                  color={'#38BC79'}
                  emissive={'#1C201D'}
                  emissiveIntensity={1}
                  transparent
                  opacity={0.4}
                  metalness={1}
                  roughness={0.26}
                  side={DoubleSide}
                />
              </mesh>
            </group>

            <group position={[1.2, 0.912, -1.951]} rotation={[-1.593 - 0.02, 0, 0]}>
              <mesh geometry={nLine.Light.geometry}>
                <meshBasicMaterial
                  color={'#2AF786'}
                  transparent
                  emissive={'#75FF26'}
                  emissiveIntensity={1}
                  opacity={0.1}
                  metalness={0}
                  roughness={1}
                  side={DoubleSide}
                />
              </mesh>
              <mesh geometry={nLine.Glass.geometry}>
                <meshBasicMaterial
                  color={'#38BC79'}
                  emissive={'#1C201D'}
                  emissiveIntensity={1}
                  transparent
                  opacity={0.4}
                  metalness={1}
                  roughness={0.26}
                  side={DoubleSide}
                />
              </mesh>
            </group>

            <group position-y={-0.25}>
              {/* 下层 plane */}
              {/* <mesh
                name="PlaneB"
                castShadow
                receiveShadow
                geometry={nodes.Plane002.geometry}
                material={nodes.Plane002.material}
                position={[0, -0.423, -0.607]}
                rotation={[Math.PI - 0.04, 0, 0]}
                scale={scalePlane}
              >
                <meshBasicNodeMaterial
                  colorNode={texture(videoTexture).mul(2).mul(color('#98fbe0'))}
                  side={DoubleSide}
                  toneMapped={false}
                  transparent
                />
              </mesh> */}
              <group position={[-2.1, -0.2, -1.05]} rotation={[-1.593 - 0.02, 0, 0]}>
                <mesh geometry={nLine.Light.geometry}>
                  <meshBasicMaterial
                    color={'#2AF786'}
                    transparent
                    emissive={'#75FF26'}
                    emissiveIntensity={1}
                    opacity={0.18}
                    metalness={0}
                    roughness={1}
                    side={DoubleSide}
                  />
                </mesh>
                <mesh geometry={nLine.Glass.geometry}>
                  <meshBasicMaterial
                    color={'#2961FF'}
                    transparent
                    opacity={0.2}
                    metalness={1}
                    roughness={0.4}
                    side={DoubleSide}
                  />
                </mesh>
              </group>
              <group position={[2.1, -0.2, -1.05]} rotation={[-1.593 - 0.02, 0, 0]}>
                <mesh geometry={nLine.Light.geometry}>
                  <meshBasicMaterial
                    color={'#2AF786'}
                    transparent
                    emissive={'#75FF26'}
                    emissiveIntensity={1}
                    opacity={0.18}
                    metalness={0}
                    roughness={1}
                    side={DoubleSide}
                  />
                </mesh>
                <mesh geometry={nLine.Glass.geometry}>
                  <meshBasicMaterial
                    color={'#2961FF'}
                    transparent
                    opacity={0.2}
                    metalness={1}
                    roughness={0.4}
                    side={DoubleSide}
                  />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/19addPlane.glb');
