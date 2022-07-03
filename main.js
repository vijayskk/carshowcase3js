import './style.css'

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { PointLightHelper } from 'three';



const scene = new THREE.Scene();

 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight , 0.1 , 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha:true
});

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false
controls.maxPolarAngle = Math.PI / 2.1;
controls.enableDamping = true;   
controls.enablePan = false;
controls.dampingFactor = 0.25;

renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.setZ(200);

camera.position.setY(-200)
const loading = document.querySelector("#loading")

const loader = new GLTFLoader()
loader.load('/mustang/mustang.gltf',(gltf)=>{
  const car = gltf.scene.children[0]
  gltf.scene.scale.set(50,50,50)
  gltf.scene.rotateY(-Math.PI / 4)
  gltf.scene.castShadow = true; 
  scene.add(gltf.scene)
  loading.style.display = "none"

})


const pl = new THREE.PointLight("0x9c9c9c",5)
pl.position.z = 400
pl.position.y = 250
pl.position.x = -300
pl.castShadow = true
scene.add(pl)

const pl2 = new THREE.PointLight("0x9c9c9c",5)
pl2.position.z = -400
pl2.position.y = 250
pl2.position.x = 300
scene.add(pl2)

const pl3 = new THREE.PointLight("0x9c9c9c",3)
pl3.position.z = 0
pl3.position.y = 100
pl3.position.x = 200
scene.add(pl3)

const pl4 = new THREE.PointLight("0x9c9c9c",3)
pl4.position.z = 0
pl4.position.y = 100
pl4.position.x = -200
scene.add(pl4)

const pl1h = new PointLightHelper(pl)
//const pl2h = new PointLightHelper(pl2)

scene.add(pl1h)

const groundgeo = new THREE.BoxGeometry(5000,1,5000)

const groundmat = new THREE.MeshStandardMaterial({color:0xffffff})

const ground = new THREE.Mesh(groundgeo,groundmat)

ground.position.y = 0

//scene.add(ground)

const tick = () =>{

  window.requestAnimationFrame(tick)

  

  controls.update()
  

  renderer.render(scene,camera)
}
tick()

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}