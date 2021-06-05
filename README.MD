# Native Application for displaying 3D models 

## Overview

A native application for ios and andriod which can be used to display the 3d models which are of gltf format and can be previewed in this application . we can view the 3d from every direction and interact with it and change the desired model by selecting on two buttons provided . UI is built using Expo react-native paper . 

[Video demo](https://github.com/kumarajay0412/Appdev-assignment/edit/main/README.MD)

## Implementation

- First i used blender to load models and convert them to required GLTF format and load them into my app and add it to scene in App with the help og Gltf loader provided by Three.js .

```      
     
        const asset = Asset.fromModule(
          require("./assets/weapons/models/model2.gltf")
        );
        await asset.downloadAsync();
         const loader = new GLTFLoader();
        loader.load(
          asset.uri || "",
          (gltf) => {
            model = gltf.scene;
            scene.add(model);
            camera.lookAt(model.position);
          },
          (xhr) => {
            console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`); // for seeing data is being loaded or not 
          },
          (error) => {
            console.error("An error happened", error);  
          }
        );

```

- Then i added spotlight, pointlight, ambientlight and camera to my scene .
```
        const camera = new PerspectiveCamera(20, width / height, 0.01, 1000);
        camera.position.set(3, -4, 10);
        setCamera(camera);
 
        const ambientLight = new AmbientLight(0x404040);
        scene.add(ambientLight);

        const pointLight = new PointLight(0xffffff, 2, 1000, 1);
        pointLight.position.set(0, 100, 100);
        scene.add(pointLight);

        const spotLight = new SpotLight(0xffffff, 0.5);
        spotLight.position.set(0, 500, 100);
        spotLight.lookAt(scene.position);
        scene.add(spotLight);
 ```
 
- A function that will asynchronously load files based on their extension.

```
module.exports = {
  resolver: {
    assetExts: ['db', 'mp3', 'ttf', 'obj', 'png', 'jpg'],
  },
};

```
- I used orbit controlled to interact with the model in 3D
```
import OrbitControlsView from 'expo-three-orbit-controls';

  <OrbitControlsView style={{ flex: 1 }} camera={camera}>
      <GLView
        .
        .
        . 
        .
        .
      />
    </OrbitControlsView>

```
- Used Usestate hook to Change the model 
```
  const [mod1, setMod1] = useState(true);
  const [mod2, setMod2] = useState(false);
  const changeModel2 = () => {
    setMod1(false);
    setMod2(true);
  };

  const changeModel1 = () => {
    setMod1(true);
    setMod2(false);
  };

```

- Used React native paper for header and buttons 

```
        import { Appbar } from 'react-native-paper';
        import { Button } from 'react-native-paper';
        <Appbar style={styles.header}>
          <Text style={styles.title}> My 3D object visualizer </Text>
        </Appbar>
        <Button mode="contained" color="blanchedalmond" onPress={changeModel1}>
            Model 1
        </Button>
        <Button mode="contained" color="blanchedalmond" onPress={ changeModel2}>
            Model 2
        </Button>
        <Appbar style={styles.footer}>
          <Text style={styles.title1}>Designed and developed by Ajay</Text>
        </Appbar>

```
- Used TouchableOpacity a wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

- Used styles to do add design and to make better UI

```
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
          },
          header: {
            height: 80,
            paddingTop: 90,
            backgroundColor: 'coral',
          },
          title1: {
            textAlign: 'center',
            justifyContent:'center',
            paddingLeft:50,
            marginBottom:50,
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          },
          footer: {
            height: 50,
            paddingTop: 50,
            backgroundColor: 'coral',
          },
          title: {
            textAlign: 'center',
            justifyContent:'center',
            paddingLeft:70,
            marginBottom:70,
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold',
          },
          item: {
            padding: 16,
            marginTop: 16,
            marginBottom:100,
            borderColor: '#bbb',
            borderWidth: 1,
            borderStyle: "dashed",
            borderRadius: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-evenly',
          },
          model:{
            flex:3,
            marginTop: 36,
            alignItems: 'center',
            // backgroundColor:"red"
          }
        });
```
Refrences :

* [expo three](https://github.com/expo/expo-three#readme)
* [three.js](https://threejs.org/)
* [expo-three-orbit-controls](https://github.com/EvanBacon/expo-three-orbit-controls)
* [Gltf loader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
* [drei](https://github.com/pmndrs/drei)
* [Mixamo](https://www.mixamo.com/#/)
* [react-three-fiber](https://github.com/pmndrs/react-three-fiber)
* [gltfjsx](https://github.com/pmndrs/gltfjsx)
* [https://snack.expo.io/@bacon/load-simple-obj-model](https://snack.expo.io/@bacon/load-simple-obj-model)
* [https://github.com/expo/expo-three/issues/5](https://github.com/expo/expo-three/issues/5)
* [https://github.com/expo/expo-three/issues/166](https://github.com/expo/expo-three/issues/166)

