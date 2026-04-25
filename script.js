function calculateAge() {
  let day = parseInt(document.getElementById("day").value);
  let month = parseInt(document.getElementById("month").value);
  let year = parseInt(document.getElementById("year").value);
  let errorMsg = document.getElementById("errorMsg");
  let resultBox = document.getElementById("result");

  // Clear previous error messages
  errorMsg.textContent = "";
  errorMsg.style.display = "none";

  // Validation
  if (!day || !month || !year) {
    errorMsg.textContent = "❌ Please fill in all fields";
    errorMsg.style.display = "block";
    resultBox.classList.remove("show");
    return;
  }

  // Validate date ranges
  if (month < 1 || month > 12) {
    errorMsg.textContent = "❌ Month must be between 1 and 12";
    errorMsg.style.display = "block";
    resultBox.classList.remove("show");
    return;
  }

  if (day < 1 || day > 31) {
    errorMsg.textContent = "❌ Day must be between 1 and 31";
    errorMsg.style.display = "block";
    resultBox.classList.remove("show");
    return;
  }

  // Check if date is valid
  let birthDate = new Date(year, month - 1, day);
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    errorMsg.textContent = "❌ Invalid date (e.g., Feb 30)";
    errorMsg.style.display = "block";
    resultBox.classList.remove("show");
    return;
  }

  // Check if date is in the future
  let today = new Date();
  if (birthDate > today) {
    errorMsg.textContent = "❌ Birth date cannot be in the future";
    errorMsg.style.display = "block";
    resultBox.classList.remove("show");
    return;
  }

  // Calculate age
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  // Adjust if birthday hasn't occurred yet this year
  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--;
    ageMonths += 12;
  }

  // Adjust if day hasn't occurred yet this month
  if (ageDays < 0) {
    ageMonths--;
    let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays += prevMonth.getDate();
  }

  // Format the birthdate
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let formattedDate = `${day} ${monthNames[month - 1]} ${year}`;

  // Get day of week
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = dayNames[birthDate.getDay()];

  // Display result
  resultBox.innerHTML = `
    <div class="birth-date">
      <strong>📅 You were born on:</strong><br>
      ${dayOfWeek}, ${formattedDate}
    </div>
    <div class="age-display">${ageYears}</div>
    <div class="age-details">
      <strong>Exact Age:</strong><br>
      ${ageYears} years, ${ageMonths} months, and ${ageDays} days old 🎉
    </div>
  `;
  resultBox.classList.add("show");
}

// Add event listener to the button
document.getElementById("calculate").addEventListener("click", calculateAge);
