function calculateAge() {
  let birthdate = document.getElementById("birthdate").value;
  let today = new Date();
  let birthDate = new Date(birthdate);

  let age = today.getFullYear() - birthDate.getFullYear();
  let monthDifference = today.getMonth() - birthDate.getMonth();
  let dayDifference = today.getDate() - birthDate.getDate();

  // If birthday hasn't occurred yet this year, subtract 1
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  // Format the birthdate in readable format
  let formattedDate = birthDate.toLocaleDateString("en-US", {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("result").innerHTML =
    "<strong>Birth Date:</strong> " +
    formattedDate +
    "<br><strong>Age:</strong> " +
    age +
    " years old!";
}

// Add event listener to the button
document.getElementById("calculate").addEventListener("click", calculateAge);
