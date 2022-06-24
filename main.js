import './style.css'

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



const scene = new THREE.Scene();

 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight , 0.1 , 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha:true
});

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false
controls.maxPolarAngle = Math.PI / 2;
controls.enableDamping = true;   //damping 
controls.dampingFactor = 0.25;

renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.setZ(220);

const loading = document.querySelector("#loading")

const loader = new GLTFLoader()
loader.load('scene.gltf',(gltf)=>{
  const car = gltf.scene.children[0]
  car.scale.set(0.1,0.1,0.1)
  scene.add(gltf.scene)
  loading.style.display = "none"

})

const pl = new THREE.PointLight("0xffffff",20)
pl.position.z = 300
pl.position.y = 800
pl.position.x = 200
scene.add(pl)

const pl2 = new THREE.PointLight("0xffffff",20)
pl2.position.z = -300
pl2.position.y = 800
pl2.position.x = -200
scene.add(pl2)

const groundgeo = new THREE.BoxGeometry(5000,1,5000)

const groundmat = new THREE.MeshStandardMaterial({color:"0xffffff"})

const ground = new THREE.Mesh(groundgeo,groundmat)

ground.position.y = -50

scene.add(ground)

const tick = () =>{

  window.requestAnimationFrame(tick)

  

  controls.update()
  

  renderer.render(scene,camera)
}
tick()