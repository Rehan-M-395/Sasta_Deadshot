// =========================
// Keyboard State
// =========================

const keys = {};

// =========================
// Key Down
// =========================

window.addEventListener(
    'keydown',
    (event) => {

        const key =
            event.code === 'Space'
                ? 'space'
                : event.key.toLowerCase();

        // Don't repeatedly trigger
        // special animations
        if (event.repeat) {
            return;
        }

        keys[key] = true;
    }
);

// =========================
// Key Up
// =========================

window.addEventListener(
    'keyup',
    (event) => {

        const key =
            event.code === 'Space'
                ? 'space'
                : event.key.toLowerCase();

        keys[key] = false;
    }
);

// =========================
// Export
// =========================

export { keys };