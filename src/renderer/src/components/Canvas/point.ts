// function drawPoints() {
//     if (!ctx) return;

//     for (let i = 0; i < points.length; i++) {
//         const p = points[i];
//         const isDragging = draggingIndex === i;

//         // halo
//         ctx.fillStyle = isDragging
//             ? "rgba(251,191,36,0.25)"
//             : "rgba(96,165,250,0.25)";
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
//         ctx.fill();

//         // dot
//         ctx.fillStyle = isDragging
//             ? "rgba(251,191,36,0.95)"
//             : "rgba(96,165,250,0.95)";
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
//         ctx.fill();
//     }
// }

// function snapToGrid(x: number, y: number) {
//     return {
//         x: Math.round(x / GRID_SIZE) * GRID_SIZE,
//         y: Math.round(y / GRID_SIZE) * GRID_SIZE,
//     };
// }

// function hitTest(x: number, y: number) {
//     // return topmost point index, or null
//     for (let i = points.length - 1; i >= 0; i--) {
//         const p = points[i];
//         const dx = x - p.x;
//         const dy = y - p.y;
//         if (dx * dx + dy * dy <= POINT_RADIUS * POINT_RADIUS) return i;
//     }
//     return null;
// }

// function placePointIfEmpty(x: number, y: number) {
//     const snapped = snapToGrid(x, y);
//     points.push(snapped);
// }
