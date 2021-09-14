import "../../../dist/css/main.css";
import * as THREE from "three";
// import { OrbitControls } from "/three/examples/jsm/controls/OrbitControls";
import { torus, earthSphere } from "./objects";

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
// Renderers
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);
// /Set up Scene, Camera, and Renderer ==========

// Add Objects to the Scene ==========
// Hex Torus
torus.position.x = -2;
torus.position.z = 3;
scene.add(torus);

// Earth
earthSphere.position.x = -2;
earthSphere.position.z = 3;
scene.add(earthSphere);

// /Add Objects to the Scene ==========
