// function onKeyDown(e: KeyboardEvent) {
//     if (e.key.toLowerCase() === "c") {
//         points.length = 0;
//         draggingIndex = null;
//         draw();
//     }
//     if (e.key.toLowerCase() === "z") {
//         points.pop();
//         draggingIndex = null;
//         draw();
//     }
// }

// function getPointerPos(e: PointerEvent) {
//     const canvas = myCanvas.value!;
//     const rect = canvas.getBoundingClientRect();
//     return {
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top,
//     };
// }

// function onPointerDown(e: PointerEvent) {
//     const canvas = myCanvas.value;
//     if (!canvas || !ctx) return;

//     isPointerDown = true;
//     canvas.setPointerCapture(e.pointerId);

//     const { x, y } = getPointerPos(e);
//     const idx = hitTest(x, y);

//     if (idx !== null) {
//         draggingIndex = idx;
//         // keep relative offset so it doesn't jump
//         dragOffset.dx = points[idx].x - x;
//         dragOffset.dy = points[idx].y - y;
//     } else {
//         // click empty space => add point
//         placePointIfEmpty(x, y);
//     }

//     draw();
// }

// function onPointerMove(e: PointerEvent) {
//     if (!isPointerDown) return;
//     if (draggingIndex === null) return;

//     const { x, y } = getPointerPos(e);
//     let nx = x + dragOffset.dx;
//     let ny = y + dragOffset.dy;

//     if (SNAP_WHILE_DRAGGING) {
//         const s = snapToGrid(nx, ny);
//         nx = s.x;
//         ny = s.y;
//     }

//     points[draggingIndex].x = nx;
//     points[draggingIndex].y = ny;

//     draw();
// }

// function onPointerUp(e: PointerEvent) {
//     const canvas = myCanvas.value;
//     if (!canvas) return;

//     isPointerDown = false;

//     if (draggingIndex !== null && !SNAP_WHILE_DRAGGING) {
//         // snap on release instead
//         const p = points[draggingIndex];
//         const s = snapToGrid(p.x, p.y);
//         p.x = s.x;
//         p.y = s.y;
//     }

//     draggingIndex = null;
//     canvas.releasePointerCapture(e.pointerId);

//     draw();
// }
