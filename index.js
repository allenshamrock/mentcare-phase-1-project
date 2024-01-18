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

const reqAppointment = document.getElementById("reqAppointment");
function sendData(patientObj) {
  fetch(" http://localhost:3000/patients", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },

    body: JSON.stringify(patientObj),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to post data. Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Failed to post data", error));
}

//Event Listener
const form = document
  .querySelector("#newPatientForm")
  .addEventListener("submit", handleSubmit);
// console.log(form)

//Event handler
function handleSubmit(e) {
  e.preventDefault();
  //console.log('I have been submitted')
  let patientObj = {
    firstName: e.target.firstName.value,
    secondName: e.target.secondName.value,
    nationalId: e.target.nationalId.value,
    telephoneNo: e.target.telephoneNo.value,
  };
  //console.log(patientObj);
  sendData(patientObj);
}

//using POST method to post patients data to db server
