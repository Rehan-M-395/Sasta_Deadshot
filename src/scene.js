import * as THREE from 'three';

// =========================
// Scene
// =========================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);

// =========================
// Camera
// =========================

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 3, 6);

// =========================
// Renderer
// =========================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    window.devicePixelRatio
);

document.body.appendChild(
    renderer.domElement
);

// =========================
// Light
// =========================

const light = new THREE.HemisphereLight(
    0xffffff,
    0x444444,
    3
);

scene.add(light);

// =========================
// Export
// =========================

export {
    scene,
    camera,
    renderer
};