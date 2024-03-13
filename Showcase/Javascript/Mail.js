function sendEmail() {
  var form = document.getElementById("emailForm");
  var formData = new FormData(form);

  feedbackSendForm.textContent = 'Versturen...';

  fetch("http://localhost:5068/Mail/sendEmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Assuming the response is plain text
      return response.text();
    })
    .then((data) => {
      console.log("Success:", data);
      feedbackSendForm.textContent = 'Versturen gelukt!';
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to check if the server is online
function isServerOnline() {
    return fetch("http://localhost:5068/Mail/sendEmail")
      .then(response => {
        if (response.ok || response.status === 405) {
          return true; // Server is online
        } else {
          return false; // Server is offline or unreachable
        }
      })
      .catch(error => {
        console.error("Error checking server status:", error);
        return false; // Server is offline or unreachable
      });
  }
  
// Function to enable/disable the form based on server status
async function updateFormStatus() {
    var form = document.getElementById('emailForm');
    try {
      var online = await isServerOnline();
      if (!online) {
        form.classList.add('disabled');
        form.querySelectorAll('input, button').forEach(function(element) {
          element.disabled = true;
        });
      } else {
        form.classList.remove('disabled');
        form.querySelectorAll('input, button').forEach(function(element) {
          element.disabled = false;
        });
      }
    } catch (error) {
      console.error("Error updating form status:", error);
    }
  }
  
  async function updateServerStatus() {
    var statusIndicator = document.getElementById('statusIndicator');
    try {
      var online = await isServerOnline();
      if (online) {
        statusIndicator.textContent = 'online';
        statusIndicator.style.color = 'green';
      } else {
        statusIndicator.textContent = 'offline';
        statusIndicator.style.color = 'red';
      }
    } catch (error) {
      console.error("Error updating server status:", error);
    }
  }
  
  // Call the update functions to initialize the page state
  updateFormStatus();
  updateServerStatus();
  
  
    setInterval(function() {
    updateServerStatus();
    updateFormStatus();
  }, 5000);

  function validateForm() {

    validateName();
    validateEmail();
    validatePhonenumber();
    validateSubject();

    if(validateName() && validateEmail() && validatePhonenumber() && validateSubject() && document.querySelector('#g-recaptcha-response').value){
        console.log("Validate succes");
        sendEmail();
    }
}

function validateName() {
    var fromName = document.getElementById("fromName").value;
    if (fromName === ""){
        ErrorNameMessage.textContent = 'Vul a.u.b uw voornaam EN achternaam in';
        ErrorNameMessage.style.color = 'red';
        return false;
    }

    ErrorNameMessage.textContent = '';
    ErrorNameMessage.style.color = 'red';

    console.log("Validate name succes");
    return true;
}

function validateEmail() {
    if(isValidEmail(document.getElementById("fromAddress").value)){
    console.log("Validate Email succes");
        return true;
    }

    ErrorEmailMessage.textContent = 'Voer een geldig emailadres in';
    ErrorEmailMessage.style.color = 'red';

    return false;
}

function isValidEmail(email) {
    // Regular expression for basic email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    // Regular expression for basic phone number validation (accepts digits only)
    var phoneRegex = /^\d+$/;
    return phoneRegex.test(phoneNumber);
}

function validatePhonenumber() { 
   if(isValidPhoneNumber(document.getElementById("PhoneNumber").value)){
    console.log("Validate phone succes");

        return true;
    }

    ErrorPhoneMessage.textContent = 'Voer een geldig emailadres in';
    ErrorPhoneMessage.style.color = 'red';

    return false;
}

function validateSubject() {
    var subject = document.getElementById("subject").value;
    if(subject === ""){ 
        ErrorSubjectMessage.textContent = 'Voer een geldig onderwerp in';
        ErrorSubjectMessage.style.color = 'red';
        return false;
    }

    return true;
}