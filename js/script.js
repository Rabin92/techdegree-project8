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
    // let name = employee.name;
    // let email = employee.email;
    // let city = employee.location.city;
    // let picture = employee.picture;

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
    // Blur the main content
    container.style.filter = "blur(3px)";
  }
};

// Function: Close Modal
const closeModal = () => {
  overlay.classList.add("hidden");
  // Remove blur
  container.style.filter = "none";
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

rightArrow.addEventListener("click", () => {});
