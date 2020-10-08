// Search Field
const search = document.querySelector("#js-search");

// Modal Arrows
const leftArrow = document.querySelector("#js-left-arrow");
const rightArrow = document.querySelector("#js-right-arrow");

// Main Container
const container = document.querySelector(".grid-container");

// Overlay & Modal
const overlay = document.querySelector(".overlay");
const modalContent = document.querySelector(".modal-content");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector("#js-modal-close");

// Hold values received from API
let employees = [];

// URL
const url = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=GB`;

// Function: Display Employees Data
const displayEmployees = employeeData => {
  employees = employeeData;

  // Store employee data
  let employeeHTML = ``;

  // Looping through each employee
  employees.forEach((employee, index) => {
    let {
      name,
      email,
      location: { city },
      picture,
    } = employee;

    employeeHTML += `
        <div class="employee-dir" data-index="${index}">
            <img src="${picture.large}" alt="image no: ${index}" class="avatar">

            <div class="employee-info">
                <h2>${name.first} ${name.last}</h2>
                <p>${email}</p>
                <p>${city}</p>
            </div>  
        </div>
    `;
  });
  container.innerHTML = employeeHTML;
};

// Function: Display Modal
const displayModal = index => {
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture,
  } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
    <img src="${picture.large}" class="avatar avatar-modal">
    <div class="employee-info employee-info-modal">
        <h2>${name.first} ${name.last}</h2>
        <p>${email}</p>
        <p>${city}</p>
        <hr class="modal-line"/>
        <p>${phone}</p>
        <p>${street.number}, ${state}, ${postcode}</p>
        <p>D.O.B - ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `;
  overlay.classList.remove("hidden");
  modalContent.innerHTML = modalHTML;
};

// Function: Open modal when its selected
const displayOverlay = e => {
  const theTarget = e.target;
  if (theTarget !== container) {
    const card = theTarget.closest(".employee-dir");
    const index = card.getAttribute("data-index");
    displayModal(index);

    // Left and Right Arrows on Modal
    let counterIndex = index;
    rightArrow.addEventListener("click", () => {
      if (counterIndex !== 11) {
        counterIndex++;
        displayModal(counterIndex);
      }
      if (counterIndex === 11) {
        rightArrow.classList.add("js-hide-arrow-right");
      } else if (counterIndex === 1) {
        leftArrow.classList.remove("js-hide-arrow-left");
      }
    });

    leftArrow.addEventListener("click", () => {
      if (counterIndex !== 0) {
        counterIndex--;
        displayModal(counterIndex);
      }
      if (counterIndex == 10) {
        rightArrow.classList.remove("js-hide-arrow-right");
      } else if (counterIndex === 0) {
        leftArrow.classList.add("js-hide-arrow-left");
      }
    });

    // Add blur effect on the main content
    container.style.filter = "blur(4px)";
  }
};

// Function: Close Modal
const closeModal = () => {
  overlay.classList.add("hidden");
  // Remove blur effect
  container.style.filter = "none";
};

// Function: Error message

const errMsg = () => {
  const error = document.querySelector(".error-msg");

  const displayMsg = `
  <svg
  class="icon-alert"
  xmlns="http://www.w3.org/2000/svg"
  height="40"
  viewBox="0 0 512 512"
>
  <path
    d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm0,319.91a20,20,0,1,1,20-20A20,20,0,0,1,256,367.91Zm21.72-201.15-5.74,122a16,16,0,0,1-32,0l-5.74-121.94v-.05a21.74,21.74,0,1,1,43.44,0Z"
  />
</svg>
    <p>An error has occurred. Please try again!</p>
    `;
  error.innerHTML = displayMsg;
};

// Function: Search
const searchEmployee = () => {
  const searchVal = search.value.toUpperCase();
  const displayEmployeesName = employees;
  const employeeCard = document.querySelectorAll(".employee-dir");

  displayEmployeesName.forEach((employee, i) => {
    const matchedNames = `
    ${
      employee.name.first.toUpperCase() + " " + employee.name.last.toUpperCase()
    } 
    `;

    if (matchedNames.includes(searchVal)) {
      employeeCard[i].classList.remove("employee-card");
    } else {
      employeeCard[i].classList.add("employee-card");
    }
  });
};

// Fetch API data
fetch(url)
  .then(res => res.json())
  .then(data => data.results)
  .then(displayEmployees)
  .catch(errMsg);

// Event listener
container.addEventListener("click", displayOverlay);
modalClose.addEventListener("click", closeModal);
search.addEventListener("keyup", searchEmployee);
