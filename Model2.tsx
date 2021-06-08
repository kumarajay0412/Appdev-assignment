import { decode, encode } from "base-64";
import { ExpoWebGLRenderingContext, GLView ,} from "expo-gl";
import { Renderer } from "expo-three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { useEffect } from "react";
import OrbitControlsView from 'expo-three-orbit-controls';

import {
  AmbientLight,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  Clock,
  Camera,

} from "three";

import { Asset } from "expo-asset";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

let model: THREE.Group;
let model1: THREE.Group;
let rightArm;
let leftArm;
const clock = new Clock();

export default function Model1() {
  const [camera, setCamera] = React.useState<Camera | null>(null);
  let timeout: number;

  useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);


  return (
    <OrbitControlsView style={{ flex: 1 }} camera={camera}>
    <GLView
      style={{ flex: 1 }}
      onContextCreate={async (gl: ExpoWebGLRenderingContext) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);

        const camera = new PerspectiveCamera(20, width / height, 0.01, 1000);
        camera.position.set(3, -4, 10);
        setCamera(camera);
        const asset = Asset.fromModule(
          require("./assets/weapons/models/model1.gltf")
        );
        await asset.downloadAsync();
        const scene = new Scene();

        const ambientLight = new AmbientLight(0x404040);
        scene.add(ambientLight);

        const pointLight = new PointLight(0xffffff, 2, 1000, 1);
        pointLight.position.set(0, 100, 100);
        scene.add(pointLight);

        const spotLight = new SpotLight(0xffffff, 0.5);
        spotLight.position.set(0, 500, 100);
        spotLight.lookAt(scene.position);
        scene.add(spotLight);
        
        console.log("laoding")
        
        const loader = new GLTFLoader();
        loader.load(
          asset.uri || "",
          (gltf) => {
            model = gltf.scene;
          
              rightArm = model.getObjectByName("mixamorigRightArm");
         
            // rightArm = model.getObjectByName("mixamorigRightArm");
            
            scene.add(model);
            camera.lookAt(model.position);
          },
          (xhr) => {
            console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
          },
          (error) => {
            console.error("An error happened", error);
          }
        );

        function update() {
         
          }
        const render = () => {
          timeout = requestAnimationFrame(render);

          const t = clock.getElapsedTime();
          // console.log(mod1);
          if ( rightArm ) {
            // console.log(t);
            // console.log("kumar");
            rightArm.rotation.z += Math.sin( t ) * 0.105;
          }
          update();
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };
        render();
      }}
    />
    </OrbitControlsView>
  );
}
