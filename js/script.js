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
const displayEmployees = (employeeData) => {
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
const displayModal = (index) => {
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
const displayOverlay = (e) => {
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
      } else if (counterIndex === 11) {
        rightArrow.classList.add("js-hide-arrow-right");
      }
    });

    leftArrow.addEventListener("click", () => {
      if (counterIndex !== 0) {
        counterIndex--;
        displayModal(counterIndex);
      } else if (counterIndex === 8) {
        rightArrow.classList.remove("js-hide-arrow-right");
      }
    });

    // Add blur effect on the main content
    container.style.filter = "blur(3px)";
  }
};

// Function: Close Modal
const closeModal = () => {
  overlay.classList.add("hidden");
  // Remove blur effect
  container.style.filter = "none";
};

// Function: Search
const searchEmployee = () => {
  const searchVal = search.value.toUpperCase();
  const displayEmployeesName = employees;
  const employeeCard = document.getElementsByClassName("employee-dir");
  console.log(employeeCard);

  for (let i = 0; i < displayEmployeesName.length; i++) {
    const matchedNames = `
    ${displayEmployeesName[i].name.first.toUpperCase()} 
    ${displayEmployeesName[i].name.last.toUpperCase()}`;

    if (matchedNames.includes(searchVal)) {
      employeeCard[i].classList.remove("employee-card");
    } else {
      employeeCard[i].classList.add("employee-card");
    }
  }
};

// Fetch API data
fetch(url)
  .then((res) => res.json())
  .then((data) => data.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

// Event listener
container.addEventListener("click", displayOverlay);
modalClose.addEventListener("click", closeModal);
search.addEventListener("keyup", searchEmployee);
