import styles from "./style.css";
import {
  pianoConcerto1,
  pianoConcerto2,
  pianoConcerto4,
  stringQuintet1,
  stringQuintet2,
} from "./js/audio";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Set up Scene, Camera, and Renderer ==========
// Needed for all THREE.js projects
// Scene
const scene = new THREE.Scene();
// Camera
// @param1 Number : field of view
// @param2 Number : aspect ratio
// @param3 & @param4 Numbers : view frustum
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);
// /Set up Scene, Camera, and Renderer ==========

// many kinds of geometries built into THREE.js @ https://threejs.org/docs/#api/en/geometries/MeshStandardMaterial

// many kinds of materials built into THREE.js @ https://threejs.org/docs/#api/en/constants/Materials

// Hexagon Torus ==========
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(1.2, 0.3, 6, 6, Math.PI * 2),
  new THREE.MeshPhysicalMaterial({
    color: 0x232332,
    emissive: 0x232332,
    roughness: 0,
    metalness: 1,
    reflectivity: 1,
  })
);
torus.position.x = -2;
torus.position.z = 3;

scene.add(torus);
// /Hexagon Torus ==========

// Space Background ==========
const cloudTexture = new THREE.TextureLoader().load(
  "/src/img/dark-clouds-bg.jpg"
);
scene.background = cloudTexture;
// /Space Background ==========

// Earth ==========
const earthTexture = new THREE.TextureLoader().load("/src/img/earth.jpg");
const earthSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);
earthSphere.position.x = -2;
earthSphere.position.z = 3;

scene.add(earthSphere);
// /Earth ==========

// Lighting ==========
// there are many types of lighting as well @ https://threejs.org/docs/#api/en/lights/
const pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(0, 0.5, 5);
const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(4, 4, 1);
const pointLight3 = new THREE.PointLight(0xffffff);
pointLight3.position.set(-4, 4, 0);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight1, pointLight2, pointLight3, ambientLight);
// /Lighting ==========

// There are helpers used to make things like lighting easier to work with:
// const lightHelper1 = new THREE.PointLightHelper(pointLight1);
// const lightHelper2 = new THREE.PointLightHelper(pointLight2);
// const lightHelper3 = new THREE.PointLightHelper(pointLight3);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper1, lightHelper2, lightHelper3);

// Listens to DOM updates from the mouse and updates the camera accordingly
const controls = new OrbitControls(camera, renderer.domElement);

// Functions ==========
// generates 300 randomly positioned stars to the background
function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(125));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(350).fill().forEach(addStar);

function animateObjects() {
  requestAnimationFrame(animateObjects);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.007;

  earthSphere.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}
animateObjects();

function handleOnScroll() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.002;
  camera.position.y = t * -0.002;
}
document.body.onscroll = handleOnScroll;
// /Functions ==========
