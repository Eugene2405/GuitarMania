function updateRotation() {
  const minRotation = 0;
  const maxRotation = 55;
  const screenWidth = window.innerWidth;

  const rotation = Math.min(
    maxRotation,
    Math.max(minRotation, (screenWidth - 520) / 10)
  );

  document.querySelector(
    ".guitar"
  ).style.transform = `rotateZ(${-rotation}deg)`;
}
window.addEventListener("resize", updateRotation);
window.addEventListener("load", updateRotation);
