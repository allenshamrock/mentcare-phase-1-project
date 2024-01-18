let currentForm = null;
//Toogle function to access the forms
function toggleForm(formId) {
  const form = document.getElementById(formId);
  //Conditional statement to show only clicked form
  if (currentForm) {
    currentForm.style.display = "none";
  }

  if (form) {
    form.style.display = "flex";
    currentForm = form;
  }
}
const url = "http://localhost:3000/data";
const reqAppointment = document.getElementById("reqAppointment");
function fetchData() {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

fetchData();

//using POST method to post patients data to db server


