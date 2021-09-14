import * as THREE from "three";
// import { OrbitControls } from "/three/examples/jsm/controls/OrbitControls";

// Hex Torus
export const torus = new THREE.Mesh(
  new THREE.TorusGeometry(1.2, 0.3, 6, 6, Math.PI * 2),
  new THREE.MeshPhysicalMaterial({
    color: 0x232332,
    emissive: 0x232332,
    roughness: 0,
    metalness: 1,
    reflectivity: 1,
  })
);

// Earth Sphere
const earthTexture = new THREE.TextureLoader().load("../../img/earth.jpg");

export const earthSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);

// Space Background
export const cloudTexture = new THREE.TextureLoader().load(
  "../../img/dark-clouds-bg.jpg"
);
