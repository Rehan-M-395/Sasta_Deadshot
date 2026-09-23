import './style.css';

import * as THREE from 'three';

import {
  scene,
  camera,
  renderer
} from './scene.js';

import {
  createEnvironment
} from './environment.js';

import { keys } from './controls.js';

import { Player } from './player.js';

// =========================
// Environment
// =========================

createEnvironment(scene);

// =========================
// Player
// =========================

const player =
  new Player(scene);

// =========================
// Clock
// =========================

const clock =
  new THREE.Clock();

// =========================
// Camera Follow
// =========================

function updateCamera() {

  if (!player.player) return;

  camera.position.x =
    player.player.position.x;

  camera.position.z =
    player.player.position.z + 6;

  camera.lookAt(
    player.player.position.x,
    player.player.position.y + 1,
    player.player.position.z
  );
}

// =========================
// Game Loop
// =========================

function animate() {

  requestAnimationFrame(
    animate
  );

  const delta =
    clock.getDelta();

  // Player movement
  player.updateMovement(
    keys
  );

  // Special animations
  player.handleSpecialAnimations(
    keys
  );

  // Animation mixer
  player.update(
    delta
  );

  // Camera
  updateCamera();

  // Render
  renderer.render(
    scene,
    camera
  );
}

animate();

// =========================
// Resize
// =========================

window.addEventListener(
  'resize',
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }
);