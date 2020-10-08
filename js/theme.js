// Body
const body = document.querySelector("body");
// Header
const header = document.querySelector("header");
// Wrapper
const wrap = document.querySelector(".wrapper");
// Toggle button
const btn = document.querySelector(".switch-light");
// Search icon
const searchIcon = document.querySelector(".icon-search");
// Footer
const footer = document.querySelector("footer");

// Color
const black = "#000";
const codGray = "#111";
const white = "#fff";

// Function
const checkedBtn = e => {
  const theTarget = e.target;
  const employeeDir = document.querySelectorAll(".employee-dir");

  if (theTarget.checked) {
    body.style.backgroundColor = codGray;
    header.style.backgroundColor = black;
    wrap.style.backgroundColor = black;

    modal.style.backgroundColor = codGray;
    modal.style.color = white;
    modal.style.border = "2px solid #fff";
    modalClose.style.color = white;

    search.style.backgroundColor = codGray;
    search.style.border = "1px solid white";

    leftArrow.style.fill = white;
    rightArrow.style.fill = white;

    searchIcon.style.fill = white;

    footer.style.color = white;

    employeeDir.forEach(employee => {
      employee.style.backgroundColor = codGray;
      employee.style.color = white;
      employee.style.border = "1px solid #fff";
    });
  } else {
    body.style.backgroundColor = "";
    header.style.backgroundColor = "";
    wrap.style.backgroundColor = "";

    modal.style.backgroundColor = "";
    modal.style.color = "";
    modal.style.border = "";
    modalClose.style.color = "";

    search.style.backgroundColor = "";
    search.style.border = "";

    leftArrow.style.fill = "";
    rightArrow.style.fill = "";

    searchIcon.style.fill = "";

    footer.style.color = "";

    employeeDir.forEach(employee => {
      employee.style.backgroundColor = "";
      employee.style.color = "";
    });
  }
};

// Event Listener
btn.addEventListener("click", checkedBtn);
