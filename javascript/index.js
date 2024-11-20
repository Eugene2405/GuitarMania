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

const menuCheckbox = document.getElementById("menu-checkbox");
const navMenuButton = document.querySelector(".nav-menu-btn");
const sidebar = document.querySelector(".sidebar");
const navHeight = document.querySelector(".navbar").offsetHeight;

function checkboxState() {
  if (menuCheckbox.checked) {
    navMenuButton.style.transform = "rotate(90deg)";
    sidebar.style.left = "0";
  } else {
    navMenuButton.style.transform = "rotate(0)";
    sidebar.style.left = "-20rem";
    sidebar.style.top = `${navHeight - 2}px`;
  }
}

const toggleButtons = document.querySelectorAll(".toggle-button");

toggleButtons.forEach((button) => {
  const dropdown = button.nextElementSibling;
  const dropdownScrollHeight = dropdown.scrollHeight + 2;

  button.addEventListener("click", () => {
    console.log(dropdownScrollHeight);
    dropdown.classList.toggle("shown");

    console.log(dropdown.offsetHeight);
    if (!dropdown.classList.contains("shown")) {
      dropdown.style.height = "0";
    } else {
      dropdown.style.height = `${dropdownScrollHeight}px`;
    }

    button.classList.toggle("clicked");

    toggleButtons.forEach((otherButton) => {
      if (otherButton != button) {
        otherButton.classList.remove("clicked");
        otherButton.nextElementSibling.classList.remove("shown");
        otherButton.nextElementSibling.style.height = "0";
      }
    });
  });
});

menuCheckbox.addEventListener("change", checkboxState);
window.addEventListener("load", () => {
  sidebar.style.top = `${navHeight - 2}px`;
});
window.addEventListener("resize", updateRotation);
window.addEventListener("load", updateRotation);
