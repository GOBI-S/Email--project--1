const emailInput = document.getElementById("E-mail");
const addressInput = document.getElementById("addressInput");
const suggestionsBox = document.getElementById("suggestions");

// Function to fetch address suggestions from Nominatim
async function fetchAddressSuggestions(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    query
  )}&addressdetails=1&limit=5`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to display suggestions in the dropdown
function displaySuggestions(suggestions) {
  suggestionsBox.innerHTML = ""; // Clear any previous suggestions
  suggestions.forEach((suggestion) => {
    const item = document.createElement("div");
    item.classList.add("suggestion-item");
    item.textContent = suggestion.display_name; // Display the full address
    item.addEventListener("click", () => {
      addressInput.value = suggestion.display_name; // Update the input field with the selected address
      suggestionsBox.innerHTML = ""; // Clear suggestions after selection
    });
    suggestionsBox.appendChild(item);
  });
}

// Event listener for input field to handle address suggestions
addressInput.addEventListener("input", async function () {
  const query = this.value;

  if (query.length > 2) {
    // Start searching when input length is greater than 2
    const suggestions = await fetchAddressSuggestions(query);
    displaySuggestions(suggestions);
  } else {
    suggestionsBox.innerHTML = ""; // Clear suggestions if query is too short
  }
});

// Event listener to close suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!addressInput.contains(e.target)) {
    suggestionsBox.innerHTML = "";
  }
});
const senddata = async () => {
  const email = emailInput.value; // Get email value inside the function
  const address = addressInput.value; // Get address value inside the function

  try {
    const response = await axios.post(
      "https://weather-api-6b5u.onrender.com/email",
      {
        Email: email,
        address: address,
      }
    );
    alert("Email Added successfully")
    console.log("Success:", response.data);
  } catch (error) {
    alert("you have alredy submitted your Email");
    console.error("Error:", error.message);
  }
};
const handleSubmit = () => {
  const mail = emailInput.value; // Get email value inside the function
  senddata(); // Call senddata with current values
};
const but1 = document
  .getElementById("verifybutton");
  but1.addEventListener("click", () => {

    const mail = emailInput.value;
    // Basic email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Test if the email matches the regex pattern
    if (emailRegex.test(mail)) {
      but1.innerHTML="verified"
      but1.style.display="none"
      emailInput.disabled = true;
      alert("email has been verified")
      console.log("Verified");

    } else {
      but1.innerHTML="Not verified"
      console.log("Not verified");
    }
  });
const but2 = document
  .getElementById("lanch")
  .addEventListener("click", handleSubmit);
