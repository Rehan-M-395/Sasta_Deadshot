import * as THREE from 'three';

export const GROUND_SIZE = 150;

// Create a simple box
function createBox(scene, x, y, z, width, height, depth, color) {
    const geometry = new THREE.BoxGeometry(
        width,
        height,
        depth
    );

    const material = new THREE.MeshStandardMaterial({
        color: color
    });

    const box = new THREE.Mesh(
        geometry,
        material
    );

    box.position.set(x, y, z);

    scene.add(box);

    return box;
}


// Create a tree
function createTree(scene, x, z) {

    // Tree trunk
    const trunkGeometry = new THREE.CylinderGeometry(
        0.4,
        0.5,
        3,
        8
    );

    const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513
    });

    const trunk = new THREE.Mesh(
        trunkGeometry,
        trunkMaterial
    );

    trunk.position.set(x, 1.5, z);

    scene.add(trunk);


    // Tree leaves
    const leavesGeometry = new THREE.SphereGeometry(
        2,
        8,
        8
    );

    const leavesMaterial = new THREE.MeshStandardMaterial({
        color: 0x228B22
    });

    const leaves = new THREE.Mesh(
        leavesGeometry,
        leavesMaterial
    );

    leaves.position.set(x, 4, z);

    scene.add(leaves);
}


// Create a building
function createBuilding(
    scene,
    x,
    z,
    width,
    height,
    depth
) {

    const building = createBox(
        scene,
        x,
        height / 2,
        z,
        width,
        height,
        depth,
        0x888888
    );

    return building;
}


// Create environment
export function createEnvironment(scene) {

    // -------------------------
    // GROUND
    // -------------------------

    const groundGeometry =
        new THREE.PlaneGeometry(
            GROUND_SIZE,
            GROUND_SIZE
        );

    const groundMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x555555
        });

    const ground = new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );

    ground.rotation.x = -Math.PI / 2;

    scene.add(ground);


    // -------------------------
    // BUILDINGS
    // -------------------------

    createBuilding(
        scene,
        -25,
        -25,
        12,
        15,
        12
    );

    createBuilding(
        scene,
        25,
        -30,
        15,
        20,
        12
    );

    createBuilding(
        scene,
        -30,
        25,
        10,
        12,
        10
    );

    createBuilding(
        scene,
        30,
        25,
        14,
        18,
        14
    );


    // -------------------------
    // TREES
    // -------------------------

    createTree(scene, -50, -40);
    createTree(scene, -45, -20);
    createTree(scene, -50, 0);

    createTree(scene, 45, -40);
    createTree(scene, 50, -15);
    createTree(scene, 45, 10);

    createTree(scene, -40, 45);
    createTree(scene, 0, 48);
    createTree(scene, 40, 45);


    // -------------------------
    // BOXES / OBSTACLES
    // -------------------------

    createBox(
        scene,
        0,
        1,
        -15,
        3,
        2,
        3,
        0x8B4513
    );

    createBox(
        scene,
        8,
        1,
        -15,
        3,
        2,
        3,
        0x8B4513
    );

    createBox(
        scene,
        4,
        1,
        -20,
        3,
        2,
        3,
        0x8B4513
    );
}