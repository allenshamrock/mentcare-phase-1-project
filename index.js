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

//using POST method to post patients data to db server
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
    .then((data) => {
      console.log(data);
      const inputFirstName = document.getElementById('firstName').value
      const inputSecondName = document.getElementById('secondName').value
      alert(`${inputFirstName} ${inputSecondName} your appointment has been made`);
    })

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

// Get method to fetch for the Dr names
// Event handler
document
  .querySelector("#alreadyPatientForm")
  .addEventListener("submit", handlerSubmit);

//Get method to fetch for the Dr names
function handlerSubmit(e) {
  e.preventDefault();
  const doctorName = e.target.value;
  fetchTherapists(doctorName);
}

// Get method to fetch for the Dr names
function fetchTherapists() {
  fetch("http://localhost:3000/doctors")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data: Status: ${response.status}`);
      }
      return response.json();
    })
    .then((doctors) => {
      const input = document.getElementById("drName").value;
      console.log(input);
      const isDoctorAvailable = doctors.find((doctor) => {
        return doctor.doctorName === input;
      });

      if (isDoctorAvailable) {
        // If there is an available doctor, show the alert
        alert(`Appointment booked with a doctor having the name ${input}`);
      } else {
        // Handle case when no doctors are available
        alert("Sorry, no available doctors with the provided name.");
      }
    });
}
