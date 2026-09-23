import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export class Player {

    constructor(scene) {

        this.scene = scene;

        // =========================
        // Player
        // =========================

        this.player = null;

        // =========================
        // Animation
        // =========================

        this.mixer = null;

        this.idleAction = null;
        this.walkAction = null;
        this.runAction = null;
        this.jumpAction = null;
        this.punchAction = null;
        this.deathAction = null;
        this.workingAction = null;

        this.currentAction = null;

        this.specialAnimationPlaying = false;

        // =========================
        // Load Player
        // =========================

        this.loadPlayer();
    }

    // =========================
    // Load Player
    // =========================

    loadPlayer() {

        const loader = new FBXLoader();

        loader.load(
            '/models/player.fbx',

            (fbx) => {

                this.player = fbx;

                // =========================
                // Scale
                // =========================

                this.player.scale.set(
                    0.01,
                    0.01,
                    0.01
                );

                // =========================
                // Position
                // =========================

                this.player.position.set(
                    0,
                    0,
                    0
                );

                this.scene.add(
                    this.player
                );

                console.log(
                    'Player loaded'
                );

                // =========================
                // Animation Mixer
                // =========================

                this.mixer =
                    new THREE.AnimationMixer(
                        this.player
                    );

                // =========================
                // Find Animations
                // =========================

                fbx.animations.forEach(
                    (animation) => {

                        const name =
                            animation.name.toLowerCase();

                        console.log(
                            'Animation:',
                            animation.name
                        );

                        if (name.includes('idle')) {

                            this.idleAction =
                                this.mixer.clipAction(
                                    animation
                                );

                        }

                        if (name.includes('walk')) {

                            this.walkAction =
                                this.mixer.clipAction(
                                    animation
                                );

                        }

                        if (name.includes('run')) {

                            this.runAction =
                                this.mixer.clipAction(
                                    animation
                                );

                        }

                        if (name.includes('jump')) {

                            this.jumpAction =
                                this.mixer.clipAction(
                                    animation
                                );

                        }

                        if (name.includes('punch')) {

                            this.punchAction =
                                this.mixer.clipAction(
                                    animation
                                );

                        }

                        if (name.includes('death')) {

                            this.deathAction =
                                this.mixer.clipAction(
                                    animation
                                );

                        }

                        if (name.includes('working')) {

                            this.workingAction =
                                this.mixer.clipAction(
                                    animation
                                );

                        }

                    }
                );

                // =========================
                // Start Idle
                // =========================

                if (this.idleAction) {

                    this.idleAction.play();

                    this.currentAction =
                        this.idleAction;
                }
            },

            (progress) => {

                if (progress.total > 0) {

                    const percentage =
                        progress.loaded /
                        progress.total *
                        100;

                    console.log(
                        'Loading:',
                        Math.round(percentage) + '%'
                    );
                }
            },

            (error) => {

                console.error(
                    'Error loading player:',
                    error
                );

            }
        );
    }

    // =========================
    // Normal Animation
    // =========================

    playAnimation(newAction) {

        if (!newAction) return;

        if (
            this.currentAction === newAction
        ) {
            return;
        }

        if (this.currentAction) {

            this.currentAction.fadeOut(
                0.2
            );
        }

        newAction
            .reset()
            .fadeIn(0.2)
            .play();

        this.currentAction =
            newAction;
    }

    // =========================
    // Special Animation
    // =========================

    playSpecialAnimation(action) {

        if (!action) return;

        if (
            this.specialAnimationPlaying
        ) {
            return;
        }

        this.specialAnimationPlaying =
            true;

        if (this.currentAction) {

            this.currentAction.fadeOut(
                0.15
            );
        }

        action
            .reset()
            .setLoop(
                THREE.LoopOnce,
                1
            );

        action.clampWhenFinished = true;

        action
            .fadeIn(0.15)
            .play();

        this.currentAction =
            action;

        const onFinished = (event) => {

            if (
                event.action !== action
            ) {
                return;
            }

            this.mixer.removeEventListener(
                'finished',
                onFinished
            );

            this.specialAnimationPlaying =
                false;

            action.stop();

            if (this.idleAction) {

                this.idleAction
                    .reset()
                    .fadeIn(0.2)
                    .play();

                this.currentAction =
                    this.idleAction;
            }

        };

        this.mixer.addEventListener(
            'finished',
            onFinished
        );
    }

    // =========================
    // Movement
    // =========================

    updateMovement(keys) {

        if (!this.player) return;

        // Don't move during
        // special animation
        if (
            this.specialAnimationPlaying
        ) {
            return;
        }

        const speed =
            keys['shift']
                ? 0.15
                : 0.08;

        let moving = false;

        // =========================
        // W
        // =========================

        if (keys['w']) {

            this.player.position.z -=
                speed;

            this.player.rotation.y =
                Math.PI;

            moving = true;
        }

        // =========================
        // S
        // =========================

        if (keys['s']) {

            this.player.position.z +=
                speed;

            this.player.rotation.y =
                0;

            moving = true;
        }

        // =========================
        // A
        // =========================

        if (keys['a']) {

            this.player.position.x -=
                speed;

            this.player.rotation.y =
                -Math.PI / 2;

            moving = true;
        }

        // =========================
        // D
        // =========================

        if (keys['d']) {

            this.player.position.x +=
                speed;

            this.player.rotation.y =
                Math.PI / 2;

            moving = true;
        }

        // =========================
        // Animation
        // =========================

        if (moving) {

            if (keys['shift']) {

                this.playAnimation(
                    this.runAction
                );

            } else {

                this.playAnimation(
                    this.walkAction
                );
            }

        } else {

            this.playAnimation(
                this.idleAction
            );
        }

        // Keep player inside 150 x 150 ground

        const groundSize = 150;
        const boundary = groundSize / 2;

        this.player.position.x = THREE.MathUtils.clamp(
            this.player.position.x,
            -boundary,
            boundary
        );

        this.player.position.z = THREE.MathUtils.clamp(
            this.player.position.z,
            -boundary,
            boundary
        );
    }

    // =========================
    // Special Controls
    // =========================

    handleSpecialAnimations(keys) {

        if (!this.player) return;

        if (keys['space']) {

            this.playSpecialAnimation(
                this.jumpAction
            );
        }

        if (keys['p']) {

            this.playSpecialAnimation(
                this.punchAction
            );
        }

        if (keys['k']) {

            this.playSpecialAnimation(
                this.deathAction
            );
        }

        if (keys['o']) {

            this.playSpecialAnimation(
                this.workingAction
            );
        }
    }

    // =========================
    // Update Animation
    // =========================

    update(delta) {

        if (this.mixer) {

            this.mixer.update(
                delta
            );
        }
    }
}