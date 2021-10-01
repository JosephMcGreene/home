import "./scss/index.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import earthImg from "./img/earth.jpg";
import cloudsImg from "./img/dark-clouds-bg.jpg";

// Set up Scene, Camera, and Renderer ==========
const scene = new THREE.Scene();
/**
 * Provides a camera from which to view
 * @param  {number} field of view
 * @param  {number} aspect ratio
 * @param  {number} view frustum
 * @param  {number} view frustum
 */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(4);

renderer.render(scene, camera);
// /Set up Scene, Camera, and Renderer ==========

// Lighting ==========
const pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(0, 0.5, 5);
const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(4, 4, 1);
const pointLight3 = new THREE.PointLight(0xffffff);
pointLight3.position.set(-4, 4, 0);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight1, pointLight2, pointLight3, ambientLight);
// /Lighting ==========

// Helpers
// const lightHelper1 = new THREE.PointLightHelper(pointLight1);
// const lightHelper2 = new THREE.PointLightHelper(pointLight2);
// const lightHelper3 = new THREE.PointLightHelper(pointLight3);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper1, lightHelper2, lightHelper3);

// =============== 3D Objects ===============

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
torus.position.z = -3;
scene.add(torus);
// /Hexagon Torus ==========

// Earth ==========
const earthTexture = new THREE.TextureLoader().load(earthImg);
const earthSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);
earthSphere.position.x = -2;
earthSphere.position.z = -3;
scene.add(earthSphere);
// /Earth ==========

// =============== /3D Objects ===============

// Space Background ==========
const cloudTexture = new THREE.TextureLoader().load(cloudsImg);
scene.background = cloudTexture;
// /Space Background ==========

/**
 * generates a single star that is randmonly placed somewhere in the Scene
 */
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
// Generates a field of 350 stars in the Scene
Array(350).fill().forEach(addStar);

/**
 * animates all of the objects placed in the Scene
 */
function animateObjects() {
  requestAnimationFrame(animateObjects);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.007;

  earthSphere.rotation.y += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}
animateObjects();

/**
 * moves the camera backward onscroll
 */
function handleOnScroll() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.02;
  camera.rotation.x = t * 0.00055;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = handleOnScroll;
