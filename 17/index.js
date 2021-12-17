// Example
//let targetArea = { x1: 20, x2: 30, y1: -10, y2: -5 };

// Real data
let targetArea = { x1: 70, x2: 125, y1: -159, y2: -121 };

let probe;
let maxHeight;

let maxHeights = [];
let velocityCounts = 0;
for (let x = 0; x < 1000; x++) {
    for (let y = -1000; y < 1000; y++) {
        let steps = 0;
        maxHeight = Number.MIN_SAFE_INTEGER;
        probe = { x: 0, y: 0 };
        let initVelocity = { x: x, y: y };
        let velocity = { x: initVelocity.x, y: initVelocity.y };
        let isOnTarget = false;
        while (steps < 1000) {
            probe.x += velocity.x;
            probe.y += velocity.y;

            // Drag
            if (velocity.x > 0) velocity.x--;
            else if (velocity.x < 0) velocity.x++;

            // Gravity
            velocity.y--;

            if (probe.y >= maxHeight) {
                maxHeight = probe.y;
            }

            if (onTarget()) {
                isOnTarget = true;
                break;
            }

            steps++;
        }

        if (isOnTarget) {
            maxHeights.push(maxHeight);
            velocityCounts++;
        }
    }
}

console.log("")
console.log("SIMULATION END");
console.log("Max height found: ", Math.max(...maxHeights));
console.log("Number of velocities that hit target: ", velocityCounts);

function onTarget() {
    return probe.x >= targetArea.x1 && probe.x <= targetArea.x2
        && probe.y >= targetArea.y1 && probe.y <= targetArea.y2;
}

function passedTarget() {
    return probe.x > targetArea.x2 || probe.y < targetArea.y2;
}