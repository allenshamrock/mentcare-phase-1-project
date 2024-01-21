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



//Event Listener
const form = document
  .querySelector("#newPatientForm")
  .addEventListener("submit", handleSubmit);
// console.log(form)

//Event handler
function handleSubmit(e) {
  e.preventDefault();
  const inputFirstName = document.getElementById("firstName").value;
  const inputSecondName = document.getElementById("secondName").value;
  const inputNationalId = document.getElementById("nationalId").value;
  const inputTelephoneNo = document.getElementById("telephoneNo").value;
  //console.log('I have been submitted')
  if (isNaN(inputNationalId) || inputNationalId.length !== 8) {
    alert(`Enter numbers with 8 characters in the National ID input`);
  } else if (isNaN(inputTelephoneNo) || inputTelephoneNo.length !== 10) {
    alert("Enter numbers consisting 10 characters in the Telephone No input");
  } else {
    let patientObj = {
      firstName: inputFirstName,
      secondName: inputSecondName,
      nationalId: inputNationalId,
      telephoneNo: inputNationalId,
    };
    alert(
      `${inputFirstName} ${inputSecondName} your appointment has been made`
    );
    //console.log(patientObj);
    sendData(patientObj);
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
        throw new Error(`Failed to post data.`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })

    .catch((error) => console.error("Failed to post data", error));
}


// Get method to fetch for the Dr names
// Event handler
document
  .querySelector("#alreadyPatientForm")
  .addEventListener("submit", handlerSubmit);

//Get method to fetch for the Dr names
function handlerSubmit(e) {
  e.preventDefault();
  //const doctorName = e.target.value;
  fetchTherapists();
}

// Get method to fetch for the Dr names
function fetchTherapists() {
  fetch("http://localhost:3000/doctors")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data`);
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
        alert(`Appointment booked with ${input}`);
      } else {
        // Handle case when no doctors are available
        alert("Sorry, no available doctors with the provided name.");
      }
    })
    .catch((error) => console.error("Failed to post data", error));
}


//Event Listener
const email = document.querySelector("#emailForm")
email.addEventListener("submit", submitEmail);
//Event handler
function submitEmail(e){
  e.preventDefault()
  const name = document.getElementById('name').value
  const email =document.getElementById('email').value
  const textarea = document.getElementById('text').value
  let emailObj={
    name:name,
    email:email,
    textarea:textarea
  }
  alert(`${name} your email has been recieved `)
  sendEmail(emailObj)
}


//Feedback email response or inquiry,POST method
function sendEmail(emailObj) {
  fetch(" http://localhost:3000/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(emailObj),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to post data");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Failed to post data", error));
}

