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

// Background color
const setBGColor = (element, color) => (element.style.backgroundColor = color);
// color
const setColor = (element, color) => (element.style.color = color);
// SVG Fill
const svgFill = (element, color) => (element.style.fill = color);

// Color
const black = "#000";
const codGray = "#111";
const white = "#fff";

// Function
const checkedBtn = e => {
  const theTarget = e.target;
  const employeeDir = document.querySelectorAll(".employee-dir");

  if (theTarget.checked) {
    // Background Color
    setBGColor(body, codGray);
    setBGColor(header, black);
    setBGColor(wrap, black);
    setBGColor(modal, codGray);
    setBGColor(search, codGray);
    // Color
    setColor(modal, white);
    setColor(modalClose, white);
    setColor(footer, white);
    // Border Style
    search.style.border = "1px solid white";
    // SVG Fill
    svgFill(leftArrow, white);
    svgFill(rightArrow, white);
    svgFill(searchIcon, white);

    employeeDir.forEach(employee => {
      // Background Color
      setBGColor(employee, codGray);
      // Color
      setColor(employee, white);
      // Border Style
      employee.style.border = "1px solid #fff";
    });
  } else {
    // Background Color
    setBGColor(body, "");
    setBGColor(header, "");
    setBGColor(wrap, "");
    setBGColor(modal, "");
    setBGColor(search, "");
    // Color
    setColor(modal, "");
    setColor(modalClose, "");
    setColor(footer, "");
    // Border Style
    search.style.border = "";
    // SVG Fill
    svgFill(leftArrow, "");
    svgFill(rightArrow, "");
    svgFill(searchIcon, "");

    employeeDir.forEach(employee => {
      // Background Color
      setBGColor(employee, "");
      // Color
      setColor(employee, "");
    });
  }
};

// Event Listener
btn.addEventListener("click", checkedBtn);
