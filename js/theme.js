const btn = document.querySelector('#toggle');
const body = document.querySelector('body');
const header = document.querySelector('header');
const wrap = document.querySelector('.wrapper');
const searchIcon = document.querySelector('.icon-search');
const error = document.querySelector('.error-msg');
const footer = document.querySelector('footer');

// Background Color
const setBGColor = (element, color) => (element.style.backgroundColor = color);
// Color
const setColor = (element, color) => (element.style.color = color);
// SVG Fill
const svgFill = (element, color) => (element.style.fill = color);

// Color
const black = '#000';
const codGray = '#111';
const white = '#fff';

const darkMode = () => {
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
  setColor(search, white);
  setColor(error, white);
  // Border Style
  search.style.border = '1px solid white';
  // SVG Fill
  svgFill(leftArrow, white);
  svgFill(rightArrow, white);
  svgFill(searchIcon, white);
  // Loop
  const employeeDir = document.querySelectorAll('.employee-dir');

  employeeDir.forEach(employee => {
    // Background Color
    setBGColor(employee, codGray);
    // Color
    setColor(employee, white);
    // Border Style
    employee.style.border = '1px solid #fff';
  });
};

const lightMode = () => {
  // Background Color
  setBGColor(body, '');
  setBGColor(header, '');
  setBGColor(wrap, '');
  setBGColor(modal, '');
  setBGColor(search, '');
  // Color
  setColor(modal, '');
  setColor(modalClose, '');
  setColor(footer, '');
  setColor(search, '');
  setColor(error, '');
  // Border Style
  search.style.border = '';
  // SVG Fill
  svgFill(leftArrow, '');
  svgFill(rightArrow, '');
  svgFill(searchIcon, '');
  // Loop
  const employeeDir = document.querySelectorAll('div.employee-dir');

  employeeDir.forEach(employee => {
    // Background Color
    setBGColor(employee, '');
    // Color
    setColor(employee, '');
  });
};

// Event Listener
btn.addEventListener('click', () => {
  if (btn.checked) {
    darkMode();
  } else {
    lightMode();
  }
});
